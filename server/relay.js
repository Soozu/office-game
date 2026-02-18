/**
 * Multiplayer Relay Server — N-player support
 *
 * LOCAL:   npm run relay
 * CLOUD:   Deploy to Railway / Render / Fly.io — it reads PORT from env.
 *
 * Room model:  rooms[roomId] = { host: ws, guests: [ws, ws, ...] }
 * Every client gets a unique playerId.  Messages from any client are
 * broadcast to ALL other clients in the same room.
 */
const { WebSocketServer, WebSocket } = require('ws');

const PORT = process.env.PORT || 8089;
const rooms = {};
let nextId = 1;

/** Generate a short unique player ID */
const makePlayerId = () => `P${nextId++}`;

/** Send JSON to a single socket (if open) */
const send = (ws, obj) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(obj));
    }
};

/** Get every socket in a room EXCEPT the sender */
const othersInRoom = (room, senderWs) => {
    const all = [room.host, ...room.guests];
    return all.filter((ws) => ws && ws !== senderWs && ws.readyState === WebSocket.OPEN);
};

/** Get every socket in a room INCLUDING the sender */
const allInRoom = (room) => {
    return [room.host, ...room.guests].filter((ws) => ws && ws.readyState === WebSocket.OPEN);
};

const wss = new WebSocketServer({ port: PORT, host: '0.0.0.0' });

wss.on('connection', (ws) => {
    ws.roomId = null;
    ws.role = null;
    ws.playerId = makePlayerId();

    ws.on('message', (raw) => {
        let msg;
        try {
            msg = JSON.parse(raw.toString());
        } catch {
            return;
        }

        switch (msg.type) {
            case 'CREATE_ROOM': {
                const roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
                rooms[roomId] = { host: ws, guests: [] };
                ws.roomId = roomId;
                ws.role = 'host';
                send(ws, { type: 'ROOM_CREATED', payload: { roomId, playerId: ws.playerId } });
                console.log(`Room ${roomId} created by ${ws.playerId}`);
                break;
            }

            case 'JOIN_ROOM': {
                const roomId = msg.payload.roomId?.toUpperCase();
                const room = rooms[roomId];
                if (!room) {
                    send(ws, { type: 'ERROR', payload: { message: 'Room not found. Check the code and try again.' } });
                    return;
                }

                room.guests.push(ws);
                ws.roomId = roomId;
                ws.role = 'guest';

                // Tell the new guest they joined + their playerId
                send(ws, { type: 'ROOM_JOINED', payload: { roomId, playerId: ws.playerId } });

                // Tell everyone else in the room that a new player joined
                const others = othersInRoom(room, ws);
                others.forEach((other) => {
                    send(other, { type: 'PLAYER_JOINED', payload: { playerId: ws.playerId } });
                });

                console.log(`${ws.playerId} joined room ${roomId} (${room.guests.length} guest(s))`);
                break;
            }

            default: {
                // Forward the message to all OTHER players in the room,
                // tagging it with the sender's playerId
                if (!ws.roomId || !rooms[ws.roomId]) return;
                const room = rooms[ws.roomId];
                const enriched = JSON.stringify({
                    ...msg,
                    payload: { ...msg.payload, senderId: ws.playerId },
                });
                const others = othersInRoom(room, ws);
                others.forEach((other) => other.send(enriched));
                break;
            }
        }
    });

    ws.on('close', () => {
        if (!ws.roomId || !rooms[ws.roomId]) return;
        const room = rooms[ws.roomId];

        if (ws.role === 'host') {
            // Host left — notify all guests and destroy room
            room.guests.forEach((g) => {
                send(g, { type: 'DISCONNECTED', payload: { playerId: ws.playerId, hostLeft: true } });
            });
            console.log(`Host ${ws.playerId} left room ${ws.roomId} — room destroyed`);
            delete rooms[ws.roomId];
        } else {
            // Guest left — remove from array and notify others
            room.guests = room.guests.filter((g) => g !== ws);
            const others = othersInRoom(room, ws);
            others.forEach((other) => {
                send(other, { type: 'PLAYER_LEFT', payload: { playerId: ws.playerId } });
            });
            console.log(`${ws.playerId} left room ${ws.roomId} (${room.guests.length} guest(s) remain)`);
        }
    });
});

console.log(`🎮 Quiz Multiplayer Relay Server running on port ${PORT}`);

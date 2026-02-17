/**
 * Multiplayer Relay Server
 *
 * LOCAL:   npm run relay
 * CLOUD:   Deploy to Railway / Render / Fly.io — it reads PORT from env.
 */
const { WebSocketServer, WebSocket } = require('ws');

const PORT = process.env.PORT || 8089;
const rooms = {};

const wss = new WebSocketServer({ port: PORT, host: '0.0.0.0' });

wss.on('connection', (ws) => {
    ws.roomId = null;
    ws.role = null;

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
                rooms[roomId] = { host: ws, guest: null };
                ws.roomId = roomId;
                ws.role = 'host';
                ws.send(JSON.stringify({ type: 'ROOM_CREATED', payload: { roomId } }));
                console.log(`Room ${roomId} created`);
                break;
            }

            case 'JOIN_ROOM': {
                const roomId = msg.payload.roomId?.toUpperCase();
                const room = rooms[roomId];
                if (!room) {
                    ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Room not found. Check the code and try again.' } }));
                    return;
                }
                if (room.guest) {
                    ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Room is full.' } }));
                    return;
                }
                room.guest = ws;
                ws.roomId = roomId;
                ws.role = 'guest';

                ws.send(JSON.stringify({ type: 'ROOM_JOINED', payload: { roomId } }));
                if (room.host && room.host.readyState === WebSocket.OPEN) {
                    room.host.send(JSON.stringify({ type: 'GUEST_JOINED', payload: {} }));
                }
                console.log(`Guest joined room ${roomId}`);
                break;
            }

            default: {
                if (!ws.roomId || !rooms[ws.roomId]) return;
                const room = rooms[ws.roomId];
                const target = ws.role === 'host' ? room.guest : room.host;
                if (target && target.readyState === WebSocket.OPEN) {
                    target.send(raw.toString());
                }
                break;
            }
        }
    });

    ws.on('close', () => {
        if (ws.roomId && rooms[ws.roomId]) {
            const room = rooms[ws.roomId];
            const other = ws.role === 'host' ? room.guest : room.host;
            if (other && other.readyState === WebSocket.OPEN) {
                other.send(JSON.stringify({ type: 'DISCONNECTED', payload: {} }));
            }
            console.log(`Player left room ${ws.roomId} — room destroyed`);
            delete rooms[ws.roomId];
        }
    });
});

console.log(`🎮 Quiz Multiplayer Relay Server running on port ${PORT}`);

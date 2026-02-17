/**
 * NetworkService — WebSocket-based (works in Expo Go)
 *
 * Both devices connect as WebSocket CLIENTS to a relay server
 * running on the dev machine (node server/relay.js).
 * The relay pairs them by room code and forwards messages.
 */

const RELAY_PORT = 8089;

class NetworkService {
    constructor() {
        this.ws = null;
        this.messageHandlers = [];
        this.isHost = false;
        this.roomId = null;
    }

    // ── Connect to the relay server ────────────────────────────────
    _connect(serverAddress) {
        return new Promise((resolve, reject) => {
            // Support full URLs (wss://my-app.railway.app) and plain IPs (192.168.1.5)
            let url;
            if (serverAddress.startsWith('ws://') || serverAddress.startsWith('wss://')) {
                url = serverAddress;
            } else {
                url = `ws://${serverAddress}:${RELAY_PORT}`;
            }
            this.ws = new WebSocket(url);

            this.ws.onopen = () => resolve();

            this.ws.onerror = (err) => {
                reject(new Error('Could not connect to relay server at ' + url));
            };

            this.ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);
                    this._emit(msg.type, msg.payload);
                } catch (err) {
                    console.log('Parse error:', err?.message || err);
                }
            };

            this.ws.onclose = () => {
                this._emit('DISCONNECTED', {});
            };
        });
    }

    // ── Host: create a room ────────────────────────────────────────
    createRoom(serverIp) {
        this.isHost = true;
        return new Promise(async (resolve, reject) => {
            try {
                await this._connect(serverIp);

                // Wait for ROOM_CREATED response from relay
                const cleanup = this.onMessage((type, payload) => {
                    if (type === 'ROOM_CREATED') {
                        this.roomId = payload.roomId;
                        cleanup();
                        resolve(payload.roomId);
                    }
                    if (type === 'ERROR') {
                        cleanup();
                        reject(new Error(payload.message));
                    }
                });

                this._sendRaw({ type: 'CREATE_ROOM', payload: {} });
            } catch (err) {
                reject(err);
            }
        });
    }

    // ── Guest: join a room by code ─────────────────────────────────
    joinRoom(serverIp, roomId) {
        this.isHost = false;
        this.roomId = roomId;
        return new Promise(async (resolve, reject) => {
            try {
                await this._connect(serverIp);

                const cleanup = this.onMessage((type, payload) => {
                    if (type === 'ROOM_JOINED') {
                        cleanup();
                        resolve();
                    }
                    if (type === 'ERROR') {
                        cleanup();
                        reject(new Error(payload.message));
                    }
                });

                this._sendRaw({ type: 'JOIN_ROOM', payload: { roomId } });
            } catch (err) {
                reject(err);
            }
        });
    }

    // ── Send a game message (forwarded by relay) ───────────────────
    sendMessage(type, payload = {}) {
        this._sendRaw({ type, payload });
    }

    _sendRaw(obj) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(obj));
        }
    }

    // ── Register a handler ─────────────────────────────────────────
    onMessage(callback) {
        this.messageHandlers.push(callback);
        return () => {
            this.messageHandlers = this.messageHandlers.filter((h) => h !== callback);
        };
    }

    // ── Disconnect & clean up ──────────────────────────────────────
    disconnect() {
        try {
            if (this.ws) {
                this.ws.close();
                this.ws = null;
            }
        } catch (err) {
            console.log('Disconnect error:', err?.message || err);
        }
        this.messageHandlers = [];
        this.isHost = false;
        this.roomId = null;
    }

    // ── Internal ───────────────────────────────────────────────────
    _emit(type, payload) {
        this.messageHandlers.forEach((handler) => {
            try {
                handler(type, payload);
            } catch (err) {
                console.log('Handler error:', err?.message || err);
            }
        });
    }
}

// Singleton
const networkService = new NetworkService();
export default networkService;

import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this._userId = null;
        this._token = null;
        this._isConnected = false;
        this._isRegistered = false;
        this._listeners = {};
        this._heartbeatInterval = null;
    }

    connect(userId, token) {
        this._userId = userId;
        this._token = token;

        if (this.socket?.connected) {
            if (!this._isRegistered) {
                this.socket.emit('register', userId);
            }
            return this.socket;
        }

        // Clean up existing socket before creating new one
        if (this.socket) {
            this.socket.removeAllListeners();
            this.socket.disconnect();
            this.socket = null;
        }

        const SOCKET_URL =
            process.env.REACT_APP_SOCKET_URL || 'https://jobsschart-api.maktechgroup.tech';

        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket', 'polling'],
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 10000,
        });

        // ── Connection events 

        this.socket.on('connect', () => {
            this._isConnected = true;
            this._isRegistered = false;
            this.socket.emit('register', userId);
            this._startHeartbeat();
        });

        this.socket.on('registered', (data) => {
            this._isRegistered = true;
            this._emit('registered', data);
        });

        this.socket.on('disconnect', (reason) => {
            this._isConnected = false;
            this._isRegistered = false;
            this._stopHeartbeat();
        });

        this.socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
            this._isConnected = false;
            this._isRegistered = false;
        });

        this.socket.on('reconnect', () => {
            this._isConnected = true;
            this._isRegistered = false;
            this.socket.emit('register', userId);
            this._startHeartbeat();
        });

        this.socket.onAny((event, ...args) => {
            this._emit(event, ...args);
        });

        return this.socket;
    }

    // ── Heartbeat

    _startHeartbeat() {
        this._stopHeartbeat();
        this._heartbeatInterval = setInterval(() => {
            if (this.socket?.connected) {
                this.socket.emit('heartbeat');
            }
        }, 30_000);
    }

    _stopHeartbeat() {
        if (this._heartbeatInterval) {
            clearInterval(this._heartbeatInterval);
            this._heartbeatInterval = null;
        }
    }

    // ── Internal event bus

    _emit(event, ...args) {
        const cbs = this._listeners[event];
        if (!cbs) return;
        Object.values(cbs).forEach((cb) => {
            if (typeof cb === 'function') {
                try {
                    cb(...args);
                } catch (e) {
                    console.error(`Error in listener for ${event}:`, e);
                }
            }
        });
    }

    on(event, keyOrCallback, callback) {
        if (!this._listeners[event]) this._listeners[event] = {};
        if (typeof keyOrCallback === 'function') {
            this._listeners[event][event] = keyOrCallback;
        } else {
            this._listeners[event][keyOrCallback] = callback;
        }
    }

    off(event, key) {
        if (!this._listeners[event]) return;
        if (key) {
            delete this._listeners[event][key];
        } else {
            delete this._listeners[event];
        }
    }

    /**
     * Emit a socket event to the server.
     */
    emit(event, data, callback) {
        if (!this.socket?.connected) {
            console.warn('Cannot emit, socket not connected:', event);
            return false;
        }
        if (callback) {
            this.socket.emit(event, data, callback);
        } else {
            this.socket.emit(event, data);
        }
        return true;
    }

    /**
     * Emit a socket event and wait for the server callback (Promise).
     */
    emitWithAck(event, data) {
        return new Promise((resolve, reject) => {
            if (!this.socket?.connected) {
                reject(new Error('Socket not connected'));
                return;
            }
            this.socket.emit(event, data, resolve);
        });
    }

    /**
     * Manually set your status
     */
    setStatus(status) {
        this.emit('set_status', { status });
    }

    disconnect() {
        this._stopHeartbeat();
        if (this.socket) {
            this.socket.removeAllListeners();
            this.socket.disconnect();
            this.socket = null;
            this._isConnected = false;
            this._isRegistered = false;
        }
        this._listeners = {};
    }

    isConnected() {
        return this._isConnected;
    }

    isRegistered() {
        return this._isRegistered;
    }
}

export const socketService = new SocketService();
export default socketService;
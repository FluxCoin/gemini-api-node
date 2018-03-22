"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WS = require("ws");
const ramda_1 = require("ramda");
class WebsocketClient {
    constructor({ key, secret, sandbox = false }) {
        this.marketData = (symbols, handlers) => {
            const symbolList = Array.isArray(symbols) ? symbols : [symbols];
            return symbolList.map(symbol => {
                const socket = new WS(`${this.baseUrl}/v1/marketdata/${symbol}`);
                if (handlers.onOpen) {
                    handlers.onOpen.forEach(handler => {
                        socket.addEventListener(`open`, () => {
                            handler(symbol);
                        });
                    });
                }
                if (handlers.onMessage) {
                    handlers.onMessage.forEach(handler => {
                        socket.addEventListener("message", (msg) => {
                            const data = JSON.parse(msg.data);
                            handler(Object.assign({ symbol }, data));
                        });
                    });
                }
                ;
                return this.marketSocketObj({ symbol, socket, handlers });
            });
        };
        this.key = key;
        this.secret = secret;
        const subdomain = sandbox ? `api.sandbox` : `api`;
        this.baseUrl = `wss://${subdomain}.gemini.com`;
        this.hasCredentials = key && secret;
    }
    marketSocketObj({ symbol, socket, handlers, }) {
        const closeSocket = () => socket.close();
        const reconnectSocket = () => {
            closeSocket();
            return this.marketData(symbol, handlers)[0];
        };
        const onOpen = (handler) => {
            handlers.onOpen = handlers.onOpen || [];
            handlers.onOpen.push(handler);
            return socket.addEventListener("open", () => {
                handler(symbol);
            });
        };
        const onMessage = (handler) => {
            handlers.onMessage = handlers.onMessage || [];
            handlers.onMessage.push(handler);
            return socket.addEventListener("message", (msg) => {
                const data = JSON.parse(msg.data);
                handler(Object.assign({ symbol }, data));
            });
        };
        const removeMessageListener = (listener) => {
            handlers.onMessage = ramda_1.without([listener], handlers.onMessage || []);
            return socket.removeEventListener("message", listener);
        };
        const removeOpenListener = (listener) => {
            handlers.onOpen = ramda_1.without([listener], handlers.onOpen || []);
            return socket.removeEventListener("open", listener);
        };
        return {
            symbol,
            closeSocket,
            reconnectSocket,
            onOpen,
            onMessage,
            removeOpenListener,
            removeMessageListener,
        };
    }
}
exports.default = WebsocketClient;
//# sourceMappingURL=websocketClient.js.map
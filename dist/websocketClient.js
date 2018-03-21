"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
class WebsocketClient {
    constructor({ key, secret, sandbox = false }) {
        this.marketData = (symbols, handlers) => {
            const symbolList = Array.isArray(symbols) ? symbols : [symbols];
            return symbolList.map(symbol => {
                const socket = new WebSocket(`${this.baseUrl}/v1/marketdata/${symbol}`);
                socket.addEventListener(`open`, () => {
                    if (handlers.onOpen) {
                        handlers.onOpen(symbol);
                    }
                });
                socket.addEventListener("message", (msg) => {
                    if (handlers.onMessage) {
                        const data = JSON.parse(msg.data);
                        handlers.onMessage(Object.assign({ symbol }, data));
                    }
                });
                return { symbol, socket };
            });
        };
        this.key = key;
        this.secret = secret;
        const subdomain = sandbox ? `api.sandbox` : `api`;
        this.baseUrl = `wss://${subdomain}.gemini.com`;
        this.hasCredentials = key && secret;
    }
}
exports.default = WebsocketClient;
//# sourceMappingURL=websocketClient.js.map
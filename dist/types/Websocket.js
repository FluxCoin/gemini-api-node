"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isTradeUpdate(msg) {
    return msg.events[0].type === "trade";
}
exports.isTradeUpdate = isTradeUpdate;
function isChangeUpdate(msg) {
    return msg.events.length === 1 && msg.events[0].type === "change";
}
exports.isChangeUpdate = isChangeUpdate;
function isInitialUpdate(msg) {
    return msg.events.length > 1 && msg.events[0].type === "change";
}
exports.isInitialUpdate = isInitialUpdate;
//# sourceMappingURL=Websocket.js.map
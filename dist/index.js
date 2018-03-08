"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const noncense_1 = require("noncense");
const ramda_1 = require("ramda");
const shortid = require("shortid");
const createRequestConfig_1 = require("./createRequestConfig");
var websocketClient_1 = require("./websocketClient");
exports.WebsocketClient = websocketClient_1.default;
const nonce = noncense_1.default();
class GeminiAPI {
    constructor({ key, secret, sandbox = false }) {
        this.requestPublic = (endpoint, params = {}) => axios_1.default
            .get(`${this.baseUrl}/v1${endpoint}`, { params })
            .then(ramda_1.prop(`data`))
            .catch(err => {
            throw ramda_1.path(["response", "data"], err);
        });
        this.requestPrivate = (endpoint, params = {}) => {
            if (!this.key || !this.secret) {
                throw new Error(`API key and secret key required to use authenticated methods`);
            }
            const requestPath = `/v1${endpoint}`;
            const requestUrl = `${this.baseUrl}${requestPath}`;
            const payload = Object.assign({ nonce: nonce(), request: requestPath }, params);
            const config = createRequestConfig_1.default({
                payload,
                key: this.key,
                secret: this.secret,
            });
            return axios_1.default
                .post(requestUrl, {}, config)
                .then(ramda_1.prop(`data`))
                .catch(err => {
                throw ramda_1.path(["response", `data`], err);
            });
        };
        this.getAllSymbols = () => this.requestPublic(`/symbols`);
        this.getTicker = (symbol) => this.requestPublic(`/pubticker/${symbol}`);
        this.getOrderBook = (symbol, params) => this.requestPublic(`/book/${symbol}`, params);
        this.getTradeHistory = (symbol, params) => this.requestPublic(`/trades/${symbol}`, params);
        this.getCurrentAuction = (symbol) => this.requestPublic(`/auction/${symbol}`);
        this.getAuctionHistory = (symbol, params) => this.requestPublic(`/auction/${symbol}/history`, params);
        this.newOrder = (params) => this.requestPrivate(`/order/new`, Object.assign({ client_order_id: shortid(), type: `exchange limit` }, params));
        this.cancelOrder = (params) => this.requestPrivate(`/order/cancel`, params);
        this.cancelAllSessionOrders = () => this.requestPrivate(`/order/cancel/session`);
        this.cancelAllActiveOrders = () => this.requestPrivate(`/order/cancel/all`);
        this.getMyOrderStatus = (params) => this.requestPrivate(`/order/status`, params);
        this.getMyActiveOrders = () => this.requestPrivate(`/orders`);
        this.getMyPastTrades = (params) => this.requestPrivate(`/mytrades`, params);
        this.getMyTradeVolume = () => this.requestPrivate(`/tradevolume`);
        this.getMyAvailableBalances = () => this.requestPrivate(`/balances`);
        this.withdraw = (symbol, params) => this.requestPrivate(`/withdraw/${symbol}`, params);
        this.key = key;
        this.secret = secret;
        const subdomain = sandbox ? `api.sandbox` : `api`;
        this.baseUrl = `https://${subdomain}.gemini.com`;
    }
}
exports.default = GeminiAPI;
//# sourceMappingURL=index.js.map
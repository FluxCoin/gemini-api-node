import { Currency, Market } from "./types";
import * as Params from "./types/Params";
import { AccountBalancesEntry, AccountTradesEntry, AuctionHistoryEntry, AuctionState, OrderBook, OrderStatus, Ticker, Trade, TradeVolumeEntry, Withdrawal } from "./types/Responses";
export { default as WebsocketClient } from "./websocketClient";
export default class GeminiAPI {
    private key;
    private secret;
    private baseUrl;
    constructor({key, secret, sandbox}: Params.Constructor);
    requestPublic: (endpoint: string, params?: {}) => Promise<any>;
    requestPrivate: (endpoint: string, params?: {}) => Promise<any>;
    getAllSymbols: () => Promise<Market[]>;
    getTicker: (symbol: Market) => Promise<Ticker>;
    getOrderBook: (symbol: Market, params?: Params.OrderBook | undefined) => Promise<OrderBook>;
    getTradeHistory: (symbol: Market, params?: Params.TradeHistory | undefined) => Promise<Trade[]>;
    getCurrentAuction: (symbol: Market) => Promise<AuctionState>;
    getAuctionHistory: (symbol: Market, params?: Params.AuctionHistory | undefined) => Promise<AuctionHistoryEntry[]>;
    newOrder: (params: Params.NewOrder) => Promise<OrderStatus>;
    cancelOrder: (params: Params.CancelOrder) => Promise<OrderStatus>;
    cancelAllSessionOrders: () => Promise<{
        result: boolean;
    }>;
    cancelAllActiveOrders: () => Promise<{
        result: boolean;
    }>;
    getMyOrderStatus: (params: Params.OrderStatus) => Promise<OrderStatus>;
    getMyActiveOrders: () => Promise<OrderStatus[]>;
    getMyPastTrades: (params: Params.AccountPastTrades) => Promise<AccountTradesEntry[]>;
    getMyTradeVolume: () => Promise<TradeVolumeEntry[]>;
    getMyAvailableBalances: () => Promise<AccountBalancesEntry[]>;
    withdraw: (symbol: Currency, params: Params.Withdraw) => Promise<Withdrawal>;
}

import { Market, OrderExecutionOption, OrderSide, OrderType } from ".";
export interface Constructor {
    key: string;
    secret: string;
    sandbox?: boolean;
}
export interface CancelOrder {
    order_id: string;
}
export interface OrderStatus {
    order_id: string;
}
export interface NewOrder {
    client_order_id?: string;
    symbol: Market;
    amount: string;
    price: string;
    side: OrderSide;
    type: OrderType;
    options?: OrderExecutionOption;
}
export interface AuctionHistory {
    limit_auction_results: number;
    include_indicative: boolean;
    since: number;
}
export interface OrderBook {
    limit_asks?: number;
    limit_bids?: number;
}
export interface TradeHistory {
    timestamp?: number;
    limit_trades?: number;
    include_breaks?: number;
}
export interface AccountPastTrades {
    symbol: Market;
    limit_trades?: number;
    timestamp?: number;
}
export interface Withdraw {
    address: string;
    amount: string;
}

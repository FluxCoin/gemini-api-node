import { Currency, Market, OrderExecutionOption, OrderSide, OrderType } from ".";
export interface AuctionHistoryEntry {
    auction_id: number;
    auction_price: string;
    auction_quantity: string;
    eid: number;
    highest_bid_price: string;
    lowest_ask_price: string;
    collar_price: string;
    auction_result: string;
    timestamp: number;
    timestampms: number;
    event_type: string;
}
export declare type AuctionState = AuctionClosedState | AuctionOpenedState | AuctionIndicativePriceState;
export interface AuctionClosedState {
    closed_until_ms: number;
    last_auction_price: string;
    last_auction_quantity: string;
    last_highest_bid_price: string;
    last_lowest_ask_price: string;
    last_collar_price: string;
    next_auction_ms: number;
}
export interface AuctionOpenedState {
    last_auction_eid: number;
    last_auction_price: string;
    last_auction_quantity: string;
    last_highest_bid_price: string;
    last_lowest_ask_price: string;
    last_collar_price: string;
    next_auction_ms: number;
    next_update_ms: number;
}
export interface AuctionIndicativePriceState {
    last_auction_eid: number;
    most_recent_indicative_price: string;
    most_recent_indicative_quantity: string;
    most_recent_highest_bid_price: string;
    most_recent_lowest_ask_price: string;
    most_recent_collar_price: string;
    next_auction_ms: number;
    next_update_ms: number;
}
export interface AccountBalancesEntry {
    currency: Currency;
    amount: string;
    available: string;
    availableForWithdrawal: string;
}
export interface AccountTradesEntry {
    price: string;
    amount: string;
    timestamp: number;
    timestampms: number;
    type: string;
    aggressor: boolean;
    fee_currency: Currency;
    fee_amount: string;
    tid: number;
    order_id: string;
    exchange: string;
    is_auction_fill: boolean;
    break?: boolean;
}
export interface TradeVolumeEntry {
    account_id: string;
    symbol: Market;
    base_currency: Currency;
    notional_currency: Currency;
    data_date: string;
    total_volume_base: string;
    maker_buy_sell_ratio: string;
    buy_maker_base: string;
    buy_maker_notional: string;
    buy_maker_count: string;
    sell_maker_base: string;
    sell_maker_notional: string;
    sell_maker_count: string;
    buy_taker_base: string;
    buy_taker_notional: string;
    buy_taker_count: string;
    sell_taker_base: string;
    sell_taker_notional: string;
    sell_taker_count: string;
}
export interface Trade {
    timestamp: number;
    timestampms: number;
    tid: number;
    price: string;
    amount: string;
    exchange: string;
    type: string;
    broken: boolean;
}
export interface Ticker {
    ask: string;
    bid: string;
    last: string;
    volume: {
        BTC?: string;
        ETH?: string;
        USD?: string;
        timestamp: number;
    };
}
export interface OrderStatus {
    order_id: string;
    client_order_id: string;
    symbol: Market;
    price: string;
    avg_execution_price: string;
    side: OrderSide;
    type: OrderType;
    timestamp: string;
    timestampms: number;
    is_live: boolean;
    is_cancelled: boolean;
    options: OrderExecutionOption[];
    executed_amount: string;
    remaining_amount: string;
    original_amount: string;
}
export interface OrderBookEntry {
    price: string;
    amount: string;
}
export interface OrderBook {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
}
export interface Withdrawal {
    destination: string;
    amount: string;
    txHash: string;
}

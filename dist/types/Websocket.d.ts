import { Market } from ".";
export interface MessageEvent {
    target: WebSocket;
    type: "message";
    binary: boolean;
    data: any;
}
export interface MarketHandlerMap {
    onOpen?: (symbol: Market) => void;
    onMessage?: (data: MarketDataEvent) => void;
}
export declare type MarketDataEvent = MarketDataChangeEvent | MarketDataTradeEvent;
export interface MarketDataChangeEvent {
    type: "change";
    side: "ask" | "bid";
    price: string;
    remaining: string;
    delta: string;
    reason: "place" | "trade" | "cancel" | "initial";
}
export interface MarketDataTradeEvent {
    type: "trade";
    tid: number;
    price: string;
    amount: string;
    makerSide: "ask" | "bid" | "auction";
}
export interface MarketDataUpdate {
    type: "update";
    symbol: Market;
    eventId: number;
    timestamp: number;
    timestampms: number;
    socket_sequence: number;
    events: MarketDataEvent[];
}

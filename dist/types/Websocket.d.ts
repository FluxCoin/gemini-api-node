import { Market } from ".";
export interface MessageEvent {
    target: WebSocket;
    type: "message";
    binary: boolean;
    data: any;
}
export interface MarketHandlerMap {
    onOpen?: (symbol: Market) => void;
    onMessage?: (data: Update) => void;
}
export declare type Event = ChangeEvent | TradeEvent;
export interface ChangeEvent {
    type: "change";
    side: "ask" | "bid";
    price: string;
    remaining: string;
    delta: string;
    reason: "place" | "trade" | "cancel" | "initial";
}
export interface TradeEvent {
    type: "trade";
    tid: number;
    price: string;
    amount: string;
    makerSide: "ask" | "bid" | "auction";
}
export interface Update {
    type: "update";
    symbol: Market;
    eventId: number;
    timestamp: number;
    timestampms: number;
    socket_sequence: number;
    events: ChangeEvent[] | [TradeEvent, ChangeEvent] | [ChangeEvent];
}

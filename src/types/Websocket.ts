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

export type Update = InitialUpdate | TradeUpdate | ChangeUpdate;

export interface BaseUpdate {
  type: "update";
  symbol: Market;
  eventId: number;
  timestamp: number;
  timestampms: number;
  socket_sequence: number;
  events: ChangeEvent[] | [TradeEvent, ChangeEvent] | [ChangeEvent];
}

export interface InitialUpdate extends BaseUpdate {
  events: ChangeEvent[];
}

export interface TradeUpdate extends BaseUpdate {
  events: [TradeEvent, ChangeEvent];
}

export interface ChangeUpdate extends BaseUpdate {
  events: [ChangeEvent];
}

export function isTradeUpdate(msg: Update): msg is TradeUpdate {
  return msg.events[0].type === "trade";
}

export function isChangeUpdate(msg: Update): msg is ChangeUpdate {
  return msg.events.length === 1 && msg.events[0].type === "change";
}

export function isInitialUpdate(msg: Update): msg is InitialUpdate {
  return msg.events.length > 1 && msg.events[0].type === "change";
}

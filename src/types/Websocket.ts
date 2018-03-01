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

export type MarketDataEvent = MarketDataChangeEvent | MarketDataTradeEvent;

export interface MarketDataChangeEvent {
  symbol: Market;
  type: "change";
  side: "ask" | "bid";
  price: string;
  remaining: string;
  delta: string;
  reason: "place" | "trade" | "cancel" | "initial";
}

export interface MarketDataTradeEvent {
  symbol: Market;
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

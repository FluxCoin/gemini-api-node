import * as WS from 'ws';

import { Market } from ".";
export interface MessageEvent {
  target: WebSocket;
  type: "message";
  binary: boolean;
  data: any;
}

export type OnOpenHandler = (symbol: Market) => void;
export type OnMessageHandler = (data: Update) => void;
export type OnCloseHandler = OnOpenHandler;

export interface MarketHandlerMap {
  onOpen?: OnOpenHandler[];
  onMessage?: OnMessageHandler[];
  onClose?: OnCloseHandler[];
}

export interface MarketSocketParams {
  symbol: Market;
  socket: WS;
  handlers: MarketHandlerMap;
}

export interface MarketSocketObj {
  closeSocket: () => void;
  reconnectSocket: () => MarketSocketObj;
  onOpen: (handler: (symbol: Market) => void) => void;
  onClose: (handler: (symbol: Market) => void) => void;
  onMessage: (handler: (data: Update) => void) => void;
  removeOpenListener: (listener: (...args: any[]) => void) => void;
  removeCloseListener: (listener: (...args: any[]) => void) => void;
  removeMessageListener: (listener: (...args: any[]) => void) => void;
  symbol: Market;
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

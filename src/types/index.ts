export type Currency = "BTC" | "ETH" | "USD";
export type Market = "btcusd" | "ethusd" | "ethbtc";

export type OrderSide = "buy" | "sell";
export type OrderType = "exchange limit";
export type OrderExecutionOption = "maker-or-cancel" | "immediate-or-cancel" | "auction-only";

import * as Params from "./Params";
import * as Responses from "./Responses";
import * as Websocket from "./Websocket";
export {Params, Responses, Websocket};

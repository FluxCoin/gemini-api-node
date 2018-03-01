export declare type Currency = "BTC" | "ETH" | "USD";
export declare type Market = "btcusd" | "ethusd" | "ethbtc";
export declare type OrderSide = "buy" | "sell";
export declare type OrderType = "exchange limit";
export declare type OrderExecutionOption = "maker-or-cancel" | "immediate-or-cancel" | "auction-only";
import * as Params from "./Params";
import * as Responses from "./Responses";
import * as Websocket from "./Websocket";
export { Params, Responses, Websocket };

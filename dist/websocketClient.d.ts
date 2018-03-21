/// <reference types="ws" />
import * as WebSocket from "ws";
import { Market } from "./types";
import * as Params from "./types/Params";
import { MarketHandlerMap } from "./types/Websocket";
export default class WebsocketClient {
    key: string;
    secret: string;
    baseUrl: string;
    hasCredentials: string;
    orderUrl: string;
    orderSocket: any;
    marketSocket: any;
    constructor({key, secret, sandbox}: Params.Constructor);
    marketData: (symbols: "btcusd" | "ethusd" | "ethbtc" | Market[], handlers: MarketHandlerMap) => {
        symbol: Market;
        socket: WebSocket;
    }[];
}

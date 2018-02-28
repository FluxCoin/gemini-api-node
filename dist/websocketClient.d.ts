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
    marketData: (symbols: "btcusd" | "ethusd" | "ethbtc" | Market[], handlers: MarketHandlerMap) => void;
}

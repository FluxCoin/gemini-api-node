import * as WebSocket from "ws";
import { Market } from "./types";
import * as Params from "./types/Params";
import { MarketHandlerMap, MessageEvent } from "./types/Websocket";

export default class WebsocketClient {
  public key: string;
  public secret: string;
  public baseUrl: string;
  public hasCredentials: string;
  public orderUrl: string;
  public orderSocket: any;
  public marketSocket: any;
  constructor({ key, secret, sandbox = false }: Params.Constructor) {
    this.key = key;
    this.secret = secret;
    const subdomain = sandbox ? `api.sandbox` : `api`;
    this.baseUrl = `wss://${subdomain}.gemini.com`;
    this.hasCredentials = key && secret;
  }

  // public orderEvents = (handlers: HandlerMap) => {
  //   if (this.hasCredentials) {
  //     const requestPath = `/v1/order/events`;
  //     this.orderUrl = `${this.baseUrl}${requestPath}`;
  //     this.orderSocket = new WebSocket(this.orderUrl, createRequestConfig({
  //       key: this.key,
  //       secret: this.secret,
  //       payload: {
  //         nonce: Date.now(),
  //         request: requestPath,
  //       },
  //     }));
  //     this.orderSocket.addEventListener(`open`, () => {
  //       console.log(`Connected to order events WebSocket API.`);
  //       if (handlers.onOpen) { handlers.onOpen(); }
  //     });
  //   }
  // }

  public marketData = (symbols: Market | Market[], handlers: MarketHandlerMap) => {
    const symbolList = Array.isArray(symbols) ? symbols : [symbols];
    symbolList.forEach(symbol => {
      const socket = new WebSocket(`${this.baseUrl}/v1/marketdata/${symbol}`);
      socket.addEventListener(`open`, () => {
        if (handlers.onOpen) { handlers.onOpen(symbol); }
      });

      socket.addEventListener("message", (msg: any) => {
        if (handlers.onMessage) {
          const data = JSON.parse((msg as MessageEvent).data);
          handlers.onMessage({
            symbol,
            ...data,
          });
        }
      });
    });
  }
}

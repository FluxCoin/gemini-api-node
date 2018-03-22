import * as WS from "ws";
import { Market } from "./types";
import * as Params from "./types/Params";
import {
  MarketHandlerMap,
  MessageEvent,
  OnOpenHandler,
  OnMessageHandler,
  MarketSocketParams,
  MarketSocketObj,
  OnCloseHandler,
} from "./types/Websocket";
import { without } from "ramda";

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
  //     this.orderSocket = new WS(this.orderUrl, createRequestConfig({
  //       key: this.key,
  //       secret: this.secret,
  //       payload: {
  //         nonce: Date.now(),
  //         request: requestPath,
  //       },
  //     }));
  //     this.orderSocket.addEventListener(`open`, () => {
  //       console.log(`Connected to order events WS API.`);
  //       if (handlers.onOpen) { handlers.onOpen(); }
  //     });
  //   }
  // }

  public marketData = (
    symbols: Market | Market[],
    handlers: MarketHandlerMap,
  ) => {
    const symbolList = Array.isArray(symbols) ? symbols : [symbols];
    return symbolList.map(symbol => {
      const socket = new WS(`${this.baseUrl}/v1/marketdata/${symbol}`);
      if (handlers.onOpen) {
        handlers.onOpen.forEach(handler => {
          socket.addEventListener(`open`, () => {
            handler(symbol);
          });
        })
      }

      if (handlers.onClose) {
        handlers.onClose.forEach(handler => {
          socket.addEventListener(`close`, () => {
            handler(symbol);
          });
        })
      }

      if (handlers.onMessage) {
        handlers.onMessage.forEach(handler => {
          socket.addEventListener("message", (msg: any) => {
            const data = JSON.parse((msg as MessageEvent).data);
            handler({
              symbol,
              ...data,
            });
          })
        });
      };
      return this.marketSocketObj({ symbol, socket, handlers });
    });
  };

  private marketSocketObj({
    symbol,
    socket,
    handlers,
  }: MarketSocketParams): MarketSocketObj {
    const closeSocket = () => socket.close();
    const reconnectSocket = () => {
      closeSocket();
      return this.marketData(symbol, handlers)[0];
    };

    const onOpen = (handler: OnOpenHandler) => {
      handlers.onOpen = handlers.onOpen || [];
      handlers.onOpen.push(handler);
      return socket.addEventListener("open", () => {
        handler(symbol);
      });
    }

    const onClose = (handler: OnCloseHandler) => {
      handlers.onClose = handlers.onClose || [];
      handlers.onClose.push(handler);
      return socket.addEventListener("close", () => {
        handler(symbol);
      });
    }

    const onMessage = (handler: OnMessageHandler) => {
      handlers.onMessage = handlers.onMessage || [];
      handlers.onMessage.push(handler);
      return socket.addEventListener("message", (msg: any) => {
        const data = JSON.parse((msg as MessageEvent).data);
        handler({
          symbol,
          ...data,
        });
      });
    }

    const removeMessageListener = (listener: (...args: any[]) => void) => {
      handlers.onMessage = without([listener], handlers.onMessage || []);
      return socket.removeEventListener("message", listener);
    }

    const removeOpenListener = (listener: (...args: any[]) => void) => {
      handlers.onOpen = without([listener], handlers.onOpen || []);
      return socket.removeEventListener("open", listener);
    }
    
    const removeCloseListener = (listener: (...args: any[]) => void) => {
      handlers.onClose = without([listener], handlers.onClose || []);
      return socket.removeEventListener("close", listener);
    }

    return {
      symbol,
      closeSocket,
      reconnectSocket,
      onOpen,
      onClose,
      onMessage,
      removeOpenListener,
      removeMessageListener,
      removeCloseListener,
    };
  }
}

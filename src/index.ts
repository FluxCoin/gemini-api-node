import axios from "axios";
import Nonce from "nonce-ts";
import { path, prop } from "ramda";
import * as shortid from "shortid";
import createRequestConfig from "./createRequestConfig";
import { Currency, Market } from "./types";
import * as Params from "./types/Params";
import {
  AccountBalancesEntry,
  AccountTradesEntry,
  AuctionHistoryEntry,
  AuctionState,
  OrderBook,
  OrderStatus,
  Ticker,
  Trade,
  TradeVolumeEntry,
  Withdrawal,
} from "./types/Responses";
export { default as WebsocketClient } from "./websocketClient";

export default class GeminiAPI {
  private key: string;
  private secret: string;
  private baseUrl: string;

  constructor({ key, secret, sandbox = false }: Params.Constructor) {
    this.key = key;
    this.secret = secret;
    const subdomain = sandbox ? `api.sandbox` : `api`;
    this.baseUrl = `https://${subdomain}.gemini.com`;
  }

  public requestPublic = (endpoint: string, params = {}) =>
    axios
      .get(`${this.baseUrl}/v1${endpoint}`, { params })
      .then(prop(`data`))
      .catch(err => {
        throw path(["response", "data"], err);
      })

  public requestPrivate = (endpoint: string, params = {}) => {
    if (!this.key || !this.secret) {
      throw new Error(
        `API key and secret key required to use authenticated methods`,
      );
    }

    const requestPath = `/v1${endpoint}`;
    const requestUrl = `${this.baseUrl}${requestPath}`;

    const nonce = Nonce(15);
    const payload = {
      nonce: nonce(),
      request: requestPath,
      ...params,
    };

    const config = createRequestConfig({
      payload,
      key: this.key,
      secret: this.secret,
    });

    return axios
      .post(requestUrl, {}, config)
      .then(prop(`data`))
      .catch(err => {
        throw path(["response", `data`], err);
      });
  }

  // Public API
  public getAllSymbols = (): Promise<Market[]> =>
    this.requestPublic(`/symbols`)

  public getTicker = (symbol: Market): Promise<Ticker> =>
    this.requestPublic(`/pubticker/${symbol}`)

  public getOrderBook = (
    symbol: Market,
    params?: Params.OrderBook,
  ): Promise<OrderBook> => this.requestPublic(`/book/${symbol}`, params)

  public getTradeHistory = (
    symbol: Market,
    params?: Params.TradeHistory,
  ): Promise<Trade[]> => this.requestPublic(`/trades/${symbol}`, params)

  public getCurrentAuction = (symbol: Market): Promise<AuctionState> =>
    this.requestPublic(`/auction/${symbol}`)

  public getAuctionHistory = (
    symbol: Market,
    params?: Params.AuctionHistory,
  ): Promise<AuctionHistoryEntry[]> =>
    this.requestPublic(`/auction/${symbol}/history`, params)

  // Order Placement API
  public newOrder = (params: Params.NewOrder): Promise<OrderStatus> =>
    this.requestPrivate(`/order/new`, {
      client_order_id: shortid(),
      type: `exchange limit`,
      ...params,
    })

  public cancelOrder = (params: Params.CancelOrder): Promise<OrderStatus> =>
    this.requestPrivate(`/order/cancel`, params)

  public cancelAllSessionOrders = (): Promise<{ result: boolean }> =>
    this.requestPrivate(`/order/cancel/session`)

  public cancelAllActiveOrders = (): Promise<{ result: boolean }> =>
    this.requestPrivate(`/order/cancel/all`)

  // Order Status API
  public getMyOrderStatus = (
    params: Params.OrderStatus,
  ): Promise<OrderStatus> => this.requestPrivate(`/order/status`, params)

  public getMyActiveOrders = (): Promise<OrderStatus[]> =>
    this.requestPrivate(`/orders`)

  public getMyPastTrades = (
    params: Params.AccountPastTrades,
  ): Promise<AccountTradesEntry[]> => this.requestPrivate(`/mytrades`, params)

  public getMyTradeVolume = (): Promise<TradeVolumeEntry[]> =>
    this.requestPrivate(`/tradevolume`)

  // Fund Management API
  public getMyAvailableBalances = (): Promise<AccountBalancesEntry[]> =>
    this.requestPrivate(`/balances`)

  public withdraw = (
    symbol: Currency,
    params: Params.Withdraw,
  ): Promise<Withdrawal> => this.requestPrivate(`/withdraw/${symbol}`, params)
}

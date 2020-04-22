import axios from 'axios'
import { Base64 } from 'js-base64'
import { AxiosInstance } from 'axios'

import Config from './config/Config'
import IConfig from './config/IConfig'
import AuthRequest from './api-request/AuthRequest'
import CartContentRequest from './api-request/CartRequest'
import CategoriesRequest from './api-request/CategoriesRequest'
import LayoutsRequest from './api-request/LayoutsRequest'
import ProductsRequest from './api-request/ProductsRequest'
import PagesRequest from './api-request/PagesRequest'
import OrdersRequest from './api-request/OrdersRequest'
import SettlementsRequest from './api-request/SettlementsRequest'
import WishlistRequest from './api-request/WishlistRequest'
import ProfileRequest from './api-request/ProfileRequest'
import SettingsRequest from './api-request/SettingsRequest'
import TestimonialsRequest from './api-request/TestimonialsRequest'
import VendorsRequest from './api-request/VendorsRequest'
import NotificationRequest from './api-request/NotificationRequest'

class CsCartApiSdk {
  protected config: Config;
  protected client: AxiosInstance;

  constructor(config: IConfig) {
    this.config = new Config(config);
    this.client = axios.create({
      baseURL: this.config.apiUrl,
      timeout: this.config.timeout ? this.config.timeout : 8000,
      headers: {
        'Cache-Control': 'no-cache',
        'Storefront-Api-Access-Key': this.config.apiKey,
      },
    });

    this.client.interceptors.request.use(conf => {
      const newConf = { ...conf };

      newConf.headers.common['Storefront-Api-Access-Key'] = this.config.apiKey;
      newConf.headers.common['Cache-Control'] = 'no-cache';

      newConf.params = {
        ...newConf.params,
        client: this.config.client,
      }

      if (this.config.userToken) {
        newConf.headers.common.Authorization = `Basic ${Base64.encode(this.config.userToken)}:`;
      }

      return newConf
    });
  }

  get products() {
    return new ProductsRequest(
      this.client,
      this.config
    )
  }

  get pages() {
    return new PagesRequest(
      this.client,
      this.config
    )
  }

  get categories() {
    return new CategoriesRequest(
      this.client,
      this.config
    )
  }

  get auth() {
    return new AuthRequest(
      this.client,
      this.config
    )
  }

  get layouts() {
    return new LayoutsRequest(
      this.client,
      this.config
    )
  }

  get orders() {
    return new OrdersRequest(
      this.client,
      this.config
    )
  }

  get settlements() {
    return new SettlementsRequest(
      this.client,
      this.config
    )
  }

  get cart() {
    return new CartContentRequest(
      this.client,
      this.config
    )
  }

  get wishlist() {
    return new WishlistRequest(
      this.client,
      this.config
    )
  }

  get profile() {
    return new ProfileRequest(
      this.client,
      this.config
    )
  }

  get settings() {
    return new SettingsRequest(
      this.client,
      this.config
    )
  }

  get testimonials() {
    return new TestimonialsRequest(
      this.client,
      this.config
    )
  }

  get vendors() {
    return new VendorsRequest(
      this.client,
      this.config
    )
  }

  get notifications() {
    return new NotificationRequest(
      this.client,
      this.config
    )
  }

  public getConfig(): IConfig {
    return this.config
  }

  public getClient(): AxiosInstance {
    return this.client
  }

  public setLanguage(language: string): void {
    this.config.language = language;
  }

  public setClientId(id: string): void {
    this.config.client = id;
  }

  public setUserToken(token: string): void {
    this.config.userToken = token;
  }
}

declare let global: any
global.CsCartApiSdk = CsCartApiSdk;

export default CsCartApiSdk

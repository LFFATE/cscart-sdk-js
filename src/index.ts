import { IConfig } from './config/IConfig'
import axios from 'axios'
import { Base64 } from 'js-base64'
import { AxiosInstance } from 'axios'
import ApiRequest from './api-request/ApiRequest'

class CsCartApiSdk {
  protected config: IConfig;
  protected client: AxiosInstance; // todo adapter

  constructor(config: IConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: this.config.apiUrl,
      timeout: 15000,
      headers: {
        'Cache-Control': 'no-cache',
        'Storefront-Api-Access-Key': this.config.apiKey,
      },
    });

    this.client.interceptors.request.use((conf) => {
      const newConf = { ...conf };

      newConf.headers.common['Storefront-Api-Access-Key'] = this.config.apiKey;
      newConf.headers.common['Cache-Control'] = 'no-cache';

      newConf.params = {
        ...this.client.defaults.params,
        // currency: state.cart.currency,
        language:   this.config.language,
        sl:         this.config.language,
        lang_code:  this.config.language,
      }

      if (this.config.userToken) {
        newConf.headers.common.Authorization = `Basic ${Base64.encode(this.config.userToken)}:`;
      }

      // if (endsWith(conf.url, '/sra_cart_content/')) {
      //   newConf.params.coupon_codes = state.cart.coupons;
      // }

      return newConf;
    });
  }

  // Rests
  get products() {
    return this.getNewApiRequest('sra_products')
  }

  get categories() {
    return this.getNewApiRequest('sra_categories')
  }

  get auth() {
    return this.getNewApiRequest('auth_tokens')
  }
  //---

  private getNewApiRequest(type: string) {
    return new ApiRequest({
      requestUrl: this.config.apiUrl + type + '/',
      entity: type,
      client: this.client
    },
      this.config
    );
  }

  public getConfig(): IConfig {
    return this.config
  }

  public setLanguage(language: string): void {
    this.config.language = language;
  }
}

declare let global: any
global.CsCartApiSdk = CsCartApiSdk;
export default CsCartApiSdk

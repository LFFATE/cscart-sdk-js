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
      timeout: 8000,
      headers: {
        'Cache-Control': 'no-cache',
        'Storefront-Api-Access-Key': this.config.apiKey,
      },
    });

    this.client.interceptors.request.use((conf) => {
      const newConf = { ...conf };

      newConf.headers.common['Storefront-Api-Access-Key'] = this.config.apiKey;
      newConf.headers.common['Cache-Control'] = 'no-cache';

      if (this.config.userToken) {
        newConf.headers.common.Authorization = `Basic ${Base64.encode(this.config.userToken)}:`;
      }

      return newConf;
    });
  }

  // Rests
  get products() {
    return this.getNewApiRequest('products')
  }

  get categories() {
    return this.getNewApiRequest('categories')
  }

  get auth() {
    return this.getNewApiRequest('auth_tokens')
  }

  get layouts() {
    return this.getNewApiRequest('bm_layouts')
  }
  //---

  private getNewApiRequest(type: string) {
    return new Proxy(
      new ApiRequest({
        entity: type,
        client: this.client
      },
        this.config
      ),
      proxyResolver
    );
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
}

declare let global: any
global.CsCartApiSdk = CsCartApiSdk;

const proxyResolver = {
  get(target: any, name: string) {

    return target[name] || target.handler[name] || undefined
  },
};

export default CsCartApiSdk

import { camelCase, upperFirst } from 'lodash'

import { IConfig } from '../config/IConfig'
import { IApiRequestConfig } from './IApiRequestConfig'

export default class AbstractRequest {
  protected requestUrl: string;
  protected entity: string;
  protected client: any;
  protected handlerParams: any;
  protected params: any;
  protected config: IConfig;
  protected prefix: string;

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    this.client         = params.client;
    this.config         = config;
    this.handlerParams  = handlerParams;
  }

  protected buildUrl(): string {
    return this.config.apiUrl + (this.prefix + this.entity) + '/'
  }

  protected setParams(): void {
  }

  public get() {
    this.setParams()

    return this.client.get(
      this.buildUrl(),
      {
        params: this.params
      }
    )
  }
}

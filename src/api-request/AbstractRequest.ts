import { camelCase, upperFirst } from 'lodash'
import * as qs from 'qs'

import { IConfig } from '../config/IConfig'
import { IApiRequestConfig } from './IApiRequestConfig'

export default abstract class AbstractRequest {
  abstract entityPath: string;
  abstract prefix: string;
  protected requestUrl: string;
  protected client: any;
  protected handlerParams: any;
  protected params: any;
  protected config: IConfig;

  protected constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    this.client         = params.client;
    this.config         = config;
    this.handlerParams  = handlerParams;
  }

  protected buildUrl(): string {
    return this.config.apiUrl + (this.prefix ? this.prefix : '') + this.entityPath + '/'
  }

  protected setParams(): void {
  }

  public get() {
    this.setParams()

    return this.client.get(
      this.buildUrl(),
      {
        params: {
          ...this.params
        },
        paramsSerializer: (params: any) => {
          return qs.stringify(params)
        }
      }
    )
  }

  public post(data: any = {}) {
    this.setParams()

    return this.client.post(
      this.buildUrl(),
      data
    )
  }

  public delete() {
    this.setParams()

    return this.client.delete(
      this.buildUrl()
    )
  }
}

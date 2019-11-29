import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'
import { stringify } from 'querystring';

export default class SettlementsRequest extends AbstractRequest {
  entityPath: string = 'settlements';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  protected buildUrl(): string {
    let url = super.buildUrl();
    url = url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '');

    return url
  }

  getForm(orderId: number) {
    this.entityPath       = 'order_payment';
    this.setParams()

    return this.client.get(
      this.buildUrl() + orderId,
      {
        params: {
          ...this.params
        },
        paramsSerializer: (params: any) => {
          return stringify(params)
        }
      }
    )
  }

  hookUrl(url: string) {
    return this.client.get(url)
  }

  public create(data: INewSettlement) {
    const {
      orderId,
      repay,
      ...rest
    } = data;

    return this.post({
      order_id: orderId,
      repay: typeof repay !== 'undefined' ? repay : false,
      ...rest,
    })
  }

  protected setParams(): void {
    this.params = {
      ...this.params,
      language:   this.config.language,
      sl:         this.config.language,
      lang_code:  this.config.language,
    }
  }
}

interface INewSettlement {
  orderId: number;
  repay?: boolean;

  [others: string]: any;
}

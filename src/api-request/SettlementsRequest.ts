import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class SettlementsRequest extends AbstractRequest {
  entityPath: string = 'settlements';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
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

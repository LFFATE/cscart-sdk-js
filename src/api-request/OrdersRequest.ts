import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class OrdersRequest extends AbstractRequest {
  entityPath: string = 'orders';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  public create(order: INewOrder) {
    let products = {};

    order.products.map((product: any) => {
      products = {
        ...products,
        [product.cart_id]: product,
      }
    })

    return this.post({
      products,
      shipping_ids: order.shippingIds,
      payment_id: order.paymentId,
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

interface INewOrder {
  products: Array<any>,
  shippingIds: Array<number>,
  paymentId: number,
}

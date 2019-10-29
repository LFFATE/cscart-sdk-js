import forOwn from 'lodash/forOwn'
import snakeCase from 'lodash/snakeCase'

import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class OrdersRequest extends AbstractRequest {
  entityPath: string = 'orders';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  protected buildUrl(): string {
    let url = super.buildUrl();
    url = url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '');

    return url
  }

  public get() {
    this.params = {
      ...this.params,
      get_orders_data: true,
    }

    return super.get()
  }

  public create(order: INewOrder) {
    let productsObject = {};

    order.products.map((product: any) => {
      productsObject = {
        ...productsObject,
        [product.cart_id]: product,
      }
    })

    const {
      products,
      shippingIds,
      paymentId,
      userData,
      paymentInfo,
      ...rest
    } = order;

    return this.post({
      products: productsObject,
      shipping_ids: shippingIds,
      payment_id: paymentId,
      user_data: userData,
      payment_info:
        forOwn(paymentInfo, (value, key) => {
          delete paymentInfo[key]

          paymentInfo[snakeCase(key)] = value;
        })
      ,
      ...rest
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
  products: Array<any>;
  shippingIds: Array<number>;
  paymentId: number;
  userData?: any;
  paymentInfo: any;

  [others: string]: any;
}

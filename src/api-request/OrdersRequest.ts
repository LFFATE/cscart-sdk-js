import { AxiosInstance } from 'axios'
import forOwn from 'lodash/forOwn'
import snakeCase from 'lodash/snakeCase'

import Config from '../config/Config'
import AbstractRequest from './AbstractRequest'

export default class OrdersRequest extends AbstractRequest {
  entityPath: string = 'orders';
  prefix: string = 'sra_'
  handlerParams: any;
  params: any;

  constructor(client: AxiosInstance, config: Config) {
    super(client, config)
    this.handlerParams = {};
    this.params = {};
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
      get_children_orders_data: true,
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

    if (this.handlerParams.orderBy) {
      this.params.sort_by = this.handlerParams.orderBy;
    }

    if (this.handlerParams.order) {
      this.params.sort_order = this.handlerParams.order;
    }
  }
}

interface INewOrder {
  products: Array<any>;
  shippingIds: Array<number>;
  paymentId: number;
  userData?: any;
  paymentInfo?: any;

  [others: string]: any;
}

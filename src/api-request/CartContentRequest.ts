import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class CartContentRequest extends AbstractRequest {
  entityPath: string = 'cart_content'
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  public withShippings(ids?: Array<number>) {
    this.params = {
      ...this.params,
      calculate_shipping: 'A',
    }

    if (ids && ids.length) {
      this.params = {
        ...this.params,
        shipping_ids: ids,
      }
    }

    return this
  }

  protected buildUrl(): string {
    let url = super.buildUrl()
    url = url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '');

    return url
  }

  public add(products: IAddToCartProduct | Array<IAddToCartProduct>): void {
    let requestProducts: any = {};

    if (Array.isArray(products)) {
      products.map((product: any) => {
        requestProducts[product.product_id] = {...product};
      })
    } else {
      requestProducts = {
        [products.product_id]: {...products}
      };
    }

    return this.post({
      products: requestProducts
    })
  }

  public saveUserData(userData: any): void {
    return this.put({
      user_data: userData
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

interface IAddToCartProduct {
  product_id: number;
  amount: number;
  product_options: Array<any>;
}

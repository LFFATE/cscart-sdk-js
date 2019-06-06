import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class CartContentRequest extends AbstractRequest {
  entityPath: string = 'cart_content'
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  public withShippings() {
    this.params = {
      ...this.params,
      calculate_shipping: 'A',
    }

    return this
  }

  public add(product: IAddToCartProduct) {
    return this.post({
      products: {
        [product.product_id]: product
      }
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

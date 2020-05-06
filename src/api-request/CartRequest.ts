import { AxiosInstance } from 'axios'
import mapValues from 'lodash/mapValues'
import keyBy from 'lodash/keyBy'

import Config from '../config/Config'
import AbstractRequest from './AbstractRequest'

class CartRequest extends AbstractRequest {
  entityPath: string = 'cart_content'
  prefix: string = 'sra_'
  handlerParams: any;
  params: any;

  constructor(client: AxiosInstance, config: Config) {
    super(client, config)
    this.handlerParams = {};
    this.params = {};
  }

  withShippings(ids?: Array<number>) {
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

  add(products: IAddToCartProduct | Array<IAddToCartProduct>) {
    let requestProducts: any = {};

    if (Array.isArray(products)) {
      products.map((product: any) => {
        if (product.product_options && product.product_options.length) {
          product.product_options = mapValues(keyBy(product.product_options, 'id'), 'value')
        }
        requestProducts[product.product_id] = {...product};
      })
    } else {
      requestProducts = {
        [products.product_id]: {
          ...products,
          product_options: products.product_options ? mapValues(keyBy(products.product_options, 'id'), 'value') : undefined,
        }
      };
    }

    return this.post({
      products: requestProducts
    })
  }

  update(product: any) {
    return this.put({
      ...product,
      product_options: product.product_options ? mapValues(keyBy(product.product_options, 'id'), 'value') : undefined,
    })
  }

  saveUserData(userData: any) {
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
  product_options?: Array<{
    id:     number;
    value:  any;
  }>;
}

export default CartRequest

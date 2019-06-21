import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class WishlistRequest extends AbstractRequest {
  entityPath: string = 'wish_list'
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  protected buildUrl(): string {
    let url = super.buildUrl();
    url = url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '');

    return url
  }

  public add(products: IAddToWishlistProduct): void;
  public add(products: Array<IAddToWishlistProduct>): void;

  public add(products: IAddToWishlistProduct | Array<IAddToWishlistProduct>): void {
    let requestProducts: any = {};

    if (Array.isArray(products)) {
      products.map((product: any) => {
        requestProducts[product.product_id] = {
          ...product,
          amount: 1, // api bug - Do not remove
        };
      })
    } else {
      requestProducts = {
        [products.product_id]: {
          ...products,
          amount: 1, // api bug - Do not remove
        }
      };
    }

    return this.post({
      products: requestProducts
    })
  }

  public remove(): void {
    return this.delete()
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

interface IAddToWishlistProduct {
  product_id: number;
  product_options?: Array<any>;
}

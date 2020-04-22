import { AxiosInstance } from 'axios'

import Config from '../config/Config'
import AbstractRequest from './AbstractRequest'

export default class WishlistRequest extends AbstractRequest {
  entityPath: string = 'wish_list';
  prefix: string = 'sra_';
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

  public add(products: IAddToWishlistProduct): any;
  public add(products: Array<IAddToWishlistProduct>): any;

  public add(products: IAddToWishlistProduct | Array<IAddToWishlistProduct>) {
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

  public remove() {
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

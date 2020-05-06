import { AxiosInstance } from 'axios'
import Config from '../config/Config'
import AbstractRequest from './AbstractRequest'

export default class ProductsRequest extends AbstractRequest {
  entityPath: string = 'products';
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

  forOptions(options: Array<selectedOption>) {
    let selected_options: any = {};

    options.forEach(option =>
      selected_options[option.optionId] = option.value
    );

    this.params.selected_options = selected_options

    return this
  }

  forCategory(categoryId: number) {
    this.params.filter    = 'Y';
    this.params.cid       = categoryId;

    return this
  }

  vendorProducts(productId: number): ProductsRequest {
    this.params.vendor_products_by_product_id = productId;

    return this
  }

  withFilters(appliedFiltersHash?: string) {
    this.params.get_filters   = true;
    this.params.features_hash = appliedFiltersHash;

    return this
  }

  setParams(): void {
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

    if (this.handlerParams.search) {
      this.params.q = this.handlerParams.search;
    }
  }
}

interface selectedOption {
  optionId: number;
  value: any;
}

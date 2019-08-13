import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class ProductsRequest extends AbstractRequest {
  entityPath: string = 'products';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  protected buildUrl(): string {
    let url = super.buildUrl();
    url = url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '');

    return url
  }

  public forOptions(options: Array<selectedOption>) {
    let selected_options: any = {};

    options.forEach(option =>
      selected_options[option.optionId] = option.value
    );

    this.params.selected_options = selected_options

    return this
  }

  public forCategory(categoryId: number) {
    this.params.filter    = 'Y';
    this.params.cid       = categoryId;

    return this
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

interface selectedOption {
  optionId: number;
  value: any;
}

import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class CategoriesRequest extends AbstractRequest {
  entityPath: string = 'categories';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  protected buildUrl(): string {
    let url = super.buildUrl()
    return url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '')
  }

  public withSubcategories() {
    this.params = {
      ...this.params,
      get_subcategories: 'Y',
      /**
       * @deprecated
       */
      subcategories: 'Y',
    }

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

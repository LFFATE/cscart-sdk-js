import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'
import { stringify } from 'querystring';

export default class VendorsRequest extends AbstractRequest {
  entityPath: string = 'vendors';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  protected buildUrl(): string {
    let url = super.buildUrl();
    url = url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '');

    return url
  }

  getForm() {
    this.entityPath       = 'vendor_registration';
    this.setParams()

    return this.client.get(
      super.buildUrl(),
      {
        params: {
          ...this.params
        },
        paramsSerializer: (params: any) => {
          return stringify(params)
        }
      }
    )
  }

  create(data: any) {
    this.entityPath = 'vendor_registration';
    this.setParams()

    return this.client.post(
      super.buildUrl(),
      data
    )
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

    if (this.handlerParams.search) {
      this.params.q = this.handlerParams.search;
    }
  }
}

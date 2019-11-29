import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class BmLayoutsRequest extends AbstractRequest {
  entityPath: string = 'ext_bm_layouts'
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  public withBlocks() {
    this.handlerParams.withBlocks = true;
    return this
  }

  public withSlug(slug: string|number) {
    this.handlerParams.withSlug = slug;
    return this
  }

  public forLocation(location: string) {
    this.handlerParams.location = location;
    return this
  }

  protected buildUrl(): string {
    let url = super.buildUrl()
    url = url + (this.handlerParams.id ? `${this.handlerParams.id}/` : '');
    url = url + (this.handlerParams.location ? `sra_ext_bm_locations/${this.handlerParams.location}/` : '')
    url = url + (this.handlerParams.withBlocks ? 'sra_ext_bm_blocks/' : '');
    url = url + (this.handlerParams.withSlug || '');

    return url
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

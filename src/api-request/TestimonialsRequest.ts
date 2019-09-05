import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class PagesRequest extends AbstractRequest {
  entityPath: string = 'discussion';
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  public forProduct(objectId: number) {
    this.forItem(objectId, 'P')

    return this
  }

  public forCategory(objectId: number) {
    this.forItem(objectId, 'C')

    return this
  }

  public forArticle(objectId: number) {
    this.forItem(objectId, 'C')

    return this
  }

  public forOrder(objectId: number) {
    this.forItem(objectId, 'O')

    return this
  }

  public forStorefront(objectId: number) {
    this.forItem(objectId, 'E')

    return this
  }

  public forVendor(objectId: number) {
    this.forItem(objectId, 'M')

    return this
  }

  protected forItem(objectId: number, objectType: 'P'|'C'|'A'|'O'|'E'|'M') {
    this.params.object_id = objectId;
    this.params.object_type = objectType;
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

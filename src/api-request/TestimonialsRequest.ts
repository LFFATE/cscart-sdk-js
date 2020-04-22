import { AxiosInstance } from 'axios'

import Config from '../config/Config'
import AbstractRequest from './AbstractRequest'

export default class TestimonialsRequest extends AbstractRequest {
  entityPath: string = 'discussion';
  prefix: string = 'sra_'
  handlerParams: any;
  params: any;

  constructor(client: AxiosInstance, config: Config) {
    super(client, config)
    this.handlerParams = {};
    this.params = {};
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
    this.forItem(objectId, 'A')

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

  protected forItem(objectId: number, objectType: IObjectType) {
    this.params.object_id = objectId;
    this.params.object_type = objectType;
  }

  create(
    object_id: number,
    object_type: IObjectType,
    name: string,
    rating_value?: number,
    message?: string
  ) {
    return this.post({
      object_id,
      object_type,
      name,
      rating_value,
      message,
    })
  }

  protected setParams(): void {
    this.params = {
      ...this.params,
      language:   this.config.language,
      sl:         this.config.language,
      lang_code:  this.config.language,
      params: {
        page: this.params.page,
        items_per_page: this.params.items_per_page,
      }
    }

    delete this.params.page
    delete this.params.items_per_page
  }
}

type IObjectType = 'P'|'C'|'A'|'O'|'E'|'M'

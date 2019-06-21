import { upperFirst, camelCase } from 'lodash'

import { IApiRequestConfig } from './IApiRequestConfig'
import EntityHandler from './EntityHandler'
import { IConfig } from '../config/IConfig'

class ApiRequest {
  private config: IConfig;
  private params: any;
  private handlerParams: any;
  private entity: string;
  public handler: any;

  constructor(params: IApiRequestConfig, config: IConfig) {
    this.config         = config;
    this.entity         = params.entity;
    this.handlerParams  = {};
    this.params         = {};

    this.handler        = new EntityHandler[upperFirst(camelCase(this.entity)) + 'Request'](
      this.handlerParams,
      params,
      this.config
    );
  }

  public limit(limit: number) {
    this.params = {
      ...this.params,
      items_per_page: limit,
    }

    return this
  }

  public page(page: number) {
    this.params = {
      ...this.params,
      page: page,
    }

    return this
  }

  public byCompany(companyId: number) {
    if (this.checkMethodAllowed(['products'])) {
      throw new Error(`Can\'t get company for ${this.entity} entity`);
    }

    this.params = {
      ...this.params,
      company_id: companyId,
    }
  }

  public withProducts() {
    if (this.checkMethodAllowed(['categories'])) {
      throw new Error(`Can\'t get company for ${this.entity} entity`);
    }
  }

  public one(id: number|string) {
    this.handlerParams.id = id

    return this
  }

  public asc() {
    this.handlerParams.order = 'asc';
    return this
  }

  public desc() {
    this.handlerParams.order = 'desc';
    return this
  }

  public orderBy(orderBy: string) {
    this.handlerParams.orderBy = orderBy;
    return this
  }

  public setIconSize(size: [number, number]) {
    if (!this.params.icon_sizes) {
      this.params.icon_sizes = {
        main_pair: [],
        image_pairs: []
      };
    }

    this.params.icon_sizes.main_pair.push(size)
    this.params.icon_sizes.image_pairs.push(size)

    return this
  }

  private checkMethodAllowed(allowed: Array<string>): boolean {
    return allowed.indexOf(this.entity) !== -1;
  }
}

export default ApiRequest

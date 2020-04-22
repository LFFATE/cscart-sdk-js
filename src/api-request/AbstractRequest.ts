import { stringify } from 'qs'
import { AxiosInstance } from 'axios'

import Config from '../config/Config'

export default abstract class AbstractRequest {
  abstract entityPath:      string;
  abstract prefix:          string;
  protected requestUrl:     string;
  protected config:         Config;
  protected client:         AxiosInstance;
  abstract handlerParams:  any;
  abstract params:         any;

  protected constructor(client: AxiosInstance, config: Config) {
    this.config = config;
    this.client = client;
  }

  protected buildUrl(): string {
    return this.config.apiUrl + (this.prefix ? this.prefix : '') + this.entityPath + '/'
  }

  protected setParams(): void {
  }

  get() {
    this.setParams()

    return this.client.get(
      this.buildUrl(),
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

  post(data: any = {}) {
    this.setParams()

    return this.client.post(
      this.buildUrl(),
      data,
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

  put(data: any = {}) {
    this.setParams()

    return this.client.put(
      this.buildUrl(),
      data,
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

  delete() {
    this.setParams()

    return this.client.delete(
      this.buildUrl()
    )
  }

  limit(limit: number) {
    this.params = {
      ...this.params,
      items_per_page: limit,
    }

    return this
  }

  page(page: number) {
    this.params = {
      ...this.params,
      page: page,
    }

    return this
  }

  byCompany(companyId: number) {
    if (!this.isMethodAllowed(['products'])) {
      throw new Error(`Can\'t get company for ${this.entityPath} entity`);
    }

    this.params = {
      ...this.params,
      company_id: companyId,
    }
    return this
  }

  withProducts() {
    if (!this.isMethodAllowed(['categories'])) {
      throw new Error(`Can\'t get company for ${this.entityPath} entity`);
    }
    return this
  }

  one(id: number|string) {
    this.handlerParams.id = id

    return this
  }

  search(query: string) {
    this.handlerParams.search = query;

    return this
  }

  asc() {
    this.handlerParams.order = 'asc';
    return this
  }

  desc() {
    this.handlerParams.order = 'desc';
    return this
  }

  orderBy(orderBy: string) {
    this.handlerParams.orderBy = orderBy;
    return this
  }

  setIconSize(size: [number, number]) {
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

  private isMethodAllowed(allowed: Array<string>): boolean {
    return allowed.indexOf(this.entityPath) !== -1;
  }
}

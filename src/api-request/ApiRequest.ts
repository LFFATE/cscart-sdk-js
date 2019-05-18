import { IApiRequestConfig } from './IApiRequestConfig'
import { camelCase, upperFirst } from 'lodash'
import { IConfig } from '../config/IConfig'

class ApiRequest {
  private requestUrl: string;
  private client: any;
  private config: IConfig;
  private entity: string;

  constructor(params: IApiRequestConfig, config: IConfig) {
    this.requestUrl = params.requestUrl;
    this.config     = config;
    this.entity     = params.entity;
    this.client     = params.client;
  }

  public get() {
    const method = 'get' + upperFirst(camelCase(this.entity)) + 'Params';

    return this.client.get(
      this.requestUrl,
      {
        params: (<any>this)[method] ? (<any>this)[method]() : {}
      }
    )
  }

  public one(id: string) {
    this.requestUrl += id

    return this
  }

  private getSraProductsParams(): any {
    return {
      language:   this.config.language,
      sl:         this.config.language,
      lang_code:  this.config.language,
    }
  }

  private getAuthTokensParams(): any {
    return {
      lang_code:  this.config.language,
    }
  }

  private getSraProfileParams(): any {
    return {
      lang_code:  this.config.language,
    }
  }

  private getSraProfileFieldsParams(): any {
    return {
      lang_code:  this.config.language,
    }
  }
}

export default ApiRequest

import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class AuthRequest extends AbstractRequest {
  entityPath: string = 'auth_tokens'
  prefix: string = ''

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  public login(email: string, password: string) {
    return this.post({ email, password })
  }
}

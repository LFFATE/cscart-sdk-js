import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class AuthRequest extends AbstractRequest {
  entityPath: string = 'auth_tokens';
  prefix: string = '';

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  public login(email: string, password: string) {
    return this.post({ email, password })
  }

  public socialLogin(provider: string, idToken: string, clientId: string) {
    /**
     * Workaround for separated api endpoint
     */
    const backupEntityPath  = this.entityPath;
    const backupPrefix      = this.prefix;

    this.entityPath = 'social_auth';
    this.prefix     = 'sra_';

    const request = this.post({ provider, token_id: idToken, client_id: clientId })

    this.entityPath = backupEntityPath;
    this.prefix     = backupPrefix;

    return request
  }
}

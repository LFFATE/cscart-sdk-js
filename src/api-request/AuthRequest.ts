import Config from '../config/Config'
import AbstractRequest from './AbstractRequest'
import { AxiosInstance } from 'axios';

class AuthRequest extends AbstractRequest {
  entityPath: string  = 'auth_tokens';
  prefix: string      = 'sra_';
  handlerParams: any;
  params: any;

  constructor(client: AxiosInstance, config: Config) {
    super(client, config)
    this.handlerParams = {};
    this.params = {};
  }

  login(email: string, password: string) {
    return this.post({ email, password })
  }

  loginWithEkey(ekey: string) {
    return this.post({ ekey })
  }

  socialLogin(provider: string, idToken: string, clientId: string) {
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

  restorePassword(email: string) {
    /**
     * Workaround for separated api endpoint
     */
    const backupEntityPath  = this.entityPath;
    const backupPrefix      = this.prefix;

    this.entityPath = 'recover_password';
    this.prefix     = 'sra_';

    const request = this.post({ email })

    this.entityPath = backupEntityPath;
    this.prefix     = backupPrefix;

    return request
  }
}

export default AuthRequest

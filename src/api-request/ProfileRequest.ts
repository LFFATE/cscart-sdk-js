import { IApiRequestConfig } from './IApiRequestConfig'

import { IConfig } from '../config/IConfig'
import AbstractRequest from './AbstractRequest'

export default class ProfileRequest extends AbstractRequest {
  entityPath: string = 'profile'
  prefix: string = 'sra_'

  constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig) {
    super(handlerParams, params, config)
  }

  protected buildUrl(): string {
    if (this.handlerParams.isProfileFields) {
      return this.config.apiUrl + 'sra_profile_fields/'
    }

    return super.buildUrl()
  }

  public form() {
    this.handlerParams.form = true;

    return this
  }

  public forAddProfile() {
    if (!this.handlerParams.form) {
      throw new Error('Please specify form method first')
    }

    this.handlerParams.isProfileFields = true;
    this.params.location  = 'profile';
    this.params.action    = 'add';

    return this
  }

  public forUpdateProfile() {
    if (!this.handlerParams.form) {
      throw new Error('Please specify form method first')
    }

    this.handlerParams.isProfileFields = true;
    this.params.location  = 'profile';
    this.params.action    = 'update';

    return this
  }

  public forAddOrder() {
    if (!this.handlerParams.form) {
      throw new Error('Please specify form method first')
    }

    this.handlerParams.isProfileFields = true;
    this.params.location  = 'checkout';
    this.params.action    = 'add';

    return this
  }

  public forUpdateOrder() {
    if (!this.handlerParams.form) {
      throw new Error('Please specify form method first')
    }

    this.handlerParams.isProfileFields = true;
    this.params.location  = 'checkout';
    this.params.action    = 'update';

    return this
  }

  update(profile: any) {

    return this.client.put(
      this.buildUrl() + '1',
      profile
    )
  }

  public create(profile: any) {

    return this.post(profile)
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

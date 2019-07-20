import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class ProfileRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    protected buildUrl(): string;
    form(): this;
    forAddProfile(): this;
    forUpdateProfile(): this;
    forAddOrder(): this;
    forUpdateOrder(): this;
    create(profile: any): any;
    protected setParams(): void;
}

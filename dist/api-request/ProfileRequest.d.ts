import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
export default class ProfileRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    protected buildUrl(): string;
    form(): this;
    forAddProfile(): this;
    forUpdateProfile(): this;
    forAddOrder(): this;
    forUpdateOrder(): this;
    update(profile: any): import("axios").AxiosPromise<any>;
    create(profile: any): import("axios").AxiosPromise<any>;
    protected setParams(): void;
}

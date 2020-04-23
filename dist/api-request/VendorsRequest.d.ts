import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
export default class VendorsRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    protected buildUrl(): string;
    getForm(): import("axios").AxiosPromise<any>;
    create(data: any): import("axios").AxiosPromise<any>;
    protected setParams(): void;
}

import { IConfig } from '../config/IConfig';
import { IApiRequestConfig } from './IApiRequestConfig';
export default class AbstractRequest {
    protected requestUrl: string;
    protected entity: string;
    protected client: any;
    protected handlerParams: any;
    protected params: any;
    protected config: IConfig;
    protected prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    protected buildUrl(): string;
    protected setParams(): void;
    get(): any;
}

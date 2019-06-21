import { IConfig } from '../config/IConfig';
import { IApiRequestConfig } from './IApiRequestConfig';
export default abstract class AbstractRequest {
    abstract entityPath: string;
    abstract prefix: string;
    protected requestUrl: string;
    protected client: any;
    protected handlerParams: any;
    protected params: any;
    protected config: IConfig;
    protected constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    protected buildUrl(): string;
    protected setParams(): void;
    get(): any;
    post(data?: any): any;
    delete(): any;
}

import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class CategoriesRequest extends AbstractRequest {
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    protected buildUrl(): string;
    withSubcategories(): this;
    protected setParams(): void;
}

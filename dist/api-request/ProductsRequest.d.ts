import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class ProductsRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    protected buildUrl(): string;
    forOptions(options: Array<selectedOption>): this;
    forCategory(categoryId: number): this;
    protected setParams(): void;
}
interface selectedOption {
    optionId: number;
    value: any;
}
export {};
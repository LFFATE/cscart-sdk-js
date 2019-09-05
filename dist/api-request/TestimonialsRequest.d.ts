import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class PagesRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    forProduct(objectId: number): this;
    forCategory(objectId: number): this;
    forArticle(objectId: number): this;
    forOrder(objectId: number): this;
    forStorefront(objectId: number): this;
    forVendor(objectId: number): this;
    protected forItem(objectId: number, objectType: 'P' | 'C' | 'A' | 'O' | 'E' | 'M'): void;
    protected setParams(): void;
}

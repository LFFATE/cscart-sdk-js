import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class CartContentRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    withShippings(ids?: Array<number>): this;
    protected buildUrl(): string;
    add(products: IAddToCartProduct | Array<IAddToCartProduct>): void;
    update(product: any): void;
    saveUserData(userData: any): void;
    protected setParams(): void;
}
interface IAddToCartProduct {
    product_id: number;
    amount: number;
    product_options: Array<any>;
}
export {};

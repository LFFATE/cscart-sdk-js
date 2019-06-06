import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class CartContentRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    withShippings(): this;
    add(product: IAddToCartProduct): any;
    protected setParams(): void;
}
interface IAddToCartProduct {
    product_id: number;
    amount: number;
    product_options: Array<any>;
}
export {};

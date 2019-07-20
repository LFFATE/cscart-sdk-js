import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class WishlistRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    protected buildUrl(): string;
    add(products: IAddToWishlistProduct): void;
    add(products: Array<IAddToWishlistProduct>): void;
    remove(): void;
    protected setParams(): void;
}
interface IAddToWishlistProduct {
    product_id: number;
    product_options?: Array<any>;
}
export {};

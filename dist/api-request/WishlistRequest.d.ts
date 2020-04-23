import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
export default class WishlistRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    protected buildUrl(): string;
    add(products: IAddToWishlistProduct): any;
    add(products: Array<IAddToWishlistProduct>): any;
    remove(): import("axios").AxiosPromise<any>;
    protected setParams(): void;
}
interface IAddToWishlistProduct {
    product_id: number;
    product_options?: Array<any>;
}
export {};

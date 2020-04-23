import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
declare class CartRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    withShippings(ids?: Array<number>): this;
    protected buildUrl(): string;
    add(products: IAddToCartProduct | Array<IAddToCartProduct>): import("axios").AxiosPromise<any>;
    update(product: any): import("axios").AxiosPromise<any>;
    saveUserData(userData: any): import("axios").AxiosPromise<any>;
    protected setParams(): void;
}
interface IAddToCartProduct {
    product_id: number;
    amount: number;
    product_options?: Array<any>;
}
export default CartRequest;

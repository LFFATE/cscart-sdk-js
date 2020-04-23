import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
export default class OrdersRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    protected buildUrl(): string;
    get(): import("axios").AxiosPromise<any>;
    create(order: INewOrder): import("axios").AxiosPromise<any>;
    protected setParams(): void;
}
interface INewOrder {
    products: Array<any>;
    shippingIds: Array<number>;
    paymentId: number;
    userData?: any;
    paymentInfo?: any;
    [others: string]: any;
}
export {};

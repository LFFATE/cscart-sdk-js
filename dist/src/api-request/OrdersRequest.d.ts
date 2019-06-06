import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class OrdersRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    create(order: INewOrder): any;
    protected setParams(): void;
}
interface INewOrder {
    products: Array<any>;
    shippingIds: Array<number>;
    paymentId: number;
}
export {};

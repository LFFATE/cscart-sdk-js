import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class SettlementsRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    create(data: INewSettlement): any;
    protected setParams(): void;
}
interface INewSettlement {
    orderId: number;
    repay?: boolean;
    [others: string]: any;
}
export {};

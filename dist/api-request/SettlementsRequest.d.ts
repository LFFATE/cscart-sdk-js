import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
export default class SettlementsRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    protected buildUrl(): string;
    getForm(orderId: number): import("axios").AxiosPromise<any>;
    hookUrl(url: string): import("axios").AxiosPromise<any>;
    create(data: INewSettlement): import("axios").AxiosPromise<any>;
    protected setParams(): void;
}
interface INewSettlement {
    orderId: number;
    repay?: boolean;
    [others: string]: any;
}
export {};

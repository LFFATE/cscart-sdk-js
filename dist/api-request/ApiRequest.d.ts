import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
declare class ApiRequest {
    private config;
    private params;
    private handlerParams;
    private entity;
    handler: any;
    constructor(params: IApiRequestConfig, config: IConfig);
    limit(limit: number): this;
    page(page: number): this;
    byCompany(companyId: number): this;
    withProducts(): this;
    one(id: number | string): this;
    search(query: string): this;
    asc(): this;
    desc(): this;
    orderBy(orderBy: string): this;
    setIconSize(size: [number, number]): this;
    private isMethodAllowed;
}
export default ApiRequest;

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
    byCompany(companyId: number): void;
    withProducts(): void;
    one(id: number | string): this;
    asc(): this;
    desc(): this;
    orderBy(orderBy: string): this;
    setIconSize(size: [number, number]): this;
    private checkMethodAllowed;
}
export default ApiRequest;

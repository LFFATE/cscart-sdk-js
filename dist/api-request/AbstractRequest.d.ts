import { AxiosInstance } from 'axios';
import Config from '../config/Config';
export default abstract class AbstractRequest {
    abstract entityPath: string;
    abstract prefix: string;
    protected requestUrl: string;
    protected config: Config;
    protected client: AxiosInstance;
    abstract handlerParams: any;
    abstract params: any;
    protected constructor(client: AxiosInstance, config: Config);
    protected buildUrl(): string;
    protected setParams(): void;
    get(): import("axios").AxiosPromise<any>;
    post(data?: any): import("axios").AxiosPromise<any>;
    put(data?: any): import("axios").AxiosPromise<any>;
    delete(): import("axios").AxiosPromise<any>;
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

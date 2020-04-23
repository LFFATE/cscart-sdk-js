import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
export default class BmLayoutsRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    withBlocks(): this;
    withSlug(slug: string | number): this;
    forLocation(location: string): this;
    protected buildUrl(): string;
    protected setParams(): void;
}

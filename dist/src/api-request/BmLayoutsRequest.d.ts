import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class BmLayoutsRequest extends AbstractRequest {
    protected prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    withBlocks(): this;
    forLocation(location: string): this;
    protected buildUrl(): string;
    protected setParams(): void;
}

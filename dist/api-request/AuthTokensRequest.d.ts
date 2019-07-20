import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class AuthRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    login(email: string, password: string): any;
}

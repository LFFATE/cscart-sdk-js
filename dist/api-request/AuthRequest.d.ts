import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
import { AxiosInstance } from 'axios';
declare class AuthRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    login(email: string, password: string): import("axios").AxiosPromise<any>;
    loginWithEkey(ekey: string): import("axios").AxiosPromise<any>;
    socialLogin(provider: string, idToken: string, clientId: string): import("axios").AxiosPromise<any>;
    restorePassword(email: string): import("axios").AxiosPromise<any>;
}
export default AuthRequest;

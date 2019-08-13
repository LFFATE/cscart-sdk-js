import { IConfig } from './config/IConfig';
import { AxiosInstance } from 'axios';
declare class CsCartApiSdk {
    protected config: IConfig;
    protected client: AxiosInstance;
    constructor(config: IConfig);
    readonly products: any;
    readonly pages: any;
    readonly categories: any;
    readonly auth: any;
    readonly layouts: any;
    readonly orders: any;
    readonly settlements: any;
    readonly cart: any;
    readonly wishlist: any;
    readonly profile: any;
    private getNewApiRequest;
    getConfig(): IConfig;
    getClient(): AxiosInstance;
    setLanguage(language: string): void;
    setUserToken(token: string): void;
}
export default CsCartApiSdk;
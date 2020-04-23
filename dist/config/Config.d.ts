import IConfig from './IConfig';
declare class Config implements IConfig {
    username: string;
    apiKey: string;
    apiUrl: string;
    siteUrl: string;
    client?: string;
    timeout?: number;
    language?: string;
    userToken?: string;
    constructor(config: IConfig);
}
export default Config;

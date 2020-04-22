import IConfig from './IConfig'

class Config implements IConfig {
    username: string;
    apiKey:   string;
    apiUrl:   string;
    siteUrl:  string;
    client?:  string;
  
    timeout?:   number;
    language?:  string;
    userToken?: string;

    constructor(config: IConfig) {
        this.username   = config.username;
        this.apiKey     = config.apiKey
        this.apiUrl     = config.apiUrl
        this.siteUrl    = config.siteUrl
        this.client     = config.client
        this.timeout    = config.timeout
        this.language   = config.language
        this.userToken  = config.userToken
    }
}

export default Config
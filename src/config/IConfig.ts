interface IConfig {
  username: string;
  apiKey:   string;
  apiUrl:   string;
  siteUrl:  string;
  client?:  string;

  timeout?:   number;
  language?:  string;
  userToken?: string;
}

export default IConfig
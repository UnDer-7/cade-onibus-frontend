import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

import EnvVariables from '../utils/EnvironmentVariables';

export default class HttpClient {
  private static instance: HttpClient;

  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = Axios.create({
      responseType: 'json',
    });
    this.axiosInstance
      .interceptors
      .request
      .use((config) => {
        console.log('|--- ADICIONAR TOKEN ---|');
        return config;
      });
  }

  public static getInstance(): HttpClient {
    if (!this.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }

  public getResourceURL(resource: string): string {
    return `${ EnvVariables.BASE_URL }/api/${ resource }`;
  };

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.get<T>(url, config);
    return res.data;
  }

  public async post<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.post(url, body, config);
    return res.data;
  }
}

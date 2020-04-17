import Axios from 'axios-observable';
import { AxiosRequestConfig } from 'axios';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';

import EnvVariables from '../utils/EnvironmentVariables';

export default class HttpClient {
  private static instance: HttpClient;

  private axiosInstance: Axios;

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

  public get<T>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(url: string, body: any, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.post(url, body, config);
  }
}

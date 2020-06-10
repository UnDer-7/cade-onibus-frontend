import Axios from 'axios-observable';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { Consumer } from '../models/types/Functions';

interface HttpClientConstructorProps {
  request?: {
    onFulfilled?: Consumer<AxiosRequestConfig>[],
    onRejected?: Consumer<AxiosResponse<string>>[],
  },
  response?: {
    onFulfilled?: Consumer<AxiosRequestConfig>[],
    onRejected?: Consumer<AxiosResponse<string>>[],
  }
}

export default class HttpClient {
  private static instance: HttpClient;

  private axiosInstance: Axios;

  private constructor(props?: HttpClientConstructorProps) {
    this.axiosInstance = Axios.create({
      responseType: 'json',
    });
    this.axiosInstance
      .interceptors
      .request
      .use(
        (config) => {
          // eslint-disable-next-line no-unused-expressions
          props
            ?.request
            ?.onFulfilled
            ?.forEach((fn) => fn(config));
          return config;
        },
        (config) => {
          // eslint-disable-next-line no-unused-expressions
          props
            ?.request
            ?.onRejected
            ?.forEach((fn) => fn(config));
          return Promise.reject(config);
        }
      );
    this.axiosInstance
      .interceptors
      .response
      .use(
        (config) => {
          // eslint-disable-next-line no-unused-expressions
          props
            ?.response
            ?.onFulfilled
            ?.forEach((fn) => fn(config));
          return config;
        },
        (config) => {
          // eslint-disable-next-line no-unused-expressions
          props
            ?.response
            ?.onRejected
            ?.forEach((fn) => fn(config.response));
          return Promise.reject(config);
        }
      );
  }

  public static getInstance(props?: HttpClientConstructorProps): HttpClient {
    if (!this.instance) {
      HttpClient.instance = new HttpClient(props);
    }

    return HttpClient.instance;
  }

  public get<T>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(url: string, body: any, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.post(url, body, config);
  }
}

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import QueryString from 'query-string';
import InterceptorRejectResponse from '../Interceptor/InterceptorRejectResponse';

import HttpClient from '../config/HttpClient';
import Verify from '../utils/Verify';
import EnvVariables from '../utils/EnvironmentVariables';

export default abstract class AbstractResource {
  protected readonly HTTP: HttpClient;

  protected readonly BASE_URL: string;

  protected constructor(resource: string) {
    const interceptorReject = InterceptorRejectResponse.getInstance();

    this.HTTP = HttpClient.getInstance({
      response: {
        onRejected: [
          interceptorReject.userAlreadyExists,
          interceptorReject.userNotFound,
          interceptorReject.invalidCredentials,
          interceptorReject.internalServerError,
        ],
      },
    });
    this.BASE_URL = this.getResourceURL(resource);
  }

  protected getResponseBody<T>(observable: AxiosObservable<T>): Observable<T> {
    return observable.pipe(
      map((value) => value.data)
    );
  }

  protected createUrlWithQueryParams(url: string, params: {[key: string]: string | null | undefined}) {
    const newParams = { ...params};
    Object.keys(newParams)
      .filter((key) => Verify.isNullOrUndefined(params[key]))
      .forEach((key) => delete newParams[key]);

    const query = QueryString.stringify(newParams);
    return `${url}?${query}`;
  }

  private getResourceURL(resource: string): string {
    return `${ EnvVariables.API_URL }/api/${ resource }`;
  };
}

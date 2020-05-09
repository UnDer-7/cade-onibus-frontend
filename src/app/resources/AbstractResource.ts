import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';

import HttpClient from '../config/HttpClient';

export default abstract class AbstractResource {
  protected readonly HTTP: HttpClient;

  protected readonly BASE_URL: string;

  protected constructor(resource: string) {
    this.HTTP = HttpClient.getInstance();
    this.BASE_URL = this.HTTP.getResourceURL(resource);
  }

  protected getResponseBody<T>(observable: AxiosObservable<T>): Observable<T> {
    return observable.pipe(
      map((value) => value.data)
    );
  }
}

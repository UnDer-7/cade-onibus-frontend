import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private authUrl: string = environment.apiUrl + '/login';
  private resourceUrl: string = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) {
  }

  public login(user: User): Observable<any> {
    return this.http.post(this.authUrl, user);
  }

  public create(user: User): Observable<User> {
    return this.http.post(this.resourceUrl, user);
  }
}

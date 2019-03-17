import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  public authUrl: string = environment.apiUrl + '/login';
  public resourceUrl: string = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) {
  }

  public create(user: User): Observable<User> {
    return this.http.post(this.resourceUrl, user);
  }
}

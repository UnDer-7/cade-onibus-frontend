import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  private readonly resourceUrl: string = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient,
  ) { }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.resourceUrl, user);
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put<any>(this.resourceUrl, user);
  }

  public getUser(email: string): Observable<User> {
    return this.http.get(`${this.resourceUrl}/${email}`);
  }
}

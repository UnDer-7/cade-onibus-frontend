import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable()
export class UserService {
  private resourceUrl: string = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  public findUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`);
  }

  public createUser(user: User): Observable<User> {
    user.moedas = 0;
    return this.http.post(this.resourceUrl, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.resourceUrl}/${user._id}`, user);
  }
}

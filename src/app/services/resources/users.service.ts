import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable()
export class UsersService {
  private readonly resourceUrl: string = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) {}

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.resourceUrl, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.resourceUrl}/${user._id}`, user);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`);
  }

  public deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.resourceUrl}/${id}`);
  }

  // public timeShared(startDate: Date): Observable<any> {
  //   const time = {
  //     _id: this.tokenService.decodeToken()._id,
  //     start: startDate,
  //     end: new Date()
  //   };
  // }

  private getAllUser(user: User): Observable<User[]> {
    return this.http.get<User[]>(this.resourceUrl);
  }
}

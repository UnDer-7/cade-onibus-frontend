import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { map } from 'rxjs/operators';
import { Bus } from '../model/bus.model';

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
    console.log('USER TO SAVE: ', user);
    return this.http.put<any>(this.resourceUrl, user);
  }

  public getUser(): Observable<User> {
    return this.http.get(`${this.resourceUrl}`)
      .pipe(
        map((item) => this.convertUser(item)),
      );
  }

  private convertUser(user: User): User {
    // tslint:disable-next-line:no-non-null-assertion
    user.bus = user.bus!.map((item) => {
      return {
        descricao: item.descricao,
        numero: item.numero,
        faixaTarifaria: {
          // @ts-ignore
          tarifa: item.tarifa,
        },
      } as Bus;
    });
    return user;
  }
}

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
    return this.http.post<User>(this.resourceUrl + '/web', user);
  }

  public addBus(user: Bus[]): Observable<User> {
    return this.http.post<User>(this.resourceUrl + '/web', user)
      .pipe(
        map((item) => this.convertUser(item)),
      );
  }

  public removeBus(bus: Bus): Observable<User> {
    return this.http.delete<User>(this.resourceUrl + `/web/${bus.numero}`)
      .pipe(
        map((item) => this.convertUser(item)),
      );
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

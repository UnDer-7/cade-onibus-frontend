import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserLocation } from '../../models/user.location.model';

@Injectable()
export class HomeService {
  private resourceUrl: string = environment.apiUrl + '/users';
  private buspositionsUrl: string = environment.apiUrl + '/userlocations';

  constructor(
    private http: HttpClient
  ) { }

  public findUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`);
  }

  public createBus(userLocation: UserLocation): Observable<UserLocation> {
    return this.http.post<UserLocation>(this.buspositionsUrl, userLocation);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BusPosition } from '../../models/bus-position.model';

@Injectable()
export class HomeService {
  private resourceUrl: string = environment.apiUrl + '/users';
  private buspositionsUrl: string = environment.apiUrl + '/buspositions';

  constructor(
    private http: HttpClient
  ) { }

  public findUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`);
  }

  public createBus(bus: BusPosition): Observable<BusPosition> {
    return this.http.post<BusPosition>(this.buspositionsUrl, bus);
  }
}

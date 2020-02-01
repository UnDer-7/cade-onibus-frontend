import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLocation } from '../../../models/user.location.model';

@Injectable()
export class MapsService {
  private resourceUrl: string = environment.apiUrl + '/userlocations';
  constructor(
    private http: HttpClient
  ) { }

  public trackBus(linha: string): Observable<any> {
    return this.http.get(this.dfTransUrl(linha));
  }

  public getUserByLinha(linha: string): Observable<Array<UserLocation>> {
    return this.http.get<Array<UserLocation>>(`${this.resourceUrl}/bus/${linha}`);
  }

  private dfTransUrl(linha: string): string {
    return environment.dftrans + `/gps/linha/${linha}/geo/recent`;
  }

}

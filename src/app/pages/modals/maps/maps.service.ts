import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../../models/pagination.model';

@Injectable()
export class MapsService {
  private resourceUrl: string = environment.apiUrl + '/userlocations';
  constructor(
    private http: HttpClient
  ) { }

  public trackBus(linha: string): Observable<any> {
    return this.http.get(this.dfTransUrl(linha));
  }

  public getUserLocation(): Observable<Pagination> {
    return this.http.get<Pagination>(this.resourceUrl);
  }

  private dfTransUrl(linha: string): string {
    return environment.dftrans + `/gps/linha/${linha}/geo/recent`;
  }
}

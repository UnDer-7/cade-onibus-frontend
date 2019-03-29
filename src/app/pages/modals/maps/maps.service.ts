import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapsService {
  private resourceUrl: string;
  constructor(
    private http: HttpClient
  ) { }

  public trackBus(linha: string): Observable<any> {
    return this.http.get(this.dfTransUrl(linha));
  }

  private dfTransUrl(linha: string): string {
    return environment.dftrans + `/gps/linha/${linha}/geo/recent`;
  }
}

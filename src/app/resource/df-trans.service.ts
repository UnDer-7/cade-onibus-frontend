import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bus } from '../model/bus.model';

@Injectable()
export class DfTransService {
  private readonly resourceUrl: string = environment.dfTrans;

  constructor(
    private http: HttpClient,
  ) { }

  public findBus(search: string): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.resourceUrl}/linha/find/${search}`);
  }

  public watchBusLocation(linha: string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/gps/linha/${linha}/geo/recent`);
  }
}

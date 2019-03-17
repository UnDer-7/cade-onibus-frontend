import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Onibus } from '../../onibus.modal';

@Injectable()
export class FindBusService {
  private resourceUrl: string = 'https://www.sistemas.dftrans.df.gov.br/linha/find/';
  constructor(
    private http: HttpClient
  ) { }

  public findBus(params: string): Observable<Onibus[]> {
    return this.http.get<Onibus[]>(`${this.resourceUrl}/${params}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Onibus } from '../../onibus.modal';
import {environment} from '../../../../environments/environment';

@Injectable()
export class FindBusService {
  private resourceUrl: string = environment.dftrans + 'linha/find/';

  constructor(
    private http: HttpClient
  ) { }

  public findBus(params: string): Observable<Onibus[]> {
    return this.http.get<Onibus[]>(`${this.resourceUrl}/${params}`);
  }
}

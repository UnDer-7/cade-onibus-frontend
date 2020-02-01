import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PerfilService {
  private resourceUrl: string = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  public findUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`);
  }
}

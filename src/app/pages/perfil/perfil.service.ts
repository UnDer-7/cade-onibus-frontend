import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../auth/user.model';

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

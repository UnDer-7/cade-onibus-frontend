import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';

@Injectable()
export class SessionService {
  private readonly resourceUrl: string = environment.apiUrl + '/session';
  constructor(
    private http: HttpClient,
  ) { }

  public loginWithGoogle(user: User): Observable<string> {
    return this.http.post<string>(`${this.resourceUrl}/google`, user);
  }

  public loginWithEmail(user: User): Observable<string> {
    return this.http.post<string>(`${this.resourceUrl}/email`, user);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { TokenForgotPassword } from '../model/token-forgot-password.model';

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

  public refreshToken(token: {}): Observable<string> {
    return this.http.post<string>(`${this.resourceUrl}/refresh`, token);
  }

  public verifyForgotPasswordToken(token: string): Observable<TokenForgotPassword> {
    const jsonToken = { token };

    return this.http.post<TokenForgotPassword>(`${this.resourceUrl}/forgot-password-valid`, jsonToken);
  }

  public forgotPassword(email: string): Observable<void> {
    const body = {email};

    return this.http.post<void>(`${this.resourceUrl}/recovery`, body);
  }

 }

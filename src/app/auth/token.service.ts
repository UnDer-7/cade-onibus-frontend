import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  get token(): string {
    return localStorage.getItem('token');
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  public removeItem(): void {
    localStorage.clear();
  }

  public decodeToken(): Token {
    return jwtDecode(this.token);
  }
}

import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable()
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

  public decodeToken(): any {
    return jwtDecode(this.token);
  }
}

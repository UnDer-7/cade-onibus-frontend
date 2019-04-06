import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Token } from '../models/token.model';
import { throwError } from 'rxjs';

@Injectable()
export class TokenService {
  public removeItem(): void {
    localStorage.clear();
  }

  public decodeToken(): Token {
    try {
      return jwtDecode(this.token);
    } catch (e) {
      throwError(`Erro while trying to decode token\n${e}`);
    }
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }
}

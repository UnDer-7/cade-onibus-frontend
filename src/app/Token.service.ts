import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  get token(): string {
    return localStorage.getItem('token');
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  public removeItem() {
    localStorage.clear();
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  constructor() { }

  public login(): void {
    console.log('SERVICE WORKS');
  }

  public logout(): void {

  }
}

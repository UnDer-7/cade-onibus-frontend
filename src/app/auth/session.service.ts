import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  public login(): void {
    console.log('SERVICE WORKS');
  }

  public logout(): void {

  }
}

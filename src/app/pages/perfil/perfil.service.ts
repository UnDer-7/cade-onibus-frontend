import { Injectable } from '@angular/core';

@Injectable()
export class PerfilService {
  constructor() { }

  public findUser(): void {
    console.log('SERVICE WORKS');
  }
}

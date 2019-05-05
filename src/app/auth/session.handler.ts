import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { SessionService } from '../resource/session.service';
import { saveJWT } from './jwt.handler';

@Injectable()
export class SessionHandler {
  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  public loginWithEmail(user: User): void {
  }

  public loginWithGoogle(user: User): void {
    this.sessionService.loginWithGoogle(user).subscribe(res => {
      saveJWT(res);
      this.router.navigateByUrl('/home');
    });
  }

  public logout(): void {
  }

}

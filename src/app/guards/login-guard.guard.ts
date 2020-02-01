import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../auth/session.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}

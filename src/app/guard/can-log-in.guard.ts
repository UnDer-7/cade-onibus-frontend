import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionHandler } from '../auth/session.handler';

@Injectable()
export class CanLogInGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionHandler: SessionHandler,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sessionHandler.isLoggedIn()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { decodeJWT, getJWT } from '../auth/jwt.handler';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class CanLogInGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }

  private isLoggedIn(): boolean {
    switch (false) {
      case !!getJWT():
        return false;
      case this.isTokenValid():
        return false;
      case this.isTokenExpired():
        return false;
      default:
        return true;
    }
  }

  private isTokenValid(): boolean {
    try {
      jwtDecode(getJWT() as string);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isTokenExpired(): boolean {
    const expiration = new Date(decodeJWT().exp * 1000);
    const currentDate = new Date();

    return expiration >= currentDate;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../auth/session.service';
import { UtilService } from '../util/util.service';
import { TokenService } from '../auth/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private util: UtilService,
    private tokenService: TokenService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionService.isLoggedIn()) {
      return true;
    }

    this.tokenService.removeItem();
    this.router.navigateByUrl('/').then(res => {
      if (res) {
        this.util.showToast('Você não esta mais logado!', 'danger');
        this.util.blockedUrl = route.url[0].path;
      }
    });
    return false;
  }
}

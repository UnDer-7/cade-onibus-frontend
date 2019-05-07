import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { removeJWT } from '../auth/jwt.handler';
import { SessionHandler } from '../auth/session.handler';
import { UtilService } from '../utils/util.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private utilService: UtilService,
    private sessionHandler: SessionHandler,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sessionHandler.isLoggedIn()) {
      return true;
    }

    removeJWT();
    this.router.navigateByUrl('/').then(res => {
      if (res) {
        this.utilService.showToast('Você não esta mais logado', 'danger');
      }
    });
    this.utilService.blockedUrl = route.url[0].path;
    return false;
  }
}

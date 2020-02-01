import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { decodeJWT } from '../auth/jwt.handler';
import { SessionHandler } from '../auth/session.handler';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionHandler: SessionHandler,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/session/refresh')) {
      return next.handle(req);
    }

    if (this.canRefreshToken()) {
      this.sessionHandler.refreshToken();
    }

    return next.handle(req);
  }

  private canRefreshToken(): boolean {
    if (!this.sessionHandler.isLoggedIn()) return false;

    const expirationDate = new Date(decodeJWT().exp * 1000);
    const currentDate = new Date();

    const diffTime = Math.abs(expirationDate.getTime() - currentDate.getTime());
    const diffDays =  Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays < 10;
  }
}

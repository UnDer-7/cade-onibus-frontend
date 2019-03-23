import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/Token.service';

@Injectable()
export class TokenApiService implements HttpInterceptor {
  constructor (
    private tokenService: TokenService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api = '/api/';
    if (this.tokenService.token && req.url.search(api) === 0) {
      return next.handle(this.addToken(req, this.tokenService.token));
    }
    return next.handle(req);
  }

  private addToken (req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
  }
}

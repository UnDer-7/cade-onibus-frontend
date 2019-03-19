import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../Token.service';

@Injectable()
export class TokenApiService implements HttpInterceptor {
  constructor (
    private tokenService: TokenService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api = '/api/';
    console.log('BOOLEAN: ', this.tokenService.token && req.url.search(api))
    console.log('url: ', req.url);
    if (this.tokenService.token && req.url.search(api) === 0) {
      return next.handle(this.addToken(req, this.tokenService.token));
    }
    return next.handle(req);
  }

  private addToken (req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
  }
}

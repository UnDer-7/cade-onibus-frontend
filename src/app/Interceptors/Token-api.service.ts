import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/Token.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenApiService implements HttpInterceptor {
  constructor (
    private tokenService: TokenService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.substring(0, req.url.search('api') + 3);
    if (this.tokenService.token && url === environment.apiUrl) {
      return next.handle(this.addToken(req, this.tokenService.token));
    }
    return next.handle(req);
  }

  private addToken (req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
  }
}

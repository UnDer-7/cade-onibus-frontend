import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { getJWT } from '../auth/jwt.handler';

export class TokenInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.substring(0, req.url.search('api') + 3);

    if (getJWT() && url === environment.apiUrl) {
      return next.handle(this.addToken(req));
    }
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${ getJWT() }` } });
  }
}

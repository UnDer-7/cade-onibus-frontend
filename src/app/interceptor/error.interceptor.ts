import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SessionHandler } from '../auth/session.handler';
import { UtilService } from '../utils/util.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private sessionHandler: SessionHandler,
    private utilService: UtilService,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorHandling(err, req.url);
        return throwError(err);
      }),
    );
  }

  private errorHandling(err: HttpErrorResponse, url: string): void {
    switch (err.status) {
      case 401:
        this.sessionHandler.logout();
        break;
      case 500:
        this.handleServerError(url);
        break;
      case 0:
        this.utilService.showToast('Não foi possivel conectar com o Cadê Ônibus', 'danger', 2300);
        break;
      default:
        break;
    }
  }

  private handleServerError(url: string): void {
    const apiUrl = url.substring(0, url.search('api') + 3);

    if (apiUrl === environment.apiUrl) {
      this.utilService.showToast('Algo deu errado', 'danger', 2300);
      return;
    }

    if (url.includes('sistemas.dftrans')) {
      this.utilService.showToast('Não possivel conectar com o DFTrans', 'danger', 2500);
      return;
    }
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
        this.errorHandling(err);
        return throwError(err);
      }),
    );
  }

  private errorHandling(err: HttpErrorResponse): void {
    switch (err.status) {
      case 401:
        this.sessionHandler.logout();
        break;
      case 500:
        console.log('ERRO: ', err);
        this.utilService.showToast('Algo deu errado', 'danger', 2300);
        break;
      case 0:
        this.utilService.showToast('Não foi possivel conectar com o Cadê Ônibus', 'danger', 2300);
        break;
      default:
        break;
    }
  }
}

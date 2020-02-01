import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../auth/session.service';
import { UtilService } from '../util/util.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private utilService: UtilService,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        this.errorHandling(err);
        return throwError(err);
      }
    ));
  }

  private errorHandling(err: HttpErrorResponse): void {
    switch (err.status) {
      case 401:
        this.sessionService.logout();
        break;
      case 500:
        this.utilService.showToast('Algo deu errado!', 'danger', 2300);
        break;
      case 0:
        this.utilService.showToast('Não foi possivel conectar com o Cadê Ônibus', 'danger', 2300);
        break;
      default:
        break;
    }
  }
}

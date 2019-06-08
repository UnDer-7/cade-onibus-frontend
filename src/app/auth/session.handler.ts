import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../model/user.model';
import { SessionService } from '../resource/session.service';
import { ServerErrorMessages } from '../utils/server-error.messages';
import { UtilService } from '../utils/util.service';
import { decodeJWT, getJWT, removeJWT, saveJWT } from './jwt.handler';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class SessionHandler {
  @BlockUI() private blockUi!: NgBlockUI;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private utilService: UtilService,
  ) {
  }

  public loginWithEmail(user: User): void {
    this.subscriptionHandler(
      this.sessionService.loginWithEmail(user).pipe(
        finalize(() => this.blockUi.stop()),
      ),
    );
  }

  public loginWithGoogle(user: User): void {
    this.sessionService.loginWithGoogle(user).pipe(
      finalize(() => this.blockUi.stop()),
    ).subscribe(
      res => {
        saveJWT(res);
        this.router.navigateByUrl('/home');
      },
      (err: HttpErrorResponse) => {
        if (err.status === 404 || err.status === 400) {
          this.utilService.showToast('Usuário não encontrado', 'danger');
        }
      },
    );
  }

  public logout(): void {
    removeJWT();
    this.router.navigateByUrl('/').then(res => {
      if (res) {
        this.utilService.showToast('Você não esta mais logado', 'danger');
      }
    });
  }

  public isLoggedIn(): boolean {
    switch (false) {
      case !!getJWT():
        return false;
      case this.isTokenValid():
        return false;
      case this.isTokenExpired():
        return false;
      default:
        return true;
    }
  }

  private subscriptionHandler(observable: Observable<string>): void {
    observable.subscribe(
      res => {
        saveJWT(res);
        console.log('ROUTE SAVE: ', this.utilService.blockedUrl);
        this.router.navigateByUrl('/home');
      },
      (err: HttpErrorResponse) => {
        if (err.status === 404 && err.error === ServerErrorMessages.NOT_FOUND) {
          this.utilService.showToast('Usuário não encontrado', 'danger');
          return;
        }
        if (err.status === 400 && err.error === ServerErrorMessages.INVALID_CREDENTIALS) {
          this.utilService.showToast('Credencias incorretas', 'danger');
          return;
        }
      },
    );
  }

  private isTokenValid(): boolean {
    try {
      jwtDecode(getJWT() as string);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isTokenExpired(): boolean {
    const expiration = new Date(decodeJWT().exp * 1000);
    const currentDate = new Date();

    return expiration >= currentDate;
  }
}

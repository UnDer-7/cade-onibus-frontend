import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { User } from '../models/user.model';
import { SessionService } from '../resource/session.service';
import { UtilService } from '../utils/util.service';
import { saveJWT } from './jwt.handler';

@Injectable()
export class SessionHandler {
  @BlockUI() private blockUi!: NgBlockUI;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private utilService: UtilService,
  ) {
  }

  // public loginWithEmail(user: User): void {
  // }

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

  // public logout(): void {
  // }

}

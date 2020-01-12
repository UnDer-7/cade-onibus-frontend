import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../resource/session.service';
import { environment } from '../../../environments/environment';
import { LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ServerErrorMessages } from '../../utils/server-error.messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenForgotPassword } from '../../model/token-forgot-password.model';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  public readonly appColor: string = environment.contentColor;
  public readonly appName: string = environment.appName;

  public form!: FormGroup;
  public errorMsg!: string;

  private loadingCtl: Promise<HTMLIonLoadingElement>;
  private tokenForgotPassword: TokenForgotPassword = {} as TokenForgotPassword;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly sessionService: SessionService,
    public readonly loadingController: LoadingController,
    private readonly formBuilder: FormBuilder,
  ) {
    this.loadingCtl = loadingController.create({
      message: 'Verificando Dados',
    });
  }

  public ngOnInit(): void {
    this.buildForm();
    this.loadingCtl.then(i => i.present());
    this.router.queryParams
      .subscribe(
        this.onQueryParamsSuccess,
        this.onError,
      );
  }

  private onQueryParamsSuccess = (params: any) => {
    const token = params.token;

    if (!token) {
      this.errorMsg = 'Token Invalido!';
      this.loadingCtl.then(i => i.dismiss());
      return;
    }

    this.sessionService.verifyForgotPasswordToken(token)
      .pipe(finalize(() => this.loadingCtl.then(res => res.dismiss())))
      .subscribe(
        res => {
          this.tokenForgotPassword = res;
          this.updateEmail();
        },
        this.onError,
      );
  }

  private onError = (err: any): void => {
    if (err instanceof HttpErrorResponse) {
      if (err.message === ServerErrorMessages.TOKEN_EXPIRED) {
        this.errorMsg = 'Tempo esgotado, faça um novo pedido para renovar a senha';
      } else {
        this.errorMsg = `Algo deu errado ao validar os dados. Motivo: ${err.error}`;
      }
    } else {
      this.loadingCtl.then(res => res.dismiss());
      this.errorMsg = `Algo deu errado`;
      console.error(err);
    }
  }

  private updateEmail(): void {
    return this.form.patchValue({
      email: this.tokenForgotPassword.payload.email,
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: [''],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]],
    });
  }
}

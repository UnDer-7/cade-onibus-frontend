import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../resource/session.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ServerErrorMessages } from '../../utils/server-error.messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenForgotPassword } from '../../model/token-forgot-password.model';
import { ComponentsUtils } from '../../utils/components-utils';
import { UserService } from '../../resource/user.service';
import { UtilService } from '../../utils/util.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.style.scss'],
})
export class ForgotPasswordComponent extends ComponentsUtils implements OnInit {
  public isLoading: boolean = true;
  public showPassword: boolean = false;
  public passwordFieldType: string = 'password';
  public form!: FormGroup;
  public errorMsg!: string;
  public isTokenExpired: boolean = false;

  @BlockUI()
  private blockUi!: NgBlockUI;

  private loadingCtl: Promise<HTMLIonLoadingElement>;
  private tokenForgotPassword: TokenForgotPassword = {} as TokenForgotPassword;
  private tokenExpiredMsg: string = 'Tempo esgotado, faça um novo pedido para renovar a senha';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly loadingController: LoadingController,
    private readonly formBuilder: FormBuilder,
    private readonly alertController: AlertController,
    private readonly utilService: UtilService,
    private readonly router: Router,
  ) {
    super();
    this.loadingCtl = loadingController.create({
      message: 'Verificando Dados',
    });
  }

  public ngOnInit(): void {
    this.buildForm();
    this.loadingCtl.then(i => i.present());
    this.activatedRoute.queryParams
      .subscribe(
        this.onQueryParamsSuccess,
        this.onError,
      );
  }

  public submit(): void {
    if (this.form.invalid) return;
    this.loadingCtl.then(i => i.present());
    this.userService
      .updatePassword(this.form.value.newPassword, this.tokenForgotPassword.tokenEncoded)
      .pipe(finalize(this.dismissLoading))
      .subscribe(this.onSubmitSuccess);
  }

  public submitNewToken(): void {
    if (this.emailValidations) return;

    this.blockUi.start();
    setTimeout(
      () => this.sessionService
        .forgotPassword(this.form.value.email)
        .pipe(finalize(() => this.blockUi.stop()))
        .subscribe(
          async (_) =>
            await this.utilService.showToast('E-email enviado', 'success', 5500, 'bottom', true),
          async (err: HttpErrorResponse) => {
            if (err.status === 404) {
              await this.utilService.showToast('E-email não encontrado', 'danger', 5500, 'bottom', true);
            }
          },
        ),
      300,
    );
  }

  public onPasswordIconClick(): void {
    if (this.showPassword) {
      this.showPassword = false;
      this.passwordFieldType = 'password';
    } else {
      this.showPassword = true;
      this.passwordFieldType = 'text';
    }
  }
  public get passwordIcon(): string {
    if (this.showPassword) return 'eye';
    return 'eye-off';
  }

  get passwordValidations(): string | undefined {
    const password = this.form.controls.newPassword.errors;

    if (!password) return;

    if (password.hasOwnProperty('required')) {
      return 'Senha é obrigatoria';
    }

    if (password.hasOwnProperty('minlength')) {
      return 'Tamanho mínimo 5 caracteres';
    }

    if (password.hasOwnProperty('maxlength')) {
      return 'Tamanho máximo 50 caracteres';
    }
  }

  get emailValidations(): string | undefined {
    const email = this.form.controls.email.errors;

    if (!email) return;

    if (email.hasOwnProperty('required')) {
      return 'E-email é obrigatorio';
    }

    if (email.hasOwnProperty('email')) {
      return 'E-mail invalido';
    }
  }

  private onQueryParamsSuccess = async (params: any) => {
    const token = params.token;
    const noMsg = params.noMsg;

    if (!token) {
      this.dismissLoading();
      this.isTokenExpired = true;
      if (!noMsg) {
        await this.utilService.showToast(this.tokenExpiredMsg, 'danger', 5500, 'bottom', true);
      }
      return;
    }

    this.sessionService.verifyForgotPasswordToken(token)
      .pipe(finalize(this.dismissLoading))
      .subscribe(
        res => {
          this.tokenForgotPassword = res;
          this.updateEmail();
        },
        this.onError,
      );
  }

  private onSubmitSuccess = async (): Promise<void> => {
    const alert = await this.alertController.create({
      header: 'Senha alterada com sucesso',
      message: 'Sua senha foi alterada com sucesso!',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: (_) => this.router.navigateByUrl('/'),
        },
      ],
      cssClass: 'app-color',
    });

    await alert.present();
  }

  private onError = async (err: any): Promise<void> => {
    if (err instanceof HttpErrorResponse) {
      if (err.error === ServerErrorMessages.TOKEN_EXPIRED) {
        this.isTokenExpired = true;
        this.errorMsg = this.tokenExpiredMsg;
      } else {
        this.errorMsg = `Algo deu errado ao validar os dados. Motivo: ${ err.error }`;
      }
    } else {
      this.dismissLoading();
      this.errorMsg = `Algo deu errado`;
      console.error(err);
    }

    await this.utilService.showToast(this.errorMsg, 'danger', 5500, 'bottom', true);
  }

  private dismissLoading = (): void => {
    this.loadingCtl.then(res => res.dismiss());
    this.isLoading = false;
  }

  private updateEmail(): void {
    return this.form.patchValue({
      email: this.tokenForgotPassword.payload.email,
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]],
    });
  }
}

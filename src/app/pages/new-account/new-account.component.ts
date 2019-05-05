import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SessionHandler } from '../../auth/session.handler';
import { Bus } from '../../models/bus.model';
import { SocialUserToUser, User } from '../../models/user.model';
import { UserService } from '../../resource/user.service';
import { UtilService } from '../../utils/util.service';
import { BusSelectionModalComponent } from '../modal/bus-selection-modal/bus-selection-modal.component';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
})
export class NewAccountComponent implements OnInit {
  public readonly contentColor: string = environment.contentColor;
  public readonly appName: string = environment.appName;

  public passwordIcon: string = 'eye-off';
  public passwordType: string = 'password';

  public user: User = {} as User;

  @BlockUI() private blockUi!: NgBlockUI;

  constructor(
    private socialService: AuthService,
    private userService: UserService,
    private utilService: UtilService,
    private sessionHandler: SessionHandler,
    private modalCtrl: ModalController,
  ) {
  }

  public ngOnInit(): void {
    console.log('INIT');
  }

  public saveEmailPassword(): void {
    this.isFormValid();
    console.log('USER TO SAvVE: ', this.user);
  }

  public async saveGoogle(): Promise<void> {
    const bus = await this.busSelection();

    if (bus.length > 0) {
      this.blockUi.start();
      await this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(this.blockUi.stop);
      this.createGoogleUser(bus);
    }
  }

  public showPassword(): void {
    if (this.passwordIcon === 'eye-off') {
      this.passwordIcon = 'eye';
      this.passwordType = 'text';
    } else {
      this.passwordIcon = 'eye-off';
      this.passwordType = 'password';
    }
  }

  public isFormValid(): string | undefined {
    /* tslint:disable:max-line-length */
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(this.user.email && this.user.password)) return 'empty';

    if (!email.test(this.user.email)) return 'email';

    if (this.user.password.length < 5) return 'password';
  }

  private async createGoogleUser(bus: Bus[]): Promise<void> {
    this.socialService.authState.pipe(
      mergeMap(socialUser => {
        const user = SocialUserToUser(socialUser);
        user.onibus = bus;
        return this.userService.createUser(user)
          .pipe(
            finalize(() => this.blockUi.stop()),
          );
      }),
    ).subscribe(
      res => {
        this.sessionHandler.loginWithGoogle(res);
        this.utilService.showToast(`${ res.name } cadastrado com sucesso`, 'success');
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.utilService.showToast('Usuário já cadastrado', 'danger');
        }
      });
  }

  private async busSelection(): Promise<Bus[]> {
    const modal = await this.modalCtrl.create({
      component: BusSelectionModalComponent,
    });
    await modal.present();
    const payload = await modal.onDidDismiss();
    return payload.data;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
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
export class NewAccountComponent {
  public readonly contentColor: string = environment.contentColor;
  public readonly appName: string = environment.appName;

  @BlockUI() private blockUi!: NgBlockUI;

  constructor(
    private socialService: AuthService,
    private userService: UserService,
    private utilService: UtilService,
    private sessionHandler: SessionHandler,
    private modalCtrl: ModalController,
  ) { }

  public async saveEmailPassword(): Promise<void> {
  }

  public async saveGoogle(): Promise<void> {
    const bus = await this.busSelection();

    if (bus && bus.length > 0) {
      this.blockUi.start();
      await this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(this.blockUi.stop);
      this.createGoogleUser(bus);
    }
  }

  private async createGoogleUser(bus: Bus[]): Promise<void> {
    this.socialService.authState.pipe(
      mergeMap(socialUser => {
        const user = SocialUserToUser(socialUser);
        user.bus = bus;
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

  private createEmailPasswordUser(user: User, bus: Bus[]): void {
    const password = user.password;
    user.bus = bus;
    this.blockUi.start();

    this.userService.createUser(user).pipe(
      finalize(() => this.blockUi.stop()),
    ).subscribe(
      res => {
        res.password = password;
        this.sessionHandler.loginWithEmail(res);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.utilService.showToast('Usuário já cadastrado', 'danger');
        }
      },
    );
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

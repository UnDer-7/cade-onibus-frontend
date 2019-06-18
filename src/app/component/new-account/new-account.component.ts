import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SessionHandler } from '../../auth/session.handler';
import { Bus } from '../../model/bus.model';
import { SocialUserToUser, User } from '../../model/user.model';
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
    private sessionHandler: SessionHandler,
    private modalCtrl: ModalController,
    private utilService: UtilService,
  ) { }

  public async saveEmailPassword(user: User): Promise<void> {
    const bus = await this.busSelection();

    if (bus && bus.length > 0) {
      user.bus = bus;
      this.createEmailPasswordUser(user);
    }
  }

  public async saveGoogle(): Promise<void> {
    const bus = await this.busSelection();

    if (bus && bus.length > 0) {
      this.blockUi.start();
      try {
        await this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.createGoogleUser(bus);
      } catch (err) {
        console.log('Error while trying to login with google\n', err);
        // tslint:disable-next-line:no-unused-expression
        this.blockUi.stop();
      }
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

  private createEmailPasswordUser(user: User): void {
    const password = user.password;
    this.blockUi.start();

    this.userService.createUser(user).pipe(
      finalize(() => this.blockUi.stop()),
    ).subscribe(
      res => {
        res.password = password;
        this.sessionHandler.loginWithEmail(res);
        this.utilService.showToast(`${ res.name } cadastrado com sucesso`, 'success');
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

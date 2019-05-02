import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../auth/token.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../auth/session.service';
import { ModalController } from '@ionic/angular';
import { UserFormComponent } from '../modals/user-form/user-form.component';
import { PerfilService } from './perfil.service';
import { UtilService } from '../../util/util.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
})
export class PerfilPage {
  public user: User;
  public appName: string = environment.appName;
  public isLoading: boolean = true;
  public successLoading: boolean = false;

  constructor(
    public util: UtilService,
    private perfilService: PerfilService,
    private tokenService: TokenService,
    private router: Router,
    private sessionService: SessionService,
    private modalCtrl: ModalController,
  ) {
    this.user = {} as User;
  }

  public ionViewDidEnter(): void {
    this.isLoading = true;
    this.successLoading = false;
    this.getUser();
  }

  public logout(): void {
    this.sessionService.logout();
  }

  public refresh(event: any): void {
    this.getUser(event);
  }

  public async editUser(): Promise<any> {
    const user = Object.assign({}, this.user);
    const modal = await this.modalCtrl.create({
      component: UserFormComponent,
      componentProps: {
        user: user,
        action: 'edit'
      }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.getUser();
    });
  }

  private getUser(event?: any): void {
    const id = this.tokenService.decodeToken()._id;
    this.perfilService.findUser(id).pipe(
      finalize(() => {
        if (event) event.target.complete(); // o refresh foi finalizado
        this.isLoading = false;
      })
    ).subscribe(
      res => {
        this.user = res;
        this.successLoading = true;
      },
      () => this.successLoading = false);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { UtilService } from '../../../util/util.service';
import { Onibus } from '../../../models/onibus.modal';
import { FindBusPage } from '../find-bus/find-bus.page';
import { Validate } from '../../../util/validate';
import { environment } from '../../../../environments/environment';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() public user: User;
  @Input() public action: string;

  public passwordIcon: string = 'eye-off';
  public passwordType: string = 'password';
  public appName: string = environment.appName;

  @BlockUI() private blockUi: NgBlockUI;

  constructor(
    public util: UtilService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private alertCtrl: AlertController
  ) {
  }

  public ngOnInit(): void {
    if (!this.user) {
      this.initializeUser();
    }
  }

  public save(): void {
    if (!this.validations()) {
      return;
    }

    if (this.user._id) {
      this.subscribeToSaveResponse(this.userService.updateUser(this.user));
    } else {
      this.subscribeToSaveResponse(this.userService.createUser(this.user));
    }
  }

  public async closeModal(user?: User): Promise<any> {
    this.modalCtrl.dismiss(user);
  }

  public async showLines(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: FindBusPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      data.forEach(item => {
        this.user.onibus = [...this.user.onibus, item];
      });
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

  public async deleteAllBus(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Remover seus ônibus',
      message: 'Tem certeza que quer remover todos seus ônibus?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.user.onibus = [];
          }
        },
        {
          text: 'Não',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  private async subscribeToSaveResponse(result: Observable<User>): Promise<any> {
    this.blockUi.start();
    result.subscribe(res => {
      if (this.user._id) {
        this.util.showToast('Conta alterada com sucesso', 'success');
        this.closeModal(res);
        this.blockUi.stop();
      } else {
        this.util.showToast('Conta criado com sucesso', 'success');
        this.closeModal();
        this.blockUi.stop();
      }
    }, err => {
      if (err.error === 'User already exists') {
        this.blockUi.stop();
        this.util.showToast('Já existe um usuário com esse e-mail', 'danger');
        return;
      }
      this.blockUi.stop();
    });
  }

  private validations(): boolean {
    if (this.user._id) {
      if (!(this.user.email && this.user.name)) {
        this.util.showToast('Preencha todos os campos', 'danger');
        return false;
      }

      if (!Validate.email(this.user.email)) {
        this.util.showToast('E-mail invalido', 'danger');
        return false;
      }

      if (Validate.onibus(this.user.onibus)) {
        this.util.showToast('Selecione ao menos um ônibus', 'danger');
        return false;
      }
    } else {
      if (!(this.user.email && this.user.password && this.user.name)) {
        this.util.showToast('Preencha todos os campos', 'danger');
        return false;

      }

      if (!Validate.email(this.user.email)) {
        this.util.showToast('E-mail invalido', 'danger');
        return false;
      }

      if (Validate.password(this.user.password)) {
        this.util.showToast('Senha tem que ter no minimo 5 caracteres', 'danger');
        return false;
      }
      if (Validate.onibus(this.user.onibus)) {
        this.util.showToast('Selecione ao menos um ônibus', 'danger');
        return false;
      }
    }
    return true;
  }

  private initializeUser(): void {
    this.user = {} as User;
    this.user.onibus = [] as Onibus[];
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Validate } from '../../../util/validate.js';
import { ModalController, ToastController } from '@ionic/angular';
import { FindBusPage } from '../../modal/find-bus/find-bus.page';
import { UtilService } from '../../../util/util.service';
import { Onibus } from '../../onibus.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {
  public user: User;
  public passwordIcon: string = 'eye-off';
  public passwordType: string = 'password';

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private util: UtilService,
    private route: Router
  ) {
    this.user = new User();
    this.user.onibus = new Array<Onibus>();
  }

  public ngOnInit(): void {
  }

  public save(): void {
    if (this.validations()) {
      this.authService.create(this.user).subscribe(res => {
        this.util.showToast('Conta criado com sucesso', 'success');
        this.route.navigate(['/auth/login']);
      }, err => {
        if (err.error === 'User already exists') {
          this.util.showToast('Já existe um usuário com esse e-mail');
        }
      });
    }
  }

  public async showLines(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: FindBusPage
    });
    await modal.present();
    const { data }: any = await modal.onWillDismiss();
    this.user.onibus = data;
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

  private validations(): boolean {

    if (!(this.user.email && this.user.password && this.user.name)) {
      this.util.showToast('Preencha todos os campos', 'danger');
      return false;

    }

    if (!Validate.email(this.user.email)) {
      this.util.showToast('E-mail invalido', 'danger');
      return false;
    }

    if (this.user.password.length < 5) {
      this.util.showToast('Senha tem que ter no minimo 5 caracteres', 'danger');
      return false;
    }
    if (this.user.onibus.length < 1) {
      this.util.showToast('Selecione ao menos um ônibus', 'danger');
      return false;
    }
    return true;
  }
}

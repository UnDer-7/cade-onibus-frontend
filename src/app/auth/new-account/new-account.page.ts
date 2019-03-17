import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Validate } from '../../util/validate.js';
import { ModalController, ToastController } from '@ionic/angular';
import { FindBusPage } from '../../find-bus/find-bus.page';

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
    private modalCtrl: ModalController
  ) {
    this.user = new User();
  }

  public ngOnInit(): void {
  }

  public save(): void {
    if (this.validations()) {
      console.log('SALVOU');
      // this.authService.create(this.user).subscribe(res => {
      //   console.log('RES: ', res);
      // });
    }
  }

  public async showLines(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: FindBusPage
    });
    return await modal.present();
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
    if (!(this.user.email && this.user.password)) {
      this.presentToast('Preencha todos os campos', 1700);
      return false;
    }

    if (!Validate.email(this.user.email)) {
      this.presentToast('E-mail invalido');
      return false;
    }

    if (this.user.password.length < 5) {
      this.presentToast('Senha tem que ter no minimo 5 caracteres', 2500);
      return false;
    }
    return true;
  }

  private async presentToast(msg: string, duration: number = 2000): Promise<any> {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
      color: 'danger',
      position: 'top',
      translucent: true
    });
    toast.present();
  }
}

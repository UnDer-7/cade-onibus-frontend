import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {User} from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-password-model',
  templateUrl: 'password-model.html',
})
export class PasswordModelPage {
  user = new User();
  repetPassword: string;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordModelPage');
  }

  public close(){
    if (this.user.password && this.repetPassword) {
      if (this.user.password === this.repetPassword) {
        if (this.user.password.length >= 6) {
          this.viewCtrl.dismiss();
        } else {
          this.toast.create({
            message: `Minimo de 6 caracteres`,
            duration: 3000
          }).present();
        }
      } else {
        this.toast.create({
          message: `Senhas diferentes`,
          duration: 3000
        }).present();
      }
    } else {
      this.toast.create({
        message: `Preencha todos os campos`,
        duration: 3000
      }).present();
    }
  }
}

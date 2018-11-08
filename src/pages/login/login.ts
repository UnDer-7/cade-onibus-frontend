import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import { User } from '../../models/user';
import {AuthService} from "../../service/securityService/auth.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fireAuth: AngularFireAuth,
    private toast: ToastController,
    private menu: MenuController,
    private authService: AuthService) {
    this.user = new User();
  }

  public register(): void {
    this.navCtrl.push('RegisterPage');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  /**
   * Realiza o login utilizando email e senha.
   * Se a operação for realizada com sucesso o usuário sera redirecionado pra HomePage
   * @param user - Model User
   */
  public async login(user: User) {
    this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(success => {
      if (success) {
        this.authService.successfulLogin(success.user.email);
        this.navCtrl.setRoot('HomePage');
      }
    }).catch(fail => {
      this.showToast(fail.code);
    })
  }

  /**
   * Mostra um Toast se o login falhar
   * @param code - {fail.code} Resposta da Promise
   */
  private showToast(code: string): void{
    if(code === 'auth/user-not-found'){
      this.toast.create({
        message: `Usuário não cadastro`,
        duration: 3000
      }).present()
    }else if(code === 'auth/wrong-password'){
      this.toast.create({
        message: `Senha invalida`,
        duration: 3000
      }).present()
    }
  }
}

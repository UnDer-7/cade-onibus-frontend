import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService} from "../../service/modelService/user.service";
import {AuthService} from "../../service/securityService/auth.service";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user: User = new User();
  private PATH = 'users/';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fireAuth: AngularFireAuth,
    private toast: ToastController,
    private userService: UserService,
    private authService: AuthService,
    private menu: MenuController) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**
   * Registra um usuário no firebase utilizando email/senha
   * @param user - Model User
   */
  public register(user: User) {
    this.authService.register(user).then(success => {
      this.saveProfile(user, success.user.uid);
    }).catch(fail => {
      console.error(`Falha ao realizar cadastro\n ${fail}`);
      this.showValidationToast(fail.code);
    })
  }

  /**
   * Mostra um Toast se o cadastro falhar
   * @param code - {fail.code} Resposta da Promise
   */
  private showValidationToast(code: string): void {
    if (code === 'auth/email-already-in-use') {
      this.toast.create({
        message: `Email já cadastrado!`,
        duration: 3000
      }).present()
    } else if (code === 'auth/weak-password') {
      this.toast.create({
        message: `Senha deve ter no minimo 6 dígitos!`,
        duration: 3000
      }).present()
    } else if (code === 'auth/invalid-email') {
      this.toast.create({
        message: `Email invalido!`,
        duration: 3000
      }).present()
    }
  }

  /**
   * Salva um novo usuario no firebase Realtime Databese
   * @param User
   * @param uid - ID do usuario gerado na hora de realizar o cadastro dele no firebase Authentication
   */
  private saveProfile(user: User, uid: string) {
    user.password = null;
    this.userService.saveUser(user, uid).then(() => {
      this.navCtrl.setRoot('LoginPage');
      this.toast.create({
        message: `Cadastro realizado com sucesso!`,
        duration: 3000
      }).present();
    }).catch(fail => {
      console.error('Erro ao salvar no firebase:\n', fail);
      this.toast.create({
        message: `Falha ao realizar o cadastro!`,
        duration: 3000
      }).present();
    })
  }
}

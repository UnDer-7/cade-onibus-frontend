import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fireAuth: AngularFireAuth,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**
   * @author UnDer7
   * Registra um usuário no firebase utilizando email/senha
   * @param user - Model User
   */
  public async register(user: User) {
    this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(success => {
      console.log('Cadastro realizado com sucesso\nRETORNO: ', success);
      this.toast.create({
        message: `Cadastro realizado com sucesso!`,
        duration: 3000
      }).present()
      this.navCtrl.setRoot('LoginPage');
    }).catch(fail => {
      console.log('%cFalha ao realizar cadastro', 'color:red', '\nERROR: ', fail);
     this.showToast(fail.code);
    })
  }

  /**
   * Mostra um Toast se o cadastro falhar
   * @param code - {fail.code} Resposta da Promise
   */
  private showToast(code: string): void{
    if(code === 'auth/email-already-in-use'){
      this.toast.create({
        message: `Email já cadastrado!`,
        duration: 3000
      }).present()
    }else if(code === 'auth/weak-password'){
      this.toast.create({
        message: `Senha deve ter no minimo 6 dígitos!`,
        duration: 3000
      }).present()
    }else if(code === 'auth/invalid-email'){
      this.toast.create({
        message: `Email invalido!`,
        duration: 3000
      }).present()
    }
  }
}

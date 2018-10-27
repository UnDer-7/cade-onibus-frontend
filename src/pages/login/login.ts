import { HomePage } from './../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fireAuth: AngularFireAuth,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * @author UnDer7
   * Realiza o login utilizando email e senha.
   * Se a operação for realizada com sucesso o usuário sera redirecionado pra HomePage
   * @param user - Usuario
   */
  public async login(user: User) {
    this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(success => {
      if (success) {
        console.log('login realizado com sucesso!\nRETORNO: ', success);
        this.navCtrl.setRoot('HomePage');
      }
    }).catch(fail => {
      console.log('Erro ao realizar login!\nERROR: ', fail)
      this.isValid(fail.code);
    })
  }

  public register(): void {
    this.navCtrl.push('RegisterPage');
  }

  public isValid(code: string){
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

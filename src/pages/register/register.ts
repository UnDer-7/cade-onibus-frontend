import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

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
    private db: AngularFireDatabase) {
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
      this.toast.create({
        message: `Cadastro realizado com sucesso!`,
        duration: 3000
      }).present();
      this.navCtrl.setRoot('LoginPage');
      this.saveProfile(user, success.user.uid);
    }).catch(fail => {
      console.log('%cFalha ao realizar cadastro', 'color:red', '\nERROR: ', fail);
     this.showValidationToast(fail.code);
     console.log('NOT!');
    })
  }

  /**
   * Mostra um Toast se o cadastro falhar
   * @param code - {fail.code} Resposta da Promise
   */
  private showValidationToast(code: string): void{
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

  private saveProfile(user: User, uid: string){
    //ENCRIPITAR SENHA
    this.user.password = null;
    return new Promise((resolve, reject) => {
      this.db.object(this.PATH + uid).update({user})
        .then(() => console.log("salvou"))
        .catch((e) => console.log("error: ", e))
    });
  }
}

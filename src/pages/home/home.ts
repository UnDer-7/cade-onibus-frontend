import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private toast: ToastController) {  }

    ionViewWillEnter(){
     this.fireAuth.authState.subscribe(result => {
      this.toast.create({
         message: `Bem vindo ao APP_NAME, ${result.email}`,
         duration: 3000
       }).present();
     });
    }
}

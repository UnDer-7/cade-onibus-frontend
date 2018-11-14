import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageService} from '../../service/securityService/storage.service';
import {LocalUser} from "../../models/local_user";
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {r} from "@angular/core/src/render3";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  // localUser = {} as LocalUser;
  localUser: LocalUser;
  user = new User();
  PATH = 'users/';
  regex: RegExp = /["]/g;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService,
    private db: AngularFireDatabase) {
    this.localUser = new LocalUser();
    this.localUser.email = this.storageService.getLocalUser();
  }

  ionViewDidLoad() {
    this.getUser();
    console.log('User: ', this.user);
  }

  public getUser(){
    this.loadUser().subscribe((res) => {
      console.log('Res: ', res);
      this.user = res;
    })
  }
  // FAZER UMA SERVICE PARA O FIREBASE DATABE
  public loadUser(): Observable<User>{

    console.log('UID: ', this.storageService.getLocalUser().replace(this.regex, ''));

    return this.db.object(this.PATH + this.storageService.getLocalUser().replace(this.regex, '/') + '/user').valueChanges();
  }
}

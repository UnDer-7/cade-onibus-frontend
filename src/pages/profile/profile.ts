import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageService} from '../../service/securityService/storage.service';
import {LocalUser} from "../../models/local_user";

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
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService) {
    this.localUser = new LocalUser();
    console.log('Email: ', this.storageService.getLocalUser());
    this.localUser.email = this.storageService.getLocalUser();
  }

  ionViewDidLoad() {
  }
}

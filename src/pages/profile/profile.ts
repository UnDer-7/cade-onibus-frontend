import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageService} from '../../service/securityService/storage.service';
import {LocalUser} from "../../models/local_user";
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {r} from "@angular/core/src/render3";
import {UserService} from "../../service/modelService/user.service";

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
  user = new User();
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService,
    private userService: UserService) {
  }

  ionViewDidLoad() {
    this.getUser();
  }

  public getUser(){
    this.loadUser().subscribe(res => {
      this.user = res;
    });
  }

  public loadUser(){
    return this.userService.getUser(this.storageService.getLocalUser());
  }
}

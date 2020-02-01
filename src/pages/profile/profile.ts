import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from '../../service/securityService/storage.service';
import {User} from "../../models/user";
import {UserService} from "../../service/modelService/user.service";
import {PasswordModelPage} from "../password-model/password-model";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = new User();
  isEdit = false;
  editColor: string;
  index: number  = 0;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private modelCtrl: ModalController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.loadUser().subscribe( res => {
      this.user = res;
      loading.dismissAll();
    })
  }

  public editUser() {
    this.index += 1;
    this.isEdit = true;
    this.editColor = 'secondary';
    let loading = this.loadingCtrl.create();
    console.log('index', this.index);

    if (this.index > 1) {
      loading.present();
      this.userService.updateUser(this.user, this.storageService.getLocalUser()).then(() => {
        this.isEdit = false;
        this.editColor = 'primary';
        loading.dismissAll();
      }).catch(fail => {
        console.error('Error ao atualizar usuario: ', fail);
        loading.dismissAll();
      });
      this.index = 0;
    }
  }

  public changePassword() {
    let passwordModal = this.modelCtrl.create(PasswordModelPage, {}, {cssClass: 'password-modal', showBackdrop: false});
    passwordModal.present();

    passwordModal.onDidDismiss(data => {
      console.log('Data: ', data)
    })
  }
  private loadUser(){
    return this.userService.getUser(this.storageService.getLocalUser());
  }
}

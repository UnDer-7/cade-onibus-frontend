import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, PickerController } from '@ionic/angular';
import { TokenService } from 'src/app/auth/token.service';
import { User } from 'src/app/models/user.model';
import { UtilService } from 'src/app/util/util.service';
import { HomeService } from './home.service';
import { Onibus } from '../../models/onibus.modal';
import { MapsPage } from '../modals/maps/maps.page';
import { UserLocation } from '../../models/user.location.model';
import { SessionService } from '../../auth/session.service';
import { environment } from '../../../environments/environment';
import { SharingLocationService } from '../../util/sharing-location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})
export class HomePage {
  public appName: string = environment.appName;
  public user: User;
  public userLocation: UserLocation = {} as UserLocation;

  private token: any;

  constructor(
    public util: UtilService,
    private menuCtrl: MenuController,
    private tokenService: TokenService,
    private homeService: HomeService,
    private router: Router,
    private pickerCtrl: PickerController,
    private modalCtrl: ModalController,
    private sessionService: SessionService,
    private sharingLocationService: SharingLocationService
  ) { }

  public ionViewDidEnter(): void {
    this.token = this.tokenService.decodeToken();
    this.homeService.findUser(this.token._id).subscribe(
      res => this.user = res,
      err => {
        this.util.showToast('Houve um erro na requisição. Tente recarregar a página.');
        console.error(err);
      }
    );
  }

  public async openPicker(): Promise<any> {
    const onibusPicker = this.user.onibus.map(item => {
      return Object.assign({}, {
        text: item.numero,
        value: item
      });
    });
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: 'Compartilhar',
          handler: value => {
            this.startSharing(value.onibus.value);
          }
        },
      ],
      columns: [
        {
          name: 'onibus',
          options: onibusPicker
        }
      ],
    });
    await picker.present();
  }

  public sendToPerfil(): void {
    this.router.navigate(['perfil']);
  }

  public async followBus(onibus: Onibus): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MapsPage,
      componentProps: {
        onibus: onibus
      }
    });
    await modal.present();
  }

  public logout(): void {
    this.sessionService.logout();
  }

  public stopSharing(): void {
    this.sharingLocationService.stopSharing();
  }

  private startSharing(onibus: Onibus): void {
    this.sharingLocationService.startSharing(onibus);
  }
}

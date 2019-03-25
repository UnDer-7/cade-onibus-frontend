import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PickerController } from '@ionic/angular';
import { TokenService } from 'src/app/auth/Token.service';
import { User } from 'src/app/models/user.model';
import { UtilService } from 'src/app/util/util.service';
import { HomeService } from './home.service';
import { GeolocationPosition, Plugins } from '@capacitor/core';
import { BusPosition } from '../../models/bus-position.model';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})
export class HomePage {

  public user: User;
  private token: any;
  private busPosition: BusPosition = {} as BusPosition;

  constructor(
    private menuCtrl: MenuController,
    private tokenService: TokenService,
    private homeService: HomeService,
    private util: UtilService,
    private router: Router,
    private pickerCtrl: PickerController
  ) {
  }

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
        value: item.numero
      });
    });
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: 'Compartilhar',
          handler: value => {
            this.sharingLocation(value.onibus.value);
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

  public openFrist(): void {
    this.menuCtrl.enable(true, 'main');
    this.menuCtrl.open('main');
  }

  public sendToPerfil(): void {
    this.router.navigate(['perfil']);
  }

  public sendToMaps(): void {
    this.router.navigate(['map']);
  }

  private sharingLocation(linha: string): void {
    const id = Geolocation.watchPosition({
      enableHighAccuracy: true,
      maximumAge: 0
    }, res => {
      this.busPosition = <BusPosition>res.coords;
      this.busPosition.linha = linha;
      console.log('onibusPosition', this.busPosition);
      this.homeService.createBus(this.busPosition).subscribe(item => {
        console.log('item: ', item);
      });
    });
    console.log('ID: ', id);
  }
}

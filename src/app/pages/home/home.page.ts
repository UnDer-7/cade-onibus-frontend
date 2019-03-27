import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, PickerController } from '@ionic/angular';
import { TokenService } from 'src/app/auth/Token.service';
import { User } from 'src/app/models/user.model';
import { UtilService } from 'src/app/util/util.service';
import { HomeService } from './home.service';
import { Plugins } from '@capacitor/core';
import { Onibus } from '../../models/onibus.modal';
import { MapsPage } from '../modals/maps/maps.page';
import { UserLocation } from '../../models/user.location.model';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})
export class HomePage {

  public user: User;
  public userLocation: UserLocation = {} as UserLocation;

  private token: any;
  private watchPositionId: string;

  constructor(
    private menuCtrl: MenuController,
    private tokenService: TokenService,
    private homeService: HomeService,
    private util: UtilService,
    private router: Router,
    private pickerCtrl: PickerController,
    private modalCtrl: ModalController
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

  public stopSharing(): void {
    this.util.stopSharing();
    Geolocation.clearWatch({ id: this.watchPositionId });
  }

  private startSharing(onibus: Onibus): void {
    this.util.startSharing();
    this.watchPositionId = Geolocation.watchPosition({
      enableHighAccuracy: true,
      maximumAge: 0
    }, res => {
      this.userLocation = this.prepareUserLocation(res, onibus);
      this.homeService.createBus(this.userLocation).subscribe(item => {
        console.log('RES: ', item);
      });
    });
  }

  /**
   * - Pq isso existe?
   * -- pq se fizer só this.userLocation.cords = res.cords
   * ele nao vai conseguir transformar o obj Cords
   * em JSON, vai ficar vazio
   * - Motivo
   * -- Não tenho certeza, mas ele fica tipo com um tipo
   * Coords todo em em caps e nao consegue tranformar em JSON,
   * o OBJ fica vazio.
   * @param res - Resposta q vem do watchPosition
   * @param onibus - Onibus Selecionado no PickList
   */
  private prepareUserLocation(res: any, onibus: Onibus): UserLocation {
    return Object.assign({}, res, {
      cords: Object.assign({}, res, {
        accuracy: res.coords.accuracy,
        altitude: res.coords.altitude,
        heading: res.coords.heading,
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        speed: res.coords.speed
      }),
      numero: onibus.numero,
      sequencial: onibus.sequencial
    });
  }
}

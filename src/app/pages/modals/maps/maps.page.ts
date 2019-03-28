import { Component, Input, OnInit } from '@angular/core';
import { Onibus } from '../../../models/onibus.modal';
import { MapsService } from './maps.service';
import { BusLocation } from '../../../models/bus-location.model';
import { Plugins } from '@capacitor/core';
import { Subscription, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { UtilService } from '../../../util/util.service';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../../auth/session.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
})
export class MapsPage implements OnInit {
  @Input() public onibus: Onibus;

  public appName: string = environment.appName;
  public userLocation: number[] = new Array<number>();
  public busLocation: BusLocation[] = [] as BusLocation[];

  private subscription: Subscription;

  constructor(
    public util: UtilService,
    private mapsService: MapsService,
    private sessionService: SessionService,
    private router: Router,
    private modalCtrl: ModalController
  ) {
  }

  public ngOnInit(): void {
    this.getUserCurrentPosstion();

    this.subscription = timer(0, 5000)
      .pipe(
        flatMap(() => this.mapsService.trackBus(this.onibus.numero))
      ).subscribe(res => {
      this.busLocation = res.features;
    });
  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
    this.subscription.unsubscribe();
  }

  private async getUserCurrentPosstion(): Promise<any> {
    const currentPosition = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.userLocation[1] = currentPosition.coords.latitude;
    this.userLocation[0] = currentPosition.coords.longitude;
  }
}

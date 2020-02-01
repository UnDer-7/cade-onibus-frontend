import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Onibus } from '../../../models/onibus.modal';
import { MapsService } from './maps.service';
import { BusLocation } from '../../../models/bus-location.model';
import { Subscription, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { UtilService } from '../../../util/util.service';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../../auth/session.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserLocation } from '../../../models/user.location.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SharingLocationService } from '../../../util/sharing-location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
})
export class MapsPage implements OnInit, OnDestroy {
  @Input() public onibus: Onibus;

  public userCurrentLocation: number[] = new Array<number>();
  public userFirstLocation: number[] = new Array<number>();

  public appName: string = environment.appName;
  public busLocation: BusLocation[] = [] as BusLocation[];
  public userBusLocation: Array<UserLocation> = new Array<UserLocation>();

  public icon: any = {
    dfTrans: {
      url: '../../../../assets/bus-icon-dfTrans.png',
      scaledSize: {
        width: 43,
        height: 40
      }
    },
    busUser: {
      url: '../../../../assets/bus-icon-user.png',
      scaledSize: {
        width: 43,
        height: 40
      }
    },
    user: {
      url: '../../../../assets/user-icon.png',
      scaledSize: {
        width: 43,
        height: 40
      }
    }
  };

  private subscription: Array<Subscription> = new Array<Subscription>();

  constructor(
    public util: UtilService,
    public sharingLocationService: SharingLocationService,
    private mapsService: MapsService,
    private sessionService: SessionService,
    private router: Router,
    private modalCtrl: ModalController,
    private geolocation: Geolocation
  ) {
  }

  public ngOnInit(): void {
    this.watchUserCurrentPosition();
    this.getUserCurrentPosition();

    this.subscription.push(
      timer(0, 5000)
        .pipe(
          flatMap(() => this.mapsService.trackBus(this.onibus.numero))
        ).subscribe(res => {
        this.busLocation = res.features;
      })
    );

    this.subscription.push(
      timer(0, 5000)
        .pipe(
          flatMap(() => this.mapsService.getUserByLinha(this.onibus.numero))
        ).subscribe(res => {
        this.userBusLocation = res;
      }, (err: HttpErrorResponse) => {
        if (err.error === 'bus not found') {
          this.util.showToast('Nem um usuário esta compartilhando esse ônibus.\nVocê pode ser o primeiro.', 'tertiary', 7500, '', true);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
    this.ngOnDestroy();
  }

  public startSharing(): void {
    this.sharingLocationService.startSharing(this.onibus);
  }

  public stopSharing(): void {
    this.sharingLocationService.stopSharing();
  }

  private async getUserCurrentPosition(): Promise<any> {
    const current = await this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      maximumAge: 0
    });
    this.userFirstLocation[1] = current.coords.latitude;
    this.userFirstLocation[0] = current.coords.longitude;
  }

  private async watchUserCurrentPosition(): Promise<any> {
    this.subscription.push(
      this.geolocation.watchPosition(
        {
          maximumAge: 0,
          enableHighAccuracy: true
        })
        .subscribe(res => {
          this.userCurrentLocation[1] = res.coords.latitude;
          this.userCurrentLocation[0] = res.coords.longitude;
        }, err => {
          console.log(`Error while trying to ger user's location\n${ err }`);
        })
    );
  }
}

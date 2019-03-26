import { Component, Input, OnInit } from '@angular/core';
import { Onibus } from '../../../models/onibus.modal';
import { MapsService } from './maps.service';
import { BusLocation } from '../../../models/bus-location.model';
import { Plugins } from '@capacitor/core';
import { pipe, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
})
export class MapsPage implements OnInit {
  @Input() public onibus: Onibus;
  public userLocation: number[] = new Array<number>();

  public busLocation: BusLocation[] = [] as BusLocation[];

  constructor(
    private mapsService: MapsService
  ) {
  }

  public ngOnInit(): void {
    this.getUserCurrentPosstion();

    timer(0, 5000)
      .pipe(
        flatMap(() => this.mapsService.trackBus(this.onibus.numero))
      ).subscribe(res => {
      this.busLocation = res.features;
    });
  }

  private async getUserCurrentPosstion(): Promise<any> {
    const currentPosition = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.userLocation[1] = currentPosition.coords.latitude;
    this.userLocation[0] = currentPosition.coords.longitude;
  }
}

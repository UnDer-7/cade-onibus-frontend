import { Component, Input, OnInit } from '@angular/core';
import { Onibus } from '../../../models/onibus.modal';
import { MapsService } from './maps.service';
import { BusLocation } from '../../../models/bus-location.model';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
})
export class MapsPage implements OnInit {
  @Input() public onibus: Onibus;
  public userLocation: number[] = new Array<number>();

  private busLocation: BusLocation[] = [] as BusLocation[];

  constructor(
    private mapsService: MapsService
  ) {
  }

  public ngOnInit(): void {
    this.getUserCurrentPosstion();

    this.mapsService.trackBus(this.onibus.numero).subscribe(res => {
      this.busLocation = res.features;

      console.log('BUS: ', this.busLocation);
      console.log('Lat: ', this.busLocation[0].geometry.coordinates[1]);
      console.log('Long: ', this.busLocation[0].geometry.coordinates[1]);
    });
  }

  private async getUserCurrentPosstion(): Promise<any> {
    const currentPosition = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.userLocation[1] = currentPosition.coords.latitude;
    this.userLocation[0] = currentPosition.coords.longitude;
  }
}

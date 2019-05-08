import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BusCoordinates, ObjectsToBusCoordinates } from '../../../models/bus-coordinates.model';
import { Coordinates } from '../../../models/coordinates.model';
import { DfTransService } from '../../../resource/df-trans.service';

declare const google: any;

@Component({
  selector: 'app-tab-map',
  templateUrl: 'tab-map.component.html',
})
export class TabMapComponent {
  public readonly appName: string = environment.appName;
  public readonly appColor: string = environment.contentColor;

  public icons: any = {
    dfTrans: {
      url: '../../../../assets/bus-icon-dfTrans.png',
      scaledSize: {
        width: 43,
        height: 40,
      },
    },
  };

  public userCurrentPosition: Coordinates = {} as Coordinates;
  public userPosition: Coordinates = {} as Coordinates;
  public busCurrentPosition: BusCoordinates[] = [] as BusCoordinates[];
  public searchParams: string = '';

  @ViewChild('search') public search!: any;
  private subscription: Subscription[] = [] as Subscription[];
  private watchLocationID!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dfTransService: DfTransService,
  ) {
  }

  public ionViewWillEnter(): void {
    this.initializeVariables();
    const linha = this.activatedRoute.snapshot.paramMap.get('linha');

    this.getUserLocation();
    this.watchUserLocation();

    this.watchBusLocation(linha);
  }

  public ionViewDidLeave(): void {
    this.subscription.forEach(item => item.unsubscribe());
    navigator.geolocation.clearWatch(this.watchLocationID);
  }

  public mapsReady(event?: any): any {
    event.controls[google.maps.ControlPosition.TOP_LEFT].push(this.search.el);
  }

  public findBus(): void {
    if (!this.searchParams) return;
    console.log('1: ', this.searchParams);
  }

  private watchBusLocation(linha: string | null): void {
    if (!linha) return;
    this.subscription.push(
      timer(0, 5000).pipe(
        flatMap(() => this.dfTransService.watchBusLocation(linha)),
      ).subscribe(res => {
        this.busCurrentPosition = ObjectsToBusCoordinates(res);
      }),
    );
  }

  private watchUserLocation(): void {
    this.watchLocationID = navigator.geolocation.watchPosition(
      position => {
        this.userCurrentPosition.latitude = position.coords.latitude;
        this.userCurrentPosition.longitude = position.coords.longitude;
      },
      err => {
        console.warn('Unable to get user current position\n', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 2000,
      },
    );
  }

  private getUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.userPosition.latitude = position.coords.latitude;
        this.userPosition.longitude = position.coords.longitude;
      },
      err => {
        console.warn('Unable to get user current position\n', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 2000,
      },
    );
  }

  private initializeVariables(): void {
    this.userCurrentPosition = {} as Coordinates;
    this.userPosition = {} as Coordinates;
    this.busCurrentPosition = [] as BusCoordinates[];
    this.subscription = [] as Subscription[];
  }
}

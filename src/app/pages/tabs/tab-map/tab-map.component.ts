import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import { finalize, flatMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BusCoordinates, ObjectsToBusCoordinates } from '../../../models/bus-coordinates.model';
import { Bus } from '../../../models/bus.model';
import { Coordinates } from '../../../models/coordinates.model';
import { DfTransService } from '../../../resource/df-trans.service';
import { UtilService } from '../../../utils/util.service';
import { BusSelectionModalComponent } from '../../modal/bus-selection-modal/bus-selection-modal.component';

declare const google: any;

@Component({
  selector: 'app-tab-map',
  templateUrl: 'tab-map.component.html',
})
export class TabMapComponent {
  public readonly appName: string = environment.appName;
  public readonly appColor: string = environment.contentColor;

  public userCurrentPosition: Coordinates = {} as Coordinates;
  public userPosition: Coordinates = {} as Coordinates;
  public busCurrentPosition: BusCoordinates[] = [] as BusCoordinates[];
  public isLoading: boolean = false;

  public icons: any = {
    dfTrans: {
      url: '../../../../assets/bus-icon-dfTrans.png',
      scaledSize: {
        width: 43,
        height: 40,
      },
    },
  };

  @ViewChild('search') public search!: any;
  @ViewChild('currentBuss') public currentBuss!: any;
  @ViewChild('refresh') public refreshBuss!: any;
  @ViewChild('info') public info!: any;
  @ViewChild('infoList') public infoList!: any;

  public isShowingInfo: boolean = false;

  private subscription: Subscription[] = [] as Subscription[];
  private watchLocationID!: number;
  private linha!: string | null | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dfTransService: DfTransService,
    private modalCtr: ModalController,
    private utilService: UtilService,
  ) {
  }

  public ionViewWillEnter(): void {
    this.initializeVariables();
    this.linha = this.activatedRoute.snapshot.paramMap.get('linha');

    this.getUserLocation();
    this.watchUserLocation();

    this.watchBusLocation();
  }

  public ionViewDidLeave(): void {
    this.subscription.forEach(item => item.unsubscribe());
    navigator.geolocation.clearWatch(this.watchLocationID);
  }

  public mapsReady(event?: any): any {
    event.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.search.el);
    event.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(this.refreshBuss.el);
    event.controls[google.maps.ControlPosition.TOP_LEFT].push(this.currentBuss.el);
    event.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.info.el);
    event.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.infoList.el);
  }

  public async findBus(): Promise<void> {
    const modal = await this.modalCtr.create({
      component: BusSelectionModalComponent,
      componentProps: {
        multiSelect: false,
      },
    });

    await modal.present();
    const payload = await modal.onDidDismiss();
    const bus = payload.data as Bus;
    if (!bus) return;

    this.subscription.forEach(item => item.unsubscribe());
    this.linha = bus.numero;
    this.watchBusLocation();
  }

  public refreshBusPosition(): void {
    if (!this.linha) return;

    this.isLoading = true;
    this.subscription.push(
      this.dfTransService.watchBusLocation(this.linha).pipe(
        finalize(() => this.isLoading = false),
      ).subscribe((res: any) => {
        this.busCurrentPosition = ObjectsToBusCoordinates(res);
        this.noBusFoundHandle();
      }),
    );
  }

  public showInfo(): void {
    this.isShowingInfo = !this.isShowingInfo;
  }

  private watchBusLocation(): void {
    if (!this.linha) return;

    this.subscription.push(
      timer(0, 8000).pipe(
        flatMap(() => {
          this.isLoading = true;
          // @ts-ignore
          return this.dfTransService.watchBusLocation(this.linha).pipe(
            finalize(() => this.isLoading = false),
          );
        }),
      ).subscribe(res => {
        this.busCurrentPosition = ObjectsToBusCoordinates(res);
        this.noBusFoundHandle();
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
    this.linha = null;
  }

  private noBusFoundHandle(): void {
    if (!this.busCurrentPosition || this.busCurrentPosition.length <= 0) {
      this.utilService.showToast('Nenhum ônibus encontrado', 'danger', 99999);
    }
  }
}

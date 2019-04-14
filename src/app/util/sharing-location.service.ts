import { Injectable } from '@angular/core';
import { Onibus } from '../models/onibus.modal';
import { UserLocation } from '../models/user.location.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable()
export class SharingLocationService {
  private isUserSharing: boolean = false;
  private subscription: Array<Subscription> = new Array<Subscription>();
  private userLocation: UserLocation = {} as UserLocation;
  private resourceUrl: string = environment.apiUrl + '/userlocations';
  private startDate: Date;
  private endDate: Date;

  constructor(
    private http: HttpClient,
    private geolocation: Geolocation
  ) {
  }

  public startSharing(onibus: Onibus): void {
    this.startDate = new Date();
    this.isUserSharing = true;
    this.subscription.push(
      this.geolocation.watchPosition(
        {
          maximumAge: 0,
          enableHighAccuracy: true
        })
        .subscribe(res => {
          this.userLocation = this.prepareUserLocation(res, onibus);
          this.subscription.push(this.saveUserLocation(this.userLocation).subscribe());
        })
    );
  }

  public stopSharing(): void {
    this.endDate = new Date();
    console.log('dates: ', this.startDate, this.endDate);
    this.subscription.forEach(item => item.unsubscribe());
    this.isUserSharing = false;
  }

  public isSharing(): boolean {
    return this.isUserSharing;
  }

  private saveUserLocation(userLocation: UserLocation): Observable<UserLocation> {
    return this.http.post<UserLocation>(this.resourceUrl, userLocation);
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
   * @param cb - Resposta q vem do watchPosition
   * @param onibus - Onibus Selecionado no PickList
   */
  private prepareUserLocation(cb: Geoposition, onibus: Onibus): UserLocation {
    return Object.assign({}, cb, {
      cords: Object.assign({}, cb, {
        accuracy: cb.coords.accuracy,
        altitude: cb.coords.altitude,
        heading: cb.coords.heading,
        latitude: cb.coords.latitude,
        longitude: cb.coords.longitude,
        speed: cb.coords.speed
      }),
      numero: onibus.numero,
      sequencial: onibus.sequencial,
      hora: new Date()
    });
  }
}

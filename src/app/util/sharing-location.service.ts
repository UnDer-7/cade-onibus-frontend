import { Injectable } from '@angular/core';
import { GeolocationPosition, Plugins } from '@capacitor/core';
import { Onibus } from '../models/onibus.modal';
import { UserLocation } from '../models/user.location.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

const { Geolocation } = Plugins;

@Injectable()
export class SharingLocationService {
  private isUserSharing: boolean = false;
  private watchPositionID: string;
  private subscription: Subscription;
  private userLocation: UserLocation = {} as UserLocation;
  private resourceUrl: string = environment.apiUrl + '/userlocations';
  private startDate: Date;
  private endDate: Date;

  constructor(
    private http: HttpClient
  ) { }

  public startSharing(onibus: Onibus): void {
    this.startDate = new Date();
    this.isUserSharing = true;
    this.watchPositionID = Geolocation.watchPosition({
      enableHighAccuracy: true,
      maximumAge: 0
    }, cb => {
      this.userLocation = this.prepareUserLocation(cb, onibus);
      this.subscription = this.saveUserLocation(this.userLocation).subscribe();
    });
  }

  public stopSharing(): void {
    this.endDate = new Date();
    console.log('dates: ', this.startDate, this.endDate);
    Geolocation.clearWatch({ id: this.watchPositionID });
    this.subscription.unsubscribe();
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
   * @param res - Resposta q vem do watchPosition
   * @param onibus - Onibus Selecionado no PickList
   */
  private prepareUserLocation(cb: GeolocationPosition, onibus: Onibus): UserLocation {
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
      hora: Date()
    });
  }
}

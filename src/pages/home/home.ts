import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapOptions
} from "@ionic-native/google-maps";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private map: GoogleMap;
  private options: GoogleMapOptions;

  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private toast: ToastController,
    private googleMaps: GoogleMaps,
    private platform: Platform) {
  }

  ionViewWillEnter() {
    this.fireAuth.authState.subscribe(result => {
      this.toast.create({
        message: `Bem vindo ao CadeÔnibus, ${result.email}`,
        duration: 3000
      }).present();
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initMap();
    })
  }

  /**
   * Inicia o GoogleMaps
   * {Comando pra subir: $ ionic cordova run browser -l}
   * Fonte: https://github.com/ionic-team/ionic-native-google-maps
   */
  private initMap(): void {
    this.options = {
      controls: {
        mapToolbar: true,
        myLocationButton: true,
        myLocation: true,
        compass: true
      }
    }
    console.log("OPTIONS: ", this.options);
    this.map = this.googleMaps.create('map_canvas', this.options);
    //Necessário para rodar no browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyChUwZ9OrlG3w2AvQ-m-533sT_K5o9Vd3Y',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyChUwZ9OrlG3w2AvQ-m-533sT_K5o9Vd3Y'
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      let coordinates: LatLng = new LatLng(-15.641637, -47.824363);
      let position = {
        target: coordinates,
        zoom: 15
      };
      this.map.animateCamera(position);
      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: '',
        title: 'Seu ônibus'
      };

      this.map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    });
  }
}

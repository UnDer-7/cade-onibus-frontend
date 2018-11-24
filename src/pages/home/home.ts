import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import {NavController, ToastController, Platform, LoadingController} from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Geolocation } from '@ionic-native/geolocation';
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
    private platform: Platform,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        const userLat = resp.coords.latitude;
        const userLong = resp.coords.longitude;
        console.log(resp);
        this.initMap(userLat, userLong);
        loading.dismissAll();
       }).catch((error) => {
         console.log('Error getting location', error);
        loading.dismissAll();
       });
      // let watch = this.geolocation.watchPosition();
      //   watch.subscribe((data) => {
      //   // data can be a set of coordinates, or an error (if an error occurred).
      //   // data.coords.latitude
      //   // data.coords.longitude
      //   console.log(`${new Date()}`+ data.coords.latitude +'<>'+ data.coords.longitude)
      // });
    });
  }

  /**
   * Inicia o GoogleMaps
   * {Comando pra subir: $ ionic cordova run browser -l}
   * Fonte: https://github.com/ionic-team/ionic-native-google-maps
   */
  private initMap(lat, long): void {
    this.options = {
      controls: {
        mapToolbar: true,
        myLocationButton: true,
        myLocation: true,
        compass: true,
      }
    }
    console.log("OPTIONS: ", this.options);
    this.map = this.googleMaps.create('map_canvas', this.options);
    //Necessário para rodar no browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCGkX2HYO4qWEQQJq7z9YKPuJZW2LhAhUU',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCGkX2HYO4qWEQQJq7z9YKPuJZW2LhAhUU'
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      let coordinates: LatLng = new LatLng(lat, long);
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

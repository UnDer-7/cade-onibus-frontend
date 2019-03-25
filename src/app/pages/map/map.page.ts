import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
})
export class MapPage implements OnInit {
  public lat: number;
  public lng: number;
  public random: number;
  constructor() {
  }

  public async ngOnInit(): Promise<void> {
    await Geolocation.watchPosition({
      enableHighAccuracy: true,
      maximumAge: 0
    }, res => {
      this.random = Math.floor(Math.random() * 100);
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
    });
  }
}

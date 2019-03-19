import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private menuCtrl: MenuController
  ) { }

  public openFrist(): void {
    this.menuCtrl.enable(true, 'main');
    this.menuCtrl.open('main');
  }
}

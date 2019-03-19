import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private menuCtrl: MenuController,
    private router: Router
  ) { }

  public openFrist(): void {
    this.menuCtrl.enable(true, 'main');
    this.menuCtrl.open('main');
  }

  public sendToPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}

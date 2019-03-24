import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TokenService } from 'src/app/auth/Token.service';
import { User } from 'src/app/models/user.model';
import { UtilService } from 'src/app/util/util.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private token: any;
  private user: User;

  constructor(
    private menuCtrl: MenuController,
    private tokenService: TokenService,
    private homeService: HomeService,
    private util: UtilService,
    private router: Router,
  ) { }

  ionViewDidEnter() {
    this.token = this.tokenService.decodeToken();
    this.homeService.findUser(this.token._id).subscribe(
        res => this.user = res,
        err => {
          this.util.showToast('Houve um erro na requisição. Tente recarregar a página.');
          console.error(err);
        }
    );
  }

  public openFrist(): void {
    this.menuCtrl.enable(true, 'main');
    this.menuCtrl.open('main');
  }

  public sendToPerfil(): void {
    this.router.navigate(['perfil']);
  }
}

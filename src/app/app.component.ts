import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { SessionService } from './auth/session.service';
import { TokenService } from './auth/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appName: string = environment.appName;

  public appPages: Array<Object> = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private sessionService: SessionService,
    private tokenService: TokenService,
  ) {
    this.initializeApp();
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.isLoggedIn();
    });
  }

  public logout(): void {
    this.sessionService.logout();
  }

  get canShowMenu(): boolean {
    return this.router.url === ('/login' || '/');
  }

  private isLoggedIn(): void {
    if (!this.tokenService.token) {
      this.router.navigate(['/']);
      return;
    }

    const expiration = new Date(this.tokenService.decodeToken().exp * 1000);
    const currentDate = new Date();

    if (currentDate < expiration) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

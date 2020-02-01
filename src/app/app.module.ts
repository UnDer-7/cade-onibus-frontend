import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FIREBASE_CONFIG } from '../config/config';
import { GoogleMaps} from '@ionic-native/google-maps'
import {AuthService} from "../service/securityService/auth.service";
import {StorageService} from "../service/securityService/storage.service";
import {UserService} from "../service/modelService/user.service";
import {PasswordModelPage} from "../pages/password-model/password-model";

@NgModule({
  declarations: [
    MyApp,
    PasswordModelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG.fire),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PasswordModelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    GoogleMaps,
    Geolocation,
    AuthService,
    StorageService,
    UserService
  ]
})
export class AppModule {}

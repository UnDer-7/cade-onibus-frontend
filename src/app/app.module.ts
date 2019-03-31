import {NgModule} from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FindBusPageModule } from './pages/modals/find-bus/find-bus.module';
import { UtilService } from './util/util.service';
import { TokenService } from './auth/token.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenApiService } from './Interceptors/Token-api.service';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UserFormModule } from './pages/modals/user-form/user-form.module';
import { MapsPageModule } from './pages/modals/maps/maps.module';
import { SharingLocationService } from './util/sharing-location.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { IonicGestureConfig } from './util/ionic-gesture-config';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FindBusPageModule,
    MapsPageModule,
    UserFormModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilService,
    SharingLocationService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

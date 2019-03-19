import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FindBusPageModule } from './pages/modal/find-bus/find-bus.module';
import { UtilService } from './util/util.service';
import { TokenService } from './Token.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenApiService } from './Interceptors/Token-api.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FindBusPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

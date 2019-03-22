import { ModuleWithProviders, NgModule } from '@angular/core';
import { SessionService } from './session.service';

const SERVICES = [
  SessionService
];

@NgModule({
  imports: [],
  declarations: [
    SERVICES
  ],
  exports: [
    SERVICES
  ]
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: SERVICES
    };
  }
}

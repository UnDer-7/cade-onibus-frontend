import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { EmailPasswordFormComponent } from './email-password-form/email-password-form.component';
import { RouterModule } from '@angular/router';

const components = [
  EmailPasswordFormComponent,
];

@NgModule({
    imports: [
        COMMON_IMPORTS,
        ReactiveFormsModule,
        RouterModule,
    ],
  declarations: components,
  exports: components,
})
export class SharedComponentModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedComponentModule,
    };
  }
}

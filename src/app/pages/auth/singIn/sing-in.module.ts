import { NgModule } from '@angular/core';
import { SingInComponent } from './sing-in.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SingInComponent }]),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FlexModule
  ],
  declarations: [
    SingInComponent,
  ],
})
export class SingInModule { }

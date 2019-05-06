import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserService } from '../../../resource/user.service';
import { COMMON_IMPORTS } from '../../../utils/common-imports';
import { TabHomeComponent } from './tab-home.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    RouterModule.forChild([{ path: '', component: TabHomeComponent }]),
  ],
  providers: [UserService],
  declarations: [TabHomeComponent],
})
export class TabHomeModule {}

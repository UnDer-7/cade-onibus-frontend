import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserService } from '../../../resource/user.service';
import { COMMON_IMPORTS } from '../../../utils/common-imports';
import { TabPerfilComponent } from './tab-perfil-component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    RouterModule.forChild([{ path: '', component: TabPerfilComponent }]),
  ],
  providers: [UserService],
  declarations: [TabPerfilComponent],
})
export class TabPerfilModule {}

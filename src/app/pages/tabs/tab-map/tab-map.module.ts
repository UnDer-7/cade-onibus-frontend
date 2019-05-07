import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { COMMON_IMPORTS } from '../../../utils/common-imports';
import { TabMapComponent } from './tab-map.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    RouterModule.forChild([{ path: '', component: TabMapComponent }]),
  ],
  declarations: [TabMapComponent],
})
export class TabMapModule {}

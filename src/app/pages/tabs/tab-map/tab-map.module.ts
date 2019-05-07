import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { COMMON_IMPORTS } from '../../../utils/common-imports';
import { TabMapComponent } from './tab-map.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuj1bd6vb0mHGIfvEoyj1_SgKk8HfWdVs',
    }),
    RouterModule.forChild([{ path: '', component: TabMapComponent }]),
  ],
  declarations: [TabMapComponent],
})
export class TabMapModule {}

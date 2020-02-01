import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { COMMON_IMPORTS } from '../../../utils/common-imports';
import { TabMapComponent } from './tab-map.component';
import { environment } from '../../../../environments/environment';
import { InfoContentComponent } from './info-content/info-content.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
    }),
    RouterModule.forChild([
      { path: '', component: TabMapComponent },
      { path: '', component: InfoContentComponent },
      ]),
  ],
  declarations: [TabMapComponent, InfoContentComponent],
})
export class TabMapModule {}

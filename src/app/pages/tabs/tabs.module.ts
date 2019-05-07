import { NgModule } from '@angular/core';
import { COMMON_IMPORTS } from '../../utils/common-imports';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}

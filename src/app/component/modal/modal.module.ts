import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DfTransService } from '../../resource/df-trans.service';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { BusSelectionModalComponent } from './bus-selection-modal/bus-selection-modal.component';
import { ConfigPopoverComponent } from './config-popover/config-popover.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    RouterModule.forChild([
      { path: '', component: BusSelectionModalComponent },
      { path: 'pop', component: ConfigPopoverComponent },
      ]),
  ],
  providers: [
    DfTransService,
  ],
  declarations: [
    BusSelectionModalComponent,
    ConfigPopoverComponent,
  ],
})
export class ModalModule { }

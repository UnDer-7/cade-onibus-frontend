import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DfTransService } from '../../resource/df-trans.service';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { UtilService } from '../../utils/util.service';
import { BusSelectionModalComponent } from './bus-selection-modal/bus-selection-modal.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    RouterModule.forChild([{ path: '', component: BusSelectionModalComponent }]),
  ],
  providers: [
    DfTransService,
    UtilService,
  ],
  declarations: [BusSelectionModalComponent],
})
export class ModalModule { }

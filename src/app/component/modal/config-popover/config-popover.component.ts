import { Component } from '@angular/core';
import { SessionHandler } from '../../../auth/session.handler';
import { PopoverController } from '@ionic/angular';
import { ComponentsUtils } from '../../../utils/components-utils';

@Component({
  selector: 'app-config-popover',
  templateUrl: './config-popover.component.html',
})
export class ConfigPopoverComponent extends ComponentsUtils {
  public sobre: boolean = false;

  constructor(
    private session: SessionHandler,
    private popoverCtrl: PopoverController,
  ) { super(); }

  public showSobre(): void {
    if (!this.sobre) {
      this.sobre = true;
      return;
    }
    if (this.sobre) {
      this.sobre = false;
      return;

    }
  }

  public async logout(): Promise<void> {
    await this.popoverCtrl.dismiss();
    this.session.logout();
  }
}

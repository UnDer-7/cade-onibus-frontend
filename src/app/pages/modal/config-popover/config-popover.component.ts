import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SessionHandler } from '../../../auth/session.handler';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-config-popover',
  templateUrl: './config-popover.component.html',
})
export class ConfigPopoverComponent {
  public readonly appColor: string = environment.contentColor;
  public sobre: boolean = false;

  constructor(
    private session: SessionHandler,
    private popoverCtrl: PopoverController,
  ) { }

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

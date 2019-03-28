import { Component, OnInit } from '@angular/core';
import { SharingLocationService } from '../../util/sharing-location.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sharing-location',
  templateUrl: './sharing-location.component.html',
})
export class SharingLocationComponent implements OnInit {
  public isStopping: boolean = false;

  constructor(
    private sharingLocationService: SharingLocationService,
    private alertCtrl: AlertController
  ) {
  }

  public ngOnInit(): void {
  }

  public async stopSharing(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Cancelar Compartilhamento',
      message: 'Tem certeza que deseja para de compartilhar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.alertCtrl.dismiss();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.isStopping = true;
            setTimeout(() => {
              this.sharingLocationService.stopSharing();
              this.isStopping = false;
            }, 1000);
          }
        }
      ]
    });
    await alert.present();

  }
}

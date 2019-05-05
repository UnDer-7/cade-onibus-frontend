import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class UtilService {
  constructor(
    private toastCtrl: ToastController,
  ) { }

  public async showToast(
    message: string,
    color: string = 'dark',
    duration: number = 1850,
    position: string = 'bottom',
    showCloseButton: boolean = false): Promise<any> {
    // @ts-ignore
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: color,
      // @ts-ignore
      position: position,
      showCloseButton: showCloseButton,
      translucent: true,
    });
    toast.present();
  }
}

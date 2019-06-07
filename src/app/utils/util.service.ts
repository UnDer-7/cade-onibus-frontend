import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastButton } from '@ionic/core';

@Injectable()
export class UtilService {
  private urlAccessed!: string;

  constructor(
    private toastCtrl: ToastController,
  ) { }

  public async showToast(
    message: string,
    color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark' = 'dark',
    duration: number = 1850,
    position: 'bottom' | 'middle' | 'top' = 'bottom',
    showCloseButton: boolean = false,
    closeButtonText?: string,
    buttons?: Array<string | ToastButton>,
    cssClass: string | string[] = 'toastCss',
    header?: string,
    translucent: boolean = false,
    keyboardClose: boolean = false,
    mode?: 'ios' | 'md',
    animated: boolean = true,
    leaveAnimation?: ((Animation: Animation, baseEl: any, opts?: any) => Promise<Animation>),
    enterAnimation?: ((Animation: Animation, baseEl: any, opts?: any) => Promise<Animation>),
    ): Promise<any> {
    // @ts-ignore
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: color,
      // @ts-ignore
      position: position,
      showCloseButton: showCloseButton,
      closeButtonText: closeButtonText,
      buttons: buttons,
      cssClass: cssClass,
      header: header,
      translucent: translucent,
      keyboardClose: keyboardClose,
      mode: mode,
      leaveAnimation: leaveAnimation,
      enterAnimation: enterAnimation,
      animated: animated,
    });
    toast.present();
  }

  get blockedUrl(): string {
    return this.urlAccessed;
  }

  set blockedUrl(urlAccessed: string) {
    this.urlAccessed = urlAccessed;
  }
}

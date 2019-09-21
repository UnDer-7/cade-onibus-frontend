import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Bus } from '../../../model/bus.model';
import { User } from '../../../model/user.model';
import { UserService } from '../../../resource/user.service';
import { UtilService } from '../../../utils/util.service';
import { BusSelectionModalComponent } from '../../modal/bus-selection-modal/bus-selection-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerErrorMessages } from '../../../utils/server-error.messages';

@Component({
  selector: 'app-tab-home',
  templateUrl: 'tab-home.component.html',
})
export class TabHomeComponent implements OnInit {
  public readonly appName: string = environment.appName;
  public readonly appColor: string = environment.contentColor;

  public user: User = {} as User;
  public isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private utilService: UtilService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) {
  }

  public ngOnInit(): void {
    this.getUser();
  }

  public getUser(onRefresh?: any): void {
    this.isLoading = true;
    this.userService.getUser().pipe(
      finalize(() => {
        if (onRefresh) onRefresh.target.complete();
        this.isLoading = false;
      }),
    ).subscribe(res => {
      this.user = res;
      // tslint:disable:no-non-null-assertion
      if (this.user.bus!.length <= 0) {
        this.utilService.showToast('Você não tem ônibus cadastrados', 'danger', 3000);
      }
    });
  }

  public doReorder(ev: any): void {
    this.user.bus = ev.detail.complete(this.user.bus);
    // this.userService.updateUser(this.user).subscribe(res => {
    //   this.user = res;
    // });
  }

  public async deleteBus(b: Bus): Promise<void> {
    const answer = await this.showAlert(b);
    if (!answer) return;
    const user = Object.assign({}, this.user);
    if (!user.bus) return;

    this.userService.removeBus(b)
      .pipe(
        catchError((err: HttpErrorResponse, _) => {
          if (err.status === 400 && err.error === ServerErrorMessages.NOT_FOUND) {
            this.utilService.showToast(
              'Esse ônibus só pode ser deletado pelo app',
              'danger',
              2050,
            );
          }
          throw err;
        }),
      )
      .subscribe((res) => this.user = res);
  }

  public async onAddingBus(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: BusSelectionModalComponent,
      componentProps: {
        savedBus: this.user.bus,
      },
    });
    await modal.present();
    const payload = await modal.onDidDismiss();
    if (!payload.data) return;
    this.addBus(payload.data as Bus[]);
  }

  public canShowLine(last: boolean): string | undefined {
    if (last) return 'none';
  }

  private async showAlert(bus: Bus): Promise<boolean> {
    let answer = false;
    const alert = await this.alertCtrl.create({
      header: 'REMOVER ÔNIBUS',
      message: `Tem certeza que quer remover o ${ bus.numero }?`,
      buttons: [
        {
          text: 'NÃO',
        },
        {
          text: 'SIM',
          handler: () => answer = true,
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
    return answer;
  }

  private addBus(bus: Bus[]): void {
    this.isLoading = true;
    this.userService.addBus(bus).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe((res: User) => this.user = res);
  }
}

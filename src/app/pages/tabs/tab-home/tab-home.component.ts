import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { decodeJWT } from '../../../auth/jwt.handler';
import { Bus } from '../../../models/bus.model';
import { ObjectToUser, User } from '../../../models/user.model';
import { UserService } from '../../../resource/user.service';
import { UtilService } from '../../../utils/util.service';
import { BusSelectionModalComponent } from '../../modal/bus-selection-modal/bus-selection-modal.component';

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
    this.userService.getUser(decodeJWT().email).pipe(
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

  public async deleteBus(b: Bus): Promise<void> {
    const answer = await this.showAlert(b);
    if (!answer) return;
    const user = Object.assign({}, this.user);
    if (!user.bus) return;

    user.bus = user.bus.filter(item => {
      return item.numero !== b.numero;
    });
    this.updateUser(user);
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
    const user = ObjectToUser(this.user);
    bus.forEach(item => {
      user.bus!.push(item);
    });
    this.updateUser(user);
  }

  private updateUser(user: User): void {
    this.isLoading = true;
    this.userService.updateUser(user).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe(res => this.user = res);
  }
}

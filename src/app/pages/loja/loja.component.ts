import { Component } from '@angular/core';
import { TokenService } from '../../auth/token.service';
import { UsersService } from '../../services/resources/users.service';
import { User } from '../../models/user.model';
import { ModalController } from '@ionic/angular';
import { MoedasComponent } from '../modals/moedas/moedas.component';
import { Pacote } from '../../models/pacote.model';
import { UtilService } from '../../util/util.service';
import { Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
})
export class LojaComponent {
  public readonly precos: object = {
    tresDias: 10,
    cincoDias: 15,
    seteDias: 18
  };

  public user: User = {} as User;
  public successLoading: boolean = false;

  @BlockUI() private blockUi: NgBlockUI;

  constructor(
    private jwt: TokenService,
    private usersService: UsersService,
    private modalCtrl: ModalController,
    private utilService: UtilService
  ) { }

  public ionViewDidEnter(): void {
    this.getUser();
  }

  public refresh(event: any): void {
    this.getUser(event);
  }

  public buyItem(dias: number): void {
    const pricing = this.pricing(dias);

    if (this.user.moedas < pricing) {
      this.utilService.showToast('Você não tem moedas suficiente!', 'danger');
      return;
    }
    this.user.pacote = {} as Pacote;
    this.user.pacote.quantosDias = dias;
    this.user.pacote.compradoEm = new Date();

    this.subscribeToSaveResponse(this.usersService.updateUser(this.user));
  }

  public async buyMoedas(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MoedasComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.user = data;
    }
  }

  private subscribeToSaveResponse(toSave: Observable<User>): void {
    this.blockUi.start();
    toSave.subscribe(res => {
      console.log('RES UPDATE: ', res);
      this.user = res;
      this.blockUi.stop();
      this.utilService.showToast('Compra concluida', 'success');
    });
  }

  private getUser(event?: any): void {
    this.usersService.getUser(this.jwt.decodeToken()._id).pipe(
      finalize(() => {
        if (event) event.target.complete(); // o refresh foi finalizado
      })
    ).subscribe(res => {
      this.user = res;
      this.successLoading = true;
    });
  }

  private pricing(dias: number): number {
    switch (dias) {
      case 3:
        return 10;
      case 5:
        return 15;
      case 7:
        return 18;
      default:
        return;
    }
  }
}

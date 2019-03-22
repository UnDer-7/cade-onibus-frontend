import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Onibus} from '../../onibus.modal';
import {FindBusService} from './find-bus.service';
import {UtilService} from '../../../util/util.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-find-bus',
  templateUrl: './find-bus.page.html',
})
export class FindBusPage implements OnInit {
  public onibus: Array<Onibus>;
  public linha: string;
  public isLoading: boolean;
  public appName: string = environment.appName;
  private onibusAdded: Array<Onibus>;

  constructor(
    private modalCtrl: ModalController,
    private findBusService: FindBusService,
    private toastCtrl: ToastController,
    private utilService: UtilService
  ) {
    this.isLoading = false;
    this.onibus = [] as Onibus[];
    this.onibusAdded = [] as Onibus[];
  }

  public ngOnInit(): void {
  }

  public searchBus(): void {
      this.isLoading = true;
    this.findBusService.findBus(this.linha).subscribe((res: Onibus[]) => {
      this.onibus = this.removeDuplicates(res, 'numero');

      if (this.onibus.length < 1) {
        this.utilService.showToast('Nenhum onibus encontrado', 'danger');
      }
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  public async closeModal(): Promise<any> {
    this.modalCtrl.dismiss(this.onibusAdded);
  }

  public cleanSearch(): void {
    this.linha = null;
  }

  /**
   * - logica
   * -- Quando clica em uma checkbox desmarcada o valor dela é false.
   * Já se ela estiver marcada o valor é true.
   * -- O value passado no event (marcado/desmarcado) é passado antes da acao,
   * se for marcar o value vai vir false, se for desmarcar
   * o value vai vir true.
   * -- Logo se o ela vir false quer dizer é uma ativação, entao o onibus
   * com o index informado é pra adicionado no array dos onibus selecionados.
   * @param checkbox - Se a checkbox esta selecionada ou não.
   * @param index - Index do array de Onibus que veio do df-trans.
   */
  public onBusSelection(event: Object): void {
    // @ts-ignore
    const {checkbox, index} = event;
    if (checkbox) {
      this.onibusAdded = this.onibusAdded.filter(item => {
        return item.numero !== this.onibus[index].numero;
      });
      return;
    }

    if (!checkbox) {
      this.onibusAdded.push(this.onibus[index]);
      return;
    }
  }

  private removeDuplicates(myArr: Onibus[], prop: string): Array<Onibus> {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Onibus } from '../../onibus.modal';
import { FindBusService } from './find-bus.service';
import { UtilService } from '../../../util/util.service';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

@Component({
  selector: 'app-find-bus',
  templateUrl: './find-bus.page.html',
  styleUrls: ['./find-bus.page.scss'],
})
export class FindBusPage implements OnInit {
  public onibus: Array<Onibus>;
  public linha: string;
  private onibusAdded: Array<Onibus>;

  constructor(
    private modalCtrl: ModalController,
    private findBusService: FindBusService,
    private toastCtrl: ToastController,
    private utilService: UtilService
  ) {
    this.onibus = new Array<Onibus>();
    this.onibusAdded = new Array<Onibus>();
  }

  public ngOnInit(): void {
  }

  public searchBus(): void {
    this.findBusService.findBus(this.linha).subscribe((res: Onibus[]) => {
      this.onibus = this.removeDuplicates(res, 'numero');

      if (this.onibus.length < 1) {
        this.utilService.showToast('Nenhum onibus encontrado');
      }
    });
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
  public onBusSelection(checkbox: boolean, index: number): void {
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

  private removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
}

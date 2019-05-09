import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { SessionHandler } from '../../../auth/session.handler';
import { Bus } from '../../../models/bus.model';
import { DfTransService } from '../../../resource/df-trans.service';
import { UtilService } from '../../../utils/util.service';

@Component({
  selector: 'app-bus-selection-modal',
  templateUrl: './bus-selection-modal.component.html',
})
export class BusSelectionModalComponent implements OnInit {
  public readonly contentColor: string = environment.contentColor;
  public readonly appName: string = environment.appName;

  @Input() public multiSelect: boolean = true;
  public search: string = '';
  public bus: Bus[] = [] as Bus[];
  public busSelected: Bus[] = [] as Bus[];

  constructor(
    private dfTranService: DfTransService,
    private utilService: UtilService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private sessionHandler: SessionHandler,
  ) {
  }

  public ngOnInit(): void {
    if (this.sessionHandler.isLoggedIn()) {
      return;
    }
    this.alertCtrl.create({
      header: 'Procure seus Ônibus',
      message: 'Procure e selecione os principais ônibus que você utiliza',
      buttons: ['Vamos lá!'],
    })
      .then(item => item.present())
      .catch(err => console.log('Erro ao mostrar alert!\n', err));
  }

  public async save(bus?: Bus): Promise<void> {
    if (bus) {
      await this.modalCtrl.dismiss(bus);
      return;
    }
    await this.modalCtrl.dismiss(this.busSelected);
  }

  public async cancel(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  public findBus(): void {
    if (!this.search.length) return;
    this.dfTranService.findBus(this.search).subscribe(
      res => {
        this.bus = this.removeDuplicates(res, 'numero');
        if (this.bus.length <= 0) {
          this.utilService.showToast('Nenhum ônibus encontrado', 'warning');
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.utilService.showToast('Pesquisa invalida', 'danger');
        }
      },
    );
  }

  public onBusSelection(isChecked: CustomEvent): void {
    const itemSelected: Bus = isChecked.detail.value;
    const checked: boolean = isChecked.detail.checked;

    if (checked) {
      this.busSelected.push(itemSelected);
    } else {
      this.busSelected = this.busSelected.filter(item => {
        return item.numero !== itemSelected.numero;
      });
    }
  }

  public removeBus(bus: Bus): void {
    setTimeout(() => {
      this.busSelected = this.busSelected.filter(item => item.numero !== bus.numero);
    }, 500);
  }

  public isSelect(bus: Bus): boolean | undefined {
    const busFound = this.busSelected.find(item => bus.numero === item.numero);

    if (busFound) return true;
  }

  public canShowLine(last: any): string | undefined {
    if (last) return 'none';
  }
  private removeDuplicates(myArr: Bus[], prop: string): Bus[] {
    return myArr.filter((obj, pos, arr) => {
      // @ts-ignore
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
}

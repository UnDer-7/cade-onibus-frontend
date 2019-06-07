import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-info-content',
  templateUrl: './info-content.component.html',
})
export class InfoContentComponent {
  public readonly appColor: string = environment.contentColor;
  public isShowingAtualizacaoOnibus: boolean = false;
  public isShowingPrecisao: boolean = false;
  public isShowingOndeVemDados: boolean = false;

  public showAtualizacaoOnibus(): void {
    this.isShowingAtualizacaoOnibus = !this.isShowingAtualizacaoOnibus;
  }

  public showPrecisao(): void {
    this.isShowingPrecisao = !this.isShowingPrecisao;
  }

  public showOndeVemDados(): void {
    this.isShowingOndeVemDados = !this.isShowingOndeVemDados;
  }
}

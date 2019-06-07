import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-info-content',
  templateUrl: './info-content.component.html',
})
export class InfoContentComponent {
  public readonly appColor: string = environment.contentColor;
  private isShowingAtualizacaoOnibus: boolean = false;
  private isShowingPrecisao: boolean = false;
  private isShowingOndeVemDados: boolean = false;

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

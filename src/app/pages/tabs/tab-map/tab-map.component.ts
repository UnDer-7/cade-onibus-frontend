import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tab-map',
  templateUrl: 'tab-map.component.html',
})
export class TabMapComponent {
  public readonly appName: string = environment.appName;
  public readonly appColor: string = environment.contentColor;
}

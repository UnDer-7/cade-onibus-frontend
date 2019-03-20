import { Component, Input, OnInit } from '@angular/core';
import { Onibus } from '../../pages/onibus.modal';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss'],
})
export class BusListComponent implements OnInit {
  @Input() public onibus: Array<Onibus>;
  @Input() public disableCheckBox: boolean = true;

  constructor() { }

  public ngOnInit(): void {
    console.log('ONIBUS: ', this.onibus);
  }

  public onBusSelection(): void {}
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Onibus } from '../../pages/onibus.modal';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss'],
})
export class BusListComponent implements OnInit {
  @Input() public onibus: Array<Onibus>;
  @Input() public disableCheckBox: boolean = true;

  @Output() public checkBoxValue: EventEmitter<any>;
  constructor() {
    this.checkBoxValue = new EventEmitter();
  }

  public ngOnInit(): void { }

  public checkBoxClicked(checkbox: boolean, index: number): void {
    this.checkBoxValue.emit({ checkbox: checkbox, index: index });
  }
}

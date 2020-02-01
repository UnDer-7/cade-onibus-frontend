import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Onibus } from '../../models/onibus.modal';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
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

  public colors(index: number): string {
    if (index % 2 === 0) {
      return 'dark';
    } else {
      return 'dark-2';
    }
  }
}

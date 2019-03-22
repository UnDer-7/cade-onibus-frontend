import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Onibus } from '../../pages/onibus.modal';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
})
export class BusListComponent implements OnInit {
  @Input() public onibus: Array<Onibus>;
  @Input() public disableCheckBox: boolean = true;

  @Output() public checkBoxValue: EventEmitter<any>;

  private color: string = 'dark';

  constructor() {
    this.checkBoxValue = new EventEmitter();
  }

  public ngOnInit(): void { }

  public checkBoxClicked(checkbox: boolean, index: number): void {
    this.checkBoxValue.emit({ checkbox: checkbox, index: index });
  }

  public colors(): string {
    if (this.color === 'dark') {
      this.color = 'light';
      return 'light';
    }

    if (this.color === 'light') {
      this.color = 'dark';
      return 'dark';
    }
  }
}

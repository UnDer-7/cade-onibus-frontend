import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  public user: User;
  public passwordIcon = 'eye';

  constructor() {
    this.user = new User();
  }

  ngOnInit() {
  }

  public save(): void {
    console.log('USer: ', this.user);
  }

  public showPassword(): void {
    this.passwordIcon = 'eye-off';
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {
  public user: User;
  public passwordIcon = 'eye-off';
  public passwordType = 'password';

  constructor() {
    this.user = new User();
  }

  ngOnInit() {
  }

  public save(): void {
    console.log('USer: ', this.user);
  }

  public showPassword(): void {
    if (this.passwordIcon === 'eye-off') {
      this.passwordIcon = 'eye';
      this.passwordType = 'text';
    } else {
      this.passwordIcon = 'eye-off';
      this.passwordType = 'password';
    }
  }
}

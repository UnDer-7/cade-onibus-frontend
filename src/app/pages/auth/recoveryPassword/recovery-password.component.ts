import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-recovery-password-component',
  templateUrl: './recovery-password.component.html',
})
export class RecoveryPasswordComponent {
  constructor(
    private readonly router: Router,
  ) {}

  public goTo() {
    this.router.navigateByUrl('auth/login');
  }
}

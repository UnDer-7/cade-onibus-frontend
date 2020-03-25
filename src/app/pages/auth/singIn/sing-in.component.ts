import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-singin',
  templateUrl: './sing-in.component.html',
})
export class SingInComponent {
  constructor(
    private readonly router: Router,
  ) {}

  public goTo() {
    this.router.navigateByUrl('auth/recuperar-senha');
  }
}

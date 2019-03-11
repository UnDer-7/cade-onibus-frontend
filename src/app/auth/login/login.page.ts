import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login(): void {
    console.log('login');
  }

  public newAccount(): void {
    console.log('newAccount');
    this.router.navigate(['/auth/new-account']);
  }
}

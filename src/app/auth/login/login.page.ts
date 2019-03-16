import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public passwordIcon: string = 'eye-off';
  public passwordType: string = 'password';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void { }

  public login(): void {
    this.authService.tst();
  }

  public newAccount(): void {
    this.router.navigate(['/auth/new-account']);
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

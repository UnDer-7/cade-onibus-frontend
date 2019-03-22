import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UtilService } from '../../../util/util.service';
import { TokenService } from '../../../Token.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User;
  public passwordIcon: string = 'eye-off';
  public passwordType: string = 'password';
  public appName: string = environment.appName;

  constructor(
    private router: Router,
    private authService: AuthService,
    private util: UtilService,
    private tokenService: TokenService
  ) {
    this.user = {} as User;
  }

  public ngOnInit(): void { }

  public login(): void {
    this.authService.login(this.user).subscribe(res => {
      this.tokenService.token = res.token;
      this.router.navigate(['/home']);
    }, err => {
      if (err.status === 400) {
        this.util.showToast('Credenciais incorretas', 'danger');
      }
    });
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

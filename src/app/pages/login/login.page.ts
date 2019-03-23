import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../../models/user.model';
import { UtilService } from '../../util/util.service';
import { TokenService } from '../../auth/Token.service';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../auth/session.service';
import { ModalController } from '@ionic/angular';
import { UserFormComponent } from '../modals/user-form/user-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {
  public user: User;
  public passwordIcon: string = 'eye-off';
  public passwordType: string = 'password';
  public appName: string = environment.appName;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private util: UtilService,
    private tokenService: TokenService,
    private modalCtrl: ModalController
  ) {
    this.user = {} as User;
  }

  public ngOnInit(): void { }

  public login(): void {
    this.sessionService.login(this.user).subscribe(res => {
      this.tokenService.token = res.token;
      this.router.navigate(['/home']);
    }, err => {
      if (err.status === 400) {
        this.util.showToast('Credenciais incorretas', 'danger');
      }
    });
  }

  public async newAccount(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: UserFormComponent
    });
    await modal.present();
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

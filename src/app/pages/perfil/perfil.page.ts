import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';
import {TokenService} from '../../Token.service';
import {User} from '../auth/user.model';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { SessionService } from '../../auth/session.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
})
export class PerfilPage implements OnInit {
  public user: User;
  public appName: string = environment.appName;

  constructor(
    private perfilService: PerfilService,
    private tokenService: TokenService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.user = {} as User;
  }

  public ngOnInit(): void {
    this.getUser();
  }

  public sendToHome(): void {
    this.router.navigate(['home']);
  }

  public logout(): void {
    this.tokenService.removeItem();
    this.router.navigate(['auth/login']);
  }

  public editUser(): void {
    this.sessionService.login();
  }

  private getUser(): void {
    const id = this.tokenService.decodeToken()._id;
    this.perfilService.findUser(id).subscribe(res => {
      this.user = res;
    });
  }

}

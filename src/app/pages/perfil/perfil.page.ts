import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {TokenService} from '../../Token.service';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: User;

  constructor(
    private perfilService: PerfilService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.user = new User();
  }

  public ngOnInit(): void {
    this.getUser();
  }

  public sendToHome(): void {
    this.router.navigate(['home']);
  }

  private getUser(): void {
    const id = this.tokenService.decodeToken()._id;
    this.perfilService.findUser(id).subscribe(res => {
      console.log('res: ', res);
      this.user = res;
    });
  }
}

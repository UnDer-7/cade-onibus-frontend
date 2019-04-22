import { Component, OnInit } from '@angular/core';
import { UserService } from '../modals/user-form/user.service';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/auth/token.service';
import { ToastController } from '@ionic/angular';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss'],
})
export class LojaComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private util: UtilService
  ) { }

  ngOnInit() {
    const id = this.tokenService.decodeToken()._id;
    this.userService.findUser(id).subscribe(
      user => this.user = user,
      () => this.util.showToast('Houve um erro ao carregar os dados!', 'danger')
    )
  }

}

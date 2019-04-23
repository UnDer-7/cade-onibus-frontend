import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/resources/users.service';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/auth/token.service';
import { UtilService } from 'src/app/util/util.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-moedas',
  templateUrl: './moedas.component.html',
})
export class MoedasComponent implements OnInit {

  user: User;

  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private utilService: UtilService,
    private modalCtrl: ModalController
  ) {
  }

  public ngOnInit(): void {
    const id = this.tokenService.decodeToken()._id;
    this.userService.getUser(id).subscribe(
      res => this.user = res,
      err => this.utilService.showToast('Houve um erro ao buscar seus dados!')
    )
  }

  public buyCoins(coins: number): void {
    this.user.moedas += coins;
    this.userService.updateUser(this.user).subscribe(
      res => {
        this.utilService.showToast('Moedas compradas com sucesso!');
        this.user = res;
      },
      err => this.utilService.showToast('Houve um erro ao comprar as moedas!')
    )
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(this.user);
  }
}

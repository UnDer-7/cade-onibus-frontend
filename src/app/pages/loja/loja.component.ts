import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../auth/token.service';
import { UsersService } from '../../services/resources/users.service';
import { User } from '../../models/user.model';
import { ModalController } from '@ionic/angular';
import { MoedasComponent } from '../modals/moedas/moedas.component';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
})
export class LojaComponent implements OnInit {
  public user: User = {} as User;

  constructor(
    private jwt: TokenService,
    private usersService: UsersService,
    private modalCtrl: ModalController
  ) { }

  public ngOnInit(): void {
    this.usersService.getUser(this.jwt.decodeToken()._id).subscribe(res => this.user = res);
  }

  public async buyMoedas(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MoedasComponent
    });
    await modal.present();
  }
}

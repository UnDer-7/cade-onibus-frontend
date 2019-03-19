import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getUser();
  }

  public sendToHome(): void {
    this.router.navigate(['home']);
  }

  private getUser(): void {
    this.perfilService.findUser().subscribe(res => {
      console.log('res: ', res);
    });
  }
}

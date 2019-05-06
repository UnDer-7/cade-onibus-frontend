import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { decodeJWT } from '../../../auth/jwt.handler';
import { UserService } from '../../../resource/user.service';

@Component({
  selector: 'app-tab-home',
  templateUrl: 'tab-home.component.html',
})
export class TabHomeComponent implements OnInit {
  public readonly appName: string = environment.appName;
  public readonly appColor: string = environment.contentColor;

  public isLoading: boolean = false;

  constructor(
    private userService: UserService,
  ) { }
  public ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser(decodeJWT().email).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe(res => {
      console.log('1: ', res);
    });
  }
}

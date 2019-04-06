import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private authUrl: string = environment.apiUrl + '/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { }

  public login(user: User): Observable<any> {
    return this.http.post(this.authUrl, user);
  }

  public logout(): void {
    this.router.navigateByUrl('/').then(res => {
      if (res) {
        this.tokenService.removeItem();
        location.reload(true);
      }
    });
  }
}

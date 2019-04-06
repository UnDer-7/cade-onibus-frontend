import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import * as jwtDecode from 'jwt-decode';

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

  public isLoggedIn(): boolean {
    switch (false) {
      case !!this.tokenService.token:
        return false;
      case this.isTokenValid():
        return false;
      case this.isExpired():
        return false;
      default:
        return true;
    }
  }

  private isTokenValid(): boolean {
    try {
      jwtDecode(this.tokenService.token);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isExpired(): boolean {
    const expiration = new Date(this.tokenService.decodeToken().exp * 1000);
    const currentDate = new Date();

    return expiration >= currentDate;
  }
}

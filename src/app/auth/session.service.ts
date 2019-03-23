import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './Token.service';

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
    this.tokenService.removeItem();
    this.router.navigate(['auth/login']);
  }
}

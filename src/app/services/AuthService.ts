import JWT_DECODE from 'jwt-decode';

import { SignInWithEmail } from '../models/types/SignInWithEmail';
import LocalStorageService, { Key } from './LocalStorageService';
import JWT from '../models/JWT';
import SessionResource from '../resources/SessionResource';
import history from '../config/History';
import { HOME_PATH } from '../pages/home/HomeRoutes';
import { SIGN_IN_PATH } from '../pages/auth/AuthRoutes';
import { JWTInvalidException } from '../utils/Exceptions';

class AuthService {
  private readonly resource = SessionResource;

  private readonly localStorageService = LocalStorageService;

  public signInWithEmail(data: SignInWithEmail): void {
    this.resource
      .loginWithEmail(data)
      .subscribe((token) => {
        this.onSignInSuccess(token);
        history.push(HOME_PATH);
      });
  }

  public signOut(): void {
    this.localStorageService.remove(Key.TOKEN);
    history.push(SIGN_IN_PATH);
  }

  public isAuthenticated(): boolean {
    const jwt = this.getJWT();

    if (!jwt) return false;

    return jwt.isExpired();
  }

  public getJWT(): JWT | null {
    const token = this.localStorageService.get(Key.TOKEN);
    if (!token) return null;

    try {
      const decoded = JWT_DECODE(token) as any;
      decoded.token = token;

      return new JWT(decoded);
    } catch (e) {
      this.signOut();
      throw new JWTInvalidException('Error ao decodificar JWT', e);
    }
  }

  private onSignInSuccess(token: string): void {
    this.localStorageService.set(Key.TOKEN, token);
  }
}

export default new AuthService();

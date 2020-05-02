import JWT_DECODE from 'jwt-decode';
import { GoogleLoginResponse } from 'react-google-login';
import { finalize } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

import { SignInWithEmail, SignInWithGoogle } from '../models/types/SignInWithEmail';
import LocalStorageService, { Key } from './LocalStorageService';
import JWT from '../models/JWT';
import SessionResource from '../resources/SessionResource';
import history from '../config/History';
import { HOME_PATH } from '../pages/home/HomeRoutes';
import { SIGN_IN_PATH } from '../pages/auth/AuthRoutes';
import { JWTInvalidException } from '../utils/Exceptions';
import { Runnable, Consumer, RunnableImpl, ConsumerImpl } from '../models/types/Functions';

class AuthService {
  public signInWithEmail(
    {
      data,
      onComplete = RunnableImpl,
      onError = ConsumerImpl,
    }: CommonProps<SignInWithEmail>): void {
    SessionResource.signInWithEmail(data)
      .pipe(
        finalize(onComplete),
      )
      .subscribe(
        (success) => this.onSignInSuccess(success),
        (error) => onError(error.response),
      );
  }

  public signInWithGoogle(data: GoogleLoginResponse): void {
    const payload: SignInWithGoogle = {
      google_id: data.googleId,
      email: data.getBasicProfile().getEmail(),
      name: data.getBasicProfile().getName(),
    };

    SessionResource.signInWithGoogle(payload)
      .subscribe(this.onSignInSuccess);
  }

  public signOut(): void {
    LocalStorageService.remove(Key.TOKEN);
    history.push(SIGN_IN_PATH);
  }

  public isAuthenticated(): boolean {
    const jwt = this.getJWT();

    if (!jwt) return false;

    return jwt.isExpired();
  }

  public getJWT(): JWT | null {
    const token = LocalStorageService.get(Key.TOKEN);
    if (!token) return null;

    try {
      const decoded = JWT_DECODE(token) as any;
      decoded.token = token;
      return new JWT(decoded);
    } catch (e) {
      throw new JWTInvalidException('Error ao decodificar JWT', e);
    }
  }

  private onSignInSuccess(token: string): void {
    LocalStorageService.set(Key.TOKEN, token);
    history.push(HOME_PATH);
  }
}

interface CommonProps<T> {
  data: T,
  onComplete?: Runnable;
  onError?: Consumer<AxiosResponse<string>>
}

export default new AuthService();

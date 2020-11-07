import JWT_DECODE from 'jwt-decode';
import { GoogleLoginResponse } from 'react-google-login';
import { finalize, map } from 'rxjs/operators';

import { PasswordWithEmail, GoogleIdWithEmail } from '../models/types/SignInTypes';
import LocalStorageService, { Key } from './LocalStorageService';
import JWT, { RecoveryPayload } from '../models/JWT';
import SessionResource from '../resources/SessionResource';
import history from '../config/History';
import { HOME_PATH } from '../pages/home/HomeRoutes';
import { SIGN_IN_PATH } from '../pages/auth/AuthRoutes';
import { JWTInvalidException } from '../utils/Exceptions';
import { CommonProps } from './index';
import { ConsumerImpl, RunnableImpl } from '@cade-tecnologia/essentials';

class AuthService {
  public signInWithEmail(
    {
      data,
      onComplete = RunnableImpl,
      onError = ConsumerImpl,
    }: CommonProps<PasswordWithEmail, string>): void {
    SessionResource.signInWithEmail(data)
      .pipe(
        finalize(onComplete),
      )
      .subscribe(
        (success) => {
          console.log('1: ', success);
          this.onSignInSuccess(success);
        },
        (error) => {
          console.log('2: ', error);
          onError(error.response);
        },
      );
  }

  public signInWithGoogle(data: GoogleLoginResponse): void {
    const payload: GoogleIdWithEmail = {
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

  public sendRecoveryEmail(
    {
      data,
      onComplete = RunnableImpl,
      onError = ConsumerImpl,
      onSuccess = ConsumerImpl,
    }: CommonProps<string, any>
  ): void {
    SessionResource.sendPasswordRecoveryEmail(data)
      .pipe(
        finalize(onComplete)
      ).subscribe(
        onSuccess,
        (err) => (onError(err.response))
      );
  }

  public isRecoveryPasswordTokenValid(
    {
      data,
      onComplete = RunnableImpl,
      onError = ConsumerImpl,
      onSuccess = ConsumerImpl,
    }: CommonProps<string, any>
  ): void {
    SessionResource.isRecoveryPasswordTokenValid(data)
      .pipe(
        finalize(onComplete),
        map((res) => {
          res.token = res.tokenEncoded;
          delete res.tokenEncoded;
          return new JWT<RecoveryPayload>(res);
        }),
      ).subscribe(
        onSuccess,
        (err) => (onError(err.response))
    );
  }

  public isAuthenticated(): boolean {
    const jwt = this.getJWT();

    if (!jwt) return false;

    return jwt.isExpired();
  }

  public getJWT(): JWT<string> | null {
    const token = LocalStorageService.get(Key.TOKEN);
    if (!token) return null;

    try {
      const decoded = JWT_DECODE(token) as any;
      decoded.token = token;
      decoded.payload = decoded.email;
      return  new JWT<string>(decoded);
    } catch (e) {
      throw new JWTInvalidException('Error ao decodificar JWT', e);
    }
  }

  private onSignInSuccess(token: string): void {
    LocalStorageService.set(Key.TOKEN, token);
    history.push(HOME_PATH);
  }
}

export default new AuthService();

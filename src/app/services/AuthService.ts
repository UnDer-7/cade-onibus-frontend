import { SignInWithEmail } from '../models/types/SignInWithEmail';
import SessionResource from '../resources/SessionResource';
import LocalStorageService, { Key } from './LocalStorageService';

import { Consumer } from '../models/types/Functions';

class AuthService {
  private readonly resource = SessionResource;

  private readonly localStorageService = LocalStorageService;

  public signInWithEmail(data: SignInWithEmail, redirect: Consumer<string>): void {
    this.resource
      .loginWithEmail(data)
      .subscribe((token) => {
        this.onSignInSuccess(token);
        redirect('/home');
      });
  }

  public isAuthenticated(): boolean {
    return true;
  }

  private onSignInSuccess(token: string): void {
    this.localStorageService.save(Key.TOKEN, token);
  }
}

export default new AuthService();

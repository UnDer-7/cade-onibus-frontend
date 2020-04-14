import { SignInWithEmail } from '../../app/types/SignInWithEmail';
import SessionResource from '../resources/SessionResource';
import LocalStorageService, { Key } from './LocalStorageService';

class AuthService {
  private readonly resource = SessionResource;

  private readonly localStorageService = LocalStorageService;

  public async signInWithEmail(data: SignInWithEmail): Promise<void> {
    const token = await this.resource.loginWithEmail(data);
    this.onSignInSuccess(token);
  }

  public isAuthenticated(): boolean {
    return true;
  }

  private onSignInSuccess(token: string): void {
    this.localStorageService.save(Key.TOKEN, token);
  }
}

export default new AuthService();

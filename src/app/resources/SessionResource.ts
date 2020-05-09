import { Observable } from 'rxjs';

import AbstractResource from './AbstractResource';
import { PasswordWithEmail, GoogleIdWithEmail } from '../models/types/SignInTypes';

class SessionResource extends AbstractResource {
  constructor() {
    super('session');
  }

  public signInWithEmail(data: PasswordWithEmail): Observable<string> {
    const url = `${ this.BASE_URL }/email`;

    return this.getResponseBody<string>(
      this.HTTP.post<string>(url, data)
    );
  }

  public signInWithGoogle(data: GoogleIdWithEmail): Observable<string> {
    const url = `${ this.BASE_URL }/google`;

    return this.getResponseBody<string>(
      this.HTTP.post<string>(url, data)
    );
  }

  public sendPasswordRecoveryEmail(email: string): Observable<any> {
    const url = `${ this.BASE_URL }/recovery`;

    return this.getResponseBody<any>(
      this.HTTP.post<any>(url, { email })
    );
  }

  public isRecoveryPasswordTokenValid(token: string): Observable<any> {
    const url = `${ this.BASE_URL }/forgot-password-valid`;

    return this.getResponseBody<any>(
      this.HTTP.post(url, { token })
    );
  }
}

export default new SessionResource();

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import AbstractResource from './AbstractResource';
import { SignInWithEmail, SignInWithGoogle } from '../models/types/SignInWithEmail';

class SessionResource extends AbstractResource {
  constructor() {
    super('session');
  }

  public signInWithEmail(data: SignInWithEmail): Observable<string> {
    const url = `${ this.BASE_URL }/email`;

    return this.HTTP.post<string>(url, data)
      .pipe(
        map((value) => value.data)
      );
  }

  public signInWithGoogle(data: SignInWithGoogle): Observable<string> {
    const url = `${ this.BASE_URL }/google`;

    return this.HTTP.post<string>(url, data)
      .pipe(
        map((value) => value.data)
      );
  }
}

export default new SessionResource();

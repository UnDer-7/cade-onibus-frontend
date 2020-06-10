import { Observable } from 'rxjs';
import QueryString from 'query-string';

import { User } from '../models/User';
import AbstractResource from './AbstractResource';
import { GoogleIdWithEmail } from '../models/types/SignInTypes';

class UserResource extends AbstractResource {
  constructor() {
    super('users');
  }

  public getUser(email: string): Observable<User> {
    const url = `${ this.BASE_URL }/${ email }`;

    return this.getResponseBody<User>(
      this.HTTP.get(url)
    );
  }

  public createUserWithGoogle(data: GoogleIdWithEmail): Observable<string> {
    const url = this.createUrlWithQueryParams(this.BASE_URL, { type: 'google' });
    return this.getResponseBody<string>(
      this.HTTP.post<string>(url, data)
    );
  }

  public updatePassword({password, token}: {password: string, token: string}): Observable<void> {
    const url = `${this.BASE_URL}/update-password`;

    return this.getResponseBody<void>(
      this.HTTP.post(url, { password }, {
        headers: {
          forgotPasswordToken: token,
        },
      })
    );
  }
}

export default new UserResource();

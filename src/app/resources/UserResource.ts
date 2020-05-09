import { Observable } from 'rxjs';

import { User } from '../models/User';
import AbstractResource from './AbstractResource';

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

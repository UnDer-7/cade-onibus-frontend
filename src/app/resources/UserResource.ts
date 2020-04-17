import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User';
import AbstractResource from './AbstractResource';

class UserResource extends AbstractResource {
  constructor() {
    super('users');
  }

  public getUser(email: string): Observable<User> {
    const url = `${ this.BASE_URL }/${ email }`;

    return this.HTTP.get<User>(url)
      .pipe(
        map((value) => value.data)
      );
  }
}

export default new UserResource();

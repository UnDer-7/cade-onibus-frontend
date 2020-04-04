import { User } from '../models/UserModel';
import AbstractResource from './AbstractResource';

class UserResource extends AbstractResource {
  constructor() {
    super('users');
  }

  public getUser(email: string): Promise<User> {
    const url = `${ this.BASE_URL }/${ email }`;

    return this.HTTP.get<User>(url);
  }
}

export default new UserResource();

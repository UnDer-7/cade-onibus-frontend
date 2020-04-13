import AbstractResource from './AbstractResource';

import { SignInWithEmail } from '../models/types/SignInWithEmail';

class SessionResource extends AbstractResource {
  constructor() {
    super('session');
  }

  public loginWithEmail(data: SignInWithEmail): Promise<string> {
    const url = `${ this.BASE_URL }/email`;

    return this.HTTP.post<string>(url, data);
  }
}

export default new SessionResource();

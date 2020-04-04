import AbstractResource from './AbstractResource';

export interface LoginWithEmail {
  email: string;
  password: string
}

class SessionResource extends AbstractResource {
  constructor() {
    super('session');
  }

  public loginWithEmail(data: LoginWithEmail): Promise<string> {
    const url = `${ this.BASE_URL }/email`;

    return this.HTTP.post<string>(url, data);
  }
}

export default new SessionResource();

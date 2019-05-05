import { SocialUser } from 'angularx-social-login';
import { Base } from './base.model';
import { Onibus } from './onibus.model';

export interface User extends Base {
  google_id?: string;
  name?: string;
  email?: string;
  password?: string;
  onibus?: Onibus[];
}

export function ObjectToUser(user: any): User {
  return Object.assign({}, {
    _id: user.id,
    google_id: user.google_id,
    name: user.name,
    email: user.email,
    password: user.password,
    onibus: user.onibus,
    createdAt: user.createdAt,
  });
}

export function SocialUserToUser(socialUser: SocialUser): User {
  return Object.assign({}, {
    google_id: socialUser.id,
    name: socialUser.name,
    email: socialUser.email,
  });
}

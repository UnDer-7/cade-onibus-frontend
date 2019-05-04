import { Base } from './base.model';
import { Onibus } from './onibus.model';

export interface User extends Base {
  google_id?: string;
  name?: string;
  email?: string;
  password?: string;
  onibus?: Onibus[];
}

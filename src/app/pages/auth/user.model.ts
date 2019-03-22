import { Onibus } from '../onibus.modal';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  onibus?: Onibus[];
}

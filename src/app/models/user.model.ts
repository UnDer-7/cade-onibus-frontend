import { Onibus } from './onibus.modal';

export interface User {
  _id?: number;
  name?: string;
  email?: string;
  password?: string;
  onibus?: Onibus[];
}

import { Onibus } from './onibus.modal';

export interface User {
  _id?: number;
  name?: string;
  email?: string;
  moedas?: number;
  password?: string;
  onibus?: Onibus[];
}

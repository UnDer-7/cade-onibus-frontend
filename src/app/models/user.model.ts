import { Onibus } from './onibus.modal';
import { Pacote } from './pacote.model';

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  userId?: string;
  moedas?: number;
  password?: string;
  onibus?: Onibus[];
  pacote?: Pacote;
}

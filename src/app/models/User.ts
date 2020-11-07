export interface User {
  googleId?: string;
  name?: string;
  email?: string;
  bus?: Bus[];
  categories: Category[];
}

export interface Category {
  title: string;
  cardColor: number;
  uuid: string;
  buses: Bus[];
}

interface FaixaTarifaria {
  sequencial?: number;
  descricao?: string;
  tarifa?: number;
}

interface Bacia {
  sequencial?: string;
  descricao?: string;
}

export interface Bus {
  sequencial?: number;
  numero?: string;
  descricao?: string;
  sentido?: string;
  faixaTarifaria?: FaixaTarifaria;
  ativa?: string;
  bacia?: Bacia;
  tipoLinha?: string;
  operadoras?: any;
  tiposOnibus?: any;
}

export interface Onibus {
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

interface FaixaTarifaria {
  sequencial?: number;
  descricao?: string;
  tarifa?: number;
}

interface Bacia {
  sequencial?: string;
  descricao?: string;
}

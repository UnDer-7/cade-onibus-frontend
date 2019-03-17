export class Onibus {
  constructor(
    public sequencial?: number,
    public numero?: string,
    public descricao?: string,
    public sentido?: string,
    public faixaTarifaria?: FaixaTarifaria,
    public ativa?: string,
    public bacia?: Bacia,
    public tipoLinha?: string,
    public operadoras?: any,
    public tiposOnibus?: any
  ) {}
}

export class FaixaTarifaria {
  constructor(
    public sequencial?: number,
    public descricao?: string,
    public tarifa?: number
  ) {}
}

export class Bacia {
  constructor(
    public sequencial?: string,
    public descricao?: string
  ) {}
}

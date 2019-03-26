export interface Geometry {
  coordinates: number[];
}

export interface Properties {
  numero: string;
  horario: any;
  velocidade: string;
  linha: string;
  operadora: string;
  id_operadora: number;
}

export interface BusLocation {
  geometry: Geometry;
  properties: Properties[];
}

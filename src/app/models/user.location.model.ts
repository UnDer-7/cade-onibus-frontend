export interface UserLocation {
  numero: string;
  sequencial: number;
  cords: Coords;
}

export interface Coords {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  speed?: number;
  heading?: number;
}

export interface UserLocation {
  numero: string;
  sequencial: number;
  hora: string;
  cords: Coords;
}

interface Coords {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  speed?: number;
  heading?: number;
}

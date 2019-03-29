export interface UserLocation {
  numero: string;
  sequencial: number;
  hora: Date;
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

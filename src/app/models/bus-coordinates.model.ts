import { Coordinates } from './coordinates.model';

export interface BusCoordinates {
  geometry: Coordinates;
  properties: Properties;
}

interface Properties {
  numero: string;
  horario: any;
  linha: string;
  operadora: string;
  id_operadora: number;
}

/**
 *  Converts an DFTrans bus-watch-location Response
 *  into a BusCoordinates model
 * @param response - response from DFTrans /gps/linha/ API
 */
export function ObjectsToBusCoordinates(response: any): BusCoordinates[] {
  const features: any[] = response.features;

  const properties = features.map(item => {
    return {
      horario: item.properties.horario,
      id_operadora: item.properties.id_operadora,
      linha: item.properties.linha,
      numero: item.properties.numero,
      operadora: item.properties.operadora,
    };
  });

  const locations = features.map(item => {
    return {
      // coordinates[0] -> longitude
      longitude: item.geometry.coordinates[0],
      // coordinates[1] -> latitude
      latitude: item.geometry.coordinates[1],
    };
  });

  return properties.map((item, index) => {
    return {
      geometry: locations[index],
      properties: item,
    };
  });
}

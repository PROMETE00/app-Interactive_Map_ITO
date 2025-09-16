export type LngLat = [number, number];

export type POIType = 'bathroom' | 'staff' | 'entrance' | 'custom';

export interface BuildingPOI {
  id: string;
  name: string;
  type: POIType;
  coord: LngLat;          // [lng, lat]
  iconUrl?: string;       // futuro: icono propio
}

export interface BuildingDef {
  id: string;
  name: string;
  polygon: LngLat[];      // anillo exterior (si no está cerrado, lo cerramos)
  height?: number;        // metros
  levels?: number;        // alternativa a height (3m por nivel)
  base?: number;          // base en metros (default 0)
  color?: string;         // hex (fallback gris)
  textureUrl?: string;    // FUTURO: textura para 3D (requiere custom layer)
  pois?: BuildingPOI[];   // puntos de interés internos
}
export type POIType = 'entrada' | 'escaleras' | 'elevador' | 'baños' | 'oficina' | 'otro';

export type BuildingPOI = {
  id: string;
  name: string;
  type: POIType;
  coord?: [number, number];                // opcional
  polygon?: [number, number][];            // opcional (para zonas/entradas)
  color?: string;                           // color propio del polígono
};


export type BuildingDef = {
  id: string;
  name: string;
  polygon: [number, number][]; // anillo exterior; no es necesario cerrarlo
  height?: number;   // metros (prioridad sobre levels)
  levels?: number;   // pisos (≈3 m por piso)
  base?: number;     // metros
  color?: string;    // '#9ca3af' por ej.
  textureUrl?: string | null;
  pois?: BuildingPOI[];
};
// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const PlantaTratamientoAguasResiduales: BuildingDef = defineBuilding({
  id: 'ito-planta-tratamiento-aguas-residuales',
  name: 'Planta de Tratamiento de Aguas Residuales',
  polygon: [
    [-96.74332364559201 , 17.077697231440794],// p1
    [-96.74319758177256 , 17.077705564256636],// p2
    [-96.74318148851901, 17.077463271459273],// p3
    [-96.74327067196575 , 17.07745942553932],// p4
    [-96.74327268362244 , 17.07750493558705],// p5
    [-96.74325323760775 , 17.07750621756006],// p6
    [-96.7432653075479 , 17.07763441481704],// p7
    [-96.74332297503977 , 17.077630568900613],// p8

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default PlantaTratamientoAguasResiduales;

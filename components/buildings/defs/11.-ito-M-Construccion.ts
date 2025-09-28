// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const MConstruccion: BuildingDef = defineBuilding({
  id: 'ito-m-construccion',
  name: 'Maestria en Construccion',
  polygon: [

    [-96.74598803605363 , 17.07883925786125],// p1
    [-96.74575267221894 , 17.07896040340544],// p2
    [-96.74570171024904 , 17.078876434809114],// p3
    [-96.74594310905384 , 17.078753366263722],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default MConstruccion;
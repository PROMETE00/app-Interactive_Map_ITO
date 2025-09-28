// components/buildings/defs/21.-itoEdificio-A.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioA: BuildingDef = defineBuilding({
  id: 'ito-edificio-a',
  name: 'Edificio A',
  polygon: [

    [-96.74576234032872 , 17.078527045253665],// p1
    [-96.74544651022578 , 17.07842961581273],// p2
    [-96.74548204949426 , 17.078323212549346],// p3
    [-96.74579787959722 , 17.07842128302924],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default EdificioA;
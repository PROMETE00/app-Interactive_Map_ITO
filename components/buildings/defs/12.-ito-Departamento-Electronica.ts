// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const DepartamentoElectronica: BuildingDef = defineBuilding({
  id: 'ito-departamento-electronica',
  name: 'Departamento de Electronica',
  polygon: [

    [-96.74543414754207 , 17.078885410612372],// p1
    [-96.74519006652832 , 17.078817466532918],// p2
    [-96.74525712175189 , 17.078599532526123],// p3
    [-96.74550053221341 , 17.078667476684974],// p4

  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default DepartamentoElectronica;
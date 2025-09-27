// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const AulaTipo: BuildingDef = defineBuilding({
  id: 'ito-aula-tipo',
  name: 'Aula Tipo',
  polygon: [

    [-96.74425988103448 , 17.07624680755737], // p1
    [-96.74410614105494 , 17.076194245846185],// p2
    [-96.74414100977135 , 17.076105148073957],// p3
    [-96.74428517850271, 17.076157068363656],// p4
  ],
  levels: 1,
  color: '#a77806',
  pois: [
    // entradas
  ],
});

export default AulaTipo;

// components/buildings/defs/ito-honguito.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const Bannos: BuildingDef = defineBuilding({
  id: 'ito-banos',
  name: 'Baños del Edificio H',
  polygon: [

    [-96.7444419095569 , 17.076700719478804],// p1
    [-96.7443719857251 , 17.076680531028202],// p2
    [-96.74440618388832 , 17.07656984478751],// p3
    [-96.7444792837249 , 17.076591562178116],// p4
  ],
  levels: 1,
  color: '#8af1f8',
  pois: [
    // entradas
  ],
});

export default Bannos;

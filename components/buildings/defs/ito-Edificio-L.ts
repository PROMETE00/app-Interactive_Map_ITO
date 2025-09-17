import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const EdificioL: BuildingDef = defineBuilding({
  id: 'ito-Edificio-L',
  name: 'Edificio L',
  // Traslado: +0.000040 lon (este), -0.000024 lat (sur)
  polygon: [
    [-96.744156, 17.078264], // p1 (antes -96.744196, 17.078288)
    [-96.743790, 17.078153], // p2 (antes -96.743830, 17.078177)
    [-96.743853, 17.077954], // p3 (target)
    [-96.744218, 17.078061], // p4 (antes -96.744258, 17.078085)
  ],
  levels: 2,
  color: '#1c3e73',
  pois: [
    {
      id: 'EdificioL-entr-1',
      name: 'Entrada principal',
      type: 'entrada',
      // Misma traslación aplicada a la entrada
      polygon: [
        [-96.744000, 17.078221], // (antes -96.74404, 17.078245)
        [-96.743960, 17.078209], // (antes -96.74400, 17.078233)
        [-96.743968, 17.078185], // (antes -96.744008, 17.078209)
        [-96.744008, 17.078196], // (antes -96.744048, 17.078220)
      ],
      color: '#22c55e'
    },
  ],
});

export default EdificioL;

// components/buildings/defs/ito-depto-ciencias-tierra.ts
import { defineBuilding } from '../define';
import type { BuildingDef } from '../types';

const DeptoCienciasTierra: BuildingDef = defineBuilding({
  id: 'ito-depto-ciencias-tierra',
  name: 'Depto. de Ciencias de la Tierra',
  // Mismo set de puntos, reordenados para que no se crucen y queden alineados con Civil.
  // Forman el "cuello" hacia el norte (p1→p2→p3) y luego bajan por el lado este y vuelven por el oeste.
  polygon: [
    [-96.7443457098048, 17.078593251342483], // p1
    [-96.74418880057053, 17.07854774155847], // p2
    [-96.744211131809, 17.078474333157294],  // p3
    [-96.74412375517623, 17.078447912041133],  // p4
    [-96.74416000998053, 17.07833367606207], // p5
    [-96.74431150344498, 17.078376149615697], // p6
    [-96.74427520621629, 17.078491230350508], // p7
    [-96.74426103066453 , 17.07848802159292], // p8
    [-96.74425362408329, 17.07851235634146], // p9
    [-96.7443617601185, 17.078544362725165], // p10
  ],
  levels: 1,
  color: '#f59e0b',
  pois: [],
});

export default DeptoCienciasTierra;
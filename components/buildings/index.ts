// Exporta tipos para el resto de la app
export * from './types';

import type { BuildingDef } from './types';
import { validateBuildings } from './validate';

// 👉 importa solo los edificios que quieras incluir en este build
import AulaAC from './defs/ito-Aula-Ac';
import AulaNN from './defs/ito-AulaNN';
import Biblioteca from './defs/ito-Biblioteca';
import CentroComputo from './defs/ito-CentroDeConmputo';
import Doctorado from './defs/ito-Doctorado';
import DptoQuimicaBioquimicaIndustrial from './defs/ito-Dpto-Bioquimica-Industrial';
import DptoCienciasDeLaTierra from './defs/ito-Dpto-CienciasDeLaTierra';
import EdificioElectronica from './defs/ito-Edificio-Electronica';
import EdificioL from './defs/ito-Edificio-L';
import EdificioB from './defs/ito-EdificioB';
import Gimnasio from './defs/ito-Gimnasio';
import LabFisicoQuimica from './defs/ito-Lab-FisicoQuimica';
import LaboratorioCivil from './defs/ito-Laboratorio-Civil';
import LaboratorioQuimica from './defs/ito-Laboratorio-Quimica';

// Puedes agrupar por zonas/campus si lo necesitas
export const campusPrincipal = [
  Biblioteca,
  EdificioL,
  LaboratorioQuimica,
  LaboratorioCivil,
  DptoCienciasDeLaTierra,
  AulaAC,
  CentroComputo,
  DptoQuimicaBioquimicaIndustrial,
  AulaNN,
  Gimnasio,
  LabFisicoQuimica,
  Doctorado,
  EdificioB,
  EdificioElectronica,
] satisfies BuildingDef[];

// Este es el arreglo que pasas a htmlPage()
export const customBuildings: BuildingDef[] = validateBuildings([
  ...campusPrincipal,
]);
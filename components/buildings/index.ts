// Exporta tipos para el resto de la app
export * from './types';

import type { BuildingDef } from './types';
import { validateBuildings } from './validate';


import AudiovisualAdministracion from './defs/ito-Audiovisual-Administracion';
import AulaAC from './defs/ito-Aula-Ac';
import AulaH from './defs/ito-Aula-H';
import AulaK from './defs/ito-Aula-k';
import Aulas1s4 from './defs/ito-Aula-s1-s4';
import AulaTipo from './defs/ito-Aula-Tipo';
import AulaNN from './defs/ito-AulaNN';
import Biblioteca from './defs/ito-Biblioteca';
import CafeITO from './defs/ito-Cafe-ITO';
import CentroComputo from './defs/ito-CentroDeConmputo';
import Cesa from './defs/ito-Cesa';
import CoordinacionLenguas from './defs/ito-Coordinacion-Lenguas';
import DepartamentoCienciasEconomicoAdministrativas from './defs/ito-Departamento-Ciencias-Economico-Administrativas';
import Doctorado from './defs/ito-Doctorado';
import DptoQuimicaBioquimicaIndustrial from './defs/ito-Dpto-Bioquimica-Industrial';
import DptoCienciasDeLaTierra from './defs/ito-Dpto-CienciasDeLaTierra';
import EdificioE from './defs/ito-Edificio-E';
import EdificioElectronica from './defs/ito-Edificio-Electronica';
import EdificioF from './defs/ito-Edificio-F';
import EdificioG from './defs/ito-Edificio-G';
import EdificioI from './defs/ito-Edificio-I';
import EdificioL from './defs/ito-Edificio-L';
import EdificioB from './defs/ito-EdificioB';
import EdificioJ from './defs/ito-EdificioJ';
import EdificioQ from './defs/ito-EdificioQ';
import Gimnasio from './defs/ito-Gimnasio';
import Ingles1 from './defs/ito-Ingles1';
import Ingles2 from './defs/ito-Ingles2';
import LabFisicoQuimica from './defs/ito-Lab-FisicoQuimica';
import LaboratorioCivil from './defs/ito-Laboratorio-Civil';
import LaboratorioDepartamentoMecanica from './defs/ito-Laboratorio-Departamento-Mecanica';
import LaboratorioIndustrial from './defs/ito-Laboratorio-Industrial';
import LaboratorioQuimicaPesada from './defs/ito-Laboratorio-QuimicaPesada';
import MAdministracion from './defs/ito-M-Administracion';
import ServicioMedico from './defs/ito-Servicio-Medico';

export const campusPrincipal = [
  Biblioteca,
  EdificioL,
  LaboratorioQuimicaPesada,
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
  Ingles1,
  Ingles2,
  EdificioQ,
  LaboratorioIndustrial,
  AulaK,
  Aulas1s4,
  EdificioI,
  EdificioJ,
  AudiovisualAdministracion,
  DepartamentoCienciasEconomicoAdministrativas,
  AulaTipo,
  MAdministracion,
  EdificioG,
  EdificioF,
  EdificioE,
  CafeITO,
  ServicioMedico,
  AulaH,
  CoordinacionLenguas,
  Cesa,
  LaboratorioDepartamentoMecanica,
] satisfies BuildingDef[];


export const customBuildings: BuildingDef[] = validateBuildings([
  ...campusPrincipal,
]);
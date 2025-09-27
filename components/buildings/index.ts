// Exporta tipos para el resto de la app
export * from './types';

import type { BuildingDef } from './types';
import { validateBuildings } from './validate';


import LaboratorioDepartamentoMecanica from './defs/14-ito-Laboratorio-Departamento-Mecanica';
import LaboratorioQuimicaPesada from './defs/15-ito-Laboratorio-QuimicaPesada';
import LaboratorioCivil from './defs/16-ito-Laboratorio-Civil';
import DepartamentoCienciasDeLaTierra from './defs/17-ito-Departamento-CienciasDeLaTierra';
import AulaAC from './defs/18-ito-Aula-Ac';
import EdificioElectronica from './defs/19-ito-Edificio-Electronica';
import DepartamentoQuimicaBioquimicaIndustrial from './defs/2-ito-Departamento-Quimica-Bioquimica-Industrial';
import EdificioB from './defs/23-ito-Edificio-B';
import LabFisicoQuimica from './defs/24-ito-Lab-FisicoQuimica';
import EdificioL from './defs/25-ito-Edificio-L';
import AulaNN from './defs/3-ito-AulaNN';
import Biblioteca from './defs/32-ito-Biblioteca';
import Gimnasio from './defs/33-ito-Gimnasio';
import CafeITO from './defs/37-ito-Cafe-ITO';
import EdificioQ from './defs/39-ito-Edificio-Q';
import EdificioE from './defs/42-ito-Edificio-E';
import LaboratorioIndustrial from './defs/43-ito-Laboratorio-Industrial';
import ServicioMedico from './defs/44-1-ito-Servicio-Medico';
import EdificioH from './defs/44-2-3-ito-Edificio-H';
import CoordinacionLenguas from './defs/44-4-ito-Coordinacion-Lenguas';
import Cesa from './defs/44-5-ito-Cesa';
import EdificioF from './defs/45-ito-Edificio-F';
import AudiovisualLicenciatura from './defs/46-ito-Audiovisual-Licenciatura';
import EdificioG from './defs/47-ito-Edificio-G';
import AulaK from './defs/48-ito-Aula-k';
import Aulas1s4 from './defs/49-ito-Aula-s1-s4';
import EdificioJ from './defs/50-1-ito-Edificio-J';
import DepartamentoCienciasEconomicoAdministrativas from './defs/50-2-ito-Departamento-Ciencias-Economico-Administrativas';
import MAdministracion from './defs/51-ito-M-Administracion';
import AulaTipo from './defs/52-ito-Aula-Tipo';
import EdificioI from './defs/53-ito-Edificio-I';
import CentroComputo from './defs/6-ito-CentroDeConmputo-SistemasComputacionales';
import Doctorado from './defs/7-ito-Doctorado';
import Ingles1 from './defs/ito-Ingles1';
import Ingles2 from './defs/ito-Ingles2';

export const campusPrincipal = [
  Biblioteca,
  EdificioL,
  LaboratorioQuimicaPesada,
  LaboratorioCivil,
  DepartamentoCienciasDeLaTierra,
  AulaAC,
  CentroComputo,
  DepartamentoQuimicaBioquimicaIndustrial,
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
  AudiovisualLicenciatura,
  DepartamentoCienciasEconomicoAdministrativas,
  AulaTipo,
  MAdministracion,
  EdificioG,
  EdificioF,
  EdificioE,
  CafeITO,
  ServicioMedico,
  EdificioH,
  CoordinacionLenguas,
  Cesa,
  LaboratorioDepartamentoMecanica,
] satisfies BuildingDef[];


export const customBuildings: BuildingDef[] = validateBuildings([
  ...campusPrincipal,
]);
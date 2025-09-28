// Exporta tipos para el resto de la app
export * from './types';

import type { BuildingDef } from './types';
import { validateBuildings } from './validate';


import Asesorias from './defs/1.-ito-Asesorias';
import Conacyt from './defs/10.-ito-Conacyt';
import MConstruccion from './defs/11.-ito-M-Construccion';
import DepartamentoElectronica from './defs/12.-ito-Departamento-Electronica';
import MDocencia from './defs/13.-ito-M-Docencia';
import LaboratorioDepartamentoMecanica from './defs/14-ito-Laboratorio-Departamento-Mecanica';
import LaboratorioQuimicaPesada from './defs/15-ito-Laboratorio-QuimicaPesada';
import LaboratorioCivil from './defs/16-ito-Laboratorio-Civil';
import DepartamentoCienciasDeLaTierra from './defs/17-ito-Departamento-CienciasDeLaTierra';
import AulaAC from './defs/18-ito-Aula-Ac';
import EdificioElectronica from './defs/19-ito-Edificio-Electronica';
import DepartamentoQuimicaBioquimicaIndustrial from './defs/2-ito-Departamento-Quimica-Bioquimica-Industrial';
import Seccion61 from './defs/20.-ito-Seccion61';
import EdificioA from './defs/21.-itoEdificio-A';
import LaboratorioMicroscopia from './defs/22.-1-ito-Laboratorio-Microscopia';
import SalaTitulacion from './defs/22.-2-ito-Sala-Titulacion';
import AulaDibujo from './defs/22.-3-ito-Aula-Dibujo';
import EdificioB from './defs/23-ito-Edificio-B';
import LabFisicoQuimica from './defs/24-ito-Lab-FisicoQuimica';
import EdificioL from './defs/25-ito-Edificio-L';
import AulasO from './defs/26.-ito-Aulas-O';
import AulasP from './defs/27.-ito-Aulas-P';
import AudiovisualIngenieria from './defs/28-ito-Audiovisual-Ingenieria';
import EdificioC from './defs/29.-ito-Edificio-C';
import AulaNN from './defs/3-ito-AulaNN';
import AulaAM from './defs/30.-1-ito-Aula-AM';
import DesarrolloAcademico from './defs/30.-2-ito-Desarrollo-Academico';
import CubiculosMaestros from './defs/31.-ito-Cubiculos-Maestros';
import Biblioteca from './defs/32-ito-Biblioteca';
import Gimnasio from './defs/33-ito-Gimnasio';
import ExtraEscolares from './defs/34.-ito-Extraescolares';
import ServiciosEscolares from './defs/35.-1-ito-Servicios-Escolares';
import DivisionEstudiosProfesionales from './defs/35.-2-ito-Division-Estudios-Profesionales';
import Direccion from './defs/36.-ito-Direccion';
import CafeITO from './defs/37-ito-Cafe-ITO';
import Copias from './defs/38.-Copias';
import EdificioQ from './defs/39-ito-Edificio-Q';
import LaboratorioSimulacion from './defs/4.-ito-LaboratorioSimulacion';
import PlantaTratamientoAguasResiduales from './defs/40.-ito-Planta-Tratamiento-Aguas-Residuales';
import CienciasBasicas from './defs/41.-ito-Ciencias-Basicas';
import EdificioE from './defs/42-ito-Edificio-E';
import LaboratorioIndustrial from './defs/43-ito-Laboratorio-Industrial';
import ServicioMedico from './defs/44-1-ito-Servicio-Medico';
import EdificioH from './defs/44-2-3-ito-Edificio-H';
import CoordinacionLenguas from './defs/44-4-ito-Coordinacion-Lenguas';
import Cesa from './defs/44-5-ito-Cesa';
import Bannos from './defs/44-6-Bannos-Edificio-H';
import EdificioF from './defs/45-ito-Edificio-F';
import AudiovisualLicenciatura from './defs/46-ito-Audiovisual-Licenciatura';
import EdificioG from './defs/47-ito-Edificio-G';
import AulaK from './defs/48-ito-Aula-k';
import Aulas1s4 from './defs/49-ito-Aula-s1-s4';
import Caldera from './defs/5-ito-Caldera';
import EdificioJ from './defs/50-1-ito-Edificio-J';
import DepartamentoCienciasEconomicoAdministrativas from './defs/50-2-ito-Departamento-Ciencias-Economico-Administrativas';
import MAdministracion from './defs/51-ito-M-Administracion';
import AulaTipo from './defs/52-ito-Aula-Tipo';
import EdificioI from './defs/53-ito-Edificio-I';
import CentroComputo from './defs/6-ito-CentroDeConmputo-SistemasComputacionales';
import Doctorado from './defs/7-ito-Doctorado';
import DEPIPosgrado from './defs/8.-ito-DEPI-Posgrado';
import LaboratorioElectrica from './defs/9.-ito-Laboratorio-Electrica';
import AulaSUM from './defs/ito-Aula-Sum';
import Ingles1 from './defs/ito-Ingles1';
import Ingles2 from './defs/ito-Ingles2';
import IntermedioServiciosEscolares from './defs/ito-Intermedio-ServiciosEscolares-DivisionEstudios';

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
  Bannos,
  Asesorias,
  LaboratorioSimulacion,
  Caldera,
  DEPIPosgrado,
  LaboratorioElectrica,
  MDocencia,
  DepartamentoElectronica,
  Conacyt,
  MConstruccion,
  Seccion61,
  EdificioA,
  AudiovisualIngenieria,
  AulaAM,
  DesarrolloAcademico,
  AulaSUM,
  LaboratorioMicroscopia,
  SalaTitulacion,
  AulaDibujo,
  EdificioC,
  AulasO,
  AulasP,
  CubiculosMaestros,
  ExtraEscolares,
  ServiciosEscolares,
  DivisionEstudiosProfesionales,
  IntermedioServiciosEscolares,
  Direccion,
  Copias,
  CienciasBasicas,
  PlantaTratamientoAguasResiduales,
] satisfies BuildingDef[];


export const customBuildings: BuildingDef[] = validateBuildings([
  ...campusPrincipal,
]);
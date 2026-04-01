import type { BuildingDef } from '@/components/buildings/types';
import { buildHtmlPageTemplate } from './htmlPageTemplate';
import { getBasemapStyle, type Basemap } from '@/constants/mapStyles';

type PanMode = 'locked' | 'soft' | 'free';

export function htmlPage(
  center: { lng: number; lat: number },
  campusData: any,
  opts: {
    bufferM?: number;
    basemap?: Basemap;
    panMode?: PanMode;
    softExtraM?: number;
    maskOutside?: boolean;
    initialView?: 'topdown' | 'oblique';
    obliquePitch?: number;
    showOsmBuildings?: boolean;
    arrowColor?: string;
    vertexOrder?: 'cw' | 'ccw' | 'auto';
    floorHeightM?: number;
    /** NUEVOS */
    showBasemapLabels?: boolean;   // default false
    showCampusLabel?: boolean;     // default false
  } = {},
  buildings: BuildingDef[] = []
) {
  const bufferM      = opts.bufferM ?? 500;
  const basemap      = opts.basemap ?? 'positron';
  const panMode      = opts.panMode ?? 'soft';
  const softExtraM   = opts.softExtraM ?? 300;
  const maskOutside  = !!opts.maskOutside;
  const initialView  = opts.initialView ?? 'topdown';
  const obliquePitch = opts.obliquePitch ?? 60;
  const arrowColor   = opts.arrowColor ?? '#2563eb';
  const vertexOrder  = opts.vertexOrder ?? 'auto';
  const floorHeightM = opts.floorHeightM ?? 3;
  const showOsmBuildings   = !!opts.showOsmBuildings;
  const showBasemapLabels  = opts.showBasemapLabels ?? false;
  const showCampusLabel    = opts.showCampusLabel ?? false;

  const styleJSON = getBasemapStyle(basemap, { labels: showBasemapLabels });

  return buildHtmlPageTemplate({
    campusData,
    styleJSON,
    center,
    bufferM,
    panMode,
    softExtraM,
    maskOutside,
    initialView,
    obliquePitch,
    arrowColor,
    buildings,
    vertexOrder,
    floorHeightM,
    showOsmBuildings,
    // pasa la preferencia del label del campus
    showCampusLabel,
  });
}
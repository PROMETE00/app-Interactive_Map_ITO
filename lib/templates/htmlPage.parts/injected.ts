// lib/templates/htmlPage.parts/injected.ts
export type InjectParams = {
  campusData: any;
  styleJSON: any;
  center: { lng: number; lat: number };
  bufferM: number;
  panMode: 'locked' | 'soft' | 'free';
  softExtraM: number;
  maskOutside: boolean;
  initialView: 'topdown' | 'oblique';
  obliquePitch: number;
  arrowColor: string;
  /** Puedes pasarlo si quieres forzar otra expresión; si no, se calcula aquí. */
  heightExpr?: any;
  buildings: any;
  vertexOrder: 'cw' | 'ccw' | 'auto';
  floorHeightM: number;
  /** Mostrar/ocultar edificios del estilo base (si el estilo los tuviera) */
  showOsmBuildings?: boolean;
  /** Mostrar/ocultar el label del campus */
  showCampusLabel?: boolean;
};

export function renderInjected(p: InjectParams) {
  // Altura por piso por defecto (si no te pasan otra)
  const floorH = (typeof p.floorHeightM === 'number' && !Number.isNaN(p.floorHeightM))
    ? p.floorHeightM
    : 3.2;

  // Regla con prioridad:
  // 1) levels * height (si ambos existen y levels > 0)  -> height = alto por piso
  // 2) levels * floorH (si levels > 0 y no hay height)
  // 3) height (si no hay levels)
  // 4) 6 (fallback)
  const computedHeightExpr = p.heightExpr ?? [
    'case',
    ['all',
      ['has', 'levels'],
      ['>', ['to-number', ['get', 'levels']], 0],
      ['has', 'height']
    ],
      ['*', ['to-number', ['get', 'levels']], ['to-number', ['get', 'height']]],
    ['all',
      ['has', 'levels'],
      ['>', ['to-number', ['get', 'levels']], 0]
    ],
      ['*', ['to-number', ['get', 'levels']], floorH],
    ['has', 'height'],
      ['to-number', ['get', 'height']],
    6
  ];

  const showOsm = !!p.showOsmBuildings;
  const showCampusLabel = !!p.showCampusLabel;

  return `
    <script>
      // ===== Datos inyectados =====
      const CAMPUS = ${JSON.stringify(p.campusData)};
      const STYLE = ${JSON.stringify(p.styleJSON)};
      const START = [${p.center.lng}, ${p.center.lat}];
      const BUFFER_M = ${p.bufferM};
      const PAN_MODE = ${JSON.stringify(p.panMode)};
      const SOFT_EXTRA_M = ${p.softExtraM};
      const MASK_OUTSIDE_INIT = ${p.maskOutside};
      const INITIAL_VIEW = ${JSON.stringify(p.initialView)};
      const OBLIQUE_PITCH = ${p.obliquePitch};
      const HEIGHT_EXPR = ${JSON.stringify(computedHeightExpr)};
      const ARROW_COLOR = ${JSON.stringify(p.arrowColor)};
      const CUSTOM_BUILDINGS = ${JSON.stringify(p.buildings)};
      const VERTEX_ORDER = ${JSON.stringify(p.vertexOrder)};
      const FLOOR_HEIGHT_M = ${JSON.stringify(floorH)};
      const SHOW_OSM_BUILDINGS_INIT = ${JSON.stringify(showOsm)};
      const SHOW_CAMPUS_LABEL_INIT = ${JSON.stringify(showCampusLabel)};

      let map, playerMarker;

      // ===== Runtime State =====
      let PAN_MODE_RT = PAN_MODE;
      let INITIAL_VIEW_RT = INITIAL_VIEW;
      let MASK_VISIBLE_RT = MASK_OUTSIDE_INIT;

      // Buffer mensajes si llegan antes del load
      let __PENDING_BUILDINGS__ = null;
      let __PENDING_FLAGS__ = null;

      console.log('CUSTOM_BUILDINGS count:', (CUSTOM_BUILDINGS||[]).length);
    </script>
  `;
}
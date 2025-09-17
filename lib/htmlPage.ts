// lib/htmlPage.ts
import type { BuildingDef } from '@/components/buildings/types';

type Basemap = 'positron' | 'voyager' | 'dark' | 'osm';
type PanMode = 'locked' | 'soft' | 'free';

function getBasemapStyle(name: Basemap) {
  const cartoAttr = '© OpenStreetMap contributors © CARTO';
  const style: any = { version: 8, sources: {} as Record<string, any>, layers: [] as any[] };

  if (name === 'positron') {
    style.sources['carto-base'] = {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      ],
      tileSize: 256,
      attribution: cartoAttr,
    };
    style.sources['carto-labels'] = {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
        'https://b.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
        'https://c.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
        'https://d.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
      ],
      tileSize: 256,
      attribution: cartoAttr,
    };
    style.layers.push({ id: 'carto-base', type: 'raster', source: 'carto-base' });
    style.layers.push({ id: 'carto-labels', type: 'raster', source: 'carto-labels' });
  } else if (name === 'voyager') {
    style.sources['carto-base'] = {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      ],
      tileSize: 256,
      attribution: cartoAttr,
    };
    style.sources['carto-labels'] = {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
        'https://b.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
        'https://c.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
        'https://d.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
      ],
      tileSize: 256,
      attribution: cartoAttr,
    };
    style.layers.push({ id: 'carto-base', type: 'raster', source: 'carto-base' });
    style.layers.push({ id: 'carto-labels', type: 'raster', source: 'carto-labels' });
  } else if (name === 'dark') {
    style.sources['carto-base'] = {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      ],
      tileSize: 256,
      attribution: cartoAttr,
    };
    style.sources['carto-labels'] = {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
        'https://b.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
        'https://c.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
        'https://d.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
      ],
      tileSize: 256,
      attribution: cartoAttr,
    };
    style.layers.push({ id: 'carto-base', type: 'raster', source: 'carto-base' });
    style.layers.push({ id: 'carto-labels', type: 'raster', source: 'carto-labels' });
  } else {
    style.sources['osm'] = {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    };
    style.layers.push({ id: 'osm', type: 'raster', source: 'osm' });
  }
  return style;
}

export function htmlPage(
  center: { lng: number; lat: number },
  campusData: any,
  opts: {
    bufferM?: number;
    basemap?: Basemap;
    panMode?: PanMode;      // 'locked' | 'soft' | 'free'
    softExtraM?: number;
    maskOutside?: boolean;
    initialView?: 'topdown' | 'oblique';
    obliquePitch?: number;
    showOsmBuildings?: boolean;
    /** Color de la flecha (hex, rgb, hsl). */
    arrowColor?: string;
    /** NUEVO: fuerza el orden de los vértices */
    vertexOrder?: 'cw' | 'ccw' | 'auto';
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
  const showOsm      = opts.showOsmBuildings ?? false;
  const arrowColor   = opts.arrowColor ?? '#2563eb';
  const vertexOrder  = opts.vertexOrder ?? 'auto';

  const styleJSON = getBasemapStyle(basemap);

  const heightExpr = [
    'coalesce',
    ['to-number', ['get', 'height']],
    ['*', 3, ['to-number', ['get', 'levels']]],
    6,
  ];

  return `
<!doctype html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" rel="stylesheet" />
<style>
  html,body,#map{height:100%;margin:0}
  .maplibregl-ctrl{font-size:14px}
  .err{position:absolute;left:0;right:0;top:0;background:#fee2e2;color:#991b1b;padding:8px 12px;font-family:system-ui,sans-serif;z-index:9999;display:none}
  :root{ --arrow-color:${arrowColor}; --arrow-halo:#ffffff; }
  .arrow-wrap{ position:relative; width:0;height:0; transform-origin:50% 0%; }
  .arrow-halo,.arrow-fill{ position:absolute;left:50%;top:0;transform:translateX(-50%); width:0;height:0; }
  .arrow-halo{ border-left:13px solid transparent; border-right:13px solid transparent; border-bottom:22px solid var(--arrow-halo); z-index:0; }
  .arrow-fill{ border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid var(--arrow-color); z-index:1; filter: drop-shadow(0 1px 2px rgba(0,0,0,.4)); }
</style>
</head><body>
<div id="map"></div>
<div class="err" id="err"></div>
<script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js"></script>
<script src="https://unpkg.com/@turf/turf@6.5.0/turf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/osmtogeojson@3.0.0-beta.5/osmtogeojson.min.js"></script>
<script>
  // ===== Datos inyectados =====
  const CAMPUS = ${JSON.stringify(campusData)};
  const STYLE = ${JSON.stringify(styleJSON)};
  const START = [${center.lng}, ${center.lat}];
  const BUFFER_M = ${bufferM};
  const PAN_MODE = ${JSON.stringify(panMode)};
  const SOFT_EXTRA_M = ${softExtraM};
  const MASK_OUTSIDE = ${maskOutside};
  const INITIAL_VIEW = ${JSON.stringify(initialView)};
  const OBLIQUE_PITCH = ${obliquePitch};
  const SHOW_OSM = ${showOsm};
  const HEIGHT_EXPR = ${JSON.stringify(heightExpr)};
  const ARROW_COLOR = ${JSON.stringify(arrowColor)};
  const CUSTOM_BUILDINGS = ${JSON.stringify(buildings)};
  const VERTEX_ORDER = ${JSON.stringify(vertexOrder)}; // <-- nuevo

  let map, playerMarker;

  // ===== Runtime State =====
  let PAN_MODE_RT = PAN_MODE;
  let INITIAL_VIEW_RT = INITIAL_VIEW;
  let SHOW_OSM_RT = SHOW_OSM;

  // ================= Helpers =================
  (function(){
    const box = document.getElementById('err');
    window.addEventListener('error', e => { box.style.display='block'; box.textContent = 'Error: ' + e.message; });
    window.addEventListener('unhandledrejection', e => { box.style.display='block'; box.textContent = 'Promise: ' + (e.reason?.message || e.reason); });
  })();

  function unionAll(fc){
    const feats = (fc.features||[]).filter(f=>f && f.geometry);
    if(!feats.length) return null;
    let u = feats[0];
    for(let i=1;i<feats.length;i++){ try{ u = turf.union(u, feats[i]) || u; } catch(e){} }
    return u;
  }
  function closeRing(r){
    if (!r.length) return r;
    const a=r[0], b=r[r.length-1];
    if (a[0]!==b[0] || a[1]!==b[1]) r = r.concat([a]);
    return r;
  }
  // Normaliza [lat,lng] -> [lng,lat] si detecta el patrón
  function normLngLat(pair){
    const a = pair?.[0], b = pair?.[1];
    if (typeof a === 'number' && typeof b === 'number'){
      if (Math.abs(a) <= 90 && Math.abs(b) > 90) return [b, a];
    }
    return [a, b];
  }
  // --- NUEVO: orientación de anillos (shoelace) ---
  function signedArea(coords){
    let s = 0;
    const n = coords.length;
    if (n < 3) return 0;
    for (let i=0;i<n;i++){
      const j = (i+1)%n;
      s += coords[i][0]*coords[j][1] - coords[j][0]*coords[i][1];
    }
    return s/2; // >0 => CCW, <0 => CW
  }
  function orientRing(coords, order /* 'cw' | 'ccw' | 'auto' */){
    if (!Array.isArray(coords) || coords.length < 3 || order === 'auto') return coords;
    // si viene cerrado, quita el último para evaluar
    const closed = coords.length > 2 && coords[0][0]===coords[coords.length-1][0] && coords[0][1]===coords[coords.length-1][1];
    const work = closed ? coords.slice(0, -1) : coords.slice();
    const ccw = signedArea(work) > 0;
    if ((order === 'cw' && ccw) || (order === 'ccw' && !ccw)) work.reverse();
    return work;
  }

  const campusUnion = unionAll(CAMPUS);
  const baseBuffer  = campusUnion ? turf.buffer(campusUnion, BUFFER_M, { units:'meters' }) : null;

  function computePanBounds(mode){
    if (!campusUnion) return null;
    if (mode === 'locked') {
      const bb = turf.bbox(turf.buffer(campusUnion, BUFFER_M, { units:'meters' }));
      return [[bb[0],bb[1]],[bb[2],bb[3]]];
    }
    if (mode === 'soft') {
      const bb = turf.bbox(turf.buffer(campusUnion, BUFFER_M + SOFT_EXTRA_M, { units:'meters' }));
      return [[bb[0],bb[1]],[bb[2],bb[3]]];
    }
    return null; // free
  }

  function pointInBounds(lngLat, bounds){
    if (!bounds) return true;
    const [[w,s],[e,n]] = bounds;
    const [x,y] = lngLat;
    return x >= w && x <= e && y >= s && y <= n;
  }

  async function loadOsmBuildingsInsideCampus(bbox, campusMask){
    try{
      if(!bbox || !campusMask) return;

      const south=bbox[1], west=bbox[0], north=bbox[3], east=bbox[2];
      const bboxStr=\`\${south},\${west},\${north},\${east}\`;
      const q=\`
[out:json][timeout:25];
(
  way["building"](\${bboxStr});
  relation["building"](\${bboxStr});
);
(._;>;);
out body;
\`.trim();

      let overpassJSON;
      try{
        const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',headers:{'Content-Type':'text/plain'},body:q});
        overpassJSON=await r.json();
      }catch{
        const r2=await fetch('https://overpass.kumi.systems/api/interpreter',{method:'POST',headers:{'Content-Type':'text/plain'},body:q});
        overpassJSON=await r2.json();
      }

      const gjson=osmtogeojson(overpassJSON);
      const clipped={type:'FeatureCollection',features:[]};
      for(const f of gjson.features){
        if(!f.geometry) continue;
        const t=f.geometry.type;
        if(t==='Polygon'||t==='MultiPolygon'){
          try{ const cut=turf.intersect(f,campusMask); if(cut) clipped.features.push(cut);}catch(e){}
        }
      }

      if(map.getSource('buildings')){
        map.getSource('buildings').setData(clipped);
        ['b-3d'].forEach(id => { if (map.getLayer(id)) map.setLayoutProperty(id,'visibility','visible'); });
      }else{
        map.addSource('buildings',{type:'geojson',data:clipped});
        map.addLayer({
          id:'b-3d', type:'fill-extrusion', source:'buildings',
          paint:{
            'fill-extrusion-color':'#9ca3af',
            'fill-extrusion-opacity':0.95,
            'fill-extrusion-height': HEIGHT_EXPR,
            'fill-extrusion-base': 0
          }
        });
      }
    }catch(e){ console.warn('Overpass error:', e); }
  }

  // ===== Edificios + POIs (puntos) + Áreas (polígonos) =====
  function addCustomBuildings(defs, campusMask){
    const fcBuild={type:'FeatureCollection',features:[]};
    const fcPOI={type:'FeatureCollection',features:[]};
    const fcAreas={type:'FeatureCollection',features:[]};

    for(const b of (defs||[])){
      if(!b || !Array.isArray(b.polygon) || !b.polygon.length) continue;

      // reorienta según VERTEX_ORDER y cierra
      const oriented = orientRing((b.polygon||[]).map(normLngLat), VERTEX_ORDER);
      const ring = closeRing(oriented);

      const feat={ type:'Feature',
        properties:{
          id:b.id, name:b.name,
          height: b.height ?? undefined,
          levels: b.levels ?? undefined,
          base: b.base ?? 0,
          color: b.color ?? '#9ca3af',
          textureUrl: b.textureUrl ?? null
        },
        geometry:{ type:'Polygon', coordinates:[ring] }
      };

      try{
        const cut = campusMask ? turf.intersect(feat, campusMask) : feat;
        if(cut){
          cut.properties = { ...feat.properties, ...(cut.properties||{}) };
          fcBuild.features.push(cut);
        }
      }catch(e){}

      for(const p of (b.pois||[])){
        if (Array.isArray(p.polygon) && p.polygon.length >= 3) {
          try{
            const pring = closeRing(orientRing(p.polygon.map(normLngLat), VERTEX_ORDER));
            const areaFeat = {
              type:'Feature',
              properties:{
                id:p.id, name:p.name, type:p.type,
                color: p.color || ({
                  entrada:'#22c55e', escaleras:'#f59e0b', elevador:'#06b6d4',
                  baños:'#a855f7', oficina:'#ef4444', otro:'#111827'
                }[p.type] || '#22c55e')
              },
              geometry:{ type:'Polygon', coordinates:[pring] }
            };
            const cut = campusMask ? turf.intersect(areaFeat, campusMask) : areaFeat;
            if (cut) {
              cut.properties = { ...areaFeat.properties, ...(cut.properties||{}) };
              fcAreas.features.push(cut);
            }
          }catch(e){}
        } else if (Array.isArray(p.coord)) {
          fcPOI.features.push({
            type:'Feature',
            properties:{ id:p.id, name:p.name, type:p.type },
            geometry:{ type:'Point', coordinates: normLngLat(p.coord) }
          });
        }
      }
    }

    // === Fuentes/capas ===
    if(map.getSource('custom-buildings')){
      map.getSource('custom-buildings').setData(fcBuild);
    }else{
      map.addSource('custom-buildings',{type:'geojson',data:fcBuild});

      map.addLayer({
        id:'custom-2d', type:'fill', source:'custom-buildings',
        paint:{ 'fill-color':['coalesce',['get','color'],'#9ca3af'], 'fill-opacity':0.85 },
        layout:{ visibility:'none' }
      });
      map.addLayer({
        id:'custom-outline', type:'line', source:'custom-buildings',
        paint:{ 'line-color':['coalesce',['get','color'],'#666'], 'line-width':1.2 },
        layout:{ visibility:'none' }
      });
      map.addLayer({
        id:'custom-3d', type:'fill-extrusion', source:'custom-buildings',
        paint:{
          'fill-extrusion-color':['coalesce',['get','color'],'#9ca3af'],
          'fill-extrusion-opacity':0.92,
          'fill-extrusion-height':['coalesce',['to-number',['get','height']], ['*',3,['to-number',['get','levels']]], 10],
          'fill-extrusion-base':['coalesce',['to-number',['get','base']], 0]
        }
      });
    }

    if(map.getSource('custom-poi')){
      map.getSource('custom-poi').setData(fcPOI);
    }else{
      map.addSource('custom-poi',{type:'geojson',data:fcPOI});
      map.addLayer({
        id:'custom-poi-circle', type:'circle', source:'custom-poi',
        paint:{ 'circle-radius':5, 'circle-color':'#ef4444','circle-stroke-color':'#fff','circle-stroke-width':1.5 }
      });
      map.addLayer({
        id:'custom-poi-label', type:'symbol', source:'custom-poi',
        layout:{ 'text-field':['get','name'], 'text-size':12, 'text-offset':[0,1.2], 'text-anchor':'top' },
        paint:{ 'text-color':'#111','text-halo-color':'#fff','text-halo-width':1.1 }
      });
    }

    if(map.getSource('custom-areas')){
      map.getSource('custom-areas').setData(fcAreas);
    }else{
      map.addSource('custom-areas',{type:'geojson',data:fcAreas});
      map.addLayer({
        id:'custom-areas-fill', type:'fill', source:'custom-areas',
        paint:{ 'fill-color':['coalesce',['get','color'],'#22c55e'], 'fill-opacity':0.7 },
        layout:{ visibility:'none' }
      });
      map.addLayer({
        id:'custom-areas-outline', type:'line', source:'custom-areas',
        paint:{ 'line-color':['coalesce',['get','color'],'#16a34a'], 'line-width':1.4 },
        layout:{ visibility:'none' }
      });
    }
  }

  function setupMap(){
    const pitch0 = (INITIAL_VIEW === 'topdown') ? 0 : OBLIQUE_PITCH;
    const bearing0 = 0;

    map = new maplibregl.Map({
      container: 'map',
      style: STYLE,
      center: START,
      zoom: 18,
      pitch: pitch0,
      bearing: bearing0
    });
    map.addControl(new maplibregl.NavigationControl());

    const baseBuffer  = campusUnion ? turf.buffer(campusUnion, BUFFER_M, { units:'meters' }) : null;
    const boundsForPan = (function(){
      if (!baseBuffer) return null;
      if (PAN_MODE === 'locked') return turf.bbox(baseBuffer);
      if (PAN_MODE === 'soft') {
        const soft = turf.buffer(campusUnion, BUFFER_M + SOFT_EXTRA_M, { units:'meters' });
        return turf.bbox(soft);
      }
      return null; // 'free'
    })();

    if (boundsForPan) {
      map.setMaxBounds([[boundsForPan[0],boundsForPan[1]],[boundsForPan[2],boundsForPan[3]]]);
    }

    const fitBB = (function(){
      if (PAN_MODE === 'soft' && boundsForPan) return boundsForPan;
      if (boundsForPan) return boundsForPan;
      if (baseBuffer) return turf.bbox(baseBuffer);
      if (campusUnion) return turf.bbox(campusUnion);
      return null;
    })();

    map.on('load', async () => {
      if (${maskOutside ? 'true' : 'false'}) {
        try {
          const world = turf.bboxPolygon([-180,-85,180,85]);
          const baseBuffer2 = campusUnion ? turf.buffer(campusUnion, BUFFER_M, { units:'meters' }) : null;
          if (baseBuffer2) {
            const maskPoly = turf.difference(world, baseBuffer2);
            if (maskPoly) {
              map.addSource('mask', { type:'geojson', data: maskPoly });
              map.addLayer({ id:'mask-fill', type:'fill', source:'mask',
                paint:{ 'fill-color':'#f7f7f7', 'fill-opacity': 1 } });
            }
          }
        } catch(e){}
      }

      map.addSource('campus', { type:'geojson', data: CAMPUS });
      map.addLayer({
        id:'campus-labels', type:'symbol', source:'campus',
        layout:{ 'text-field':['get','name'], 'text-size':13, 'text-anchor':'center' },
        paint:{ 'text-color':'#111','text-halo-color':'#fff','text-halo-width':1.2 }
      });

      if (SHOW_OSM) {
        const bb = fitBB || boundsForPan || null;
        await loadOsmBuildingsInsideCampus(bb, campusUnion);
      }

      // Edificios/zones custom
      addCustomBuildings(CUSTOM_BUILDINGS, campusUnion);

      if (fitBB) {
        map.fitBounds([[fitBB[0],fitBB[1]],[fitBB[2],fitBB[3]]], { padding: 40, maxZoom: 19, duration: 0 });
      }

      function update2DLayersVisibility(){
        const vis = map.getPitch() <= 5 ? 'visible' : 'none';
        ['custom-2d','custom-outline','custom-areas-fill','custom-areas-outline'].forEach(id=>{
          if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', vis);
        });
      }
      update2DLayersVisibility();
      map.on('pitchend', update2DLayersVisibility);

      // === MARCADOR: Flecha ===
      const el = document.createElement('div');
      el.className = 'arrow-wrap';
      const halo = document.createElement('i'); halo.className = 'arrow-halo';
      const fill = document.createElement('i'); fill.className = 'arrow-fill';
      document.documentElement.style.setProperty('--arrow-color', ARROW_COLOR);
      fill.style.borderBottomColor = ARROW_COLOR;
      el.appendChild(halo); el.appendChild(fill);

      playerMarker = new maplibregl.Marker({ element: el, anchor: 'top' })
        .setLngLat(START)
        .addTo(map);

      // ===== EXPOSE RUNTIME APIS =====
      window.__MAP_READY__ = true;
      window.__PLAYER_EL__ = el;
      window.__ARROW_FILL__ = fill;

      window.setArrowColor = function(color){
        try{
          document.documentElement.style.setProperty('--arrow-color', color);
          if (window.__ARROW_FILL__) window.__ARROW_FILL__.style.borderBottomColor = color;
        }catch(e){}
      };

      window.setPanMode = function(mode){
        try{
          PAN_MODE_RT = mode;
          const bounds = computePanBounds(mode);
          map.setMaxBounds(bounds ? bounds : null);
          if (bounds) {
            const c = map.getCenter();
            if (!pointInBounds([c.lng, c.lat], bounds)) {
              map.fitBounds(bounds, { padding: 40, maxZoom: 19, duration: 250 });
            }
          }
        }catch(e){}
      };

      window.setInitialView = function(view){
        try{
          INITIAL_VIEW_RT = view;
          const pitch = (view === 'topdown') ? 0 : OBLIQUE_PITCH;
          map.easeTo({ pitch, duration: 250 });
        }catch(e){}
      };

      window.setShowOsm = async function(flag){
        try{
          SHOW_OSM_RT = !!flag;
          if (!SHOW_OSM_RT) {
            if (map.getLayer('b-3d')) map.setLayoutProperty('b-3d','visibility','none');
            return;
          }
          const bb = map.getBounds();
          const flat = [bb.getWest(), bb.getSouth(), bb.getEast(), bb.getNorth()];
          await loadOsmBuildingsInsideCampus(flat, campusUnion);
          if (map.getLayer('b-3d')) map.setLayoutProperty('b-3d','visibility','visible');
        }catch(e){}
      };

      window.updatePlayer = function(lng, lat, heading){
        try {
          if (typeof lng === 'number' && typeof lat === 'number') {
            playerMarker.setLngLat([lng,lat]);
          }
          if (typeof heading === 'number' && !Number.isNaN(heading)) {
            el.style.transform = 'rotate(' + heading + 'deg)'; // 0° = norte
          }
        } catch(e){}
      };

      window.addBuildings = function(defs){ addCustomBuildings(defs || [], campusUnion); };
    });
  }

  setupMap();
</script>
</body></html>`;
}
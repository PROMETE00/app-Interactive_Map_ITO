// lib/htmlPage.ts
import type { BuildingDef } from '@/components/buildings/types';

type Basemap = 'positron' | 'voyager' | 'dark' | 'osm';
type PanMode = 'locked' | 'soft' | 'free';

function getRasterBasemapStyle(name: Basemap) {
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
    hideBaseBuildings?: boolean; // 👈 NUEVO: ocultar edificios 2D del estilo base
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
  const hideBase     = opts.hideBaseBuildings ?? true;

  // ⚠️ Si queremos ocultar edificios base, usamos estilo VECTOR para poder apagar capas.
  const styleDef: string | object = hideBase
    ? 'https://demotiles.maplibre.org/style.json' // vector (openmaptiles schema)
    : getRasterBasemapStyle(basemap);             // raster normal

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
  .player{width:20px;height:20px;border-radius:50%;background:#22c55e;border:2px solid #fff;box-shadow:0 0 0 2px rgba(0,0,0,.15);position:relative}
  .player:after{content:'';position:absolute;left:50%;top:50%;width:100%;height:100%;border-radius:50%;
    transform:translate(-50%,-50%);box-shadow:0 0 0 0 rgba(34,197,94,.45);animation:pulse 2s infinite}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,.45)}70%{box-shadow:0 0 0 18px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}
</style>
</head><body>
<div id="map"></div>
<div class="err" id="err"></div>
<script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js"></script>
<script src="https://unpkg.com/@turf/turf@6.5.0/turf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/osmtogeojson@3.0.0-beta.5/osmtogeojson.min.js"></script>
<script>
  const CAMPUS = ${JSON.stringify(campusData)};
  const STYLE = ${JSON.stringify(styleDef)}; // puede ser URL (string) o JSON (objeto)
  const START = [${center.lng}, ${center.lat}];
  const BUFFER_M = ${bufferM};
  const PAN_MODE = ${JSON.stringify(panMode)};
  const SOFT_EXTRA_M = ${softExtraM};
  const MASK_OUTSIDE = ${maskOutside};
  const INITIAL_VIEW = ${JSON.stringify(initialView)};
  const OBLIQUE_PITCH = ${obliquePitch};
  const SHOW_OSM = ${showOsm};
  const HIDE_BASE = ${hideBase};
  const HEIGHT_EXPR = ${JSON.stringify(heightExpr)};
  const CUSTOM_BUILDINGS = ${JSON.stringify(buildings)};

  let map, playerMarker;

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

  const campusUnion = unionAll(CAMPUS);
  const baseBuffer  = campusUnion ? turf.buffer(campusUnion, BUFFER_M, { units:'meters' }) : null;

  function getBoundsForMode(){
    if (!baseBuffer) return null;
    if (PAN_MODE === 'locked') return turf.bbox(baseBuffer);
    if (PAN_MODE === 'soft') {
      const soft = turf.buffer(campusUnion, BUFFER_M + SOFT_EXTRA_M, { units:'meters' });
      return turf.bbox(soft);
    }
    return null;
  }
  const boundsForPan = getBoundsForMode();

  let maskPoly = null;
  if (MASK_OUTSIDE && baseBuffer) {
    try {
      const world = turf.bboxPolygon([-180,-85,180,85]);
      maskPoly = turf.difference(world, baseBuffer) || null;
    } catch(e) { maskPoly = null; }
  }

  function getInitialFitBounds(){
    if (PAN_MODE === 'soft' && boundsForPan) return boundsForPan;
    if (boundsForPan) return boundsForPan;
    if (baseBuffer) return turf.bbox(baseBuffer);
    if (campusUnion) return turf.bbox(campusUnion);
    return null;
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

  function addCustomBuildings(defs, campusMask){
    const fcBuild={type:'FeatureCollection',features:[]};
    const fcPOI={type:'FeatureCollection',features:[]};

    for(const b of (defs||[])){
      if(!b || !Array.isArray(b.polygon) || !b.polygon.length) continue;
      const ring=closeRing(b.polygon);
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
        if(cut) fcBuild.features.push(cut);
      }catch(e){}

      for(const p of (b.pois||[])){
        fcPOI.features.push({
          type:'Feature',
          properties:{ id:p.id, name:p.name, type:p.type },
          geometry:{ type:'Point', coordinates:p.coord }
        });
      }
    }

    if(map.getSource('custom-buildings')){
      map.getSource('custom-buildings').setData(fcBuild);
    }else{
      map.addSource('custom-buildings',{type:'geojson',data:fcBuild});
      map.addLayer({
        id:'custom-3d', type:'fill-extrusion', source:'custom-buildings',
        paint:{
          'fill-extrusion-color':['coalesce',['get','color'],'#9ca3af'],
          'fill-extrusion-opacity':0.98,
          'fill-extrusion-height': ['coalesce',['to-number',['get','height']], ['*',3,['to-number',['get','levels']]], 10],
          'fill-extrusion-base': ['coalesce',['to-number',['get','base']], 0]
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
  }

  function hideBaseBuildingsIfVector(){
    try{
      const layers = (map.getStyle() && map.getStyle().layers) || [];
      for(const l of layers){
        const id = l.id || '';
        const sl = l['source-layer'] || '';
        if ((sl && String(sl).toLowerCase().includes('building')) || /building/i.test(id)) {
          // apaga cualquier capa de edificios del estilo base
          map.setLayoutProperty(id, 'visibility', 'none');
        }
      }
    }catch(e){}
  }

  function setupMap(){
    const pitch0 = (INITIAL_VIEW === 'topdown') ? 0 : OBLIQUE_PITCH;
    const bearing0 = 0;

    map = new maplibregl.Map({
      container: 'map',
      style: STYLE,     // URL (vector) o JSON (raster)
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
      return null;
    })();

    if (boundsForPan) map.setMaxBounds([[boundsForPan[0],boundsForPan[1]],[boundsForPan[2],boundsForPan[3]]]);

    const fitBB = (function(){
      if (PAN_MODE === 'soft' && boundsForPan) return boundsForPan;
      if (boundsForPan) return boundsForPan;
      if (baseBuffer) return turf.bbox(baseBuffer);
      if (campusUnion) return turf.bbox(campusUnion);
      return null;
    })();

    map.on('load', async () => {
      // Si estamos en estilo vector y se pidió ocultar edificios, apágalos del estilo base
      if (HIDE_BASE) hideBaseBuildingsIfVector();

      if (MASK_OUTSIDE) {
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

      // Solo si tú lo pides (y aun así serán 3D recortados al campus)
      if (SHOW_OSM) {
        const bb = fitBB || boundsForPan || null;
        await loadOsmBuildingsInsideCampus(bb, campusUnion);
      }

      // Tus edificios modulares
      addCustomBuildings(CUSTOM_BUILDINGS, campusUnion);

      if (fitBB) map.fitBounds([[fitBB[0],fitBB[1]],[fitBB[2],fitBB[3]]], { padding: 40, maxZoom: 19, duration: 0 });

      const el = document.createElement('div'); el.className='player';
      playerMarker = new maplibregl.Marker({ element: el }).setLngLat(START).addTo(map);

      window.__MAP_READY__ = true;
      window.updatePlayer = function(lng, lat, heading){
        try {
          playerMarker.setLngLat([lng,lat]);
          if (typeof heading === 'number' && !Number.isNaN(heading)) {
            el.style.transform = 'rotate(' + heading + 'deg)';
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
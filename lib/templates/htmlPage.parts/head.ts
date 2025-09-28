// lib/templates/htmlPage.parts/head.ts
export function renderHead(arrowColor: string) {
  return `
    <!doctype html>
    <html>
    <head>
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
    </head>
    <body>
      <div id="map"></div>
      <div class="err" id="err"></div>
      <script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js"></script>
      <script src="https://unpkg.com/@turf/turf@6.5.0/turf.min.js"></script>
  `;
}
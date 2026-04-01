export type Basemap = 'positron' | 'voyager' | 'dark' | 'osm';

export function getBasemapStyle(name: Basemap, { labels = true }: { labels?: boolean } = {}) {
  const cartoAttr = '© OpenStreetMap contributors © CARTO';
  const style: any = { version: 8, sources: {} as Record<string, any>, layers: [] as any[] };
  style.glyphs = 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf';

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
    if (labels) {
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
    }
    style.layers.push({ id: 'carto-base', type: 'raster', source: 'carto-base' });
    if (labels) style.layers.push({ id: 'carto-labels', type: 'raster', source: 'carto-labels' });
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
    if (labels) {
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
    }
    style.layers.push({ id: 'carto-base', type: 'raster', source: 'carto-base' });
    if (labels) style.layers.push({ id: 'carto-labels', type: 'raster', source: 'carto-labels' });
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
    if (labels) {
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
    }
    style.layers.push({ id: 'carto-base', type: 'raster', source: 'carto-base' });
    if (labels) style.layers.push({ id: 'carto-labels', type: 'raster', source: 'carto-labels' });
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

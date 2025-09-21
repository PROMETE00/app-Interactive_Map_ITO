// lib/stripBuildingsFromStyle.ts
export async function getStyleWithoutBuildings(styleUrl: string) {
  const res = await fetch(styleUrl);
  const style = await res.json();

  // Clona y quita todas las capas que contengan "building"
  const layers = Array.isArray(style.layers) ? style.layers : [];
  const filtered = layers.filter((l: any) => {
    const id = (l?.id || '').toLowerCase();
    const sl = (l?.['source-layer'] || '').toLowerCase();
    return !(id.includes('building') || sl.includes('building'));
  });

  return { ...style, layers: filtered };
}
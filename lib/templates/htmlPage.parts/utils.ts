// lib/templates/htmlPage.parts/utils.ts
export function dedent(str: string) {
  const lines = str.replace(/\r\n/g, '\n').split('\n');
  // quita primeras/últimas líneas vacías
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  // calcula indent mínimo
  const indents = lines
    .filter(l => l.trim())
    .map(l => (l.match(/^(\s*)/)?.[1].length ?? 0));
  const min = indents.length ? Math.min(...indents) : 0;
  // corta indent común
  const out = lines.map(l => l.slice(min)).join('\n');
  return out + '\n';
}

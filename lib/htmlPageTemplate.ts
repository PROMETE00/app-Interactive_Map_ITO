// lib/htmlPageTemplate.ts
import { renderHead } from './templates/htmlPage.parts/head';
import { InjectParams, renderInjected } from './templates/htmlPage.parts/injected';
import { renderRuntimeScript } from './templates/htmlPage.parts/runtime';

export function buildHtmlPageTemplate(params: InjectParams) {
  const head = renderHead(params.arrowColor);
  const injected = renderInjected(params);
  const runtime = renderRuntimeScript();

  // Cerramos body/html aquí
  return head + injected + runtime + '</body></html>';
}
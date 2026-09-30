// Injeta o HTML renderizado pelo React em dist/index.html, para a página aparecer antes do JS carregar.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ssrDir = path.join(root, 'dist-ssr');
const indexPath = path.join(root, 'dist', 'index.html');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

const template = readFileSync(indexPath, 'utf-8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: "${placeholder}" não encontrado em dist/index.html`);
}
writeFileSync(indexPath, template.replace(placeholder, `<div id="root">${appHtml}</div>`));
rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} KiB de HTML injetados em dist/index.html`);

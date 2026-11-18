// node brand.mjs <dist dir> <app name> <theme colour>
// Fails loudly if a pattern it expects is missing, so an upstream change to these
// files breaks the build instead of silently shipping LibreChat's branding.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [dist, name, colour] = process.argv.slice(2);

const indexPath = join(dist, 'index.html');
const html = readFileSync(indexPath, 'utf8');
const titled = html.replace(/<title>[^<]*<\/title>/, `<title>${name}</title>`);
if (titled === html) throw new Error('index.html: no <title> to replace');
writeFileSync(indexPath, titled);

const manifestPath = join(dist, 'manifest.webmanifest');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
if (manifest.name === undefined) throw new Error('manifest.webmanifest: no name');
Object.assign(manifest, { name, short_name: name, theme_color: colour });
writeFileSync(manifestPath, JSON.stringify(manifest));

console.log(`branded ${dist} as "${name}"`);

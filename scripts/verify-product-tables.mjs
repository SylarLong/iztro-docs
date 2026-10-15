import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer, resolveConfig } from 'vitepress';

export function productTable(text, md) {
  const tokens = md.parse(text.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, ''), {});
  const heading = tokens.findIndex(token => token.type === 'heading_open'
    && token.tag === 'h2' && ['产品', '產品'].includes(token.attrGet('id')));
  assert.ok(heading >= 0, 'Missing quick-start product section');
  let end = tokens.findIndex((token, index) => index > heading && token.type === 'heading_open' && ['h1', 'h2'].includes(token.tag));
  if (end < 0) end = tokens.length;
  const tables = tokens.slice(heading, end).filter(token => token.type === 'table_open');
  assert.equal(tables.length, 1, 'Expected one table in the quick-start product section');
  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
  const [startLine, endLine] = tables[0].map;
  return body.split(/\r?\n/).slice(startLine, endLine).join('\n');
}

export async function verifyProductTables(root) {
  const config = await resolveConfig(root, 'build', 'production');
  const md = await createMarkdownRenderer(root);
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const source = productTable(read('quick-start.md'), md);
  const locales = Object.keys(config.site.locales).filter(locale => locale !== 'root');
  for (const locale of locales) {
    assert.equal(productTable(read(`${locale}/quick-start.md`), md), source,
      `${locale}/quick-start.md: product table must match the untranslated Chinese source`);
  }
  return locales;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const locales = await verifyProductTables(root);
  console.log(`Verified unchanged product tables across ${locales.length} locales (${locales.join(', ')}).`);
}

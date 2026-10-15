import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const scripts = ['verify-locales.mjs', 'verify-translations.mjs', 'verify-semantic-locales.mjs'];
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-locale-tests-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const write = (file, value) => { const target = path.join(dir, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, typeof value === 'string' ? value : JSON.stringify(value)); };
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(dir, 'node_modules'), 'dir');
  for (const file of [...scripts, 'translation-context.mjs']) write(`scripts/${file}`, fs.readFileSync(path.join(root, 'scripts', file), 'utf8'));
  const config = { locales: { root: { label: '中文', lang: 'zh-CN' }, fr_FR: { label: 'Français', lang: 'fr-FR' }, converted: { label: 'Independent workflow', lang: 'zh-TW', themeConfig: { translationChecks: false } } } };
  const saveConfig = () => write('.vitepress/config.mts', `export default ${JSON.stringify(config)};`);
  saveConfig();
  const source = '# Example {#example}\n\n| 名称 | `value` |\n| --- | --- |\n| 星曜 | 1 |\n';
  const translated = source.replace('Example', 'Exemple').replace('名称', 'Nom').replace('星曜', 'étoile（星曜）');
  for (const file of ['index.md', 'about.md', 'quick-start.md', 'type-definition.md', 'ai/overview.md', 'posts/example.md']) {
    write(file, source); write(`fr_FR/${file}`, translated);
  }
  write('learn/pattern.md', '# Pattern {#pattern}\n');write('fr_FR/learn/pattern.md', '# Configuration {#pattern}\n');
  // Deliberately no translated ancient page: it must never enter these checks.
  write('learn/ancientBook-broken.md', '# 古文\n\n```\nBROKEN SOURCE\n');
  const dictionary = { terms: { fr_FR: { 星曜: { value: 'étoile', chinese: '星曜' } } }, ordinary: { fr_FR: { 名称: 'Nom' } }, display: { fr_FR: { 星曜: 'étoile' } }, glossPolicy: { fr_FR: 'traditional-Chinese' }, localeRules: { fr_FR: { workSchedulePattern: '6.*7' } } };
  write('scripts/translation-terms.json', dictionary);
  write('scripts/classical-quote-policy.json', { blocks: {}, literal: {}, inline: {} });
  write('scripts/table-semantic-review.json', { cells: [{ source: '名称', targets: { fr_FR: 'Nom' }, decision: 'corrected' }] });
  write('scripts/prose-alias-review.json', { rules: [] });
  write('scripts/emphasis-semantic-review.json', { expressions: [] });
  return { dir, write, config, saveConfig, dictionary };
}
function run(f, script, filter) {
  const env = { ...process.env };delete env.CHECK_LOCALES;
  if (filter !== undefined) env.CHECK_LOCALES = filter;
  const result = spawnSync(process.execPath, [path.join(f.dir, 'scripts', script)], { cwd: f.dir, env, encoding: 'utf8' });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}

test('all entry points discover a newly configured language and exclude ancient texts', t => {
  const f = fixture(t);
  for (const script of scripts) { const result = run(f, script);assert.equal(result.status, 0, result.output);assert.match(result.output, /fr_FR/); }
});

test('a new config entry with missing pages fails every entry point; filtering is consistent', t => {
  const f = fixture(t);f.config.locales.es_ES = { label: 'Español', lang: 'es-ES' };f.saveConfig();
  for (const script of scripts) {
    const result = run(f, script);assert.notEqual(result.status, 0);assert.match(result.output, /es_ES\/index\.md/);
    const filtered = run(f, script, ' fr_FR,fr_FR ');assert.equal(filtered.status, 0, filtered.output);assert.match(filtered.output, /fr_FR/);
    for (const filter of ['unknown', 'converted', ' , ']) assert.notEqual(run(f, script, filter).status, 0, `${script}: accepted invalid filter ${filter}`);
  }
});

test('new languages cannot silently skip missing dictionaries or semantic rules', t => {
  const f = fixture(t);delete f.dictionary.ordinary.fr_FR;f.write('scripts/translation-terms.json', f.dictionary);
  for (const script of scripts.slice(1)) { const result = run(f, script);assert.notEqual(result.status, 0);assert.match(result.output, /fr_FR: translation-terms\.json\.ordinary/); }
  f.dictionary.ordinary.fr_FR = { 名称: 'Nom' };f.write('scripts/translation-terms.json', f.dictionary);
  f.write('scripts/prose-alias-review.json', { rules: [{ source: '命宫', targets: { another: 'unrelated' }, aliases: [] }] });
  const result = run(f, 'verify-semantic-locales.mjs');assert.notEqual(result.status, 0);assert.match(result.output, /fr_FR: prose-alias-review: 命宫/);
});

test('semantic checks catch incorrect reviewed table meanings in the discovered language', t => {
  const f = fixture(t);const file = 'fr_FR/about.md';f.write(file, fs.readFileSync(path.join(f.dir, file), 'utf8').replace('Nom', 'Mauvais'));
  const result = run(f, 'verify-semantic-locales.mjs');assert.notEqual(result.status, 0);assert.match(result.output, /fr_FR\/about\.md: reviewed table meaning differs/);
});

test('a partial file-specific review retains other languages’ general expectations', t => {
  const f = fixture(t);
  f.write('scripts/table-semantic-review.json', { cells: [
    { source: '名称', targets: { fr_FR: 'Nom' }, decision: 'corrected' },
    { file: 'about.md', source: '名称', targets: { unrelated: 'Specific to another language' }, decision: 'corrected' },
  ] });
  const file = 'fr_FR/about.md';f.write(file, fs.readFileSync(path.join(f.dir, file), 'utf8').replace('Nom', 'Mauvais'));
  const result = run(f, 'verify-semantic-locales.mjs');assert.notEqual(result.status, 0);assert.match(result.output, /fr_FR\/about\.md: reviewed table meaning differs/);
});

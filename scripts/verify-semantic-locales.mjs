import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import abbr from 'markdown-it-abbr';
import { translationContext, requireTranslationData, localeRules, requireSemanticData } from './translation-context.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const classicalQuotes = JSON.parse(fs.readFileSync(path.join(root, 'scripts/classical-quote-policy.json'), 'utf8'));
const reviews = JSON.parse(fs.readFileSync(path.join(root, 'scripts/table-semantic-review.json')));
const dictionary = JSON.parse(fs.readFileSync(path.join(root, 'scripts/translation-terms.json')));
const md = await createMarkdownRenderer(root, { config(md) { md.use(tabsMarkdownPlugin); md.use(abbr); } });
const { locales, files, siteLocales } = await translationContext(root);
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
const normalize = text => text.replace(/（[^）]*）|`|<[^>]*>/g, '').replace(/\s+/g, '').toLowerCase();
const corrected = new Map(reviews.cells.filter(cell => cell.decision === 'corrected').map(cell => [cell.file ? `${cell.file}\0${cell.source}` : cell.source, cell.targets]));
function parse(text) {
  const inlines = md.parse(text, {}).filter(t => t.type === 'inline');
  const cells = [];
  let inTable = false;
  for (const token of md.parse(text, {})) {
    if (token.type === 'table_open') inTable = true;
    if (token.type === 'table_close') inTable = false;
    if (inTable && token.type === 'inline') cells.push(token.content);
  }
  cells.push(...[...text.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1]));
  return { inlines, cells };
}
const aliases = JSON.parse(fs.readFileSync(path.join(root, 'scripts/prose-alias-review.json'))).rules;
const emphasis = JSON.parse(fs.readFileSync(path.join(root, 'scripts/emphasis-semantic-review.json'))).expressions;
requireTranslationData(locales, dictionary);
requireSemanticData(locales, dictionary, aliases, emphasis, reviews);
const errors = [];
let checked = 0;
for (const file of files) {
  const source = parse(read(file));
  for (const locale of locales) {
    const target = parse(read(`${locale}/${file}`));
    const rules = localeRules(locale, dictionary, siteLocales);
    source.cells.forEach((cell, index) => {
      const expected = corrected.get(`${file}\0${cell}`)?.[locale] ?? corrected.get(cell)?.[locale];
      if (!expected) return;
      const sourceCode = cell.match(/^`([^`]+)`$/)?.[1];
      const value = sourceCode && dictionary.ordinary[locale][sourceCode] || expected;
      if (normalize(target.cells[index]) !== normalize(value)) errors.push(`${locale}/${file}: reviewed table meaning differs for ${cell}`);
      checked++;
    });
    source.inlines.forEach((token, index) => {
      const translated = target.inlines[index]?.content || '';
      if (classicalQuotes.blocks[file]?.some(q => q.source === token.content)) return;
      if (!rules.englishAliases) {
        const visible = translated.replace(/`[^`]*`|\{#[^}]*\}|\]\([^)]*\)|<[^>]*>|（[^）]*）/g, '');
        for (const rule of aliases) {
          if (rule.source.length < 2 || !token.content.includes(rule.source)) continue;
          for (const alias of rule.aliases) {
            const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if (new RegExp(`(?<![A-Za-z])${escaped}(?![A-Za-z])`).test(visible)) errors.push(`${locale}/${file}: romanized or English residue for ${rule.source}: ${alias}`);
          }
        }
      }
      const sourceCode = token.children.filter(t => t.type === 'code_inline');
      const targetChildren = target.inlines[index]?.children || [];
      const targetCode = targetChildren.filter(t => t.type === 'code_inline');
      sourceCode.forEach((code, ordinal) => {
        const expression = emphasis.find(e => !e.gloss && e.source === code.content);
        if (!expression) return;
        const next = targetChildren[targetChildren.indexOf(targetCode[ordinal]) + 1]?.content || '';
        if (/^（[^）]*[\u3400-\u9fff]/.test(next)) errors.push(`${locale}/${file}: ordinary emphasis treated as a Chinese-annotated term: ${code.content}`);
      });
      if (token.content.includes('996，007')) {
        if (/996|007/.test(translated)) errors.push(`${locale}/${file}: unexplained Chinese work-schedule shorthand`);
        const work = new RegExp(rules.workSchedulePattern, 'iu');
        if (!work.test(translated)) errors.push(`${locale}/${file}: work-schedule meaning missing`);
      }
      if (token.content.includes('PUA') && /\bPUA\b/.test(translated)) errors.push(`${locale}/${file}: emotional manipulation left as ambiguous acronym`);
    });
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verified ${checked} reviewed table meanings (${locales.join(', ')}) and localized work-schedule/manipulation expressions.`);

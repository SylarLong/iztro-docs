import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import abbr from 'markdown-it-abbr';
import { translationContext, requireTranslationData, localeRules } from './translation-context.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dictionary = JSON.parse(fs.readFileSync(path.join(root, 'scripts/translation-terms.json'), 'utf8'));
const classicalQuotes = JSON.parse(fs.readFileSync(path.join(root, 'scripts/classical-quote-policy.json'), 'utf8'));
const { locales, files, siteLocales } = await translationContext(root);
const md = await createMarkdownRenderer(root, { config(md) { md.use(tabsMarkdownPlugin); md.use(abbr); } });
requireTranslationData(locales, dictionary);
const han = /[\u3400-\u9fff]/;
const plain = tokens => tokens.filter(t => ['text', 'code_inline'].includes(t.type)).map(t => t.content).join('');
const norm = s => s.replace(/\s+/g, '');
const stripGloss = s => s.replace(/（[^）]*）/g, '');
function parse(file) {
  const text = fs.readFileSync(path.join(root, file), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
  const tokens = md.parse(text, {});
  const inlines = [], tables = []; let tabs = false, table = null;
  for (const token of tokens) {
    if (token.type === 'container_tabs_open') tabs = true;
    if (token.type === 'container_tabs_close') tabs = false;
    if (token.type === 'table_open') table = [];
    if (token.type === 'tr_open' && table) table.push([]);
    if (token.type === 'inline') {
      inlines.push({ token, tabs, table: Boolean(table) });
      if (table) table.at(-1).push(token.children || []);
    }
    if (token.type === 'table_close') { tables.push(table); table = null; }
  }
  const htmlCells = [...text.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(m => m[1]);
  return { inlines, tables, htmlCells };
}
function literal(s) {
  return /[\uac00-\ud7af]/.test(s) || /^[A-Za-z_$][\w$]*[.(]/.test(s) || /^[\[{"']/.test(s) || (/^[A-Za-z\uac00-\ud7af]/.test(s) && s.includes('(') && han.test(s));
}
let pages = 0, tables = 0, htmlCells = 0, codeValues = 0;
const errors = [];
function check(condition, message) { if (!condition) errors.push(message); }
for (const file of files) {
  const source = parse(file);
  for (const locale of locales) {
    const target = parse(`${locale}/${file}`);
    const terms = dictionary.terms[locale], ordinary = dictionary.ordinary[locale];
    const rules = localeRules(locale, dictionary, siteLocales);
    // These checks cover the regressions found in prose and link labels,
    // independently of the API literal checks below.
    const visible = target.inlines.filter(x => !x.tabs).map(x => x.token.content).join('\n')
      .replace(/\{#[^}]+\}|\]\([^)]*\)|<[^>]*>/g, '');
    check(!/\b(?:Ziwei\s+Dou|Xing\s*Yao|Za\s*Yao|Liu\s*Yao|An\s*Xing\s*Jue|Si\s*Hua(?:\s*Xing)?|Hua\s*(?:Lu|Quan|Ke|Ji)(?:xing)?)\b/i.test(visible), `${locale}/${file}: untranslated romanized terminology`);
    check(!/\\\*\\\*/.test(visible), `${locale}/${file}: escaped bold markers`);
    if (!rules.nativeHan) {
      for (const match of visible.matchAll(/（([^）]*)）/g)) {
        for (const [simple, traditional] of Object.entries(dictionary.traditionalGlossCharacters || {})) {
          check(!match[1].includes(simple), `${locale}/${file}: simplified character ${simple} in Chinese gloss; use ${traditional}`);
        }
      }
    }

    check(source.inlines.length === target.inlines.length, `${locale}/${file}: inline block count differs`);
    check(source.tables.length === target.tables.length, `${locale}/${file}: table count differs`);
    for (let n = 0; n < source.inlines.length; n++) {
      const s = source.inlines[n], t = target.inlines[n]; if (!t || s.tabs) continue;
      for (const quote of classicalQuotes.literal?.[file] || []) {
        if (s.token.content.includes(quote.source)) check(t.token.content.includes(quote.traditional), `${locale}/${file}: missing Traditional Chinese classical quotation: ${quote.source}`);
      }
      const preservedQuote = classicalQuotes.blocks[file]?.find(q => q.source === s.token.content);
      if (preservedQuote) {
        check(t.token.content === preservedQuote.traditional, `${locale}/${file}: classical quotation must remain verbatim Traditional Chinese in block ${n}`);
        continue;
      }
      const sourceProse = s.token.content.replace(/`[^`]*`|<[^>]*>|\{#[^}]*\}|\]\([^)]*\)/g, '');
      if (/[\u3400-\u9fff]{12}/.test(sourceProse)) {
        check(t.token.content !== s.token.content, `${locale}/${file}: Chinese prose copied unchanged in block ${n}`);
      }
      const sc = s.token.children || [], tc = t.token.children || [];
      for (const [alias, term] of Object.entries(dictionary.proseAliases?.[locale] || {})) {
        if (!s.token.content.includes(term.source)) continue;
        const visibleText = t.token.content.replace(/`[^`]*`|\{#[^}]*\}|\]\([^)]*\)|<[^>]*>|https?:\/\/[^\s<]+/g, '');
        const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        check(!new RegExp(`(?<![A-Za-z])${escaped}(?![A-Za-z])`).test(visibleText), `${locale}/${file}: untranslated ${alias} for ${term.source}`);
      }

      for (const kind of ['strong_open', 'em_open', 's_open']) {
        check(tc.filter(x => x.type === kind).length >= sc.filter(x => x.type === kind).length, `${locale}/${file}: lost ${kind} markup in block ${n}`);
      }
      const sourceCode = sc.filter(x => x.type === 'code_inline');
      const targetCode = tc.filter(x => x.type === 'code_inline');
      check(sourceCode.length === targetCode.length, `${locale}/${file}: code phrase lost in block ${n}`);
      // The internationalization introduction deliberately demonstrates literal
      // Chinese, Korean and English input values rather than translated labels.
      const inputExample = file === 'type-definition.md' && s.token.content.includes('任意语言');
      for (let i = 0; i < sourceCode.length; i++) {
        const original = sourceCode[i].content, actual = targetCode[i]?.content; if (actual == null) continue;
        codeValues++;
        const preservedPhrase = classicalQuotes.inline[file]?.find(q => q.source === original);
        if (preservedPhrase) {
          check(actual === preservedPhrase.traditional, `${locale}/${file}: quoted classical phrase must remain Traditional Chinese: ${original}`);
          const next = tc[tc.indexOf(targetCode[i]) + 1]?.content || '';
          check(!/^（[^）]*）/.test(next), `${locale}/${file}: classical quotation has a redundant Chinese gloss: ${original}`);
          continue;
        }
        const contextual = dictionary.contextualPhrases?.find(q => q.file === file && s.token.content.startsWith(q.sourcePrefix) && q.phrase === original);
        if (contextual) {
          check(actual === contextual.values[locale], `${locale}/${file}: wrong contextual meaning for ${original}`);
          const next = tc[tc.indexOf(targetCode[i]) + 1]?.content || '';
          const expectedGloss = rules.chineseGlosses && contextual.chinese ? `（${contextual.chinese}）` : '';
          check(expectedGloss ? next.startsWith(expectedGloss) : !/^（[^）]*[\u3400-\u9fff]/.test(next), `${locale}/${file}: wrong contextual gloss for ${original}`);
          continue;
        }
        const math = original.match(/^(加减|加|减)\s*(\d+)$/);
        if (math) check(actual === ({ 加减: '±', 加: '+', 减: '-' }[math[1]] + math[2]), `${locale}/${file}: incorrect arithmetic ${original}`);
        if (!han.test(original) || literal(original) || inputExample) continue;
        if (dictionary.display?.[locale]?.[original] && rules.chineseGlosses) {
          const position = tc.indexOf(targetCode[i]);
          const next = tc[position + 1]?.content || '';
          check(/^（[^）]*[\u3400-\u9fff][^）]*）/.test(next), `${locale}/${file}: missing concept gloss for ${original}`);
        }

        if (terms[original] && !ordinary[original]) {
          const term = terms[original];
          check(actual === term.value, `${locale}/${file}: incorrect iztro term ${original}: ${actual}`);
          const position = tc.indexOf(targetCode[i]);
          if (!rules.chineseGlosses) check(!(tc[position + 1]?.type === 'text' && tc[position + 1].content.startsWith(`（${term.chinese}）`)), `${locale}/${file}: term has an unwanted Chinese gloss`);
          check(!rules.chineseGlosses || (tc[position + 1]?.type === 'text' && tc[position + 1].content.startsWith(`（${term.chinese}）`)), `${locale}/${file}: missing Chinese gloss for ${original}`);
        } else if (ordinary[original]) {
          // Ordinary prose may inflect or change case to fit the sentence.
          const variants = dictionary.ordinaryVariants?.[locale]?.[original] || [];
          check(actual === ordinary[original] || variants.includes(actual), `${locale}/${file}: incorrect ordinary phrase ${original}: ${actual}`);
        }
        if (!rules.nativeHan) check(!han.test(stripGloss(actual)), `${locale}/${file}: untranslated Chinese phrase ${original}: ${actual}`);
      }
    }
    for (let n = 0; n < source.tables.length; n++) {
      const s = source.tables[n], t = target.tables[n]; if (!t) continue;
      check(s.length === t.length, `${locale}/${file}: table ${n} lost rows`);
      for (let row = 0; row < s.length; row++) {
        check(s[row].length === t[row]?.length, `${locale}/${file}: table ${n} row ${row} lost cells`);
        for (let cell = 0; cell < s[row].length; cell++) {
          const original = plain(s[row][cell]), actual = plain(t[row]?.[cell] || []);
          if (original.trim()) check(Boolean(actual.trim()), `${locale}/${file}: empty translated table cell ${n}/${row}/${cell}`);
          if (!han.test(original)) check(norm(actual) === norm(original), `${locale}/${file}: API identifier or numeric table value changed: ${original} -> ${actual}`);
          if (terms[original.trim()] && !ordinary[original.trim()]) {
            const term = terms[original.trim()];
            check(norm(actual) === norm(`${term.value}${!rules.chineseGlosses ? '' : `（${term.chinese}）`}`), `${locale}/${file}: mistranslated table term ${original}: ${actual}`);
          }
        }
      }
      tables++;
    }
    check(source.htmlCells.length === target.htmlCells.length, `${locale}/${file}: HTML table cell count differs`);
    for (let i = 0; i < source.htmlCells.length; i++) {
      const sourceCell = source.htmlCells[i], targetCell = target.htmlCells[i] || '';
      const codes = cell => [...cell.matchAll(/<code\b[^>]*>([\s\S]*?)<\/code>/gi)].map(m => m[1]);
      if (file === 'learn/pattern.md' && !rules.nativeHan) check(!han.test(targetCell.replace(/<[^>]+>/g, '')), `${locale}/${file}: Chinese annotation in pattern table cell ${i}`);
      const sourceCodes = codes(sourceCell), targetCodes = codes(targetCell);
      check(sourceCodes.length === targetCodes.length, `${locale}/${file}: HTML code value count differs in cell ${i}`);
      for (let n = 0; n < sourceCodes.length; n++) {
        const original = sourceCodes[n], actual = targetCodes[n] || '';
        if (!han.test(original)) check(actual === original, `${locale}/${file}: numeric index/API code changed in HTML cell ${i}`);
        else if (terms[original] && !ordinary[original]) check(actual === terms[original].value, `${locale}/${file}: incorrect coded HTML term ${original}`);
        else if (ordinary[original]) check(norm(actual) === norm(ordinary[original]), `${locale}/${file}: incorrect ordinary HTML code ${original}`);
      }
      const text = cell => cell.replace(/<code\b[^>]*>[\s\S]*?<\/code>(?:（[^）]*）)?|<[^>]+>/gi, '').trim();
      const original = text(sourceCell), actual = text(targetCell);
      if (original) check(Boolean(actual), `${locale}/${file}: empty HTML table cell ${i}`);
      if (!han.test(original)) check(norm(original) === norm(stripGloss(actual)), `${locale}/${file}: numeric HTML table value changed in cell ${i}`);
      if (terms[original] && !ordinary[original]) {
        const term = terms[original];
        check(norm(actual) === norm(`${term.value}${!rules.chineseGlosses || file === 'learn/pattern.md' ? '' : `（${term.chinese}）`}`), `${locale}/${file}: wrong HTML table term ${original}`);
      } else if (ordinary[original]) check(norm(stripGloss(actual)) === norm(ordinary[original]), `${locale}/${file}: wrong HTML table label ${original}`);
      if (!rules.nativeHan) check(!han.test(stripGloss(actual)), `${locale}/${file}: untranslated Chinese in HTML table cell ${i}`);
      htmlCells++;
    }
    pages++;
  }
}
if (errors.length) { console.error(errors.slice(0, 80).join('\n')); console.error(`${errors.length} translation issues found.`); process.exit(1); }
console.log(`Verified ${pages} pages (${locales.join(', ')}), ${tables} Markdown tables, ${htmlCells} HTML table cells and ${codeValues} inline code values: terminology, arithmetic, Chinese glosses and inline Markdown.`);

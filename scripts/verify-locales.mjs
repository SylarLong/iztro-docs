import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import abbr from 'markdown-it-abbr';
import { translationContext } from './translation-context.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { locales, files, siteLocales } = await translationContext(root);
const md = await createMarkdownRenderer(root, {
  config(md) { md.use(tabsMarkdownPlugin); md.use(abbr); },
});
const parsed = new Map();
function read(file) {
  if (!parsed.has(file)) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
    const tokens = md.parse(body, {});
    parsed.set(file, { source, tokens });
  }
  return parsed.get(file);
}
function structure(tokens) { return tokens.filter(t => !['inline', 'html_inline', 'html_block'].includes(t.type)).map(t => [t.type, t.tag, t.nesting]); }
function headingLevels(tokens) { return tokens.filter(t => t.type === 'heading_open').map(t => t.tag); }
function code(tokens) { return tokens.filter(t => ['fence', 'code_block'].includes(t.type)).map(t => [t.info, t.content.split('\n').map(line => line.trimEnd()).join('\n')]); }
function anchors(tokens) { return new Set(tokens.filter(t => t.type === 'heading_open').map(t => t.attrGet('id'))); }
function links(tokens) {
  for (const token of tokens) {
    const children = token.children || [];
    for (let i = 0; i < children.length; i++) {
      assert(!(children[i].type === 'link_open' && children[i + 1]?.type === 'link_close'), 'Empty link label');
    }
  }
  return tokens.flatMap(t => t.children || []).filter(t => t.type === 'link_open').map(t => t.attrGet('href'));
}
function markup(source) {
  return (source.replaceAll('\\"', '"').match(/<\/?[A-Za-z][^>]*>/g) || [])
    .map(tag => tag.replace(/\btext="[^"]*"/g, 'text="<translated>"'));
}

let pages = 0;
const anchorErrors = [];
for (const locale of locales) {
  for (const file of files) {
    const original = read(file), translated = read(`${locale}/${file}`);
    assert(!/ZX[QV]\d{6}[QV]XZ/.test(translated.source), `${locale}/${file}: unresolved translation marker`);
    assert.deepEqual(headingLevels(translated.tokens), headingLevels(original.tokens), `${locale}/${file}: heading hierarchy differs`);
    assert.deepEqual(structure(translated.tokens), structure(original.tokens), `${locale}/${file}: document structure differs`);
    assert.deepEqual(code(translated.tokens), code(original.tokens), `${locale}/${file}: code examples differ`);
    assert.deepEqual(markup(translated.source), markup(original.source), `${locale}/${file}: HTML/Vue markup differs`);
    const originalIds = anchors(original.tokens), translatedIds = anchors(translated.tokens);
    for (const id of originalIds) assert(translatedIds.has(id), `${locale}/${file}: missing source anchor ${id}`);
    const originalLinks = links(original.tokens), translatedLinks = links(translated.tokens);
    assert.equal(translatedLinks.length, originalLinks.length, `${locale}/${file}: link count differs; check for lost or broken Markdown links`);
    for (const href of translatedLinks) {
      if (!href || /^(?:[a-z]+:|\/\/)/i.test(href)) continue;
      const [pathname, hash] = href.split('#');
      const relative = pathname ? (pathname.startsWith('/') ? pathname.slice(1) : path.posix.normalize(path.posix.join(locale, path.posix.dirname(file), pathname))) : `${locale}/${file}`;
      let target = decodeURIComponent(relative).replace(/\.html$/, '.md');
      if (target.endsWith('/')) target += 'index.md';
      else if (!path.extname(target)) target += '.md';
      assert(fs.existsSync(path.join(root, target)), `${locale}/${file}: missing link target ${href}`);
      if (target.endsWith('.md') && !target.includes('/ancientBook')) {
        assert(target.startsWith(`${locale}/`), `${locale}/${file}: link leaves locale ${href}`);
        if (hash && !anchors(read(target).tokens).has(decodeURIComponent(hash))) anchorErrors.push({ file: `${locale}/${file}`, href, target, hash: decodeURIComponent(hash), anchors: [...anchors(read(target).tokens)] });
      }
    }
    pages++;
  }
}
// Check the meaning of short traditional terms as well as Markdown structure.
// A structurally valid table can still contain mistranslated or empty cells.
if (locales.includes('ko_KR')) {
  const terminology = {
    名称: '이름', 五行: '오행', 阴阳: '음양', 时间段: '시간대',
    甲: '갑', 乙: '을', 丙: '병', 丁: '정', 戊: '무', 己: '기', 庚: '경', 辛: '신', 壬: '임', 癸: '계',
    子: '자', 丑: '축', 寅: '인', 卯: '묘', 辰: '진', 巳: '사', 午: '오', 未: '미', 申: '신', 酉: '유', 戌: '술', 亥: '해',
    木: '목', 火: '화', 土: '토', 金: '금', 水: '수', 阳: '양', 阴: '음',
    早子时: '조자시', 晚子时: '만자시', 时: '시',
  };
  const termPattern = new RegExp(Object.keys(terminology).sort((a, b) => b.length - a.length).join('|'), 'g');
  function tableRows(tokens, anchor) {
    const heading = tokens.findIndex(t => t.type === 'heading_open' && t.attrGet('id') === anchor);
    assert(heading >= 0, `Missing table section ${anchor}`);
    const start = tokens.findIndex((t, i) => i > heading && t.type === 'table_open');
    assert(start >= 0, `Missing table in ${anchor}`);
    const rows = []; let row = [];
    for (let i = start + 1; i < tokens.length && tokens[i].type !== 'table_close'; i++) {
      if (['th_open', 'td_open'].includes(tokens[i].type)) row.push(tokens[i + 1].content.trim());
      if (tokens[i].type === 'tr_close') { rows.push(row); row = []; }
    }
    return rows;
  }
  const source = read('learn/basis.md').tokens;
  const korean = read('ko_KR/learn/basis.md').tokens;
  for (const anchor of ['十天干', '十二地支', '十二时辰']) {
    const expected = tableRows(source, anchor).map(row => row.map(cell => cell.replace(termPattern, term => terminology[term]).replace(/\s+/g, '')));
    const actual = tableRows(korean, anchor).map(row => row.map(cell => cell.replace(/（[^）]*）/g, '').replace(/\s+/g, '')));
    assert.deepEqual(actual, expected, `ko_KR/learn/basis.md: incorrect terminology or values in ${anchor}`);
  }

  // Palace positions and the Later Heaven Bagua need semantic checks:
  // preserving table shape and eliminating pinyin cannot catch a wrong palace.
  const sourceInlines = source.filter(t => t.type === 'inline');
  const koreanInlines = korean.filter(t => t.type === 'inline');
  const explanations = [
    ['天门指', ['해궁', '술', '해', '지망위', '해궁', '월랑천문', '태음']],
    ['地门指', ['사궁', '지호위', '땅으로 들어가는 문', '진', '사', '천라위', '사궁']],
    ['指 `卯宫`，因为', ['묘궁', '진괘', '뇌문', '일조뇌문', '태양', '천량']],
    ['天宫指', ['자 지지의 궁', '축궁', '천궁', '지궁', '천문', '지문']],
  ];
  for (const [prefix, expected] of explanations) {
    const index = sourceInlines.findIndex(t => t.content.startsWith(prefix));
    assert.ok(index >= 0, `Missing Chinese explanation: ${prefix}`);
    const actual = koreanInlines[index].children.filter(t => t.type === 'code_inline').map(t => t.content);
    assert.deepEqual(actual, expected, `Incorrect Korean palace explanation: ${prefix}`);
  }
  const heaven = koreanInlines[sourceInlines.findIndex(t => t.content.startsWith('天门指'))].content;
  for (const phrase of ['후천팔괘（後天八卦）', '천문（天門）', '건괘（乾卦）']) {
    assert.ok(heaven.includes(phrase), `Missing Korean concept: ${phrase}`);
  }
  const heading = korean.findIndex(t => t.type === 'heading_open' && t.attrGet('id') === '十天干');
  assert.equal(korean[heading + 1].content.replace(/（[^）]*）/g, '').replace(/\s*\{#[^}]+\}$/, '').trim(), '십천간', 'Incorrect Korean title for 十天干');
}

if (anchorErrors.length) {
  if (process.env.LOCALE_LINK_REPORT) fs.writeFileSync(process.env.LOCALE_LINK_REPORT, JSON.stringify(anchorErrors, null, 2));
  console.error(anchorErrors.map(e => `${e.file}: missing anchor ${e.href}`).join('\n'));
  process.exit(1);
}
console.log(`Verified ${pages} pages across ${locales.length} locales (${locales.join(', ')}): document structure, source anchors, code, HTML/Vue and local links.`);

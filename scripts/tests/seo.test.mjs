import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer, resolveConfig } from 'vitepress';
import { alternatePages, pageUrl, transformSeoPage, transformSeoHead, transformSeoSitemap } from '../../.vitepress/seo.mjs';

const locales = { root: { lang: 'zh-CN' }, en_US: { lang: 'en-US' }, zh_TW: { lang: 'zh-TW' } };
const pages = ['index.md', 'en_US/index.md', 'zh_TW/index.md', 'learn/basis.md', 'en_US/learn/basis.md', 'learn/ancientBook.md'];
const context = { siteConfig: { site: { locales, cleanUrls: false, title: '紫微研习社', titleTemplate: ':title | 紫微研习社' }, pages } };
const page = (relativePath, overrides = {}) => ({
  relativePath, title: 'A page', description: 'An accurate page description.', frontmatter: {}, ...overrides,
});

test('canonical URLs match directory homepages and the configured HTML routes', () => {
  assert.equal(pageUrl('index.md'), 'https://iztro.com/');
  assert.equal(pageUrl('en_US/index.md'), 'https://iztro.com/en_US/');
  assert.equal(pageUrl('learn/basis.md'), 'https://iztro.com/learn/basis.html');
  assert.equal(pageUrl('learn/basis.md', true), 'https://iztro.com/learn/basis');
});

test('alternates are reciprocal and only include existing translations', () => {
  const root = alternatePages('learn/basis.md', pages, locales);
  assert.deepEqual(root, alternatePages('en_US/learn/basis.md', pages, locales));
  assert.deepEqual(root.map(value => value.lang), ['zh-CN', 'en-US', 'x-default']);
  assert.deepEqual(alternatePages('learn/ancientBook.md', pages, locales).map(value => value.lang), ['zh-CN', 'x-default']);
});

test('page metadata preserves unrelated head entries and uses self canonicalization', () => {
  const data = page('en_US/learn/basis.md', { frontmatter: { head: [
    ['meta', { name: 'custom', content: 'keep' }],
    ['link', { rel: 'canonical', href: 'https://old.example/' }],
    ['meta', { property: 'og:title', content: 'obsolete' }],
  ] } });
  transformSeoPage(data, context);
  const head = data.frontmatter.head;
  assert.equal(head.filter(entry => entry[1].rel === 'canonical').length, 1);
  assert.equal(head.find(entry => entry[1].rel === 'canonical')[1].href, pageUrl(data.relativePath));
  assert.equal(head.find(entry => entry[1].property === 'og:title')[1].content, 'A page | 紫微研习社');
  assert.equal(head.find(entry => entry[1].property === 'og:locale')[1].content, 'en_US');
  assert.ok(head.some(entry => entry[1].name === 'custom'));
  const schema = JSON.parse(head.find(entry => entry[1].type === 'application/ld+json')[2]);
  assert.equal(schema['@graph'][0].inLanguage, 'en-US');
  assert.equal(schema['@graph'][1].itemListElement[0].item, 'https://iztro.com/en_US/');
});

test('homepage title templates and script-safe structured data are supported', () => {
  const data = page('index.md', { title: '紫微研习社', titleTemplate: 'iztro docs' });
  transformSeoPage(data, context);
  assert.equal(data.frontmatter.head.find(entry => entry[1].property === 'og:title')[1].content, '紫微研习社 | iztro docs');
  const malicious = page('index.md', { title: '</script><script>alert(1)</script>', titleTemplate: false });
  transformSeoPage(malicious, context);
  const json = malicious.frontmatter.head.find(entry => entry[1].type === 'application/ld+json')[2];
  assert.ok(!json.includes('<'));
  assert.equal(JSON.parse(json)['@graph'][0].name, malicious.title);
});

test('legacy landing page points at the maintained homepage without entering the alternate cluster', () => {
  const data = page('en_US.md');
  transformSeoPage(data, context);
  assert.equal(data.frontmatter.head.find(entry => entry[1].rel === 'canonical')[1].href, 'https://iztro.com/en_US/');
  assert.equal(data.frontmatter.head.find(entry => entry[1].name === 'robots')[1].content, 'noindex, follow');
  assert.ok(!data.frontmatter.head.some(entry => entry[1].hreflang));
});

test('404 pages are excluded from indexing', () => {
  assert.deepEqual(transformSeoHead({ page: '404.md', pageData: {} }), [['meta', { name: 'robots', content: 'noindex, follow' }]]);
});

test('sitemap excludes the legacy URL and supplies matching x-default links', () => {
  const items = transformSeoSitemap([
    { url: 'en_US.html' },
    { url: '404.html' },
    { url: 'learn/basis.html', links: [{ lang: 'zh-CN', url: 'learn/basis.html' }, { lang: 'en-US', url: 'en_US/learn/basis.html' }] },
  ]);
  assert.equal(items.length, 1);
  assert.deepEqual(items[0].links.at(-1), { lang: 'x-default', url: 'learn/basis.html' });
});

test('every configured page has its own explicit metadata, including classical texts', async () => {
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const config = await resolveConfig(root, 'build', 'production');
  const md = await createMarkdownRenderer(root);
  const seen = new Map();
  for (const file of config.pages) {
    const env = {};
    md.render(fs.readFileSync(path.join(root, file), 'utf8'), env);
    const { title, description } = env.frontmatter ?? {};
    assert.ok(typeof title === 'string' && title.trim(), `${file}: missing title`);
    assert.ok(typeof description === 'string' && description.trim(), `${file}: missing description`);
    assert.ok(!/[<>`]|\{#/.test(title), `${file}: markup in search title`);
    const locale = Object.keys(config.site.locales).find(key => file.startsWith(`${key}/`)) ?? 'root';
    for (const [field, value] of Object.entries({ title, description })) {
      const key = `${locale}:${field}:${value}`;
      assert.ok(!seen.has(key), `${file}: duplicate ${field} with ${seen.get(key)}`);
      seen.set(key, file);
    }
  }
  assert.ok(!config.pages.includes('AGENTS.md') && !config.pages.includes('README.md'));
});

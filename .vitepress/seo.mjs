import fs from 'node:fs';
import path from 'node:path';

export const siteOrigin = 'https://iztro.com';
export const siteName = '紫微研习社';
const legacyPages = new Map([['en_US.md', 'en_US/index.md']]);

export function pageUrl(file, cleanUrls = false) {
  const route = file.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, cleanUrls ? '' : '.html');
  return new URL(route, `${siteOrigin}/`).href;
}

function localeFor(file, locales) {
  return Object.entries(locales).find(([key]) => key !== 'root' && file.startsWith(`${key}/`))
    ?? ['root', locales.root];
}

export function alternatePages(file, pages, locales, cleanUrls = false) {
  const [locale] = localeFor(file, locales);
  const source = locale === 'root' ? file : file.slice(locale.length + 1);
  const available = new Set(pages);
  const alternates = Object.entries(locales).flatMap(([key, value]) => {
    const target = key === 'root' ? source : `${key}/${source}`;
    return value.lang && available.has(target)
      ? [{ lang: value.lang.replaceAll('_', '-'), url: pageUrl(target, cleanUrls) }]
      : [];
  });
  if (available.has(source)) alternates.push({ lang: 'x-default', url: pageUrl(source, cleanUrls) });
  return alternates;
}

export function transformSeoPage(pageData, { siteConfig }) {
  if (pageData.isNotFound || pageData.relativePath === '404.md') return;
  const file = pageData.relativePath;
  const target = legacyPages.get(file) ?? file;
  const locales = siteConfig.site.locales;
  const [, locale] = localeFor(target, locales);
  const language = locale.lang.replaceAll('_', '-');
  const cleanUrls = siteConfig.site.cleanUrls;
  const canonical = pageUrl(target, cleanUrls);
  const siteTitle = locale.title ?? siteConfig.site.title ?? siteName;
  const titleTemplate = pageData.titleTemplate ?? siteConfig.site.titleTemplate ?? `:title | ${siteName}`;
  const title = typeof titleTemplate === 'string' && titleTemplate.includes(':title')
    ? titleTemplate.replace(/:title/g, pageData.title)
    : pageData.title + (titleTemplate === false || titleTemplate === siteTitle ? ''
      : ` | ${typeof titleTemplate === 'string' ? titleTemplate : siteTitle}`);
  const description = pageData.description;
  const image = `${siteOrigin}/static/home_img.png`;
  const home = /(^|\/)index\.md$/.test(target);
  const alternates = legacyPages.has(file) ? []
    : alternatePages(file, siteConfig.pages, locales, cleanUrls);
  const metadata = [
    ['link', { rel: 'canonical', href: canonical }],
    ...alternates.map(({ lang, url }) => ['link', { rel: 'alternate', hreflang: lang, href: url }]),
    ['meta', { name: 'robots', content: legacyPages.has(file) ? 'noindex, follow' : 'max-image-preview:large' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:locale', content: language.replaceAll('-', '_') }],
    ...alternates.filter(({ lang }) => lang !== language && lang !== 'x-default')
      .map(({ lang }) => ['meta', { property: 'og:locale:alternate', content: lang.replaceAll('-', '_') }]),
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:image:width', content: '850' }],
    ['meta', { property: 'og:image:height', content: '850' }],
    ['meta', { property: 'og:image:alt', content: siteName }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }],
    ['meta', { name: 'twitter:image:alt', content: siteName }],
  ];
  const graph = [{
    '@type': target.endsWith('/about.md') || target === 'about.md' ? 'AboutPage' : 'WebPage',
    '@id': `${canonical}#webpage`, url: canonical, name: title, description,
    inLanguage: language, isPartOf: { '@id': `${siteOrigin}/#website` },
  }];
  if (home) {
    graph.push({
      '@type': 'WebSite', '@id': `${siteOrigin}/#website`, url: `${siteOrigin}/`,
      name: siteName, alternateName: 'iztro',
      inLanguage: Object.values(locales).map(value => value.lang.replaceAll('_', '-')),
    });
  } else if (!legacyPages.has(file)) {
    const [localeKey] = localeFor(file, locales);
    const homeFile = localeKey === 'root' ? 'index.md' : `${localeKey}/index.md`;
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: siteName, item: pageUrl(homeFile, cleanUrls) },
        { '@type': 'ListItem', position: 2, name: pageData.title, item: canonical },
      ],
    });
    graph[0].breadcrumb = { '@id': `${canonical}#breadcrumb` };
  }
  // Escape script-breaking characters even if a future title contains HTML.
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  metadata.push(['script', { type: 'application/ld+json' }, jsonLd]);
  const managed = entry => entry[0] === 'link' && ['canonical', 'alternate'].includes(entry[1]?.rel)
    || entry[0] === 'meta' && (entry[1]?.name === 'robots'
      || /^og:/.test(entry[1]?.property ?? '') || /^twitter:/.test(entry[1]?.name ?? ''));
  pageData.frontmatter.head = [...(pageData.frontmatter.head ?? []).filter(entry => !managed(entry)), ...metadata];
}

export function transformSeoHead({ page, pageData }) {
  if (page === '404.md' || pageData.isNotFound) return [['meta', { name: 'robots', content: 'noindex, follow' }]];
}

export function transformSeoSitemap(items) {
  return items.filter(item => !['en_US.html', 'en_US', '404.html'].includes(item.url.replace(/^\//, '')))
    .map(item => {
      const links = item.links?.filter(link => link.lang !== 'x-default');
      const fallback = links?.find(link => link.lang === 'zh-CN');
      return links ? { ...item, links: [...links, ...(fallback ? [{ ...fallback, lang: 'x-default' }] : [])] } : item;
    });
}

export function copyStaticAssets(siteConfig) {
  // VitePress does not load the root vite.config.js copy plugin.
  fs.cpSync(path.join(siteConfig.srcDir, 'static'), path.join(siteConfig.outDir, 'static'), { recursive: true });
}

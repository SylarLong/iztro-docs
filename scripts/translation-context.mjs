import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { resolveConfig } from 'vitepress';

// The site config selects languages. Dictionaries and review records supply
// language-specific expectations; their keys must never select the test scope.
export function selectTranslationLocales(siteLocales, filter) {
  const configured = Object.entries(siteLocales).filter(([key, value]) => key !== 'root' && value.themeConfig?.translationChecks !== false).map(([key]) => key);
  assert(configured.length, 'No translation locales enabled in site config.');
  if (filter === undefined) return configured;
  const requested = [...new Set(filter.split(',').map(key => key.trim()).filter(Boolean))];
  assert(requested.length, 'CHECK_LOCALES must select at least one configured translation locale.');
  for (const key of requested) assert(configured.includes(key), `CHECK_LOCALES: ${key} is not an enabled translation locale in site config.`);
  return requested;
}

export async function translationContext(root, filter = process.env.CHECK_LOCALES) {
  const config = await resolveConfig(root, 'build', 'production');
  const siteLocales = config.site.locales;
  const locales = selectTranslationLocales(siteLocales, filter);
  const files = ['index.md', 'about.md', 'quick-start.md', 'type-definition.md', 'ai/overview.md'];
  for (const dir of ['posts', 'learn']) {
    files.push(...fs.readdirSync(path.join(root, dir)).filter(name => name.endsWith('.md') && !name.startsWith('ancientBook')).sort().map(name => `${dir}/${name}`));
  }
  const missing = locales.flatMap(locale => files.filter(file => !fs.existsSync(path.join(root, locale, file))).map(file => `${locale}/${file}`));
  assert(!missing.length, `Missing translated pages for configured locales:\n${missing.slice(0, 30).join('\n')}${missing.length > 30 ? `\n... ${missing.length} missing pages` : ''}`);
  return { locales, files, siteLocales };
}

export function requireTranslationData(locales, dictionary) {
  const missing = [];
  for (const locale of locales) {
    for (const key of ['terms', 'ordinary', 'display']) {
      if (!Object.keys(dictionary[key]?.[locale] || {}).length) missing.push(`${locale}: translation-terms.json.${key}`);
    }
    if (!['none', 'traditional-Chinese'].includes(dictionary.glossPolicy?.[locale])) missing.push(`${locale}: translation-terms.json.glossPolicy`);
    for (const phrase of dictionary.contextualPhrases || []) {
      if (!phrase.values?.[locale]) missing.push(`${locale}: contextual phrase ${phrase.phrase} (${phrase.file})`);
    }
  }
  assert(!missing.length, `Missing translation expectations for configured locales:\n${missing.slice(0, 30).join('\n')}`);
}

export function localeRules(locale, dictionary, siteLocales) {
  const rules = dictionary.localeRules?.[locale] || {};
  const language = siteLocales[locale].lang?.replaceAll('_', '-').split('-')[0].toLowerCase();
  return {
    chineseGlosses: dictionary.glossPolicy[locale] === 'traditional-Chinese',
    nativeHan: rules.nativeHan === true,
    englishAliases: language === 'en',
    workSchedulePattern: rules.workSchedulePattern,
  };
}

export function requireSemanticData(locales, dictionary, aliases, emphasis, reviews) {
  const missing = [];
  for (const locale of locales) {
    if (!dictionary.localeRules?.[locale]?.workSchedulePattern) missing.push(`${locale}: localeRules.workSchedulePattern`);
    else new RegExp(dictionary.localeRules[locale].workSchedulePattern, 'iu');
    for (const [name, records] of [['prose-alias-review', aliases], ['emphasis-semantic-review', emphasis]]) {
      for (const record of records) if (!record.targets?.[locale]) missing.push(`${locale}: ${name}: ${record.source}`);
    }
    if (!reviews.cells.some(cell => cell.decision === 'corrected' && cell.targets?.[locale])) missing.push(`${locale}: table-semantic-review (no reviewed table meanings)`);
  }
  assert(!missing.length, `Missing semantic expectations for configured locales:\n${missing.slice(0, 30).join('\n')}`);
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { createMarkdownRenderer } from 'vitepress';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { productTable, verifyProductTables } from '../verify-product-tables.mjs';

test('only the product table is preserved; localized headings and surrounding tables remain independent', async () => {
  const md = await createMarkdownRenderer(process.cwd());
  const table = '| 名称 | 作者 |\n| --- | --- |\n| iztro | 昊色居士 |';
  const source = `---\ntitle: 快速开始\n---\n\n## 产品\n\n${table}\n\n## 安装\n\n| 参数 |\n| --- |\n| 值 |\n`;
  const target = source.replace('title: 快速开始', 'title: Quick start').replace('## 产品', '## Products {#产品}')
    .replace('## 安装', '## Installation {#安装}').replace('| 参数 |', '| Parameter |').replace('| 值 |', '| Value |');
  assert.equal(productTable(source, md), table);
  assert.equal(productTable(target, md), table);
  assert.notEqual(productTable(target.replace('昊色居士', 'Haose Jushi'), md), table);
  assert.notEqual(productTable(target.replace('名称', 'Name'), md), table);
  assert.notEqual(productTable(target.replace('iztro |', 'iztro-new |'), md), table);
  assert.throws(() => productTable(target.replace('## Products {#产品}', '## Other'), md), /Missing quick-start product section/);
});

test('configured languages with independent translation workflows must also preserve the product table', async t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-product-tables-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, '.vitepress'));
  fs.mkdirSync(path.join(root, 'converted'));
  const repo = fileURLToPath(new URL('../../', import.meta.url));
  fs.symlinkSync(path.join(repo, 'node_modules'), path.join(root, 'node_modules'), 'dir');
  fs.writeFileSync(path.join(root, '.vitepress/config.mts'), 'export default { locales: { root: { lang: "zh-CN" }, converted: { lang: "zh-TW", themeConfig: { translationChecks: false } } } };');
  const source = '## 产品\n\n| 名称 |\n| --- |\n| 昊色居士 |\n';
  fs.writeFileSync(path.join(root, 'quick-start.md'), source);
  const target = path.join(root, 'converted/quick-start.md');
  fs.writeFileSync(target, source.replace('## 产品', '## 產品'));
  assert.deepEqual(await verifyProductTables(root), ['converted']);
  fs.writeFileSync(target, source.replace('## 产品', '## 產品').replace('名称', '名稱'));
  await assert.rejects(verifyProductTables(root), /product table must match/);
});

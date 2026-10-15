---
title: "iztro公式ドキュメント"
description: "iztroのインストールから紫微斗数の命盤データの取得まで、コード例とともに解説します。"
---

<div align="center">

<h1 class="brand-name text-clip">IZTRO</h1>

紫微斗数の命盤データを取得するための軽量なJavaScriptオープンソースライブラリです。

</div>

## はじめに  {#前言}

`iztro` の開発者向けドキュメントへようこそ！このページでは、ライブラリの組み込み方、データの取得方法、紫微斗数の命盤に含まれるすべてのデータを素早く取得する方法を説明します。基本的な機能を日常的に使うのであれば、このページの内容で十分です。内容を理解したら、他のページでより詳しく学べます。紫微斗数に興味があり、まだ基礎知識がない方は、[基礎知識](/ja_JP/learn/basis.md)から読んでみてください。

::: info 次の情報が得られます。

- `iztro` をインストールしてコードに統合する方法
- 命盤を取得する方法
- 命盤をもとに宮位を分析する方法
- 宮位のデータをもとに星曜を分析する方法
  :::

## 製品  {#产品}

|  | 名称 | リンク | 言語 | 著者 |
| --- | --- | --- | --- | --- |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" /> | iztro | [GitHub](https://github.com/sylarlong/iztro) ｜ [Gitee](https://gitee.com/sylarlong/iztro) | Typescript | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/react-iztro.svg?style=social&label=Star" alt="react-iztro" /> | react-iztro | [GitHub](https://github.com/sylarlong/react-iztro) ｜ [Gitee](https://gitee.com/sylarlong/react-iztro) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro-hook.svg?style=social&label=Star" alt="iztro-hook" /> | iztro-hook | [GitHub](https://github.com/sylarlong/iztro-hook) ｜ [Gitee](https://gitee.com/sylarlong/iztro-hook) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/x-haose/py-iztro.svg?style=social&label=Star" alt="py-iztro" /> | py-iztro | [GitHub](https://github.com/x-haose/py-iztro) ｜ [Gitee](https://gitee.com/x-haose/py-iztro) | Python | [昊色居士](https://github.com/x-haose) |
| <img src="https://img.shields.io/github/stars/EdwinXiang/dart_iztro.svg?style=social&label=Star" alt="py-iztro" /> | dart_iztro | [GitHub](https://github.com/EdwinXiang/dart_iztro) ｜ [Gitee](https://gitee.com/EdwinXiang/dart_iztro) | Dart | [EdwinXiang](https://github.com/EdwinXiang) |

## インストール  {#安装}

### パッケージマネージャーでインストールする {#使用包管理安装}

使い慣れたパッケージ管理ツールを使用してインストールできます。

:::tabs
== npm

```sh
npm install iztro -S
```

== yarn

```sh
yarn add iztro
```

== pnpm

```sh
pnpm add -S iztro
```

== bun

```sh
bun add -S iztro
```

:::

インストールが完了すると、`package.json` の依存関係の一覧に `iztro` が追加されます。

```json
"dependencies": {
  "iztro": "^1.1.0"
}
```

> バージョン番号は異なる場合があります

### Pure JS ライブラリの使用法<Badge type="warning" text="^2.0.4" />  {#纯js库使用}

バージョン `v2.0.4` 以降は、`umd` 形式のJavaScriptライブラリが提供されています。[リリースの添付ファイル](https://github.com/SylarLong/iztro/releases)から `🗜️iztro-min-js.tar.gz` をダウンロードできます。圧縮ファイルには、圧縮済みJavaScriptファイルと対応するソースマップが含まれています。

`v2.6.0` 以降、各リリースではバージョン番号付きのファイル（例：`iztro-v2.6.0.min.js`）と、従来の参照方法と互換性のある `iztro.min.js` の両方が生成されます。本番環境では、新バージョンの公開後に同じCDN URLの内容が変わるのを避けるため、バージョン番号付きのファイルを使うことをお勧めします。

以下のURLを使うと、`CDN`からライブラリを直接読み込めます。バージョン番号を指定しないURLは、最新版を参照します。

- jsdelivr

  - https://cdn.jsdelivr.net/npm/iztro/dist/iztro.min.js
  - https://cdn.jsdelivr.net/npm/iztro@2.6.2/dist/iztro-v2.6.2.min.js

- unpkg

  - https://unpkg.com/iztro/dist/iztro.min.js
  - https://unpkg.com/iztro@2.6.2/dist/iztro-v2.6.2.min.js

次のルールを使用してバージョンを指定することもできます。

- `iztro@2`
- `iztro@^2.6.2`
- `iztro@2.6.2`

## 始めましょう  {#开始使用}

### ライブラリをインポートする {#引入代码}

次のようにコードに `iztro` を導入できます。

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";
```

== CommonJS

```js
var iztro = require("iztro");
```

== HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>iztro-紫微斗数开源库</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/iztro@2.6.2/dist/iztro-v2.6.2.min.js"></script>
    <script>
      // 获取一张星盘数据
      var astrolabe = iztro.astro.bySolar('2000-8-16', 2, '男', true, 'zh-CN');
    </script>
  </body>
</html>
```

:::

### 命盤データを取得する {#获取星盘数据}

紫微斗数の命盤は、`旧暦`または`グレゴリオ暦`の日付から作成できます。`iztro`は両方に対応していますが、`グレゴリオ暦`での指定をお勧めします。同じ日を指定すれば、どちらの方法でも同じ命盤データが得られます。

::: info `阳历` を使用すると、次のような便利な点があります。

- 出生証明書で簡単に確認できます。
- カレンダーコンポーネントを使用して日付を選択できます
- 現在は旧暦の日付を覚えていない人も多くいます。
- 閏月を無視することによって引き起こされる一連の問題を回避できます。
  :::

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// 通过阳历获取星盘信息
const astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 通过农历获取星盘信息
const astrolabe = astro.byLunar("2000-7-17", 2, "女");
```

== CommonJS

```js
var { astro } = require("iztro");

// 通过阳历获取星盘信息
var astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 通过农历获取星盘信息
var astrolabe = astro.byLunar("2000-7-17", 2, "女", false);
```

:::

上記の `bySolar` と `byLunar` は同じ結果を返します。`byLunar` は内部で日付を `グレゴリオ暦` に変換してから `bySolar` を呼び出すためです。以下の実行結果は長いので折りたたんであります。展開して、自分の呼び出し結果と比較できます。

::: details `astro.bySolar()` および `astro.byLunar()` メソッドの実行結果

```ts
{
  // 阳历日期
  solarDate: '2000-8-16',
   // 农历日期
  lunarDate: '二〇〇〇年七月十七',
  // 四柱
  chineseDate: '庚辰 甲申 丙午 庚寅',
  // 时辰
  time: '寅时',
  // 时辰对应的时间段
  timeRange: '03:00~05:00',
  // 星座
  sign: '狮子座',
  // 生肖
  zodiac: '龙',
  // 命宫地支
  earthlyBranchOfSoulPalace: '午',
  // 身宫地支
  earthlyBranchOfBodyPalace: '戌',
  // 命主
  soul: '破军',
  // 身主
  body: '文昌',
  // 五行局
  fiveElementsClass: '木三局',
  // 十二宫数据
  palaces: [
    {
      // 宫名
      name: '财帛',
      // 是否身宫
      isBodyPalace: false,
      // 是否来因宫
      isOriginalPalace: false,
      // 宫位天干
      heavenlyStem: '戊',
      // 宫位地支
      earthlyBranch: '寅',
      // 主星（含天马禄存）
      majorStars: [
        { name: '武曲', type: 'major', scope: 'origin', brightness: '得' },
        { name: '天相', type: 'major', scope: 'origin', brightness: '庙' },
        { name: '天马', type: 'tianma', scope: 'origin', brightness: '' },
      ],
      // 辅星（含六吉六煞）
      minorStars: [],
      // 杂曜
      adjectiveStars: [
        { name: '月解', type: 'helper', scope: 'origin' },
        { name: '三台', type: 'adjective', scope: 'origin' },
        { name: '天寿', type: 'adjective', scope: 'origin' },
        { name: '天巫', type: 'adjective', scope: 'origin' },
        { name: '天厨', type: 'adjective', scope: 'origin' },
        { name: '阴煞', type: 'adjective', scope: 'origin' },
        { name: '天哭', type: 'adjective', scope: 'origin' },
      ],
      // 长生12神
      changsheng12: '绝',
      // 博士12神
      boshi12: '蜚廉',
      // 流年将前12神
      jiangqian12: '岁驿',
      // 流年岁前12神
      suiqian12: '吊客',
      // 大限
      stage: { range: [44, 53], heavenlyStem: '戊' },
      // 小限
      ages: [9, 21, 33, 45, 57, 69, 81],
    },
    {
      name: '子女',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '己',
      earthlyBranch: '卯',
      majorStars: [
        { name: '太阳', type: 'major', scope: 'origin', brightness: '庙' },
        { name: '天梁', type: 'major', scope: 'origin', brightness: '庙' },
      ],
      minorStars: [],
      adjectiveStars: [{ name: '天刑', type: 'adjective', scope: 'origin' }],
      changsheng12: '墓',
      boshi12: '奏书',
      jiangqian12: '息神',
      suiqian12: '病符',
      stage: { range: [34, 43], heavenlyStem: '己' },
      ages: [8, 20, 32, 44, 56, 68, 80],
    },
    {
      name: '夫妻',
      isBodyPalace: false,
      isOriginalPalace: true,
      heavenlyStem: '庚',
      earthlyBranch: '辰',
      majorStars: [{ name: '七杀', type: 'major', scope: 'origin', brightness: '庙' }],
      minorStars: [
        { name: '右弼', type: 'soft', scope: 'origin', brightness: '' },
        { name: '火星', type: 'tough', scope: 'origin', brightness: '陷' },
      ],
      adjectiveStars: [
        { name: '封诰', type: 'adjective', scope: 'origin' },
        { name: '华盖', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '死',
      boshi12: '将军',
      jiangqian12: '华盖',
      suiqian12: '岁建',
      stage: { range: [24, 33], heavenlyStem: '庚' },
      ages: [7, 19, 31, 43, 55, 67, 79],
    },
    {
      name: '兄弟',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '辛',
      earthlyBranch: '巳',
      majorStars: [{ name: '天机', type: 'major', scope: 'origin', brightness: '平' }],
      minorStars: [],
      adjectiveStars: [
        { name: '天喜', type: 'flower', scope: 'origin' },
        { name: '天空', type: 'adjective', scope: 'origin' },
        { name: '孤辰', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '病',
      boshi12: '小耗',
      jiangqian12: '劫煞',
      suiqian12: '晦气',
      stage: { range: [14, 23], heavenlyStem: '辛' },
      ages: [6, 18, 30, 42, 54, 66, 78],
    },
    {
      name: '命宫',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '壬',
      earthlyBranch: '午',
      majorStars: [{ name: '紫微', type: 'major', scope: 'origin', brightness: '庙' }],
      minorStars: [{ name: '文曲', type: 'soft', scope: 'origin', brightness: '陷' }],
      adjectiveStars: [
        { name: '年解', type: 'helper', scope: 'origin' },
        { name: '凤阁', type: 'adjective', scope: 'origin' },
        { name: '天福', type: 'adjective', scope: 'origin' },
        { name: '截路', type: 'adjective', scope: 'origin' },
        { name: '蜚廉', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '衰',
      boshi12: '青龙',
      jiangqian12: '灾煞',
      suiqian12: '丧门',
      stage: { range: [4, 13], heavenlyStem: '壬' },
      ages: [5, 17, 29, 41, 53, 65, 77],
    },
    {
      name: '父母',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '癸',
      earthlyBranch: '未',
      majorStars: [],
      minorStars: [
        { name: '天钺', type: 'soft', scope: 'origin', brightness: '' },
        { name: '陀罗', type: 'tough', scope: 'origin', brightness: '庙' },
      ],
      adjectiveStars: [
        { name: '天姚', type: 'flower', scope: 'origin' },
        { name: '空亡', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '帝旺',
      boshi12: '力士',
      jiangqian12: '天煞',
      suiqian12: '贯索',
      stage: { range: [114, 123], heavenlyStem: '癸' },
      ages: [4, 16, 28, 40, 52, 64, 76],
    },
    {
      name: '福德',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '甲',
      earthlyBranch: '申',
      majorStars: [
        { name: '破军', type: 'major', scope: 'origin', brightness: '得' },
        { name: '禄存', type: 'lucun', scope: 'origin', brightness: '' },
      ],
      minorStars: [{ name: '文昌', type: 'soft', scope: 'origin', brightness: '得' }],
      adjectiveStars: [
        { name: '龙池', type: 'adjective', scope: 'origin' },
        { name: '台辅', type: 'adjective', scope: 'origin' },
        { name: '旬空', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '临官',
      boshi12: '博士',
      jiangqian12: '指背',
      suiqian12: '官符',
      stage: { range: [104, 113], heavenlyStem: '甲' },
      ages: [3, 15, 27, 39, 51, 63, 75],
    },
    {
      name: '田宅',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '乙',
      earthlyBranch: '酉',
      majorStars: [],
      minorStars: [
        { name: '地空', type: 'tough', scope: 'origin', brightness: '' },
        { name: '擎羊', type: 'tough', scope: 'origin', brightness: '陷' },
      ],
      adjectiveStars: [
        { name: '咸池', type: 'flower', scope: 'origin' },
        { name: '天贵', type: 'adjective', scope: 'origin' },
        { name: '月德', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '冠带',
      boshi12: '官府',
      jiangqian12: '咸池',
      suiqian12: '小耗',
      stage: { range: [94, 103], heavenlyStem: '乙' },
      ages: [2, 14, 26, 38, 50, 62, 74],
    },
    {
      name: '官禄',
      isBodyPalace: true,
      isOriginalPalace: false,
      heavenlyStem: '丙',
      earthlyBranch: '戌',
      majorStars: [
        { name: '廉贞', type: 'major', scope: 'origin', brightness: '利' },
        { name: '天府', type: 'major', scope: 'origin', brightness: '庙' },
      ],
      minorStars: [{ name: '左辅', type: 'soft', scope: 'origin', brightness: '' }],
      adjectiveStars: [
        { name: '天才', type: 'adjective', scope: 'origin' },
        { name: '天虚', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '沐浴',
      boshi12: '伏兵',
      jiangqian12: '月煞',
      suiqian12: '大耗',
      stage: { range: [84, 93], heavenlyStem: '丙' },
      ages: [1, 13, 25, 37, 49, 61, 73],
    },
    {
      name: '仆役',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '丁',
      earthlyBranch: '亥',
      majorStars: [{ name: '太阴', type: 'major', scope: 'origin', brightness: '庙' }],
      minorStars: [],
      adjectiveStars: [
        { name: '红鸾', type: 'flower', scope: 'origin' },
        { name: '恩光', type: 'adjective', scope: 'origin' },
        { name: '天官', type: 'adjective', scope: 'origin' },
        { name: '天月', type: 'adjective', scope: 'origin' },
        { name: '天伤', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '长生',
      boshi12: '大耗',
      jiangqian12: '亡神',
      suiqian12: '龙德',
      stage: { range: [74, 83], heavenlyStem: '丁' },
      ages: [12, 24, 36, 48, 60, 72, 84],
    },
    {
      name: '迁移',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '戊',
      earthlyBranch: '子',
      majorStars: [{ name: '贪狼', type: 'major', scope: 'origin', brightness: '旺' }],
      minorStars: [{ name: '铃星', type: 'tough', scope: 'origin', brightness: '陷' }],
      adjectiveStars: [{ name: ' 八座', type: 'adjective', scope: 'origin' }],
      changsheng12: '养',
      boshi12: '病符',
      jiangqian12: '将星',
      suiqian12: '白虎',
      stage: { range: [64, 73], heavenlyStem: '戊' },
      ages: [11, 23, 35, 47, 59, 71, 83],
    },
    {
      name: '疾厄',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '己',
      earthlyBranch: '丑',
      majorStars: [
        { name: '天同', type: 'major', scope: 'origin', brightness: '不' },
        { name: '巨门', type: 'major', scope: 'origin', brightness: '不' },
      ],
      minorStars: [
        { name: '天魁', type: 'soft', scope: 'origin', brightness: '' },
        { name: '地劫', type: 'tough', scope: 'origin', brightness: '' },
      ],
      adjectiveStars: [
        { name: '天德', type: 'adjective', scope: 'origin' },
        { name: '寡宿', type: 'adjective', scope: 'origin' },
        { name: '破碎', type: 'adjective', scope: 'origin' },
        { name: '天使', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '胎',
      boshi12: '喜神',
      jiangqian12: '攀鞍',
      suiqian12: '天德',
      stage: { range: [54, 63], heavenlyStem: '己' },
      ages: [10, 22, 34, 46, 58, 70, 82],
    },
  ],
}
```

:::

### メソッド定義  {#方法定义}

- 西暦の日付から命盤の情報を取得する

  `astro`.`bySolar(solarDateStr, timeIndex, gender, fixLeap, language)`

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | solarDateStr | `string` | `true` | - | グレゴリオ暦の日付【YYYY-M-D】 |
    | timeIndex | `number` | `true` | - | 出生時辰のインデックス [0–12]。早子時 (0) から晩子時 (12) に対応します。 |
    | gender | `string` | `true` | - | 性別【男性/女性】 |
    | fixLeap | `boolean` | `false` | `true` | 閏月を調整するかどうか。`true` の場合、閏月の前半を前月、後半を翌月として扱います。 |
    | language | `Language` | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

  - 戻り値

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

- 旧暦の日付から命盤の情報を取得する

  `astro`.`byLunar(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language)`

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | lunarDateStr | `string` | `true` | - | 旧暦の日付 [YYYY-M-D]。`旧暦2000年7月17日`なら `2000-7-17` を渡します。 |
    | timeIndex | `number` | `true` | - | 出生時辰のインデックス [0–12]。早子時 (0) から晩子時 (12) に対応します。 |
    | gender | `string` | `true` | - | 性別【男性/女性】 |
    | isLeapMonth | `boolean` | `false` | `false` | 指定した旧暦の月が閏月かどうか。その月に閏月がない場合、この引数は無効です。 |
    | fixLeap | `boolean` | `false` | `true` | 閏月を調整するかどうか。`true` の場合、閏月の前半を前月、後半を翌月として扱います。 |
    | language | `Language` | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

  - 戻り値

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

## 運限データを取得する {#获取运限}

紫微斗数の運限は、`大限`、`流年`、`流月`、`流日`、`流時`、`分単位の運限`、`秒単位の運限`に分かれます。`分単位の運限`と`秒単位の運限`は利用される場面が少ないため、現在は提供していません。`大限`、`流年`、`流月`、`流日`、`流時`でほとんどの用途に対応でき、`iztro`を使えばこれらのデータを簡単に取得できます。

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// 通过阳历获取星盘信息
const astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 获取运限数据
astrolabe.horoscope(new Date());
```

== CommonJS

```js
var { astro } = require("iztro");

// 通过阳历获取星盘信息
var astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 获取运限数据
astrolabe.horoscope(new Date());
```

:::

`astrolabe`.`horoscope()` メソッドを呼び出すと、次のデータが取得されます。

::: details `horoscope()` メソッドはデータを返します

```ts
{
  solarDate: "2023-8-28"
  lunarDate: "二〇二三年七月十三"
  decadal: {
    index: 2
    heavenlyStem: "庚"
    earthlyBranch: "辰"
    palaceNames: ["夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛", "子女"]
    mutagen: ["太阳", "武曲", "太阴", "天同"]
    stars: [{name: "运马", type: "tianma", scope: "decadal"}], …]
    age: {
      index: 10
      nominalAge: 23
    }
  },
  yearly: {
    index: 1
    heavenlyStem: "癸"
    earthlyBranch: "卯"
    palaceNames: ["兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛", "子女", "夫妻"]
    mutagen: ["破军", "巨门", "太阴", "贪狼"]
    stars: [[], [{name: "流魁", type: "soft", scope: "yearly"}, …], [], …]
  },
  monthly: {
  index: 3
    heavenlyStem: "庚"
    earthlyBranch: "申"
    palaceNames: ["子女", "夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛"]
    mutagen: ["太阳", "武曲", "太阴", "天同"]
  },
  daily: {
    index: 3
    heavenlyStem: "戊"
    earthlyBranch: "午"
    palaceNames: ["子女", "夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛"]
    mutagen: ["贪狼", "太阴", "右弼", "天机"]
  },
  hourly: {
    index: 3
    heavenlyStem: "壬"
    earthlyBranch: "子"
    palaceNames: ["子女", "夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛"]
    mutagen: ["天梁", "紫微", "左辅", "武曲"]
  }
}
```

:::

> ヒント：渡す日時が異なれば運限のデータも上記の例とは異なりますが、データ構造は同じです。

### メソッド定義  {#方法定义-1}

- 現在の命盤の運限情報を取得する

  `astrolabe`.`horoscope(date, timeIndex)`

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | date | `string` \| `Date` | `false` | `new Date()` | グレゴリオ暦の日付文字列または日付オブジェクト。時刻の情報が含まれていれば、`timeIndex`は省略できます。 |
    | timeIndex | `number` | `false` | `0` | 時辰のインデックス。省略した場合は `date` の時刻から算出します。 |

  - 戻り値

    [`Horoscope`](./type-definition.html#horoscope)

## 流曜を取得する {#获取流曜}

`horoscope()`の戻り値には、`大限`と`流年`の流曜がすでに含まれています。通常、個別に取得する必要はありません。別途取得したい場合は、次のメソッドを使ってください。

:::tabs
== ES6 Module

```ts
import { star } from "iztro";

// 通过天干地支获取流曜
const horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

== CommonJS

```js
var { star } = require("iztro");

// 通过天干地支获取流曜
var horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

:::

`star`.`getHoroscopeStar()` メソッドを呼び出すと、次のデータが取得されます。

::: details `getHoroscopeStar()` メソッドはデータを返します

```ts
[
  [{ name: "运马", type: "tianma", scope: "decadal" }],
  [{ name: "运曲", type: "soft", scope: "decadal" }],
  [],
  [{ name: "运喜", type: "flower", scope: "decadal" }],
  [],
  [
    { name: "运钺", type: "soft", scope: "decadal" },
    { name: "运陀", type: "tough", scope: "decadal" },
  ],
  [{ name: "运禄", type: "lucun", scope: "decadal" }],
  [{ name: "运羊", type: "tough", scope: "decadal" }],
  [],
  [
    { name: "运昌", type: "soft", scope: "decadal" },
    { name: "运鸾", type: "flower", scope: "decadal" },
  ],
  [],
  [{ name: "运魁", type: "soft", scope: "decadal" }],
];
```

:::

### メソッド定義  {#方法定义-2}

- `天干`と`地支`から流曜を取得する

  `star`.`getHoroscopeStar(heavenlyStem, earthlyBranch, scope)`

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | heavenlyStem | `HeavenlyStemName` | `true` | - | 天干 |
    | earthlyBranch | `EarthlyBranchName` | `true` | - | 地支 |
    | scope | `'decadal'` \| `'yearly'` | `true` | - | 大限または流年の流曜を指定します。大限の流曜には `運`、流年の流曜には `流` の接頭辞が付きます。`年の解` は流年の流曜にだけ現れます。 |

  - 戻り値

    [`Star[][]`](./type-definition.html#star)

## ☕ まとめ  {#☕-总结}

このプログラムがお役に立ったら、コーヒー1杯分のご支援をご検討いただけますか？ 👍 [PayPal Me](https://PayPal.Me/sylarlong)

上記のデータを使って、以下のような命盤を作成できます。`palaces` のデータは12の宮位に、それ以外のデータは命盤の中央部分に表示します。この画像は古いバージョンで作成したため、流曜の表示が現在の結果と異なります。実際に返されるデータを基準にしてください。

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## 📜 著作権  {#📜-版权}

MIT License

Copyright &copy; 2023 Sylar Long

このオープンソース コードは合理的に使用してください。違法な目的で使用することは禁止されています。

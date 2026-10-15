---
title: "iztro quick start: install and create a chart"
description: "Install iztro and start generating Zi Wei Dou Shu charts with practical examples."
---

<div align="center">

<h1 class="brand-name text-clip">IZTRO</h1>

A lightweight, open-source JavaScript library for obtaining Zi Wei Dou Shu（紫微斗數） chart data.

</div>

## Introduction   {#前言}

Welcome to the `iztro` developer documentation! This page explains how to integrate the library, retrieve data, and quickly obtain all the data for a Zi Wei Dou Shu（紫微斗數） chart（星盤）. For basic, everyday use, this guide should be enough to get you started. Once you are comfortable with it, explore the other pages for more detail. If you are interested in Zi Wei Dou Shu but have no background in it, start with [Basic concepts](/en_US/learn/basis.md).

::: info You will get the following information:

- How to install and integrate `iztro` into your code
- How to obtain a chart（星盤）
- How to analyze palaces（宮位） using a chart（星盤）
- How to analyze stars（星曜） using palace（宮位） data
  :::

## Products   {#产品}

|  | Name | Link | Language | Author |
| --- | --- | --- | --- | --- |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" /> | iztro | [GitHub](https://github.com/sylarlong/iztro)  ｜  [Gitee](https://gitee.com/sylarlong/iztro) | Typescript | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/react-iztro.svg?style=social&label=Star" alt="react-iztro" /> | react-iztro | [GitHub](https://github.com/sylarlong/react-iztro)  ｜  [Gitee](https://gitee.com/sylarlong/react-iztro) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro-hook.svg?style=social&label=Star" alt="iztro-hook" /> | iztro-hook | [GitHub](https://github.com/sylarlong/iztro-hook)  ｜  [Gitee](https://gitee.com/sylarlong/iztro-hook) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/x-haose/py-iztro.svg?style=social&label=Star" alt="py-iztro" /> | py-iztro | [GitHub](https://github.com/x-haose/py-iztro)  ｜  [Gitee](https://gitee.com/x-haose/py-iztro) | Python | [Haose Jushi](https://github.com/x-haose) |
| <img src="https://img.shields.io/github/stars/EdwinXiang/dart_iztro.svg?style=social&label=Star" alt="py-iztro" /> | dart_iztro | [GitHub](https://github.com/EdwinXiang/dart_iztro)  ｜  [Gitee](https://gitee.com/EdwinXiang/dart_iztro) | Dart | [EdwinXiang](https://github.com/EdwinXiang) |

## Installation   {#安装}

### Install with a package manager {#使用包管理安装}

You can use any package management tool you are familiar with to install it.

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

After a successful installation, the dependency list in `package.json` will include `iztro`.

```json
"dependencies": {
  "iztro": "^1.1.0"
}
```

> Version numbers may vary

### Pure JS library usage <Badge type="warning" text="^2.0.4" />   {#纯js库使用}

After version `v2.0.4`, a standalone JavaScript bundle in `umd` format is available. Download `🗜️iztro-min-js.tar.gz` from the [release assets](https://github.com/SylarLong/iztro/releases). The archive contains the minified JavaScript file and its source map.

Starting with `v2.6.0`, each release generates a versioned file (such as `iztro-v2.6.0.min.js`) as well as `iztro.min.js`, which remains compatible with existing references. Use a versioned file in production to prevent the same CDN URL from serving different content after a new release.

You can also load the library directly from a `CDN` using one of the URLs below. A URL without a version number serves the latest release.

- jsdelivr

  - https://cdn.jsdelivr.net/npm/iztro/dist/iztro.min.js
  - https://cdn.jsdelivr.net/npm/iztro@2.6.2/dist/iztro-v2.6.2.min.js

- unpkg

  - https://unpkg.com/iztro/dist/iztro.min.js
  - https://unpkg.com/iztro@2.6.2/dist/iztro-v2.6.2.min.js

You can also specify versions using the following rules:

- `iztro@2`
- `iztro@^2.6.2`
- `iztro@2.6.2`

## Get started   {#开始使用}

### Import the library {#引入代码}

Import `iztro` as shown below:

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

### Get chart data {#获取星盘数据}

You can create a Zi Wei Dou Shu（紫微斗數） chart（星盤） from either a `lunar calendar` date or a `Gregorian calendar` date. `iztro` supports both, but we recommend using the `Gregorian calendar` method. Both methods produce the same chart when given equivalent dates.

::: info Advantages of using a `Gregorian calendar` date:

- Gregorian birth dates are easy to check against a birth certificate.
- A calendar date picker makes entering the date straightforward.
- Many people find it difficult to remember dates in the Chinese lunar calendar.
- Using a Gregorian date avoids mistakes caused by overlooking a lunar leap month.
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

The `bySolar` and `byLunar` calls above return the same result. Internally, `byLunar` converts the date to the `Gregorian calendar` before calling `bySolar`. The output below is collapsed because it is long. Expand it to compare it with the result of your own call.

::: details `astro.bySolar()` and `astro.byLunar()` method execution results

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

### Method signature {#方法定义}

- Get chart（星盤） data from a Gregorian date

  `astro`.`bySolar(solarDateStr, timeIndex, gender, fixLeap, language)`

  - parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | solarDateStr | `string` | `true` | - | Gregorian date【YYYY-M-D】 |
    | timeIndex | `number` | `true` | - | Birth-hour index [0–12], from early Zi hour (0) to late Zi hour (12) |
    | gender | `string` | `true` | - | Gender【Male/Female】 |
    | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months. If `true`, the first half is assigned to the preceding month and the second half to the following month. |
    | language | `Language` | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

  - return value

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

- Get chart（星盤） data from a Chinese lunar-calendar date

  `astro`.`byLunar(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language)`

  - parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | lunarDateStr | `string` | `true` | - | Lunar date [YYYY-M-D]. For `lunar year 2000, month 7, day 17`, pass `2000-7-17`. |
    | timeIndex | `number` | `true` | - | Birth-hour index [0–12], from early Zi hour (0) to late Zi hour (12) |
    | gender | `string` | `true` | - | Gender【Male/Female】 |
    | isLeapMonth | `boolean` | `false` | `false` | Whether the supplied lunar month is a leap month; ignored if that month has no leap counterpart. |
    | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months. If `true`, the first half is assigned to the preceding month and the second half to the following month. |
    | language | `Language` | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

  - return value

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

## Get time-cycle data {#获取运限}

Zi Wei Dou Shu（紫微斗數） uses several time cycles: `decadal`（大限）, `yearly`（流年）, `monthly`（流月）, `daily`（流日）, `hourly`（流時）, `minute-level cycle`（流分）, and `second-level cycle`（流秒）. We do not currently provide `minute-level cycle`（流分） or `second-level cycle`（流秒） data because they are rarely needed. The `decadal`（大限）, `yearly`（流年）, `monthly`（流月）, `daily`（流日）, and `hourly`（流時） cycles cover most use cases, and `iztro` makes their data easy to retrieve.

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

After calling the `astrolabe`.`horoscope()` method you will get the following data

::: details `horoscope()` method returns data

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

> Tip: Your time-cycle data may differ from the example because of the date and time you pass in, but the data structure is the same.

### Method signature {#方法定义-1}

- Get time-cycle data for the current chart（星盤）

  `astrolabe`.`horoscope(date, timeIndex)`

  - parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | date | `string`  \|  `Date` | `false` | `new Date()` | Gregorian date string or date object. If the time string or date object contains hour information, `timeIndex` can be omitted |
    | timeIndex | `number` | `false` | `0` | Time-slot index. If omitted, the hour is read from `date` and converted to an index. |

  - return value

    [`Horoscope`](./type-definition.md#horoscope)

## Get transit stars（流曜）   {#获取流曜}

The result of `horoscope()` already includes the transit stars（流曜） for `decadal`（大限） and `yearly`（流年） cycles. You usually do not need to retrieve them separately. If your use case does require a separate query, use the following method.

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

After calling the `star`.`getHoroscopeStar()` method you will get the following data

::: details `getHoroscopeStar()` method returns data

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

### Method signature {#方法定义-2}

- Get transit stars（流曜） from `Heavenly Stem`（天干） and `Earthly Branch`（地支）

  `star`.`getHoroscopeStar(heavenlyStem, earthlyBranch, scope)`

  - parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | heavenlyStem | `HeavenlyStemName` | `true` | - | Heavenly Stem（天干） |
    | earthlyBranch | `EarthlyBranchName` | `true` | - | Earthly Branch（地支） |
    | scope | `'decadal'`  \|  `'yearly'` | `true` | - | Selects decadal or annual transit stars（流曜）. Decadal stars use a `decadal prefix`, annual stars an `annual prefix`. `considery(Y)`（年解） appears only among annual transit stars. |

  - return value

    [`Star[][]`](./type-definition.md#star)

## ☕ Summary   {#☕-总结}

If you find this program useful, would you consider buying me a coffee? 👍 [PayPal Me](https://PayPal.Me/sylarlong)

The data above can be used to generate the chart（星盤） below. The `palaces` data populates all twelve palaces（宮位）, while the remaining data fills the central section of the chart. The transit stars（流曜） shown in the image differ from the current output because the image was generated with an older version. Use the actual returned data as your reference.

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## 📜 Copyright   {#📜-版权}

MIT License

Copyright &copy; 2023 Sylar Long

Please use this open source code reasonably, and it is prohibited to use it for illegal purposes.

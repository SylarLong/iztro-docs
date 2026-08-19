<div align="center">

<h1 class="brand-name text-clip">IZTRO</h1>

A lightweight Open-Source Javascript library of getting The Purple Star Astrology(Zi Wei Dou Shu) astrolabe information.

</div>

## Overview

Welcome to the `iztro` development documentation! This page will introduce you to how to integrate, how to retrieve data, and how to quickly obtain all the data on a natal chart in Zi Wei Dou Shu. If you are just a basic user, reading this document will be enough for your daily use.
If you have mastered the content on this page, you can explore further on other pages.

::: info You will obtain the following information:

- How to install and integrate iztro into your code
- How to retrieve a natal chart information
- How to analyze palace positions based on the natal chart information
- How to analyze star brilliance based on palace positions
  :::

## Products

| | Name | Link | Language | Author |
|--|--|--|--|--|
|<img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" />|iztro|[GitHub](https://github.com/sylarlong/iztro) ｜ [Gitee](https://gitee.com/sylarlong/iztro) |Typescript| [SylarLong](https://github.com/SylarLong) |
|<img src="https://img.shields.io/github/stars/sylarlong/react-iztro.svg?style=social&label=Star" alt="react-iztro" />|react-iztro|[GitHub](https://github.com/sylarlong/react-iztro) ｜ [Gitee](https://gitee.com/sylarlong/react-iztro)|React| [SylarLong](https://github.com/SylarLong) |
|<img src="https://img.shields.io/github/stars/sylarlong/iztro-hook.svg?style=social&label=Star" alt="iztro-hook" />|iztro-hook|[GitHub](https://github.com/sylarlong/iztro-hook) ｜ [Gitee](https://gitee.com/sylarlong/iztro-hook) |React| [SylarLong](https://github.com/SylarLong) |
|<img src="https://img.shields.io/github/stars/x-haose/py-iztro.svg?style=social&label=Star" alt="py-iztro" />|py-iztro|[GitHub](https://github.com/x-haose/py-iztro) ｜ [Gitee](https://gitee.com/x-haose/py-iztro)|Python| [昊色居士](https://github.com/x-haose) |
|<img src="https://img.shields.io/github/stars/EdwinXiang/dart_iztro.svg?style=social&label=Star" alt="py-iztro" />|dart_iztro|[GitHub](https://github.com/EdwinXiang/dart_iztro) ｜ [Gitee](https://gitee.com/EdwinXiang/dart_iztro)|Dart| [EdwinXiang](https://github.com/EdwinXiang) |

## Installation

You can install `iztro` using any package management tool you are familiar with.

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

If the installation is successful, you will find `iztro` in the dependencies list of your `package.json`.

```json
"dependencies": {
  "iztro": "^1.0.0"
}
```

> The version might be different.

### Plain JavaScript bundle <Badge type="warning" text="^2.0.4" />

The release archive `🗜️iztro-min-js.tar.gz` contains a minified UMD bundle and its sourcemap, so iztro can be loaded directly with a `<script>` tag.

Since `v2.6.0`, each release includes both a versioned bundle such as `iztro-v2.6.0.min.js` and the backward-compatible `iztro.min.js`. Prefer the versioned bundle in production so the URL always resolves to the same code.

- jsDelivr

  - https://cdn.jsdelivr.net/npm/iztro/dist/iztro.min.js
  - https://cdn.jsdelivr.net/npm/iztro@2.6.0/dist/iztro-v2.6.0.min.js

- unpkg

  - https://unpkg.com/iztro/dist/iztro.min.js
  - https://unpkg.com/iztro@2.6.0/dist/iztro-v2.6.0.min.js

## Quick start

### Import code

You can import `iztro` into your code using the following methods.

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
<script src="https://cdn.jsdelivr.net/npm/iztro@2.6.0/dist/iztro-v2.6.0.min.js"></script>
<script>
  const astrolabe = iztro.astro.bySolar("2000-8-16", 2, "male", true, "en-US");
</script>
```

:::

### Get astrolabe data

When retrieving a natal chart in Zi Wei Dou Shu, you can obtain it based on either the `lunar calendar` or the `solar calendar`. `iztro` provides both options, and you can choose according to your needs. However, we recommend using the `solar calendar` method. Rest assured, the data obtained internally by the program is consistent for both the `lunar` and `solar` calendars.

::: info Using the `solar calendar` has the following advantages:

- It can be easily found on a birth certificate.
- You can use a calendar component for date selection.
- Many people nowadays cannot remember lunar calendar dates.
- It can avoid a series of issues caused by overlooking leap months.
  :::

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// Get astrolabe by solar calendar.
const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "male");

// Get astrolabe by lunar calendar.
const astrolabe = astro.astrolabeByLunarDate("2000-7-17", 2, "male");
```

== CommonJS

```js
var { astro } = require("iztro");

// Get astrolabe by solar calendar.
var astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "male");

// Get astrolabe by lunar calendar.
var astrolabe = astro.astrolabeByLunarDate("2000-7-17", 2, "male", false);
```

:::

You will find that the return values of `astrolabeBySolarDate` and `astrolabeByLunarDate` above are the same. This is because the `astrolabeByLunarDate` method internally converts the date to the `solar calendar` and then calls the `astrolabeBySolarDate` method. Here is the execution result. Since the result is quite long, it is folded. If you want to check if your call result is the same as this, you can expand to view it.

::: details Result of `astro.astrolabeBySolarDate` and `astro.astrolabeByLunarDate`

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
      // 杂耀
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

### function definition

- Get astrolabe by solar calendar.

  `astro`.`astrolabeBySolarDate(solarDateStr, timeIndex, gender, fixLeap, language)`

  - Parameters

    | Name         | Type       | Required | Default | Description                                                                                                                                                   |
    | ------------ | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | solarDateStr | `string`   | `true`   | -       | solar date string【YYYY-M-D】                                                                                                                                 |
    | timeIndex    | `number`   | `true`   | -       | chinse hour index【0~12】. from `early Rat hour`（0）to `late Rat hour`（12）                                                                                 |
    | gender       | `string`   | `true`   | -       | gender【male/female】                                                                                                                                         |
    | fixLeap      | `boolean`  | `false`  | `true`  | whether to fix the leap month. if `true`, the first half of the leap month is counted as the previous month, and the second half is counted as the next month |
    | language     | `Language` | `false`  | `zh-CN` | the returns will be localized to the specific language. we support `zh-CN`,`zh-TW`,`en-US`,`ko-KR` and `ja-JP` for now                                        |

  - Returns:

    `FunctionalAstrolabe`

- Get astrolabe by lunar calendar.

  `astro`.`astrolabeByLunarDate(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language)`

  - Parameters

    | Name         | Type       | Required | Default | Description                                                                                                                                                   |
    | ------------ | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | lunarDateStr | `string`   | `true`   | -       | lunar date【YYYY-M-D】. e.g. pass `2000-7-17` if it's `2000年七月十七`                                                                                        |
    | timeIndex    | `number`   | `true`   | -       | chinse hour index【0~12】. from `early Rat hour`（0）to `late Rat hour`（12）                                                                                 |
    | gender       | `string`   | `true`   | -       | gender【male/female】                                                                                                                                         |
    | isLeapMonth  | `boolean`  | `false`  | `false` | whether the date is a leap month. This parameter does not take effect when there is no leap month in the actual month                                         |
    | fixLeap      | `boolean`  | `false`  | `true`  | whether to fix the leap month. if `true`, the first half of the leap month is counted as the previous month, and the second half is counted as the next month |
    | language     | `Language` | `false`  | `zh-CN` | the returns will be localized to the specific language. we support `zh-CN`,`zh-TW`,`en-US`,`ko-KR` and `ja-JP` for now                                        |

  - Returns:

    `FunctionalAstrolabe`

## Get horoscope data

The `horoscope` in Zi Wei Dou Shu is divided into "大限" (`Decadal horoscope`), "流年" (`Yearly horoscope`), "流月" (`Monthly horoscope`), "流日" (`Daily horoscope`), "流时" (`Hourly horoscope`), "流分" (`Minute horoscope`), and "流秒" (`Second horoscope`). However, since `Minute horoscope` and `Second horoscope` are not commonly used, we do not currently provide them. "大限" (`Decadal horoscope`), "流年" (`Yearly horoscope`), "流月" (`Monthly horoscope`), "流日" (`Daily horoscope`) are already sufficient to meet the majority of needs and scenarios. By using `iztro` you can easily obtain this data.

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// Get astrolabe by solar calendar.
const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "male");

// Get horoscope data of the `astrolabe` instance
astrolabe.horoscope(new Date());
```

== CommonJS

```js
var { astro } = require("iztro");

// Get astrolabe by solar calendar.
var astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "male");

// Get horoscope data of the `astrolabe` instance
astrolabe.horoscope(new Date());
```

:::

You'll get the result below by invoking `astrolabe`.`horoscope()`

::: details Result of `horoscope()`

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

> Tips: Only `Decadal horoscope` and `Yearly horoscope` include horosope stars. The values of the result above will be different by different parameters. But the data structure is fixed.

### function definition

- Get horoscope data of the `astrolabe` instance

  `astrolabe`.`horoscope(date, timeIndex)`

  - Parameters

    | Name      | Type               | Required | Default      | Description                                                                                                  |
    | --------- | ------------------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
    | date      | `string` \| `Date` | `false`  | `new Date()` | solar calendar string or a `Date` instance. `timeIndex` can be omit if the `hour` data is included in `date` |
    | timeIndex | `number`           | `false`  | `0`          | chinese hour index【0 ～ 12】                                                                                |

  - Returns

    `Horoscope`

## Get horoscope star

The `horoscope()` method above already includes the `horoscope star` of the `Decadal horoscope` and `Yearly horoscope`. So in general, there is no need to separately call a method to obtain the `horoscope star`. However, there are exceptional cases where you need to obtain the flow on your own, in which case you need to call the following methods to obtain it.

:::tabs
== ES6 Module

```ts
import { star } from "iztro";

// Get `Horoscope star` by `Heavenly Stem` and `Earthly Branch`
const horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

== CommonJS

```js
var { star } = require("iztro");

// Get `Horoscope star` by `Heavenly Stem` and `Earthly Branch`
var horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

:::

You'll get the result below by invoking `star`.`getHoroscopeStar()`

::: details Result of `getHoroscopeStar()`

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

### function definition

- Get `Horoscope star` by `Heavenly Stem` and `Earthly Branch`

  `star`.`getHoroscopeStar(heavenlyStem, earthlyBranch, scope)`

  - Parameters

  | Name          | Type                      | Required | Default | Description                       |
  | ------------- | ------------------------- | -------- | ------- | --------------------------------- |
  | heavenlyStem  | `HeavenlyStemName`        | `true`   | -       | heavenly stem name                |
  | earthlyBranch | `EarthlyBranchName`       | `true`   | -       | earthly branch name               |
  | scope         | `'decadal'` \| `'yearly'` | `true`   | -       | to specific the scope of the horo |

  - Returns

    `Star[][]`

## ☕ Summary

Buy me a coffee if it's useful for you. 👍 [Paypal Me](https://PayPal.Me/sylarlong)

The above data can generate the following natal chart. The `palaces` data is used to fill the 12 palaces, while the other data is used to fill the central palace. Please keep in mind that the display of the flowing `Star names` in the image may differ from the actual returned data. This is because the image was generated from an earlier version. Please refer to the actual returned data for accuracy.

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## 📜 License

MIT License

Copyright &copy; 2023 Sylar Long

Please use this open-source code responsibly and refrain from using it for illegal purposes.

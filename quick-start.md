<div align="center">

# IZTRO

一套轻量级获取紫微斗数排盘信息的Javascript开源库。

</div>

<div align="center" class="badges">

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/astro/Codecov.yaml)](https://github.com/SylarLong/astro/actions) [![npm](https://img.shields.io/npm/v/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/astro)](https://github.com/search?q=repo%3ASylarLong%2Fastro++language%3ATypeScript&type=code) [![Codecov](https://img.shields.io/codecov/c/github/sylarlong/astro)](https://app.codecov.io/gh/SylarLong/astro/tree/main/src%2Fstar) [![npm](https://img.shields.io/npm/dw/%40sylarlong/astro)](https://www.npmjs.com/package/iztro) [![Maintenance](https://img.shields.io/maintenance/yes/2023)](https://github.com/SylarLong/astro) [![GitHub](https://img.shields.io/github/license/sylarlong/astro)](https://www.npmjs.com/package/iztro) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/astro)](https://www.npmjs.com/package/iztro) [![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub issues](https://img.shields.io/github/issues/SylarLong/astro)](https://github.com/SylarLong/astro/issues) [![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/sylarlong/astro)](https://github.com/SylarLong)

</div>

## 概览

欢迎使用 `iztro` 开发文档！本页将向你介绍如何集成、如何获取数据、以及如何快速得到紫微斗数里一张星盘上的所有数据。如果你只是基础使用者，阅读完本篇文档将足够你日常使用。
如果你已经掌握了本页内容，可以到其他页面进行更深入的探索。

<div class='custom-block'>

 你将获取到以下信息：
 - 如何将`iztro`安装和集成到你的代码里
 - 如何获取到一张星盘
 - 如何基于星盘开始分析宫位
 - 如何基于宫位开始分析星耀

</div>

## 安装

你可以使用任意一种你熟悉的包管理工具进行安装

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
  pnpm add -D vitepress-plugin-tabs
  ```
:::

安装顺利的话，会在你的`package.json`依赖列表中找到`iztro`

```json
"dependencies": {
  "iztro": "^1.0.0"
}
```

> 版本号可能会有所不同

## 开始使用

#### 引入代码

你可以根据下列方式将`iztro`引入你的代码

:::tabs
== ES6 Module
```ts
import { astro } from 'iztro';
```
== CommonJS
```js
var astroObj = require('iztro');
```
:::

#### 获取星盘数据

在获取紫微斗数星盘的时候，可以根据`农历`或者`阳历`日期来获取，`iztro`提供了这两种获取方式，你可以根据你的需求使用，但我们更推荐你使用`阳历`的方式来使用。
放心，阳历和农历在程序内部获取到的数据是统一的。

<div class='custom-block'>

使用阳历有如下便利性：

- 可以很方便的在出生证上查到
- 可以使用日历组件进行日期选择
- 现在很多人都无法记住农历日期
- 可以避免因为忽略了闰月而带来的一系列问题

</div>

:::tabs
== ES6 Module
```ts
import { astro } from 'iztro';

// 通过阳历获取星盘信息
const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女');

// 通过农历获取星盘信息
const astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, '女');
```
== CommonJS
```js
var { astro } = require('iztro');

// 通过阳历获取星盘信息
var astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女');

// 通过农历获取星盘信息
var astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, '女', false);
```
:::

你会发现以上`astrolabeBySolarDate`和`astrolabeByLunarDate`的返回值是一样的，
这是因为`astrolabeByLunarDate`方法在内部处理的时候，也是将日期转化为`阳历`以后调用`astrolabeBySolarDate`方法。
以下是执行结果，因为结果比较长，所以将之折叠起来，如果你想要查看你调用结果是否和这个一样，可以展开查看：

<details class='custom-block'>
<summary>astro.astrolabeBySolarDate 和 astro.astrolabeByLunarDate 方法执行结果</summary>

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

</details>

##### 方法定义

- 通过阳历日期获取星盘信息

  `astro`.`astrolabeBySolarDate(solarDateStr, timeIndex, gender, fixLeap)`

  |参数|类型|是否必填|默认值|说明|
  |--|--|--|--|--|
  |solarDateStr|`string`|`true`|-|阳历日期【YYYY-M-D】|
  |timeIndex|`number`|`true`|-|出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号|
  |gender|`string`|`true`|-|性别【男/女】|
  |fixLeap|`boolean`|`false`|`true`|是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月|

  返回值: [`FunctionalAstrolabe`](./type-definition.html#functionalastrolabe)

- 通过农历日期获取星盘信息

  `astro`.`astrolabeByLunarDate(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap)`

  |参数|类型|是否必填|默认值|说明|
  |--|--|--|--|--|
  |lunarDateStr|`string`|`true`|-|农历日期【YYYY-M-D】，例如`2000年七月十七`则传入`2000-7-17`|
  |timeIndex|`number`|`true`|-|出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号|
  |gender|`string`|`true`|-|性别【男/女】|
  |isLeapMonth|`boolean`|`false`|`false`|是否闰月，当实际月份没有闰月时该参数不生效|
  |fixLeap|`boolean`|`false`|`true`|是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月|

  返回值: [`FunctionalAstrolabe`](./type-definition.html#functionalastrolabe)

## 获取运限

紫微斗数的运限分为`大限`、`流年`、`流月`、`流日`、`流时`、`流分`、`流秒`，由于`流分`、`流秒`使用场景不多，所以我们暂时不提供。
`大限`、`流年`、`流月`、`流日`、`流时`已经能满足绝大部分需求和使用场景了，使用`@syalrlong/astro`能够很轻松的获取到这些数据。

:::tabs
== ES6 Module
```ts
import { astro } from 'iztro';

// 通过阳历获取星盘信息
const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女');

// 获取运限数据
astrolabe.horoscope(new Date());
```
== CommonJS
```js
var { astro } = require('iztro');

// 通过阳历获取星盘信息
var astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女');

// 获取运限数据
astrolabe.horoscope(new Date());
```
:::

调用`astrolabe`.`horoscope()`方法以后你会获得如下数据

<details class='custom-block'>
<summary>horoscope方法返回数据</summary>

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
  timely: {
    index: 3
    heavenlyStem: "壬"
    earthlyBranch: "子"
    palaceNames: ["子女", "夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛"]
    mutagen: ["天梁", "紫微", "左辅", "武曲"]
  }
}
```

</details>

##### 方法定义

- 获取当前星盘的运限信息

  `astrolabe`.`horoscope(date, timeIndex)`

  |参数|类型|是否必填|默认值|说明|
  |--|--|--|--|--|
  |date|`string` \| `Date`|`false`| `new Date()` |阳历日期字符串或日期对象，若时间字符串或日期对象中包含了小时的信息，`timeIndex`可以省略|
  |timeIndex|`number`|`false`| `0` |时辰序号，若不传该参数则会尝试从`date`里获取小时信息转化为时辰序号|

  返回值: [`Horoscope`](./type-definition.html#horoscope) 
## 获取流耀

上面的`horoscope()`方法内已经包含了`大限`和`流年`的流耀，所以一般情况下无需在单独调用获取流耀的方法，但也有例外的情况需要自行获取流耀，那就需要调用下列方法自行获取。

:::tabs
== ES6 Module
```ts
import { star } from 'iztro';

// 通过天干地支获取流耀
const horoscopeStars = star.getHoroscopeStar('庚', '辰', 'decadal');
```
== CommonJS

```js
var { star } = require('iztro');

// 通过天干地支获取流耀
var horoscopeStars = star.getHoroscopeStar('庚', '辰', 'decadal');
```
:::

调用`star`.`getHoroscopeStar()`方法以后你会获得如下数据

<details class='custom-block'>
<summary>getHoroscopeStar方法返回数据</summary>

```ts
[
  [{ name: '运马', type: 'tianma', scope: 'decadal' }],
  [{ name: '运曲', type: 'soft', scope: 'decadal' }],
  [],
  [{ name: '运喜', type: 'flower', scope: 'decadal' }],
  [],
  [
    { name: '运钺', type: 'soft', scope: 'decadal' },
    { name: '运陀', type: 'tough', scope: 'decadal' },
  ],
  [{ name: '运禄', type: 'lucun', scope: 'decadal' }],
  [{ name: '运羊', type: 'tough', scope: 'decadal' }],
  [],
  [
    { name: '运昌', type: 'soft', scope: 'decadal' },
    { name: '运鸾', type: 'flower', scope: 'decadal' },
  ],
  [],
  [{ name: '运魁', type: 'soft', scope: 'decadal' }],
];
```

</details>

##### 方法定义

- 通过`天干`、`地支`获取流耀

  `star`.`getHoroscopeStar(heavenlyStem, earthlyBranch, scope)`

  |参数|类型|是否必填|默认值|说明|
  |--|--|--|--|--|
  |heavenlyStem|`HeavenlyStemName`|`true`| - |天干|
  |earthlyBranch|`EarthlyBranchName`|`true`| - |地支|
  |scope|`'decadal'` \| `'yearly'`|`true`| - |限定是大限还是流年的流耀，其中大限流耀会在星耀前面加上`运`，流年流耀会在星耀前面加上`流`，`年解`比较特殊，只会出现在流年的流耀里|

  返回值：[`Star[][]`](./type-definition.html#star)

## ☕ 总结

如果您觉得本程序对您有用的话，可以给我带杯咖啡吗？👍 [Paypal Me](https://PayPal.Me/sylarlong)

以上数据可以生成如下星盘，其中`palaces`数据用于填充12宫，其他数据用于填充中宫。图片中流耀的显示和实际上有偏差，那是因为图片是古早以前的一个版本生成的，请以实际返回数据为准。

![demo](https://github.com/SylarLong/astro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## 📜 版权

MIT License

Copyright &copy; 2023 Sylar Long

请合理使用本开源代码，禁止用于非法目的。

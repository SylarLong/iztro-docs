---
title: 'iztro 開發文檔'
description: 'iztro入門文檔，快速上手使用iztro獲取紫微鬥數排盤數據。'
---

<div align="center">

<h1 class="brand-name text-clip">IZTRO</h1>

壹套輕量級獲取紫微鬥數排盤信息的 Javascript 開源庫。

</div>

## 前言

歡迎使用 `iztro` 開發文檔！本頁將向妳介紹如何集成、如何獲取數據、以及如何快速得到紫微鬥數裏壹張星盤上的所有數據。如果妳隻是基礎使用者，閱讀完本篇文檔將足夠妳日常使用。
如果妳已經掌握了本頁內容，可以到其他頁面進行更深入的探索。如果妳對紫微鬥數感興趣，但是有沒有相關基礎，可以點擊 [紫微鬥數基礎](/learn/basis.md) 進行掃盲學習。

::: info 妳將獲取到以下信息：

- 如何將 `iztro` 安裝和集成到妳的代碼裏
- 如何獲取到壹張星盤
- 如何基於星盤開始分析宮位
- 如何基於宮位開始分析星耀
  :::

## 安裝

妳可以使用任意壹種妳熟悉的包管理工具進行安裝

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

安裝順利的話，會在妳的`package.json`依賴列表中找到`iztro`

```json
"dependencies": {
  "iztro": "^1.1.0"
}
```

> 版本號可能會有所不同

## 開始使用

### 引入代碼

妳可以根據下列方式將`iztro`引入妳的代碼

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";
```

== CommonJS

```js
var iztro = require("iztro");
```

:::

### 獲取星盤數據

在獲取紫微鬥數星盤的時候，可以根據`農歷`或者`陽歷`日期來獲取，`iztro`提供了這兩種獲取方式，妳可以根據妳的需求使用，但我們更推薦妳使用`陽歷`的方式來使用。
放心，陽歷和農歷在程序內部獲取到的數據是統壹的。

::: info 使用 `陽歷` 有如下便利性：

- 可以很方便的在出生證上查到
- 可以使用日歷組件進行日期選擇
- 現在很多人都無法記住農歷日期
- 可以避免因為忽略了閏月而帶來的壹係列問題
  :::

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// 通過陽歷獲取星盤信息
const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女");

// 通過農歷獲取星盤信息
const astrolabe = astro.astrolabeByLunarDate("2000-7-17", 2, "女");
```

== CommonJS

```js
var { astro } = require("iztro");

// 通過陽歷獲取星盤信息
var astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女");

// 通過農歷獲取星盤信息
var astrolabe = astro.astrolabeByLunarDate("2000-7-17", 2, "女", false);
```

:::

妳會發現以上`astrolabeBySolarDate`和`astrolabeByLunarDate`的返回值是壹樣的，
這是因為`astrolabeByLunarDate`方法在內部處理的時候，也是將日期轉化為`陽歷`以後調用`astrolabeBySolarDate`方法。
以下是執行結果，因為結果比較長，所以將之折疊起來，如果妳想要查看妳調用結果是否和這個壹樣，可以展開查看：

::: details `astro.astrolabeBySolarDate()` 和 `astro.astrolabeByLunarDate()` 方法執行結果

```ts
{
  // 陽歷日期
  solarDate: '2000-8-16',
   // 農歷日期
  lunarDate: '二〇〇〇年七月十七',
  // 四柱
  chineseDate: '庚辰 甲申 丙午 庚寅',
  // 時辰
  time: '寅時',
  // 時辰對應的時間段
  timeRange: '03:00~05:00',
  // 星座
  sign: '獅子座',
  // 生肖
  zodiac: '龍',
  // 命宮地支
  earthlyBranchOfSoulPalace: '午',
  // 身宮地支
  earthlyBranchOfBodyPalace: '戌',
  // 命主
  soul: '破軍',
  // 身主
  body: '文昌',
  // 五行局
  fiveElementsClass: '木三局',
  // 十二宮數據
  palaces: [
    {
      // 宮名
      name: '財帛',
      // 是否身宮
      isBodyPalace: false,
      // 是否來因宮
      isOriginalPalace: false,
      // 宮位天幹
      heavenlyStem: '戊',
      // 宮位地支
      earthlyBranch: '寅',
      // 主星（含天馬祿存）
      majorStars: [
        { name: '武曲', type: 'major', scope: 'origin', brightness: '得' },
        { name: '天相', type: 'major', scope: 'origin', brightness: '廟' },
        { name: '天馬', type: 'tianma', scope: 'origin', brightness: '' },
      ],
      // 輔星（含六吉六煞）
      minorStars: [],
      // 雜耀
      adjectiveStars: [
        { name: '月解', type: 'helper', scope: 'origin' },
        { name: '三臺', type: 'adjective', scope: 'origin' },
        { name: '天壽', type: 'adjective', scope: 'origin' },
        { name: '天巫', type: 'adjective', scope: 'origin' },
        { name: '天廚', type: 'adjective', scope: 'origin' },
        { name: '陰煞', type: 'adjective', scope: 'origin' },
        { name: '天哭', type: 'adjective', scope: 'origin' },
      ],
      // 長生12神
      changsheng12: '絕',
      // 博士12神
      boshi12: '蜚廉',
      // 流年將前12神
      jiangqian12: '歲驛',
      // 流年歲前12神
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
        { name: '太陽', type: 'major', scope: 'origin', brightness: '廟' },
        { name: '天梁', type: 'major', scope: 'origin', brightness: '廟' },
      ],
      minorStars: [],
      adjectiveStars: [{ name: '天刑', type: 'adjective', scope: 'origin' }],
      changsheng12: '墓',
      boshi12: '奏書',
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
      majorStars: [{ name: '七殺', type: 'major', scope: 'origin', brightness: '廟' }],
      minorStars: [
        { name: '右弼', type: 'soft', scope: 'origin', brightness: '' },
        { name: '火星', type: 'tough', scope: 'origin', brightness: '陷' },
      ],
      adjectiveStars: [
        { name: '封誥', type: 'adjective', scope: 'origin' },
        { name: '華蓋', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '死',
      boshi12: '將軍',
      jiangqian12: '華蓋',
      suiqian12: '歲建',
      stage: { range: [24, 33], heavenlyStem: '庚' },
      ages: [7, 19, 31, 43, 55, 67, 79],
    },
    {
      name: '兄弟',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '辛',
      earthlyBranch: '巳',
      majorStars: [{ name: '天機', type: 'major', scope: 'origin', brightness: '平' }],
      minorStars: [],
      adjectiveStars: [
        { name: '天喜', type: 'flower', scope: 'origin' },
        { name: '天空', type: 'adjective', scope: 'origin' },
        { name: '孤辰', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '病',
      boshi12: '小耗',
      jiangqian12: '劫煞',
      suiqian12: '晦氣',
      stage: { range: [14, 23], heavenlyStem: '辛' },
      ages: [6, 18, 30, 42, 54, 66, 78],
    },
    {
      name: '命宮',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '壬',
      earthlyBranch: '午',
      majorStars: [{ name: '紫微', type: 'major', scope: 'origin', brightness: '廟' }],
      minorStars: [{ name: '文曲', type: 'soft', scope: 'origin', brightness: '陷' }],
      adjectiveStars: [
        { name: '年解', type: 'helper', scope: 'origin' },
        { name: '鳳閣', type: 'adjective', scope: 'origin' },
        { name: '天福', type: 'adjective', scope: 'origin' },
        { name: '截路', type: 'adjective', scope: 'origin' },
        { name: '蜚廉', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '衰',
      boshi12: '青龍',
      jiangqian12: '災煞',
      suiqian12: '喪門',
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
        { name: '天鉞', type: 'soft', scope: 'origin', brightness: '' },
        { name: '陀羅', type: 'tough', scope: 'origin', brightness: '廟' },
      ],
      adjectiveStars: [
        { name: '天姚', type: 'flower', scope: 'origin' },
        { name: '空亡', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '帝旺',
      boshi12: '力士',
      jiangqian12: '天煞',
      suiqian12: '貫索',
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
        { name: '破軍', type: 'major', scope: 'origin', brightness: '得' },
        { name: '祿存', type: 'lucun', scope: 'origin', brightness: '' },
      ],
      minorStars: [{ name: '文昌', type: 'soft', scope: 'origin', brightness: '得' }],
      adjectiveStars: [
        { name: '龍池', type: 'adjective', scope: 'origin' },
        { name: '臺輔', type: 'adjective', scope: 'origin' },
        { name: '旬空', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '臨官',
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
        { name: '鹹池', type: 'flower', scope: 'origin' },
        { name: '天貴', type: 'adjective', scope: 'origin' },
        { name: '月德', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '冠帶',
      boshi12: '官府',
      jiangqian12: '鹹池',
      suiqian12: '小耗',
      stage: { range: [94, 103], heavenlyStem: '乙' },
      ages: [2, 14, 26, 38, 50, 62, 74],
    },
    {
      name: '官祿',
      isBodyPalace: true,
      isOriginalPalace: false,
      heavenlyStem: '丙',
      earthlyBranch: '戌',
      majorStars: [
        { name: '廉貞', type: 'major', scope: 'origin', brightness: '利' },
        { name: '天府', type: 'major', scope: 'origin', brightness: '廟' },
      ],
      minorStars: [{ name: '左輔', type: 'soft', scope: 'origin', brightness: '' }],
      adjectiveStars: [
        { name: '天才', type: 'adjective', scope: 'origin' },
        { name: '天虛', type: 'adjective', scope: 'origin' },
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
      majorStars: [{ name: '太陰', type: 'major', scope: 'origin', brightness: '廟' }],
      minorStars: [],
      adjectiveStars: [
        { name: '紅鸞', type: 'flower', scope: 'origin' },
        { name: '恩光', type: 'adjective', scope: 'origin' },
        { name: '天官', type: 'adjective', scope: 'origin' },
        { name: '天月', type: 'adjective', scope: 'origin' },
        { name: '天傷', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '長生',
      boshi12: '大耗',
      jiangqian12: '亡神',
      suiqian12: '龍德',
      stage: { range: [74, 83], heavenlyStem: '丁' },
      ages: [12, 24, 36, 48, 60, 72, 84],
    },
    {
      name: '遷移',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '戊',
      earthlyBranch: '子',
      majorStars: [{ name: '貪狼', type: 'major', scope: 'origin', brightness: '旺' }],
      minorStars: [{ name: '鈴星', type: 'tough', scope: 'origin', brightness: '陷' }],
      adjectiveStars: [{ name: ' 八座', type: 'adjective', scope: 'origin' }],
      changsheng12: '養',
      boshi12: '病符',
      jiangqian12: '將星',
      suiqian12: '白虎',
      stage: { range: [64, 73], heavenlyStem: '戊' },
      ages: [11, 23, 35, 47, 59, 71, 83],
    },
    {
      name: '疾厄',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '己',
      earthlyBranch: '醜',
      majorStars: [
        { name: '天同', type: 'major', scope: 'origin', brightness: '不' },
        { name: '巨門', type: 'major', scope: 'origin', brightness: '不' },
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

### 方法定義

- 通過陽歷日期獲取星盤信息

  `astro`.`astrolabeBySolarDate(solarDateStr, timeIndex, gender, fixLeap, language)`

  - 參數

    | 參數         | 類型       | 是否必填 | 默認值  | 說明                                                                              |
    | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
    | solarDateStr | `string`   | `true`   | -       | 陽歷日期【YYYY-M-D】                                                              |
    | timeIndex    | `number`   | `true`   | -       | 出生時辰序號【0~12】，對應從早子時（0）壹直到晚子時（12）的序號                   |
    | gender       | `string`   | `true`   | -       | 性別【男/女】                                                                     |
    | fixLeap      | `boolean`  | `false`  | `true`  | 是否調整閏月，為`true`閏月的前半個月算上個月，後半個月算下個月                    |
    | language     | `Language` | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

  - 返回值

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

- 通過農歷日期獲取星盤信息

  `astro`.`astrolabeByLunarDate(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language)`

  - 參數

    | 參數         | 類型       | 是否必填 | 默認值  | 說明                                                                              |
    | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
    | lunarDateStr | `string`   | `true`   | -       | 農歷日期【YYYY-M-D】，例如`2000年七月十七`則傳入`2000-7-17`                       |
    | timeIndex    | `number`   | `true`   | -       | 出生時辰序號【0~12】，對應從早子時（0）壹直到晚子時（12）的序號                   |
    | gender       | `string`   | `true`   | -       | 性別【男/女】                                                                     |
    | isLeapMonth  | `boolean`  | `false`  | `false` | 是否閏月，當實際月份沒有閏月時該參數不生效                                        |
    | fixLeap      | `boolean`  | `false`  | `true`  | 是否調整閏月，為`true`閏月的前半個月算上個月，後半個月算下個月                    |
    | language     | `Language` | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

  - 返回值

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

## 獲取運限

紫微鬥數的運限分為 `大限`、`流年`、`流月`、`流日`、`流時`、`流分`、`流秒`，由於 `流分`、`流秒` 使用場景不多，所以我們暫時不提供。
`大限`、`流年`、`流月`、`流日`、`流時` 已經能滿足絕大部分需求和使用場景了，使用 `iztro` 能夠很輕松的獲取到這些數據。

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// 通過陽歷獲取星盤信息
const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女");

// 獲取運限數據
astrolabe.horoscope(new Date());
```

== CommonJS

```js
var { astro } = require("iztro");

// 通過陽歷獲取星盤信息
var astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女");

// 獲取運限數據
astrolabe.horoscope(new Date());
```

:::

調用 `astrolabe`.`horoscope()` 方法以後妳會獲得如下數據

::: details `horoscope()` 方法返回數據

```ts
{
  solarDate: "2023-8-28"
  lunarDate: "二〇二三年七月十三"
  decadal: {
    index: 2
    heavenlyStem: "庚"
    earthlyBranch: "辰"
    palaceNames: ["夫妻", "兄弟", "命宮", "父母", "福德", "田宅", "官祿", "仆役", "遷移", "疾厄", "財帛", "子女"]
    mutagen: ["太陽", "武曲", "太陰", "天同"]
    stars: [{name: "運馬", type: "tianma", scope: "decadal"}], …]
    age: {
      index: 10
      nominalAge: 23
    }
  },
  yearly: {
    index: 1
    heavenlyStem: "癸"
    earthlyBranch: "卯"
    palaceNames: ["兄弟", "命宮", "父母", "福德", "田宅", "官祿", "仆役", "遷移", "疾厄", "財帛", "子女", "夫妻"]
    mutagen: ["破軍", "巨門", "太陰", "貪狼"]
    stars: [[], [{name: "流魁", type: "soft", scope: "yearly"}, …], [], …]
  },
  monthly: {
  index: 3
    heavenlyStem: "庚"
    earthlyBranch: "申"
    palaceNames: ["子女", "夫妻", "兄弟", "命宮", "父母", "福德", "田宅", "官祿", "仆役", "遷移", "疾厄", "財帛"]
    mutagen: ["太陽", "武曲", "太陰", "天同"]
  },
  daily: {
    index: 3
    heavenlyStem: "戊"
    earthlyBranch: "午"
    palaceNames: ["子女", "夫妻", "兄弟", "命宮", "父母", "福德", "田宅", "官祿", "仆役", "遷移", "疾厄", "財帛"]
    mutagen: ["貪狼", "太陰", "右弼", "天機"]
  },
  hourly: {
    index: 3
    heavenlyStem: "壬"
    earthlyBranch: "子"
    palaceNames: ["子女", "夫妻", "兄弟", "命宮", "父母", "福德", "田宅", "官祿", "仆役", "遷移", "疾厄", "財帛"]
    mutagen: ["天梁", "紫微", "左輔", "武曲"]
  }
}
```

:::

> Tips: 隻有 `大限` 和 `流年` 有流耀。上面的運限數據和妳調用的會因為傳入的時間參數不同而不同，但是結構上是壹致的。

### 方法定義

- 獲取當前星盤的運限信息

  `astrolabe`.`horoscope(date, timeIndex)`

  - 參數

    | 參數      | 類型               | 是否必填 | 默認值       | 說明                                                                                    |
    | --------- | ------------------ | -------- | ------------ | --------------------------------------------------------------------------------------- |
    | date      | `string` \| `Date` | `false`  | `new Date()` | 陽歷日期字符串或日期對象，若時間字符串或日期對象中包含了小時的信息，`timeIndex`可以省略 |
    | timeIndex | `number`           | `false`  | `0`          | 時辰序號，若不傳該參數則會嘗試從`date`裏獲取小時信息轉化為時辰序號                      |

  - 返回值

    [`Horoscope`](./type-definition.html#horoscope)

## 獲取流耀

上面的`horoscope()`方法內已經包含了`大限`和`流年`的流耀，所以壹般情況下無需在單獨調用獲取流耀的方法，但也有例外的情況需要自行獲取流耀，那就需要調用下列方法自行獲取。

:::tabs
== ES6 Module

```ts
import { star } from "iztro";

// 通過天幹地支獲取流耀
const horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

== CommonJS

```js
var { star } = require("iztro");

// 通過天幹地支獲取流耀
var horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

:::

調用 `star`.`getHoroscopeStar()` 方法以後妳會獲得如下數據

::: details `getHoroscopeStar()` 方法返回數據

```ts
[
  [{ name: "運馬", type: "tianma", scope: "decadal" }],
  [{ name: "運曲", type: "soft", scope: "decadal" }],
  [],
  [{ name: "運喜", type: "flower", scope: "decadal" }],
  [],
  [
    { name: "運鉞", type: "soft", scope: "decadal" },
    { name: "運陀", type: "tough", scope: "decadal" },
  ],
  [{ name: "運祿", type: "lucun", scope: "decadal" }],
  [{ name: "運羊", type: "tough", scope: "decadal" }],
  [],
  [
    { name: "運昌", type: "soft", scope: "decadal" },
    { name: "運鸞", type: "flower", scope: "decadal" },
  ],
  [],
  [{ name: "運魁", type: "soft", scope: "decadal" }],
];
```

:::

### 方法定義

- 通過 `天幹`、`地支` 獲取流耀

  `star`.`getHoroscopeStar(heavenlyStem, earthlyBranch, scope)`

  - 參數

    | 參數          | 類型                      | 是否必填 | 默認值 | 說明                                                                                                                             |
    | ------------- | ------------------------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
    | heavenlyStem  | `HeavenlyStemName`        | `true`   | -      | 天幹                                                                                                                             |
    | earthlyBranch | `EarthlyBranchName`       | `true`   | -      | 地支                                                                                                                             |
    | scope         | `'decadal'` \| `'yearly'` | `true`   | -      | 限定是大限還是流年的流耀，其中大限流耀會在星耀前面加上`運`，流年流耀會在星耀前面加上`流`，`年解`比較特殊，隻會出現在流年的流耀裏 |

  - 返回值

    [`Star[][]`](./type-definition.html#star)

## ☕ 總結

如果您覺得本程序對您有用的話，可以給我帶杯咖啡嗎？👍 [Paypal Me](https://PayPal.Me/sylarlong)

以上數據可以生成如下星盤，其中 `palaces` 數據用於填充 12 宮，其他數據用於填充中宮。圖片中流耀的顯示和實際上有偏差，那是因為圖片是古早以前的壹個版本生成的，請以實際返回數據為準。

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## 📜 版權

MIT License

Copyright &copy; 2023 Sylar Long

請合理使用本開源代碼，禁止用於非法目的。

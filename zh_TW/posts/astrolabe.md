---
outline: deep
description: "iztro紫微鬥數星盤介紹，iztro的astro對象使用方法以及示例代碼。"
---

# 星盤

## 前言

紫微鬥數星盤又叫紫微鬥數命盤，是由 `十二個宮位` 和壹個 `中宮` 構成，宮位的 `地支` 是固定的，並且是由 `寅` 開始，而不是由 `子` 開始。這是因為農歷的正月是寅月，這就是所謂的 `正月建寅`。在 `iztro` 裏面，`寅宮` 的索引是 `0`，`卯宮` 的索引是 `1`，如此按照順時針的方向排列。如下面表格所示：

<table class="astrolabe">
    <tr>
        <td>巳 <code>3</code></td>
        <td>午 <code>4</code></td>
        <td>未 <code>5</code></td>
        <td>申 <code>6</code></td>
    </tr>
    <tr>
        <td>辰 <code>2</code></td>
        <td class="center-palace" rowspan="2" colspan="2">中宮</td>
        <td>酉 <code>7</code></td>
    </tr>
    <tr>
        <td>卯 <code>1</code></td>
        <td>戌 <code>8</code></td>
    </tr>
    <tr>
        <td>寅 <code>0</code></td>
        <td>丑 <code>11</code></td>
        <td>子 <code>10</code></td>
        <td>亥 <code>9</code></td>
    </tr>
</table>

`中宮` 通常可以用來展示任何妳想展示的信息，壹般不會對整個星盤產生影響。周圍的 `十二宮` 用於存放星曜，四化，運限，宮位名稱等信息。關於 `宮位` 的詳細信息，可以進入 [紫微鬥數宮位](./palace.md) 查看詳細介紹，本頁面主要關註星盤的信息。紫微鬥數星盤是由宮位和星曜組成的，如果妳還沒有建立起它們的概念，我們強烈推薦妳進入 [紫微鬥數基礎](/learn/basis.md) 開始學習有趣的紫微鬥數知識。

在安裝好 `iztro` 依賴以後妳可以用如下代碼將 `星盤(astro)` 對象引入妳的代碼。如果妳還不知道如何安裝 `iztro`，請點擊 [傳送門](/quick-start.md#安裝) 跳轉到相關說明文檔。

## `astro` 的靜態方法

要使用該對象的靜態方法，請先將該對象 `import` 到妳的代碼裏

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";
```

== CommonJS

```js
var { astro } = require("iztro");
```

:::

---

### astrolabeBySolarDate

- 用途

  通過陽歷獲取星盤信息

- 定義

  ```ts
  export type astrolabeBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    fixLeap: boolean = true,
    language: Language = "zh-CN"
  ) => FunctionalAstrolabe;
  ```

- 參數

  | 參數         | 類型                                         | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 陽歷日期【YYYY-M-D】                                                              |
  | timeIndex    | `number`                                     | `true`   | -       | 出生時辰序號【0~12】，對應從早子時（0）壹直到晚子時（12）的序號                   |
  | gender       | [`GenderName`](/type-definition.md#gendername)| `true`   | -       | 性別【男/女】                                                                     |
  | fixLeap      | `boolean`                                    | `false`  | `true`  | 是否調整閏月，為`true`閏月的前半個月算上個月，後半個月算下個月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 返回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 示例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
  ```

- 示例返回值

  ::: details 返回值

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
        // 宮位天干
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
        earthlyBranch: '丑',
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

---

### astrolabeByLunarDate

- 用途

  通過農歷日期獲取星盤信息。我們強烈建議妳優先使用 `astrolabeBySolarDate` 方法，因為該方法也是將農歷日期轉化為陽歷以後調用 `astrolabeBySolarDate` 獲得結果的。

- 定義

  ```ts
  export type astrolabeByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language
  ) => FunctionalAstrolabe;
  ```

- 參數

  | 參數         | 類型       | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | lunarDateStr | `string`   | `true`   | -       | 農歷日期【YYYY-M-D】，例如 `2000年七月十七` 則傳入 `2000-7-17`                    |
  | timeIndex    | `number`   | `true`   | -       | 出生時辰序號【0~12】，對應從早子時（0）壹直到晚子時（12）的序號                   |
  | gender       | [`GenderName`](/type-definition.md#gendername)   | `true`   | -       | 性別【男/女】                                                                     |
  | isLeapMonth  | `boolean`  | `false`  | `false` | 是否閏月，當實際月份沒有閏月時該參數不生效                                        |
  | fixLeap      | `boolean`  | `false`  | `true`  | 是否調整閏月，為`true`閏月的前半個月算上個月，後半個月算下個月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 返回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 示例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", false, true, "zh-CN");
  ```

- 示例返回值

  參考 [astrolabeBySolarDate](./astrolabe.md#astrolabebysolardate) 的示例返回值

---

### getMajorStarBySolarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通過陽歷獲取命宮主星

- 定義

  ```ts
  type getMajorStarBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    fixLeap: boolean = true,
    language?: Language,
  ) => string;
  ```

- 參數

  | 參數         | 類型                                         | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 陽歷日期【YYYY-M-D】                                                              |
  | timeIndex    | `number`                                     | `true`   | -       | 出生時辰序號【0~12】，對應從早子時（0）壹直到晚子時（12）的序號                   |
  | fixLeap      | `boolean`                                    | `false`  | `true`  | 是否調整閏月，為`true`閏月的前半個月算上個月，後半個月算下個月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarBySolarDate('2023-4-7', 0);
  ```

- 示例返回值

  ```ts
  貪狼
  ```


---

### getMajorStarByLunarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通過農歷獲取命宮主星

- 定義

  ```ts
  type getMajorStarByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language,
  ) =>
  ```

- 參數

  | 參數         | 類型       | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | lunarDateStr | `string`   | `true`   | -       | 農歷日期【YYYY-M-D】，例如 `2000年七月十七` 則傳入 `2000-7-17`                    |
  | timeIndex    | `number`   | `true`   | -       | 出生時辰序號【0~12】，對應從早子時（0）壹直到晚子時（12）的序號                   |
  | isLeapMonth  | `boolean`  | `false`  | `false` | 是否閏月，當實際月份沒有閏月時該參數不生效                                        |
  | fixLeap      | `boolean`  | `false`  | `true`  | 是否調整閏月，為`true`閏月的前半個月算上個月，後半個月算下個月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarByLunarDate('2023-2-17', 0, true, false);
  ```

- 示例返回值

  ```ts
  紫微,貪狼
  ```

---

### getSignBySolarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通過陽歷獲取星座

- 定義

  ```ts
  type getSignBySolarDate = (
    solarDateStr: string, 
    language?: Language
  ) => string;
  ```

- 參數

  | 參數         | 類型                                         | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 陽歷日期【YYYY-M-D】                                                              |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getSignBySolarDate('2023-9-5');
  ```

- 示例返回值

  ```ts
  處女座
  ```

---

### getSignByLunarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通過農歷獲取星座

- 定義

  ```ts
  type getSignByLunarDate = (
    lunarDateStr: string, 
    isLeapMonth?: boolean, 
    language?: Language
  ) => string;
  ``` 

- 參數

  | 參數         | 類型       | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | lunarDateStr | `string`   | `true`   | -       | 農歷日期【YYYY-M-D】，例如 `2000年七月十七` 則傳入 `2000-7-17`                    |
  | isLeapMonth  | `boolean`  | `false`  | `false` | 是否閏月，當實際月份沒有閏月時該參數不生效                                        |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getSignByLunarDate('2023-7-21');
  ```

- 示例返回值

  ```ts
  處女座
  ```
---

### getZodiacBySolarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通過公歷獲取十二生肖

- 定義

  ```ts
  type getZodiacBySolarDate = (solarDateStr: string, language?: Language) => string;
  ```

- 參數

  | 參數         | 類型                                         | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 陽歷日期【YYYY-M-D】                                                              |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacBySolarDate('2023-2-20');
  ```

- 示例返回值

  ```ts
  兔
  ```

---

### getZodiacByLunarYear <Badge type="warning" text="^1.2.1" />

- 用途

  通過農歷年份獲取十二生肖

- 定義

  ```ts
  type getZodiacByLunarYear = (year: number, language?: Language) => string;
  ```

- 參數

  | 參數         | 類型                                         | 是否必填 | 默認值  | 說明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | year | `number`                                     | `true`   | -       | 農歷年份                                                             |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回數據將被國際化為指定語言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |
  
- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacByLunarYear(2023);
  ```

- 示例返回值

  ```ts
  兔
  ```

---

## 功能類定義

::: warning 開發建議
我們推薦妳直接調用 [astro 的靜態方法](./astrolabe.md#astro-的靜態方法) 來獲取數據，而不是手動去創建壹個 `FunctionalAstrolabe` 類的實例。
:::

### FunctionalAstrolabe

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

該類所有屬性都是繼承自 [Astrolabe](../type-definition.md#astrolabe)，然後在接口內定義了壹些方法用於對星盤的分析。[`astrolabeBySolarDate()`](./astrolabe.md#astrolabebysolardate) 和 [`astrolabeByLunarDate()`](./astrolabe.md#astrolabeByLunarDate) 方法會返回壹個該類的實例。

- 接口定義

  ```ts
  interface IFunctionalAstrolabe extends Astrolabe {
    horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;
    palace: (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;
    surroundedPalaces: (indexOrName: number | PalaceName) => SurroundedPalaces;
    isSurrounded: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    isSurroundedOneOf: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    notSurrounded: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    hasMutagenInSurroundedPalace: (
      indexOrName: number | PalaceName, 
      mutagen: Mutagen
    ) => boolean;
    hasMutagenInOppositePalace: (
      indexOrName: number | PalaceName,
      mutagen: Mutagen
    ) => boolean;
  }
  ```

- 屬性

  參考 [Astrolabe](../type-definition.md#astrolabe)

- 方法

  ### horoscope() <Badge type="warning" text="^0.2.0" />

  - 用途

    獲取運限數據。如果隻是想獲取調用時的運限數據，可以不傳任何參數，該方法會獲取係統當前時間進行計算。

    :::warning 註意

    - 當 `date` 為 `YYYY-M-D` 格式的字符串而沒有傳 `timeIndex` 參數時，會取 `date` 當日 `早子時` 的時間點作為 `流時` 的時間
    - 當 `date` 為 `YYYY-M-D HH` 格式時間或是壹個 `Date` 實例而沒有傳 `timeIndex` 參數時，會將 `date` 裏的小時轉化為時辰作為 `流時` 的時間
    - 當傳入 `timeIndex` 參數時，會優先使用該參數
      :::

  - 定義

    ```ts
    type horoscope = (date?: string | Date, timeIndex?: number) => Horoscope;
    ```

  - 參數

    | 參數      | 類型               | 是否必填 | 默認值       | 說明                 |
    | --------- | ------------------ | -------- | ------------ | -------------------- |
    | date      | `string` \| `Date` | `false`  | `new Date()` | 陽歷日期【YYYY-M-D】 |
    | timeIndex | `number`           | `false`  | `0`          | 時辰索引【0~12】     |

  - 返回值

    [`Horoscope`](../type-definition.md#horoscope)

  - 示例

    :::tabs
    == 不傳參數

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope();
    ```

    == 傳入 date 字符串

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate(
      "2000-8-16",
      2,
      "女",
      true,
      "zh-CN"
    );
    const horoscope = astrolabe.horoscope("2023-8-31");
    ```

    == 傳入 Date 對象

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392));
    ```

    == 傳入 date 和 timeIndex

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392), 3);
    ```

    :::

  ***

  ### star() <Badge type="warning" text="^1.2.0" />

  - 用途

    通過星曜名稱獲取到當前星曜的對象實例

  - 定義

    ```ts
    type star = (starName: StarName) => IFunctionalStar;
    ```

  - 參數

    | 參數        | 類型                                                         | 是否必填 | 默認值 | 說明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | starName | [`StarName`](../type-definition.md#starname) | `true`   | -      | 星曜名稱 |

  - 返回值

    [`FunctionalStar`](./star.md#functionalstar)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 獲取 `紫微星` 所在宮位
    const star = astrolabe.star("紫微");
    ```

  ***
  ### palace() <Badge type="warning" text="^1.0.0" />

  - 用途

    獲取星盤的指定 `宮位`

  - 定義

    ```ts
    type palace = (
      indexOrName: number | PalaceName
    ) => IFunctionalPalace | undefined;
    ```

  - 參數

    | 參數        | 類型                                                         | 是否必填 | 默認值 | 說明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位索引或者宮位名稱 |

  - 返回值

    [`FunctionalPalace`](./palace.md#functionalpalace)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 獲取 `寅宮`
    const palace = astrolabe.palace(0);

    // 獲取 `命宮`
    const soulPalace = astrolabe.palace("命宮");
    ```

  ***

  ### surroundedPalaces() <Badge type="warning" text="^1.1.0" />

  - 用途

    獲取 `三方四正` 宮位，所謂三方四正就是傳入的 `目標宮`，以及其 `對宮`，`財帛位` 和 `官祿位`，總共四個宮位。`宮` 和 `位` 是兩個概念，如果妳對宮位和三方四正的概念不清楚，可以點擊 [宮位](./palace.md) 查看詳細信息。

  - 定義

    ```ts
    type surroundedPalaces = (
      indexOrName: number | PalaceName
    ) => IFunctionalSurpalaces;
    ```

  - 參數

    | 參數        | 類型                                                         | 是否必填 | 默認值 | 說明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位索引或者宮位名稱 |

  - 返回值

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 獲取 `寅宮` 三方四正
    const surroundedPalaces = astrolabe.surroundedPalaces(0);

    // 獲取 `命宮` 三方四正
    const surroundedPalacesOfSoul = astrolabe.surroundedPalaces("命宮");
    ```

  ***

  ### isSurrounded() <Badge type="warning" text="^1.0.0" /> <Badge type="danger" text="deprecated" />

  :::danger 註意
  該方法已經在 `v1.2.0` 廢棄，請使用 [FunctionalSurpalaces](palace.md#functionalsurpalaces) 的 [have()](palace.md#have) 方法代替
  :::

  - 用途

    判斷某壹個宮位 `三方四正` 是否包含目標 `星曜`，必須要**全部**包含才會返回 `true`

  - 定義

    ```ts
    type isSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 參數

    | 參數        | 類型                                                         | 是否必填 | 默認值 | 說明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位索引或者宮位名稱 |
    | stars       | [`StarName[]`](../type-definition.md#starname)               | `true`   | -      | 星曜名稱數組         |

  - 返回值

    `boolean`

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判斷 `寅宮` 三方四正是否含有 `天府` 星、`紅鸞` 星和 `祿存` 星
    const palace = astrolabe.isSurrounded(0, ["天府", "紅鸞", "祿存"]);

    // 判斷 `命宮` 三方四正是否含有 `天府` 星、`紅鸞` 星和 `祿存` 星
    const soulPalace = astrolabe.isSurrounded("命宮", ["天府", "紅鸞", "祿存"]);
    ```

  ***

  ### isSurroundedOneOf() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" />

  :::danger 註意
  該方法已經在 `v1.2.0` 廢棄，請使用 [FunctionalSurpalaces](palace.md#functionalsurpalaces) 的 [haveOneOf()](palace.md#haveoneof) 方法代替
  :::

  - 用途

    判斷指定宮位 `三方四正` 內是否有傳入星曜的 `其中壹個`，隻要命中 `壹個` 就會返回 `true`

  - 定義

    ```ts
    type isSurroundedOneOf = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 參數

    | 參數        | 類型                                                         | 是否必填 | 默認值 | 說明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位索引或者宮位名稱 |
    | stars       | [`StarName[]`](../type-definition.md#starname)               | `true`   | -      | 星曜名稱數組         |

  - 返回值

    `boolean`

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判斷 `寅宮` 三方四正是否含有 `天府` 星、`紅鸞` 星和 `祿存` 星中的壹顆
    const palace = astrolabe.isSurroundedOneOf(0, ["天府", "紅鸞", "祿存"]);

    // 判斷 `命宮` 三方四正是否含有 `天府` 星、`紅鸞` 星和 `祿存` 星中的壹顆
    const soulPalace = astrolabe.isSurroundedOneOf("命宮", ["天府", "紅鸞", "祿存"]);
    ```

  ***

  ### notSurrounded() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" />
 
  :::danger 註意
  該方法已經在 `v1.2.0` 廢棄，請使用 [FunctionalSurpalaces](palace.md#functionalsurpalaces) 的 [notHave()](palace.md#nothave-1) 方法代替
  :::

  - 用途

    判斷指定宮位 `三方四正` 是否 `不含` 目標星曜，必須要全部都 `不在` 三方四正內含才會返回 `true`

  - 定義

    ```ts
    type notSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 參數

    | 參數        | 類型                                                         | 是否必填 | 默認值 | 說明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位索引或者宮位名稱 |
    | stars       | [`StarName[]`](../type-definition.md#starname)               | `true`   | -      | 星曜名稱數組         |

  - 返回值

    `boolean`

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判斷 `寅宮` 三方四正是否不含有 `天府` 星、`紅鸞` 星和 `祿存` 星
    const palace = astrolabe.notSurrounded(0, ["天府", "紅鸞", "祿存"]);

    // 判斷 `命宮` 三方四正是否不含有 `天府` 星、`紅鸞` 星和 `祿存` 星
    const soulPalace = astrolabe.notSurrounded("命宮", ["天府", "紅鸞", "祿存"]);
    ```

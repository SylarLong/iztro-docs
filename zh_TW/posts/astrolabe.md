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

---

### withOptions <Badge type="warning" text="^2.4.1" />

- 用途

  獲取星盤資訊。其實它內部實作是呼叫了 `bySolar` 和 `byLunar` 方法，只是為了方便大家呼叫加了一個殼。

- 定義

  ```ts
  type Option = {
    type: 'solar' | 'lunar';
    dateStr: string;
    timeIndex: number;
    gender: GenderName;
    isLeapMonth?: boolean;
    fixLeap?: boolean;
    language?: Language;
    config?: Config;
    astroType?: AstroType;
  };

  export type withOptions = (
    option: Option
  ) => FunctionalAstrolabe;
  ```

- 參數

  | 參數 | 類型 | 是否必填 | 預設值 | 說明 |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | type | `solar` \| `lunar` | `false` | `solar` | 日期類型
  | dateStr | `string` | `true` | - | 出生日期，格式為 YYYY-M-D
  | timeIndex | `number` | `true` | - | 出生時辰序號【0~12】，對應從早子時（0）一直到晚子時（12）的序號 | |
  | gender | [`GenderName`](/type-definition.md#gendername) | `true` | - | 性別【男/女】 |
  | isLeapMonth | `boolean` | `false` | `false` | 是否閏月，當實際月份沒有閏月時該參數不生效 |
  | fixLeap | `boolean` | `false` | `true` | 是否調整閏月，為`true`閏月的前半個月算上個月，後半個月算下個月 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 傳回資料將會國際化為指定語言。目前支援 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |
  | config | [`Config`](../type-definition.md#config) | `false` | - | 自訂亮度、四化以及時間分割點配置 |
  | astroType <Badge type="warning" text="^2.5.0" /> | [`AstroType`](../type-definition.md#astrotype) | `false` | `heaven` | 星盤類型；僅在 `config.algorithm` 為 `zhongzhou` 時用於選擇天盤、地盤或人盤 |

- 傳回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 示例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.withOptions({
    type: 'solar',
    dateStr: '1999-12-29',
    timeIndex: 2,
    gender: 'female',
    isLeapMonth: false,
    fixLeap: true,
    language: 'zh-CN',
    config: { algorithm: 'zhongzhou' },
    astroType: 'earth'
  })
  ```

  :::tip 提示
  `astroType` 可取 `heaven`、`earth` 或 `human`。預設的 `heaven` 為天盤；`earth` 以身宮為命宮，`human` 以福德宮為命宮。詳見 [`AstroType`](../type-definition.md#astrotype)。
  :::

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
    toJSON: () => Astrolabe;
    use(plugin: Plugin): void;
    horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;
    decadalList: () => DecadalHoroscope[];
    yearlyList: (indexOrName: number | PalaceName) => YearlyHoroscope[];
    monthlyList: (year: number, fixLeap?: boolean) => MonthlyHoroscope[];
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

  ### toJSON() <Badge type="warning" text="^2.6.0" />

  - 用途

    將功能星盤轉換為普通 JSON 對象。返回結果不包含分析方法、插件函數和運行時引用；循環引用會被安全忽略。

  - 定義

    ```ts
    type toJSON = () => Astrolabe;
    ```

  - 參數

    無

  - 返回值

    [`Astrolabe`](../type-definition.md#astrolabe)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.toJSON();
    ```

  ***

  ### use() <Badge type="warning" text="^2.3.0" />

  - 用途

    為目前星盤實例套用一個插件。與 [`astro.loadPlugin()`](./config-n-plugin.md#插件) 不同，`use()` 只影響目前實例。

  - 定義

    ```ts
    type use = (plugin: Plugin) => void;
    ```

  - 參數

    | 參數 | 類型 | 是否必填 | 預設值 | 說明 |
    | --- | --- | --- | --- | --- |
    | plugin | [`Plugin`](../type-definition.md#plugin) | `true` | - | 要套用到目前星盤的插件函數 |

  - 傳回值

    `void`

  - 示例

    ```ts
    import { astro, FunctionalAstrolabe } from "iztro";

    interface IAstrolabe extends FunctionalAstrolabe {
      soulPalaceName: () => string;
    }

    function soulPalacePlugin(this: IAstrolabe) {
      this.soulPalaceName = () => this.palace("命宮")?.name ?? "";
    }

    const astrolabe = astro.bySolar<IAstrolabe>("2000-8-16", 2, "女");
    astrolabe.use(soulPalacePlugin);
    const name = astrolabe.soulPalaceName();
    ```

  ***

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

  ### decadalList() <Badge type="warning" text="^2.6.0" />

  - 用途

    獲取按起運先後排列的大限列表。數組索引 `0` 表示第一個大限。每一項包含大限所在宮位、起止虛歲、起止年份、干支、四化、流耀和大限十二宮。

  - 定義

    ```ts
    type decadalList = () => DecadalHoroscope[];
    ```

  - 返回值

    [`DecadalHoroscope[]`](../type-definition.md#decadalhoroscope)

  - 示例

    ```ts
    const decadals = astrolabe.decadalList();
    const firstDecadal = decadals[0];
    ```

  ***

  ### yearlyList() <Badge type="warning" text="^2.6.0" />

  - 用途

    根據大限序號或本命宮位名稱，獲取該大限內的流年列表。每一項包含虛歲、年份、流年干支、四化、流耀和流年十二宮。

  - 定義

    ```ts
    type yearlyList = (
      indexOrName: number | PalaceName
    ) => YearlyHoroscope[];
    ```

  - 參數

    | 參數 | 類型 | 是否必填 | 預設值 | 說明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 大限序號（`0` 為第一個大限）或本命宮位名稱 |

  - 返回值

    [`YearlyHoroscope[]`](../type-definition.md#yearlyhoroscope)

  - 示例

    ```ts
    const firstDecadalYearlies = astrolabe.yearlyList(0);
    const soulPalaceYearlies = astrolabe.yearlyList("命宮");
    ```

  ***

  ### monthlyList() <Badge type="warning" text="^2.6.0" />

  - 用途

    獲取指定年份的流月列表。每一項包含虛歲、年份、月份、流月干支、四化、流耀和流月十二宮。

    閏月規則：無閏月時返回 12 項；有閏月且 `fixLeap=false` 時返回 13 項；有閏月且 `fixLeap=true` 時將閏月按初一至十五、十六至月底拆分，返回 14 項。

  - 定義

    ```ts
    type monthlyList = (
      year: number,
      fixLeap?: boolean
    ) => MonthlyHoroscope[];
    ```

  - 參數

    | 參數 | 類型 | 是否必填 | 預設值 | 說明 |
    | --- | --- | --- | --- | --- |
    | year | `number` | `true` | - | 流年年份，可直接使用 `yearlyList()` 返回項的 `year` |
    | fixLeap | `boolean` | `false` | `true` | 是否將閏月前後半月分開計算 |

  - 返回值

    [`MonthlyHoroscope[]`](../type-definition.md#monthlyhoroscope)

  - 示例

    ```ts
    const year = astrolabe.yearlyList(0)[0].year;
    const adjusted = astrolabe.monthlyList(year);
    const unadjusted = astrolabe.monthlyList(year, false);
    ```

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

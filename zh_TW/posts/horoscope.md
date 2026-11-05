---
title: "iztro horoscope API：運限查詢與分析"
description: "使用 iztro 的 horoscope API 查詢大限、小限、流年、流月、流日和流時，取得運限宮位、流曜與四化，並查看方法範例。"
outline: deep
---

# 運限

<Badge type="warning" text="^2.6.2" /> 運限查詢使用所屬星盤產生時保存的配置和語言。修改全局預設值或建立另一張星盤不會改變既有星盤的查詢結果。`horoscope()` 接受有效的 `Date` 物件或日期字串，省略日期時使用呼叫時的當前時間。明確傳入的時辰必須為 0～12 的整數，非法日期和時辰會拋出錯誤。

## 前言

紫微斗數的運限分為 `大限`、`小限`、`流年`、`流月`、`流日`、`流時`、`流分`、`流秒` 等等，如果你還不知道運限的概念或不知道能為你做什麼，請閱讀 [紫微斗數運限](/zh_TW/learn/horoscope.md)。在 `iztro` 中，僅提供 `大限`、`小限`、`流年`、`流月`、`流日`、`流時`。其中，`大限`、`流年`、`流月`、`流日` 和 `流時` 都會提供 `流曜` 與 `四化`；`流月`、`流日`、`流時` 的流曜從 `v2.4.4` 起提供。`小限` 比較特殊，它沒有獨立的流曜，`小限` 的四化是以該宮位的 `宮干` 來起四化的。

:::tip 提示
運限的年、月干支分界由星盤產生時保存的配置項 [`horoscopeDivide`](./config-n-plugin.md#配置) 控制；`ageDivide` 控制虛歲計算，影響大限與小限。
:::

### 虛歲與宮位索引 {#虚岁与宫位索引}

預設的 `ageDivide: 'normal'` 使用傳統虛歲：出生記為一歲，每逢農曆正月初一加一歲。計算公式為「查詢日期的農曆年 − 出生日期的農曆年 + 1」，並非公曆實歲；`horoscopeDivide` 不改變這個虛歲公式。

`ageDivide: 'birthday'` 使用另一種分界規則：比較農曆月、日，查詢日在農曆生日當天或之前時取農曆年差，生日之後才再加一。這不是公曆實歲的計算方法。

例如，公曆 `1980-02-14` 出生對應農曆 `1979-12-28`，查詢公曆 `1990-02-14` 對應農曆 `1990-01-19`，傳統虛歲為 `1990 - 1979 + 1 = 12`：

```ts
import { astro } from 'iztro';

astro.resetConfig();
astro.config({
  yearDivide: 'normal',
  horoscopeDivide: 'normal',
  ageDivide: 'normal',
  language: 'en-US',
});

const chart = astro.bySolar('1980-02-14', 0, 'male', true);
const horoscope = chart.horoscope('1990-02-14', 0);
console.log(horoscope.age.nominalAge); // 12
console.log(horoscope.decadal.index); // 10
console.log(horoscope.decadal.palaceNames[0]); // 'spirit'
```

此盤為水二局，首個大限為 2–11 虛歲，第二個大限為 12–21 虛歲，因此已進入第二個大限。`decadal.index` 是目前大限所在的本命宮位索引；`decadal.palaceNames[i]` 則是固定索引 `i` 上的運限宮名，不能把 `palaceNames[0]` 當成目前大限所在的本命宮名。本例第二個大限位於本命兄弟宮，固定第 0 宮的運限宮名為 `spirit`（福德），新版結果符合傳統虛歲規則。

`v2.4.3` 在此例計算為 11 歲並回傳 `parents`。目前版本若選擇 `ageDivide: 'birthday'`，此例也會得到 11 歲和 `parents`；此選項包含後續版本的年齡修正，並不是保證所有結果與 `v2.4.3` 一致的相容開關。


## 功能類定義

:::warning 開發建議

因為運限是基於星盤而存在的，所以我們並不推薦你手動 `new` 一個運限對象，而是使用星盤實例的方法返回的對象使用。星盤的 [`horoscope()`](./astrolabe.md#horoscope) 方法將會返回運限對象。

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
const horoscope = astrolabe.horoscope('2023-10-26', 2);
```

上述代碼執行以後將返回一個 `FunctionalHoroscope` 的實例。

### FunctionalHoroscope

***

<Badge type="tip" text="implements" /> `IFunctionalHoroscope` <Badge type="tip" text="extends" /> [`Horoscope`](../type-definition.md#horoscope)

該類所有屬性都是繼承自 [Horoscope](../type-definition.md#horoscope)，然後在接口內定義了一些方法用於對星曜進行分析。

- 接口定義

  ```ts
  interface IFunctionalHoroscope extends Horoscope {
    toJSON: () => Horoscope;
    agePalace: () => FunctionalPalace | undefined;
    palace: (palaceName: PalaceName, scope: Scope) => FunctionalPalace | undefined;
    surroundPalaces: (palaceName: PalaceName, scope: Scope) => FunctionalSurpalaces | undefined;
    hasHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    notHaveHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscope: StarName[]) => boolean;
    hasOneOfHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    hasHoroscopeMutagen: (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
  }
  ```

  <Badge type="warning" text="^2.6.1" /> `palaceName` 支援任一已配置語言的宮位名稱，不要求與星盤的輸出語言一致。例如，中文星盤也可以傳入英文宮位名 `"soul"`。

- 屬性

  參考 [Horoscope](../type-definition.md#horoscope)

- 方法

  ### toJSON() <Badge type="warning" text="^2.6.0" />

  - 用途

    將功能運限轉換為普通 JSON 對象。返回結果不包含分析方法和關聯星盤等運行時引用；循環引用會被安全忽略。

  - 定義

    ```ts
    type toJSON = () => Horoscope;
    ```

  - 參數

    無

  - 返回值

    [`Horoscope`](../type-definition.md#horoscope)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.horoscope("2023-8-19").toJSON();
    ```

  ***
  
  ### agePalace() <Badge type="warning" text="v1.3.0" />

  - 用途

    獲取 `小限` 所在宮位

  - 定義

    ```ts
    type agePalace: () => FunctionalPalace | undefined;
    ```

  - 參數

    無

  - 返回值

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const agePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .agePalace();
    ```

  ***

  ### palace() <Badge type="warning" text="v1.3.0" />

  - 用途

    獲取指定運限宮位

  - 定義

    ```ts
    type palace = (
      palaceName: PalaceName, 
      scope: Scope
    ) => FunctionalPalace | undefined;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位名稱 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 運限名稱 |

  - 返回值

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - 示例

    如果你想獲取 `大限` 的 `夫妻宮`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const spousePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .palace("夫妻", "decadal");
    ```

  ***

  ### surroundPalaces() <Badge type="warning" text="^1.3.0" />

  - 用途

    獲取運限指定宮位的三方四正宮位

  - 定義

    ```ts
    type surroundPalaces = (
      palaceName: PalaceName, 
      scope: Scope
    ) => FunctionalSurpalaces | undefined;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位名稱 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 運限名稱 |

  - 返回值

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces) | `undefined`

  - 示例

    如果你想獲取 `流年夫妻宮` 的三方四正宮位 

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const surpalaces = astrolabe
      .horoscope('2023-10-26', 2)
      .surroundPalaces("夫妻", "yearly");
    ```

  ***

  ### hasHoroscopeStars() <Badge type="warning" text="^1.3.0" />

  - 用途

    判斷在指定運限的宮位內是否包含流曜，需要全部**包含**才返回true

  - 定義

    ```ts
    type hasHoroscopeStars = (
      palaceName: PalaceName, 
      scope: Scope, 
      horoscopeStar: StarName[]
    ) => boolean;
    ```

  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位名稱 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 運限名稱 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流曜數組 |

  - 返回值

    `boolean`

  - 示例

    如果你想獲取 `流年夫妻宮` 內是否有 `流喜` 和 `流曲`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

  ***

  ### notHaveHoroscopeStars() <Badge type="warning" text="^1.3.2" />

  - 用途

    判斷指定運限宮位內是否不含流曜，需要全部**不包含**才返回true

  - 定義

    ```ts
    type notHaveHoroscopeStars = (
      palaceName: PalaceName, 
      scope: Scope, 
      horoscope: StarName[]
    ) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位名稱 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 運限名稱 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流曜數組 |

  - 返回值

    `boolean`

  - 示例

    如果你想獲取 `流年夫妻宮` 內是否沒有 `流喜` 和 `流曲`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .notHaveHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasOneOfHoroscopeStars() <Badge type="warning" text="^1.3.3" />

  - 用途

    判斷指定運限宮位內是否含有指定流曜，只要包含**其中一顆**就返回true

  - 定義

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位名稱 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 運限名稱 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流曜數組 |

  - 返回值

    `boolean`

  - 示例

    如果你想獲取 `流年夫妻宮` 內是否有 `流喜` 或 `流曲`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasOneOfHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasHoroscopeMutagen() <Badge type="warning" text="^1.3.4" />

  - 用途

    判斷指定運限宮位內是否存在運限四化

  - 定義

    ```ts
    type hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位名稱 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 運限名稱 |
    | horoscopeMutagen | [`Mutagen`](../type-definition.md#mutagen) | `true`   | -      | 四化 |

  - 返回值

    `boolean`

  - 示例

    如果你想獲取 `流年夫妻宮` 內是否有 `化祿`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeMutagen("夫妻", "yearly", "祿");
    ```

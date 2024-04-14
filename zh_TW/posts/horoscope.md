---
outline: deep
description: "紫微研習社，iztro官方文檔，iztro開發文檔，iztro紫微鬥數運限介紹，iztro的horoscope對象使用方法以及示例代碼。"
---

# 運限

## 前言

紫微鬥數的運限分為 `大限`、`小限`、`流年`、`流月`、`流日`、`流時`、`流分`、`流秒` 等等，如果你還不知道運限的概念或不知道能為你做什麽，請閱讀 [紫微鬥數運限](/learn/horoscope.md)。在 `iztro` 中，僅提供 `大限`、`小限`、`流年`、`流月`、`流日`、`流時`。其中，`大限` 和 `流年` 有 `流耀` 和 `四化` 存在，而其他運限只有 `四化`。`小限` 比較特殊，它既沒有流耀，也不產生四化，`小限` 的四化是以該宮位的 `宮幹` 來起四化的。


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
    agePalace: () => FunctionalPalace | undefined;
    palace: (palaceName: PalaceName, scope: Scope) => FunctionalPalace | undefined;
    surroundPalaces: (palaceName: PalaceName, scope: Scope) => FunctionalSurpalaces | undefined;
    hasHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    notHaveHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscope: StarName[]) => boolean;
    hasOneOfHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    hasHoroscopeMutagen: (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
  }
  ```

- 屬性

  參考 [Horoscope](../type-definition.md#horoscope)

- 方法
  
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

    判斷在指定運限的宮位內是否包含流耀，需要全部**包含**才返回true

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
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流耀數組 |

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

    判斷指定運限宮位內是否不含流耀，需要全部**不包含**才返回true

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
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流耀數組 |

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

    判斷指定運限宮位內是否含有指定流耀，只要包含**其中一顆**就返回true

  - 定義

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宮位名稱 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 運限名稱 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流耀數組 |

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

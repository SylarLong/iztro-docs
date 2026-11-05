---
title: "iztro horoscope API: time-cycle queries"
outline: deep
description: "Query time cycles in a Zi Wei Dou Shu chart with iztro’s horoscope API, with properties, methods, and examples."
---

# Horoscope periods（運限）   {#运限}

<Badge type="warning" text="^2.6.2" /> Fortune-period queries use the configuration and language saved when their chart was generated. Changing global defaults or creating another chart does not affect queries on an existing chart. `horoscope()` accepts a valid `Date` object or date string; when omitted, the date defaults to the current time at the call. An explicit time index must be an integer from 0 to 12. Invalid dates or time indices throw errors.

## Introduction   {#前言}

Fortune periods（運限） in Zi Wei Dou Shu（紫微斗數） include `decadal`（大限）, `age`（小限）, `yearly`（流年）, `monthly`（流月）, `daily`（流日）, `hourly`（流時）, `minute-level cycle`（流分）, `second-level cycle`（流秒）, and other cycles. For the concepts and their uses, see [fortune periods（運限）](/en_US/learn/horoscope.md). `iztro` supports `decadal`（大限）, `age`（小限）, `yearly`（流年）, `monthly`（流月）, `daily`（流日）, and `hourly`（流時）. Of these, `decadal`（大限）, `yearly`（流年）, `monthly`（流月）, `daily`（流日）, and `hourly`（流時） provide `transit stars`（流曜） and `four transformations`（四化）. Transit stars for `monthly`（流月）, `daily`（流日）, and `hourly`（流時） have been available since `v2.4.4`. `age`（小限） has no independent transit stars; the transformations of `age`（小限） are calculated from its `palace stem`（宮干）.

:::tip Tips
Year and month boundaries for fortune-period stem-and-branch calculations follow the chart’s saved [`horoscopeDivide`](./config-n-plugin.md#配置) configuration. `ageDivide` controls nominal age and affects both decadal（大限） and annual age periods（小限）.
:::

### Nominal age and palace indices {#虚岁与宫位索引}

The default `ageDivide: 'normal'` uses traditional nominal age（虛歲）: a person is one at birth and gains a year at each Lunar New Year. The formula is “target lunar year − birth lunar year + 1”, rather than elapsed Gregorian years. `horoscopeDivide` does not change this age formula.

`ageDivide: 'birthday'` uses a different boundary: it compares lunar months and days, returning the lunar-year difference on or before the lunar birthday and adding one only after that birthday. This is also different from Western chronological age.

For example, a Gregorian birth date of `1980-02-14` is lunar `1979-12-28`, while the target Gregorian date `1990-02-14` is lunar `1990-01-19`. Traditional nominal age is `1990 - 1979 + 1 = 12`:

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

This is a water 2nd（水二局） chart. Its first decadal period（大限） covers nominal ages 2–11 and the second covers 12–21, so the second period has begun. `decadal.index` identifies the natal palace occupied by the active period. `decadal.palaceNames[i]` is the fortune-period palace name at the fixed index `i`; `palaceNames[0]` is not the name of the natal palace occupied by the active period. Here, the second period occupies the natal siblings palace（兄弟）, and the fortune-period name at index 0 is `spirit`（福德）. The newer result follows traditional nominal age correctly.

`v2.4.3` calculated age 11 and returned `parents` in this example. Choosing `ageDivide: 'birthday'` in the current version also produces age 11 and `parents` here. This option includes later age-calculation fixes; it is not a compatibility switch guaranteeing every `v2.4.3` result.


## Classes and analysis methods {#功能类定义}

:::warning Development suggestions

Fortune periods（運限） depend on a chart, so obtain their object from a chart instance instead of constructing one with `new`. The chart’s [`horoscope()`](./astrolabe.md#horoscope) method returns that object.

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
const horoscope = astrolabe.horoscope('2023-10-26', 2);
```

After the above code is executed, an instance of `FunctionalHoroscope` will be returned.

### FunctionalHoroscope {#functionalhoroscope}

***

<Badge type="tip" text="implements" /> `IFunctionalHoroscope` <Badge type="tip" text="extends" /> [`Horoscope`](../type-definition.md#horoscope)

This class inherits all its properties from [Horoscope](../type-definition.md#horoscope), and its interface adds methods for analyzing stars in fortune periods.

- Interface definition

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

  <Badge type="warning" text="^2.6.1" /> `palaceName` accepts palace names in any configured language, regardless of the chart’s output language. For example, a chart output in Chinese can accept the English palace name `"soul"`.

- Properties

  Reference [Horoscope](../type-definition.md#horoscope)

- Methods

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Purpose

    Converts the functional fortune-period object to a plain JSON object. Analysis methods and runtime references to its chart are excluded; circular references are safely ignored.

  - Definition

    ```ts
    type toJSON = () => Horoscope;
    ```

  - Parameters

    None

  - Return value

    [`Horoscope`](../type-definition.md#horoscope)

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.horoscope("2023-8-19").toJSON();
    ```

  ***

  ### agePalace() <Badge type="warning" text="v1.3.0" /> {#agepalace}

  - Purpose

    Retrieves the palace occupied by `age`（小限）.

  - Definition

    ```ts
    type agePalace: () => FunctionalPalace | undefined;
    ```

  - Parameters

    None

  - Return value

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const agePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .agePalace();
    ```

  ***

  ### palace() <Badge type="warning" text="v1.3.0" /> {#palace}

  - Purpose

    Retrieves the requested palace for the selected fortune period（運限）.

  - Definition

    ```ts
    type palace = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalPalace | undefined;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Horoscope-period name（運限名稱） |

  - Return value

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - Example

    For `decadal`（大限）, retrieve the `spouse`（夫妻） palace.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const spousePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .palace("夫妻", "decadal");
    ```

  ***

  ### surroundPalaces() <Badge type="warning" text="^1.3.0" /> {#surroundpalaces}

  - Purpose

    Retrieves the selected fortune-period palace, its two trine palaces, and its opposite palace（三方四正）.

  - Definition

    ```ts
    type surroundPalaces = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalSurpalaces | undefined;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Horoscope-period name（運限名稱） |

  - Return value

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces) | `undefined`

  - Example

    Retrieves `annual spouse palace`（流年夫妻宮） together with its two trine palaces and its opposite palace（三方四正）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const surpalaces = astrolabe
      .horoscope('2023-10-26', 2)
      .surroundPalaces("夫妻", "yearly");
    ```

  ***

  ### hasHoroscopeStars() <Badge type="warning" text="^1.3.0" /> {#hashoroscopestars}

  - Purpose

    Checks transit stars（流曜） in the specified horoscope-period palace. Returns true only if **all specified stars are present**.

  - Definition

    ```ts
    type hasHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscopeStar: StarName[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Horoscope-period name（運限名稱） |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | Array of transit stars（流曜） |

  - Return value

    `boolean`

  - Example

    Checks whether `annual spouse palace`（流年夫妻宮） contains both `cheerful(Y)`（流喜） and `artist(Y)`（流曲）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

  ***

  ### notHaveHoroscopeStars() <Badge type="warning" text="^1.3.2" /> {#nothavehoroscopestars}

  - Purpose

    Returns true only if **none of the specified transit stars（流曜） is present** in that horoscope-period palace.

  - Definition

    ```ts
    type notHaveHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscope: StarName[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Horoscope-period name（運限名稱） |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | Array of transit stars（流曜） |

  - Return value

    `boolean`

  - Example

    Checks whether `annual spouse palace`（流年夫妻宮） contains neither `cheerful(Y)`（流喜） nor `artist(Y)`（流曲）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .notHaveHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasOneOfHoroscopeStars() <Badge type="warning" text="^1.3.3" /> {#hasoneofhoroscopestars}

  - Purpose

    Checks the specified horoscope-period palace and returns true if **at least one specified transit star（流曜） is present**.

  - Definition

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Horoscope-period name（運限名稱） |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | Array of transit stars（流曜） |

  - Return value

    `boolean`

  - Example

    Checks whether `annual spouse palace`（流年夫妻宮） contains at least one of `cheerful(Y)`（流喜） and `artist(Y)`（流曲）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasOneOfHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasHoroscopeMutagen() <Badge type="warning" text="^1.3.4" /> {#hashoroscopemutagen}

  - Purpose

    Checks whether the specified transformation（四化） for the selected fortune period（運限） occurs in the requested palace.

  - Definition

    ```ts
    type hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Horoscope-period name（運限名稱） |
    | horoscopeMutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | four transformations（四化） |

  - Return value

    `boolean`

  - Example

    Checks whether `annual spouse palace`（流年夫妻宮） contains `A`（化祿）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeMutagen("夫妻", "yearly", "禄");
    ```

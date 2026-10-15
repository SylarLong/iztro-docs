---
outline: deep
description: "Create and query Zi Wei Dou Shu charts with iztro: the astro API, chart properties, methods, and examples."
---

# Chart（星盤）   {#星盘}

## Introduction   {#前言}

A Zi Wei Dou Shu（紫微斗數） chart, also called a natal chart（命盤）, consists of `twelve palaces` and a `central palace`. Each palace’s `Earthly Branch`（地支） is fixed. The sequence begins with `yin`（寅）, rather than `zi`（子）, because the first lunar month corresponds to Yin（寅）—the convention called `the first lunar month corresponds to yin`（正月建寅）. In `iztro`, `yin palace`（寅宮） has index `0`, `mao palace`（卯宮） has index `1`, and the remaining positions continue clockwise, as shown below:

<table class="astrolabe">
    <tr>
        <td>si（巳）<code>3</code></td>
        <td>woo（午）<code>4</code></td>
        <td>wei（未）<code>5</code></td>
        <td>shen（申）<code>6</code></td>
    </tr>
    <tr>
        <td>chen（辰）<code>2</code></td>
        <td class="center-palace" rowspan="2" colspan="2">central palace</td>
        <td>you（酉）<code>7</code></td>
    </tr>
    <tr>
        <td>mao（卯）<code>1</code></td>
        <td>xu（戌）<code>8</code></td>
    </tr>
    <tr>
        <td>yin（寅）<code>0</code></td>
        <td>chou（丑）<code>11</code></td>
        <td>zi（子）<code>10</code></td>
        <td>hai（亥）<code>9</code></td>
    </tr>
</table>

The `central palace` can display whatever information you choose and generally does not affect the chart’s interpretation. The surrounding `twelve palaces`（十二宮） hold stars（星曜）, the four transformations（四化）, fortune periods（運限）, palace names, and other data. See [palaces](./palace.md) for more on `palaces`（宮位）; this page focuses on the chart. A chart consists of palaces and stars. If these concepts are new to you, start with [the basics](/en_US/learn/basis.md).

After installing `iztro`, use the following code to import the `astrolabe (astro)` object. For `iztro` installation instructions, see [Install iztro](/en_US/quick-start.md#安装).

## `astro` static methods   {#astro-的静态方法}

Use `import` to bring the object into your code before calling its static methods.

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

### Chart configuration and input validation <Badge type="warning" text="^2.6.2" /> {#排盘配置与输入校验}

Charts returned by `bySolar`, `byLunar`, and `withOptions` retain the configuration and language used at creation. Changing global defaults or creating charts in other languages does not change an existing chart’s fortune-period（運限） or four-transformation（四化） analysis.

In `withOptions`, `type` is optional and defaults to the solar calendar; `config` overrides settings for that chart only. Chart-generation and date-helper methods default `language` to `zh-CN` when omitted, and choosing a language does not affect other calls. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ja-JP`, `ko-KR`, and `vi-VN`.

The year must be from 1 to 9999, and the date must exist in the solar or lunar calendar. Date strings accept hyphens, slashes, or dots as separators and may include ` HH:mm` or ` HH:mm:ss`. Historical solar dates follow the underlying calendar’s Julian/Gregorian transition rules. Time indices must be integers from 0 to 12. Unknown gender, language, date type, or chart type, and non-boolean leap-month options, throw errors. Lunar dates are validated against the actual month length; `isLeapMonth: true` is ignored for a month with no leap counterpart.

See [Configuration and plugins](./config-n-plugin.md) for configuration scope, the independent copy returned by `getConfig()`, and `resetConfig()`.

### astrolabeBySolarDate <Badge type="danger" text="deprecated" /> {#astrolabebysolardate}

This method was deprecated in `v2.0.5`. Use [`bySolar`](#bysolar) instead; parameters and return values are unchanged.

### bySolar <Badge type="warning" text="^2.0.5" /> {#bysolar}

- Purpose

  Generates a chart from a solar-calendar date.

- Definition

  ```ts
  export type bySolar = (
    solarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    fixLeap: boolean = true,
    language: Language = "zh-CN"
  ) => FunctionalAstrolabe;
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Gregorian date【YYYY-M-D】 |
  | timeIndex | `number` | `true` | - | Birth-hour index [0–12], from early Zi hour (0) to late Zi hour (12) |
  | gender | [`GenderName`](/en_US/type-definition.md#gendername) | `true` | - | Gender【Male/Female】 |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months. If `true`, the first half is assigned to the preceding month and the second half to the following month. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Return value

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- Example

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
  ```

---

### astrolabeByLunarDate <Badge type="danger" text="deprecated" /> {#astrolabebylunardate}

This method was deprecated in `v2.0.5`. Use [`byLunar`](#bylunar) instead; parameters and return values are unchanged.

### byLunar <Badge type="warning" text="^2.0.5" /> {#bylunar}

- Purpose

  Generates a chart from a lunar-calendar date. The author recommends using `bySolar` directly, since this method first converts the lunar date to a solar date and then calls `bySolar` for the result.

- Definition

  ```ts
  export type byLunar = (
    lunarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language
  ) => FunctionalAstrolabe;
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Lunar date [YYYY-M-D]. For `lunar year 2000, month 7, day 17`, pass `2000-7-17`. |
  | timeIndex | `number` | `true` | - | Birth-hour index [0–12], from early Zi hour (0) to late Zi hour (12) |
  | gender | [`GenderName`](/en_US/type-definition.md#gendername) | `true` | - | Gender【Male/Female】 |
  | isLeapMonth | `boolean` | `false` | `false` | Whether the supplied lunar month is a leap month; ignored if that month has no leap counterpart. |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months. If `true`, the first half is assigned to the preceding month and the second half to the following month. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Return value

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- Example

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.byLunar("2000-8-16", 2, "女", false, true, "zh-CN");
  ```

---

### withOptions <Badge type="warning" text="^2.4.1" /> {#withoptions}

- Purpose

  Generates chart data through a convenient wrapper around `bySolar` and `byLunar`.

- Definition

  ```ts
  type Option = {
    type?: 'solar' | 'lunar';
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

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | type | `solar`  \|  `lunar` | `false` | `solar` | date type |
  | dateStr | `string` | `true` | - | Date of birth in YYYY-M-D format |
  | timeIndex | `number` | `true` | - | Birth-hour index [0–12], from early Zi hour (0) to late Zi hour (12) |
  | gender | [`GenderName`](/en_US/type-definition.md#gendername) | `true` | - | Gender【Male/Female】 |
  | isLeapMonth | `boolean` | `false` | `false` | Whether the supplied lunar month is a leap month; ignored if that month has no leap counterpart. |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months. If `true`, the first half is assigned to the preceding month and the second half to the following month. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |
  | config | [`Config`](../type-definition.md#config) | `false` | - | Overrides the brightness, four transformations and time-boundary settings only for the chart being created (^2.6.2). |
  | astroType  <Badge type="warning" text="^2.5.0" /> | [`AstroType`](../type-definition.md#astrotype) | `false` | `heaven` | Chart type. Used to select the natal, earth or human chart only when `config.algorithm` is `zhongzhou`. |

- Return value

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- Example

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

  :::tip Tips
  `astroType` accepts `heaven`, `earth`, or `human`. The default `heaven` is the Heaven Chart（天盤）. `earth` uses the body palace（身宮） as the soul palace（命宮）, while `human` uses the spirit palace（福德宮） as the soul palace. See [`AstroType`](../type-definition.md#astrotype).
  :::

---

### getMajorStarBySolarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbysolardate}

- Purpose

  Retrieves the soul palace’s（命宮） major stars from a solar-calendar date.

- Definition

  ```ts
  type getMajorStarBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    fixLeap: boolean = true,
    language?: Language,
  ) => string;
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Gregorian date【YYYY-M-D】 |
  | timeIndex | `number` | `true` | - | Birth-hour index [0–12], from early Zi hour (0) to late Zi hour (12) |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months. If `true`, the first half is assigned to the preceding month and the second half to the following month. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Example

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarBySolarDate('2023-4-7', 0);
  ```

---

### getMajorStarByLunarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbylunardate}

- Purpose

  Retrieves the soul palace’s（命宮） major stars from a lunar-calendar date.

- Definition

  ```ts
  type getMajorStarByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language,
  ) =>
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Lunar date [YYYY-M-D]. For `lunar year 2000, month 7, day 17`, pass `2000-7-17`. |
  | timeIndex | `number` | `true` | - | Birth-hour index [0–12], from early Zi hour (0) to late Zi hour (12) |
  | isLeapMonth | `boolean` | `false` | `false` | Whether the supplied lunar month is a leap month; ignored if that month has no leap counterpart. |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months. If `true`, the first half is assigned to the preceding month and the second half to the following month. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Example

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarByLunarDate('2023-2-17', 0, true, false);
  ```

---

### getSignBySolarDate <Badge type="warning" text="^1.2.1" /> {#getsignbysolardate}

- Purpose

  Retrieves the Western zodiac sign from a solar-calendar date.

- Definition

  ```ts
  type getSignBySolarDate = (
    solarDateStr: string,
    language?: Language
  ) => string;
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Gregorian date【YYYY-M-D】 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Example

  ```ts
  import { astro } from 'isztro';

  const result = getSignBySolarDate('2023-9-5');
  ```

---

### getSignByLunarDate <Badge type="warning" text="^1.2.1" /> {#getsignbylunardate}

- Purpose

  Retrieves the Western zodiac sign from a lunar-calendar date.

- Definition

  ```ts
  type getSignByLunarDate = (
    lunarDateStr: string,
    isLeapMonth?: boolean,
    language?: Language
  ) => string;
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Lunar date [YYYY-M-D]. For `lunar year 2000, month 7, day 17`, pass `2000-7-17`. |
  | isLeapMonth | `boolean` | `false` | `false` | Whether the supplied lunar month is a leap month; ignored if that month has no leap counterpart. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Example

  ```ts
  import { astro } from 'isztro';

  const result = getSignByLunarDate('2023-7-21');
  ```


---

### getZodiacBySolarDate <Badge type="warning" text="^1.2.1" /> {#getzodiacbysolardate}

- Purpose

  Retrieves the Chinese zodiac animal from a solar-calendar date.

- Definition

  ```ts
  type getZodiacBySolarDate = (solarDateStr: string, language?: Language) => string;
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Gregorian date【YYYY-M-D】 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Example

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacBySolarDate('2023-2-20');
  ```

---

### getZodiacByLunarYear <Badge type="warning" text="^1.2.1" /> {#getzodiacbylunaryear}

- Purpose

  Retrieves the Chinese zodiac animal for a lunar-calendar year.

- Definition

  ```ts
  type getZodiacByLunarYear = (year: number, language?: Language) => string;
  ```

- Parameters

  | Parameter | Type | Required? | Default value | Description |
  | --- | --- | --- | --- | --- |
  | year | `number` | `true` | - | Lunar-calendar year |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | The returned data uses the specified language. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, and `vi-VN`. |

- Example

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacByLunarYear(2023);
  ```

---

## Classes and analysis methods {#功能类定义}

::: warning Development suggestions
Use [astro’s static methods](./astrolabe.md#astro-的静态方法) to obtain data rather than constructing `FunctionalAstrolabe` manually.
:::

### FunctionalAstrolabe {#functionalastrolabe}

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

This class inherits its properties from [Astrolabe](../type-definition.md#astrolabe) and adds methods for chart analysis. [`bySolar()`](./astrolabe.md#bysolar) and [`byLunar()`](./astrolabe.md#bylunar) return instances of this class.

- Interface definition

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

- Properties

  Reference [Astrolabe](../type-definition.md#astrolabe)

- Methods

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Purpose

    Converts the functional chart to a plain JSON object. Analysis methods, plugin functions, and runtime references are excluded; circular references are safely ignored.

  - Definition

    ```ts
    type toJSON = () => Astrolabe;
    ```

  - Parameters

    None

  - Return value

    [`Astrolabe`](../type-definition.md#astrolabe)

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.toJSON();
    ```

  ***

  ### use() <Badge type="warning" text="^2.3.0" /> {#use}

  - Purpose

    Applies a plugin to the current chart instance. Unlike [`astro.loadPlugin()`](./config-n-plugin.md#插件), `use()` affects only this instance.

  - Definition

    ```ts
    type use = (plugin: Plugin) => void;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | plugin | [`Plugin`](../type-definition.md#plugin) | `true` | - | Plugin function to apply to the current chart |

  - Return value

    `void`

  - Example

    ```ts
    import { astro, FunctionalAstrolabe } from "iztro";

    interface IAstrolabe extends FunctionalAstrolabe {
      soulPalaceName: () => string;
    }

    function soulPalacePlugin(this: IAstrolabe) {
      this.soulPalaceName = () => this.palace("命宫")?.name ?? "";
    }

    const astrolabe = astro.bySolar<IAstrolabe>("2000-8-16", 2, "女");
    astrolabe.use(soulPalacePlugin);
    const name = astrolabe.soulPalaceName();
    ```

  ***

  ### horoscope() <Badge type="warning" text="^0.2.0" /> {#horoscope}

  - Purpose

    Retrieves fortune-period（運限） data. To calculate it for the current moment, omit all arguments; the method uses the system time at the call.

    :::warning Note

    - If `date` is a date-only string in `YYYY-M-D` format and `timeIndex` is omitted, the time used for `date` is `early Zi hour` on that date, for the `hourly`（流時） period.
    - If `date` contains a time in `YYYY-M-D HH` format or is a `Date` instance, and `timeIndex` is omitted, the hour in `date` is converted to a traditional time slot for the `hourly`（流時） period.
    - If supplied, `timeIndex` takes precedence over the time derived from the date.
      :::

  - Definition

    ```ts
    type horoscope = (date?: string | Date, timeIndex?: number) => FunctionalHoroscope;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | date | `string`  \|  `Date` | `false` | `new Date()` | Gregorian date【YYYY-M-D】 |
    | timeIndex | `number` | `false` | `0` | Time-slot index [0–12] |

  - Return value

    [`FunctionalHoroscope`](./horoscope.md#functionalhoroscope)

    :::danger Note
    In `v1.3.4`, the return type changed from `Horoscope` to `FunctionalHoroscope`. Existing usage remains backward compatible.
    :::

  - Example

    :::tabs
    == No parameters are passed

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope();
    ```

    == Pass in date string

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

    == Pass in Date object

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392));
    ```

    == Pass in date and timeIndex

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392), 3);
    ```

    :::

  ***

  ### decadalList() <Badge type="warning" text="^2.6.0" /> {#decadallist}

  - Purpose

    Returns decadal periods（大限） in order of onset. Array index `0` is the first period. Each entry contains the corresponding palace, starting and ending nominal ages and years, stem and branch, four transformations（四化）, transit stars（流曜）, and the period’s twelve palaces.

  - Definition

    ```ts
    type decadalList = () => DecadalHoroscope[];
    ```

  - Return value

    [`DecadalHoroscope[]`](../type-definition.md#decadalhoroscope)

  - Example

    ```ts
    const decadals = astrolabe.decadalList();
    const firstDecadal = decadals[0];
    ```

  ***

  ### yearlyList() <Badge type="warning" text="^2.6.0" /> {#yearlylist}

  - Purpose

    Returns the annual periods（流年） within a decadal period（大限）, selected by its index or natal-palace name. Each entry includes nominal age, year, annual stem and branch, four transformations（四化）, transit stars（流曜）, and the twelve annual palaces.

  - Definition

    ```ts
    type yearlyList = (
      indexOrName: number | PalaceName
    ) => YearlyHoroscope[];
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Decadal-period index (`0` is the first period), or a natal-palace name |

  - Return value

    [`YearlyHoroscope[]`](../type-definition.md#yearlyhoroscope)

  - Example

    ```ts
    const firstDecadalYearlies = astrolabe.yearlyList(0);
    const soulPalaceYearlies = astrolabe.yearlyList("命宫");
    ```

  ***

  ### monthlyList() <Badge type="warning" text="^2.6.0" /> {#monthlylist}

  - Purpose

    Returns monthly periods（流月） for the specified year. Each entry contains nominal age, year, month, monthly stem and branch, four transformations（四化）, transit stars（流曜）, and the twelve monthly palaces.

    Leap-month rules: a year without a leap month returns 12 entries. With a leap month, `fixLeap=false` returns 13 entries; `fixLeap=true` splits the leap month into days 1–15 and days 16 through month-end, returning 14 entries.

  - Definition

    ```ts
    type monthlyList = (
      year: number,
      fixLeap?: boolean
    ) => MonthlyHoroscope[];
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | year | `number` | `true` | - | Annual-period year; use the `yearlyList()` return item’s `year` field directly. |
    | fixLeap | `boolean` | `false` | `true` | Whether to calculate the first and second halves of a leap month separately |

  - Return value

    [`MonthlyHoroscope[]`](../type-definition.md#monthlyhoroscope)

  - Example

    ```ts
    const year = astrolabe.yearlyList(0)[0].year;
    const adjusted = astrolabe.monthlyList(year);
    const unadjusted = astrolabe.monthlyList(year, false);
    ```

  ***

  ### star() <Badge type="warning" text="^1.2.0" /> {#star}

  - Purpose

    Retrieves a star’s object instance by name.

  - Definition

    ```ts
    type star = (starName: StarName) => IFunctionalStar;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | starName | [`StarName`](../type-definition.md#starname) | `true` | - | Star name |

  - Return value

    [`FunctionalStar`](./star.md#functionalstar)

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `紫微星` 所在宫位
    const star = astrolabe.star("紫微");
    ```

  ***
  ### palace() <Badge type="warning" text="^1.0.0" /> {#palace}

  - Purpose

    Retrieves the requested `palace`（宮位） from the chart.

  - Definition

    ```ts
    type palace = (
      indexOrName: number | PalaceName
    ) => IFunctionalPalace | undefined;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace index or name |

  - Return value

    [`FunctionalPalace`](./palace.md#functionalpalace)

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫`
    const palace = astrolabe.palace(0);

    // 获取 `命宫`
    const soulPalace = astrolabe.palace("命宫");
    ```

  ***

  ### surroundedPalaces() <Badge type="warning" text="^1.1.0" /> {#surroundedpalaces}

  - Purpose

    Retrieves `trine and opposite palaces`（三方四正）: the supplied `target palace`, its `opposite palace`（對宮）, and its relative `wealth position`（財帛位） and `career position`（官祿位）, four palaces in total. `palace` and `position` are distinct concepts; see [palaces](./palace.md) for their meanings and the surrounding-palace relationships.

  - Definition

    ```ts
    type surroundedPalaces = (
      indexOrName: number | PalaceName
    ) => IFunctionalSurpalaces;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace index or name |

  - Return value

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces)

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫` 三方四正
    const surroundedPalaces = astrolabe.surroundedPalaces(0);

    // 获取 `命宫` 三方四正
    const surroundedPalacesOfSoul = astrolabe.surroundedPalaces("命宫");
    ```

  ***

  ### isSurrounded() <Badge type="warning" text="^1.0.0" /> <Badge type="danger" text="deprecated" /> {#issurrounded}

  :::danger Note
  This method was deprecated in `v1.2.0`. Use the [have()](palace.md#have) method of [FunctionalSurpalaces](palace.md#functionalsurpalaces) instead.
  :::

  - Purpose

    Checks the palace and its `trine and opposite palaces`（三方四正） for the requested `stars`（星曜）. It returns `true` only when **all** requested stars are present.

  - Definition

    ```ts
    type isSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace index or name |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Array of star names |

  - Return value

    `boolean`

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.isSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.isSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### isSurroundedOneOf() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" /> {#issurroundedoneof}

  :::danger Note
  This method was deprecated in `v1.2.0`. Use the [haveOneOf()](palace.md#haveoneof) method of [FunctionalSurpalaces](palace.md#functionalsurpalaces) instead.
  :::

  - Purpose

    Checks whether the palace and its `trine and opposite palaces`（三方四正） contain `any one` of the supplied stars. At least `one` is enough to return `true`.

  - Definition

    ```ts
    type isSurroundedOneOf = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace index or name |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Array of star names |

  - Return value

    `boolean`

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const palace = astrolabe.isSurroundedOneOf(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const soulPalace = astrolabe.isSurroundedOneOf("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### notSurrounded() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" /> {#notsurrounded}

  :::danger Note
  This method was deprecated in `v1.2.0`. Use the [notHave()](palace.md#nothave-1) method of [FunctionalSurpalaces](palace.md#functionalsurpalaces) instead.
  :::

  - Purpose

    Checks whether the palace and its `trine and opposite palaces`（三方四正） `do not contain` any requested stars. All requested stars must be `absent` for it to return `true`.

  - Definition

    ```ts
    type notSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace index or name |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Array of star names |

  - Return value

    `boolean`

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.notSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.notSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

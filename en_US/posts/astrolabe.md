---
outline: deep
description: "Zi Wei Academy, iztro official documentation, astrolabe API and examples."
---

# Astrolabes

## Introduction

A Zi Wei Dou Shu astrolabe (命盤) consists of twelve palaces (十二宮) surrounding a central area. In iztro, the Tiger palace (寅宮) has index `0`; the remaining palaces are arranged clockwise by Earthly Branch. The central area is normally used for information you choose to display and does not affect the chart.

After installing iztro, import `astro` to use its static methods:

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

## Static methods of `astro`

### astrolabeBySolarDate <Badge type="danger" text="deprecated" />

This method was deprecated in `v2.0.5`. Use [`bySolar`](#bysolar) instead; parameters and return value are unchanged.

### bySolar <Badge type="warning" text="^2.0.5" />

- Purpose

  Gets an astrolabe from a Gregorian date.

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

  | Parameter | Type | Required | Default | Description |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Gregorian date, `YYYY-M-D` |
  | timeIndex | `number` | `true` | - | Birth hour index, `0–12`, from early Rat hour (`0`) to late Rat hour (`12`) |
  | gender | [`GenderName`](../type-definition.md#gendername) | `true` | - | Gender: male or female |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap months; with `true`, the first half belongs to the preceding month and the second half to the following month |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Output language; supports `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, and `ja-JP` |

- Return value

  [`FunctionalAstrolabe`](#functionalastrolabe)

- Example

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.bySolar("2000-8-16", 2, "female", true, "en-US");
  ```

---

### astrolabeByLunarDate <Badge type="danger" text="deprecated" />

This method was deprecated in `v2.0.5`. Use [`byLunar`](#bylunar) instead; parameters and return value are unchanged.

### byLunar <Badge type="warning" text="^2.0.5" />

- Purpose

  Gets an astrolabe from a lunar date.

- Definition

  ```ts
  export type byLunar = (
    lunarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language: Language = "zh-CN"
  ) => FunctionalAstrolabe;
  ```

- Parameters

  | Parameter | Type | Required | Default | Description |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Lunar date, `YYYY-M-D` |
  | timeIndex | `number` | `true` | - | Birth hour index, `0–12` |
  | gender | [`GenderName`](../type-definition.md#gendername) | `true` | - | Gender: male or female |
  | isLeapMonth | `boolean` | `false` | `false` | Whether the lunar date is in a leap month |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap-month placement |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Output language |

- Return value

  [`FunctionalAstrolabe`](#functionalastrolabe)

- Example

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.byLunar("2000-7-17", 2, "female", false, true, "en-US");
  ```

---

### withOptions <Badge type="warning" text="^2.4.1" />

- Purpose

  Gets an astrolabe through an options object. Internally, it calls `bySolar` or `byLunar`.

- Definition

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

  export type withOptions = (option: Option) => FunctionalAstrolabe;
  ```

- Parameters

  | Parameter | Type | Required | Default | Description |
  | --- | --- | --- | --- | --- |
  | type | `solar` \| `lunar` | `false` | `solar` | Date type |
  | dateStr | `string` | `true` | - | Birth date, `YYYY-M-D` |
  | timeIndex | `number` | `true` | - | Birth hour index, `0–12` |
  | gender | [`GenderName`](../type-definition.md#gendername) | `true` | - | Gender |
  | isLeapMonth | `boolean` | `false` | `false` | Whether it is a leap month; applies only to lunar dates |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap-month placement |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Output language |
  | config | [`Config`](../type-definition.md#config) | `false` | - | Custom brightness, transformations, and time-boundary configuration |
  | astroType <Badge type="warning" text="^2.5.0" /> | [`AstroType`](../type-definition.md#astrotype) | `false` | `heaven` | Chart type; when `config.algorithm` is `zhongzhou`, selects Heaven, Earth, or Human Chart |

- Return value

  [`FunctionalAstrolabe`](#functionalastrolabe)

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
    language: 'en-US',
    config: { algorithm: 'zhongzhou' },
    astroType: 'earth',
  });
  ```

  :::tip
  `astroType` accepts `heaven`, `earth`, or `human`. The default `heaven` is the Heaven Chart (天盤); `earth` uses the Body Palace (身宮) as the Life Palace; `human` uses the Fortune Palace (福德宮) as the Life Palace.
  :::

---

### getMajorStarBySolarDate <Badge type="warning" text="^1.2.1" />

- Purpose

  Gets the major star(s) of the Life Palace (命宮) from a Gregorian date. If the Life Palace is empty (空宮), it returns the major stars in the opposite palace.

- Definition

  ```ts
  type getMajorStarBySolarDate = (solarDateStr: string, timeIndex: number, fixLeap?: boolean, language?: Language) => string;
  ```

- Parameters

  | Parameter | Type | Required | Default | Description |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Gregorian date, `YYYY-M-D` |
  | timeIndex | `number` | `true` | - | Birth hour index, `0–12` |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap-month placement |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Output language |

- Return value

  `string`

- Example

  ```ts
  const result = astro.getMajorStarBySolarDate('2023-2-20', 2);
  ```

---

### getMajorStarByLunarDate <Badge type="warning" text="^1.2.1" />

- Purpose

  Gets the major star(s) of the Life Palace from a lunar date.

- Definition

  ```ts
  type getMajorStarByLunarDate = (lunarDateStr: string, timeIndex: number, isLeapMonth?: boolean, fixLeap?: boolean, language?: Language) => string;
  ```

- Parameters

  | Parameter | Type | Required | Default | Description |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Lunar date, `YYYY-M-D` |
  | timeIndex | `number` | `true` | - | Birth hour index, `0–12` |
  | isLeapMonth | `boolean` | `false` | `false` | Whether it is a leap month |
  | fixLeap | `boolean` | `false` | `true` | Whether to adjust leap-month placement |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Output language |

- Return value

  `string`

- Example

  ```ts
  const result = astro.getMajorStarByLunarDate('2023-2-1', 2);
  ```

---

### getSignBySolarDate <Badge type="warning" text="^1.2.1" />

- Purpose: Gets the Western zodiac sign from a Gregorian date.
- Definition: `type getSignBySolarDate = (solarDateStr: string, language?: Language) => string;`
- Parameters: `solarDateStr` is required; `language` is optional and defaults to `zh-CN`.
- Return value: `string`
- Example: `const result = astro.getSignBySolarDate('2023-2-20');`

---

### getSignByLunarDate <Badge type="warning" text="^1.2.1" />

- Purpose: Gets the Western zodiac sign from a lunar date.
- Definition: `type getSignByLunarDate = (lunarDateStr: string, isLeapMonth?: boolean, language?: Language) => string;`
- Parameters: lunar date; optional leap-month flag; optional output language.
- Return value: `string`
- Example: `const result = astro.getSignByLunarDate('2023-2-1');`

---

### getZodiacBySolarDate <Badge type="warning" text="^1.2.1" />

- Purpose: Gets the Chinese zodiac animal from a Gregorian date.
- Definition: `type getZodiacBySolarDate = (solarDateStr: string, language?: Language) => string;`
- Parameters: `solarDateStr` is required; `language` is optional and defaults to `zh-CN`.
- Return value: `string`
- Example: `const result = astro.getZodiacBySolarDate('2023-2-20');`

---

### getZodiacByLunarYear <Badge type="warning" text="^1.2.1" />

:::warning
This legacy documentation heading is retained for parity with the Chinese page. The current public source exports `getZodiacBySolarDate`; use it for zodiac lookup.
:::

## Functional class definition

:::warning
Use [the static methods of `astro`](#static-methods-of-astro) to obtain data rather than constructing `FunctionalAstrolabe` manually.
:::

### FunctionalAstrolabe

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

All properties are inherited from `Astrolabe`; this interface adds analytical methods. `bySolar()` and `byLunar()` return instances of this class.

- Interface definition

  ```ts
  interface IFunctionalAstrolabe extends Astrolabe {
    toJSON: () => Astrolabe;
    use(plugin: Plugin): void;
    horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;
    decadalList: () => DecadalHoroscope[];
    yearlyList: (indexOrName: number | PalaceName) => YearlyHoroscope[];
    monthlyList: (year: number, fixLeap?: boolean) => MonthlyHoroscope[];
    star: (starName: StarName) => IFunctionalStar;
    palace: (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;
    surroundedPalaces: (indexOrName: number | PalaceName) => SurroundedPalaces;
    isSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
    isSurroundedOneOf: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
    notSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
  }
  ```

- Properties

  See [`Astrolabe`](../type-definition.md#astrolabe).

- Methods

  ### toJSON() <Badge type="warning" text="^2.6.0" />

  - Purpose

    Converts the functional astrolabe into a plain JSON object. Analysis methods, plugin functions, and runtime references are excluded; circular references are safely omitted.

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

    const astrolabe = astro.bySolar("2000-8-16", 2, "female");
    const data = astrolabe.toJSON();
    ```

  ***

  ### use() <Badge type="warning" text="^2.3.0" />

  - Purpose: Applies a plugin to the current astrolabe instance only.
  - Definition: `type use = (plugin: Plugin) => void;`
  - Parameters: `plugin` — [`Plugin`](../type-definition.md#plugin), required.
  - Return value: `void`

  ***

  ### horoscope() <Badge type="warning" text="^0.2.0" />

  - Purpose: Gets cycle data. With no parameters, calculates cycles for the current system time.
  - Definition: `type horoscope = (date?: string | Date, timeIndex?: number) => FunctionalHoroscope;`
  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | date | `string` \| `Date` | `false` | `new Date()` | Gregorian date |
    | timeIndex | `number` | `false` | `0` | Hour index, `0–12` |

  - Return value: [`FunctionalHoroscope`](./horoscope.md#functionalhoroscope)
  - Example: `const horoscope = astrolabe.horoscope('2023-8-31');`

  ***

  ### decadalList()

  - Purpose: Returns the decadal cycles in chronological order. Array index `0` is the first decadal cycle. Each item includes its natal palace, age and year ranges, stem and branch, mutagens, cycle stars, and palace-name layout.
  - Definition: `type decadalList = () => DecadalHoroscope[];`
  - Return value: [`DecadalHoroscope[]`](../type-definition.md#decadalhoroscope)
  - Example: `const firstDecadal = astrolabe.decadalList()[0];`

  ***

  ### yearlyList()

  - Purpose: Returns every yearly cycle in a decadal cycle selected by its ordinal index or natal palace name.
  - Definition: `type yearlyList = (indexOrName: number | PalaceName) => YearlyHoroscope[];`
  - Parameters: `indexOrName` — decadal ordinal (`0` is the first) or [`PalaceName`](../type-definition.md#palacename), required.
  - Return value: [`YearlyHoroscope[]`](../type-definition.md#yearlyhoroscope)
  - Example

    ```ts
    const firstDecadalYearlies = astrolabe.yearlyList(0);
    const lifePalaceYearlies = astrolabe.yearlyList("命宮");
    ```

  ***

  ### monthlyList()

  - Purpose: Returns the monthly cycles for a specified year. Each item includes age, year, lunar month, stem and branch, mutagens, cycle stars, and palace-name layout.
  - Definition: `type monthlyList = (year: number, fixLeap?: boolean) => MonthlyHoroscope[];`
  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | year | `number` | `true` | - | Cycle year; a `year` returned by `yearlyList()` can be used directly |
    | fixLeap | `boolean` | `false` | `true` | Whether to split a leap month into its first and second halves |

  - Return value: [`MonthlyHoroscope[]`](../type-definition.md#monthlyhoroscope)
  - Leap-month behavior: 12 items in a regular year; 13 items with a leap month when `fixLeap=false`; 14 items when `fixLeap=true`, because the leap month is split into days 1–15 and 16–month end.
  - Example

    ```ts
    const year = astrolabe.yearlyList(0)[0].year;
    const adjusted = astrolabe.monthlyList(year);
    const unadjusted = astrolabe.monthlyList(year, false);
    ```

  ***

  ### star() <Badge type="warning" text="^1.2.0" />

  - Purpose: Gets the instance for a named star.
  - Definition: `type star = (starName: StarName) => IFunctionalStar;`
  - Parameters: `starName` — [`StarName`](../type-definition.md#starname), required.
  - Return value: [`FunctionalStar`](./star.md#functionalstar)
  - Example: `const star = astrolabe.star("紫微");`

  ***

  ### palace() <Badge type="warning" text="^1.0.0" />

  - Purpose: Gets a specified palace in the astrolabe.
  - Definition: `type palace = (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;`
  - Parameters: `indexOrName` — palace index or [`PalaceName`](../type-definition.md#palacename), required.
  - Return value: [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`
  - Example

    ```ts
    const tigerPalace = astrolabe.palace(0);
    const lifePalace = astrolabe.palace("命宮");
    ```

  ***

  ### surroundedPalaces() <Badge type="warning" text="^1.1.0" />

  - Purpose: Gets the target palace, opposite palace (對宮), Wealth position (財帛位), and Career position (官祿位)—the Three Harmonies and Opposition (三方四正).
  - Definition: `type surroundedPalaces = (indexOrName: number | PalaceName) => IFunctionalSurpalaces;`
  - Parameters: `indexOrName` — palace index or [`PalaceName`](../type-definition.md#palacename), required.
  - Return value: [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces)
  - Example: `const palaces = astrolabe.surroundedPalaces("命宮");`

  ***

  ### isSurrounded() <Badge type="warning" text="^1.0.0" /> <Badge type="danger" text="deprecated" />

  This method was deprecated in `v1.2.0`. Use [`have()`](./palace.md#have) on `FunctionalSurpalaces` instead.

  ```ts
  const result = astrolabe.surroundedPalaces("命宮").have(["天府", "紅鸞", "祿存"]);
  ```

  ***

  ### isSurroundedOneOf() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" />

  This method was deprecated in `v1.2.0`. Use [`haveOneOf()`](./palace.md#haveoneof) instead.

  ***

  ### notSurrounded() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" />

  This method was deprecated in `v1.2.0`. Use [`notHave()`](./palace.md#nothave-1) instead.

---
outline: deep
description: "Zi Wei Academy, iztro official documentation, FunctionalHoroscope API and examples."
---

# Horoscopes and Cycles

## Introduction

Zi Wei Dou Shu cycles include the Major Cycle (大限), Minor Cycle (小限), Annual Cycle (流年), Monthly Cycle (流月), Daily Cycle (流日), and Hourly Cycle (流時). `iztro` provides these six. Major, annual, monthly, daily, and hourly cycles contain moving stars (流耀) and Four Transformations (四化); moving stars for monthly, daily, and hourly cycles are available from `v2.4.4`. The Minor Cycle is special: it has neither moving stars nor cycle transformations; its transformations are derived from the palace stem.

:::tip
The global `horoscopeDivide` configuration controls the year and month stem-branch boundary for cycles; `ageDivide` controls the Minor Cycle nominal-age boundary.
:::

## Functional class definition

Do not create a horoscope object manually. Use the object returned by the astrolabe instance method [`horoscope()`](./astrolabe.md#horoscope).

```ts
import { astro } from "iztro";

const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
const horoscope = astrolabe.horoscope('2023-10-26', 2);
```

The preceding code returns a `FunctionalHoroscope` instance.

### FunctionalHoroscope

***

<Badge type="tip" text="implements" /> `IFunctionalHoroscope` <Badge type="tip" text="extends" /> [`Horoscope`](../type-definition.md#horoscope)

All properties are inherited from `Horoscope`; the interface adds the following methods.

- Interface definition

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

- Properties

  See [`Horoscope`](../type-definition.md#horoscope).

- Methods

  ### agePalace() <Badge type="warning" text="v1.3.0" />

  - Purpose: Gets the palace occupied by the Minor Cycle (小限).
  - Definition

    ```ts
    type agePalace = () => FunctionalPalace | undefined;
    ```

  - Parameters: None
  - Return value: [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`
  - Example

    ```ts
    const agePalace = astrolabe.horoscope('2023-10-26', 2).agePalace();
    ```

  ***

  ### palace() <Badge type="warning" text="v1.3.0" />

  - Purpose: Gets a specified palace in a selected cycle.
  - Definition

    ```ts
    type palace = (palaceName: PalaceName, scope: Scope) => FunctionalPalace | undefined;
    ```

  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Cycle scope |

  - Return value: [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`
  - Example

    ```ts
    const spousePalace = astrolabe.horoscope('2023-10-26', 2).palace("夫妻", "decadal");
    ```

  ***

  ### surroundPalaces() <Badge type="warning" text="^1.3.0" />

  - Purpose: Gets the Three Harmonies and Opposition (三方四正) for a specified palace in a selected cycle.
  - Definition

    ```ts
    type surroundPalaces = (palaceName: PalaceName, scope: Scope) => FunctionalSurpalaces | undefined;
    ```

  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Cycle scope |

  - Return value: [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces) | `undefined`
  - Example

    ```ts
    const surpalaces = astrolabe.horoscope('2023-10-26', 2).surroundPalaces("夫妻", "yearly");
    ```

  ***

  ### hasHoroscopeStars() <Badge type="warning" text="^1.3.0" />

  - Purpose: Tests whether a cycle palace contains **all** specified moving stars.
  - Definition

    ```ts
    type hasHoroscopeStars = (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Cycle scope |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | Moving-star array |

  - Return value: `boolean`
  - Example

    ```ts
    const flag = astrolabe.horoscope('2023-10-26', 2).hasHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

  ***

  ### notHaveHoroscopeStars() <Badge type="warning" text="^1.3.2" />

  - Purpose: Tests whether a cycle palace contains **none** of the specified moving stars.
  - Definition

    ```ts
    type notHaveHoroscopeStars = (palaceName: PalaceName, scope: Scope, horoscope: StarName[]) => boolean;
    ```

  - Parameters: `palaceName`, `scope`, and `horoscope` have the same meanings as `hasHoroscopeStars()`.
  - Return value: `boolean`
  - Example

    ```ts
    const flag = astrolabe.horoscope('2023-10-26', 2).notHaveHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

  ***

  ### hasOneOfHoroscopeStars() <Badge type="warning" text="^1.3.3" />

  - Purpose: Tests whether a cycle palace contains **at least one** specified moving star.
  - Definition

    ```ts
    type hasOneOfHoroscopeStars = (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```

  - Parameters: `palaceName`, `scope`, and `horoscopeStar` have the same meanings as `hasHoroscopeStars()`.
  - Return value: `boolean`
  - Example

    ```ts
    const flag = astrolabe.horoscope('2023-10-26', 2).hasOneOfHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

  ***

  ### hasHoroscopeMutagen() <Badge type="warning" text="^1.3.4" />

  - Purpose: Tests whether a specified cycle palace contains a cycle Four Transformation.
  - Definition

    ```ts
    type hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Palace name |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Cycle scope |
    | horoscopeMutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Four Transformation |

  - Return value: `boolean`
  - Example

    ```ts
    const flag = astrolabe.horoscope('2023-10-26', 2).hasHoroscopeMutagen("夫妻", "yearly", "祿");
    ```

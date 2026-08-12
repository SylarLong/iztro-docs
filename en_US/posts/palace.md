---
outline: deep
description: "Zi Wei Academy, iztro official documentation, FunctionalPalace and FunctionalSurpalaces API."
---

# Palaces

## Introduction

Zi Wei Dou Shu has twelve Human Affairs Palaces (十二人事宮): Life (命宮), Siblings (兄弟宮), Spouse (夫妻宮), Children (子女宮), Wealth (財帛宮), Health (疾厄宮), Travel (遷移宮), Servants (僕役宮), Career (官祿宮), Property (田宅宮), Fortune (福德宮), and Parents (父母宮). There are also the Body Palace (身宮), Original-Cause Palace (來因宮), and Hidden-Combination Palace (暗合宮).

Palaces are stored from the Tiger palace (寅宮) at index `0`, clockwise by Earthly Branch.

## Functional class definition

:::warning
Because a palace exists within an astrolabe, do not construct it manually. Use an instance returned by an astrolabe calculation method.
:::

```ts
import { astro } from "iztro";

const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");

const palaceByIndex = astrolabe.palaces[1];
const palaceByMethod = astrolabe.palace(1);
const lifePalace = astrolabe.palace("命宮");
```

### FunctionalPalace

***

<Badge type="tip" text="implements" /> `IFunctionalPalace` <Badge type="tip" text="extends" /> [`Palace`](../type-definition.md#palace)

All properties are inherited from `Palace`; the interface adds analytical methods.

- Interface definition

  ```ts
  interface IFunctionalPalace extends Palace {
    has: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    hasOneOf: (stars: StarName[]) => boolean;
    hasMutagen: (mutagen: Mutagen): boolean;
    notHaveMutagen: (mutagen: Mutagen): boolean;
    isEmpty: (excludeStars?: StarName[]) => boolean;
    astrolabe: () => IFunctionalAstrolabe | undefined;
    fliesTo: (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;
    fliesOneOfTo: (to: number | PalaceName, withMutagens: Mutagen[]) => boolean;
    notFlyTo: (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;
    selfMutaged: (withMutagens: Mutagen | Mutagen[]) => boolean;
    selfMutagedOneOf: (withMutagens?: Mutagen[]) => boolean;
    notSelfMutaged: (withMutagens?: Mutagen | Mutagen[]) => boolean;
    mutagedPlaces: () => (IFunctionalPalace | undefined)[];
  }
  ```

- Properties

  See [`Palace`](../type-definition.md#palace).

- Methods

  #### has() <Badge type="warning" text="^1.0.0" />

  - Purpose: Tests whether the palace contains **all** supplied stars.
  - Definition: `type has = (stars: StarName[]) => boolean;`
  - Parameters: `stars` — [`StarName[]`](../type-definition.md#starname), required; major, auxiliary, or miscellaneous stars.
  - Return value: `boolean`
  - Example

    ```ts
    const result = astrolabe.palace("命宮")?.has(["紫微", "右弼"]);
    ```

  ***

  #### notHave() <Badge type="warning" text="^1.0.0" />

  - Purpose: Tests whether the palace contains **none** of the supplied stars.
  - Definition: `type notHave = (stars: StarName[]) => boolean;`
  - Parameters: `stars` — [`StarName[]`](../type-definition.md#starname), required.
  - Return value: `boolean`
  - Example

    ```ts
    const result = astrolabe.palace("命宮")?.notHave(["地空", "地劫"]);
    ```

  ***

  #### hasOneOf() <Badge type="warning" text="^1.0.0" />

  - Purpose: Tests whether the palace contains **any one** of the supplied stars.
  - Definition: `type hasOneOf = (stars: StarName[]) => boolean;`
  - Parameters: `stars` — [`StarName[]`](../type-definition.md#starname), required.
  - Return value: `boolean`
  - Example

    ```ts
    const result = astrolabe.palace("命宮")?.hasOneOf(["天魁", "天鉞"]);
    ```

  ***

  #### hasMutagen() <Badge type="warning" text="^1.2.0" />

  - Purpose: Tests whether the palace contains a natal Four Transformation (生年四化).
  - Definition: `type hasMutagen = (mutagen: Mutagen) => boolean;`
  - Parameters: `mutagen` — [`Mutagen`](../type-definition.md#mutagen), required; Prosperity (祿), Authority (權), Academic Distinction (科), or Obstruction (忌).
  - Return value: `boolean`
  - Example

    ```ts
    const result = astrolabe.palace("命宮")?.hasMutagen("祿");
    ```

  ***

  #### notHaveMutagen() <Badge type="warning" text="^1.2.0" />

  - Purpose: Tests whether the palace does not contain a natal Four Transformation.
  - Definition: `type notHaveMutagen = (mutagen: Mutagen) => boolean;`
  - Parameters: `mutagen` — [`Mutagen`](../type-definition.md#mutagen), required.
  - Return value: `boolean`
  - Example

    ```ts
    const result = astrolabe.palace("命宮")?.notHaveMutagen("忌");
    ```

  ***

  #### isEmpty() <Badge type="warning" text="^2.0.6" />

  - Purpose: Tests whether a palace is empty (空宮), meaning it contains no major star. Some lineages treat certain stars as making a palace non-empty; provide them through `excludeStars`.
  - Definition: `type isEmpty = (excludeStars?: StarName[]) => boolean;`
  - Parameters: `excludeStars` — [`StarName[]`](../type-definition.md#starname), optional.
  - Return value: `boolean`

  ***

  #### astrolabe() <Badge type="warning" text="^2.1.0" />

  - Purpose: Gets the astrolabe containing this palace.
  - Definition: `type astrolabe = () => IFunctionalAstrolabe | undefined;`
  - Parameters: None
  - Return value: [`IFunctionalAstrolabe`](./astrolabe.md#functionalastrolabe) | `undefined`

  ***

  #### fliesTo() <Badge type="warning" text="^2.1.0" />

  - Purpose: Tests whether **all** selected transformations from the source palace fly to the target palace.
  - Definition

    ```ts
    type fliesTo = (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;
    ```

  - Parameters: `to` — target palace index or [`PalaceName`](../type-definition.md#palacename); `withMutagens` — one or more Four Transformations.
  - Return value: `boolean`

  ***

  #### fliesOneOfTo() <Badge type="warning" text="^2.1.0" />

  - Purpose: Tests whether **any one** selected transformation from the source palace flies to the target palace.
  - Definition

    ```ts
    type fliesOneOfTo = (to: number | PalaceName, withMutagens: Mutagen[]) => boolean;
    ```

  - Parameters and return value: the same as `fliesTo()`.

  ***

  #### notFlyTo() <Badge type="warning" text="^2.1.0" />

  - Purpose: Tests whether **none** of the selected transformations from the source palace fly to the target palace.
  - Definition

    ```ts
    type notFlyTo = (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;
    ```

  - Parameters and return value: the same as `fliesTo()`.

  ***

  #### selfMutaged() <Badge type="warning" text="^2.1.0" />

  - Purpose: Tests self-transformation (自化). If an array is supplied, every transformation must match.
  - Definition: `type selfMutaged = (withMutagens: Mutagen | Mutagen[]) => boolean;`
  - Parameters: `withMutagens` — one or more Four Transformations.
  - Return value: `boolean`

  ***

  #### selfMutagedOneOf() <Badge type="warning" text="^2.1.0" />

  - Purpose: Tests self-transformation. Without an argument, tests all Four Transformations and returns `true` if any one matches.
  - Definition: `type selfMutagedOneOf = (withMutagens?: Mutagen[]) => boolean;`
  - Parameters: `withMutagens` — optional Four Transformation array.
  - Return value: `boolean`

  ***

  #### notSelfMutaged() <Badge type="warning" text="^2.1.0" />

  - Purpose: Tests whether the palace has no self-transformation. Without an argument, tests all Four Transformations.
  - Definition: `type notSelfMutaged = (withMutagens?: Mutagen | Mutagen[]) => boolean;`
  - Parameters: `withMutagens` — optional Four Transformation(s).
  - Return value: `boolean`

  ***

  #### mutagedPlaces() <Badge type="warning" text="^2.1.0" />

  - Purpose: Gets the four palaces containing stars transformed by this palace's stem. The result is ordered as Prosperity, Authority, Academic Distinction, Obstruction (祿、權、科、忌).
  - Definition: `type mutagedPlaces = () => (IFunctionalPalace | undefined)[];`
  - Parameters: None
  - Return value: ([`IFunctionalPalace`](#functionalpalace) | `undefined`)[]

### FunctionalSurpalaces <Badge type="warning" text="^1.2.0" />

***

<Badge type="tip" text="implements" /> `IFunctionalSurpalaces` <Badge type="tip" text="extends" /> [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

This class represents the target palace, opposite palace (對宮), Wealth position (財帛位), and Career position (官祿位): the Three Harmonies and Opposition (三方四正).

- Interface definition

  ```ts
  interface FunctionalSurpalaces extends SurroundedPalaces {
    have: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    haveOneOf: (stars: StarName[]) => boolean;
    haveMutagen: (mutagen: Mutagen) => boolean;
    notHaveMutagen: (mutagen: Mutagen): boolean;
  }
  ```

- Methods

  #### have()

  - Purpose: Tests whether all supplied stars occur across the four palaces.
  - Definition: `type have = (stars: StarName[]) => boolean;`
  - Parameters: `stars` — [`StarName[]`](../type-definition.md#starname), required.
  - Return value: `boolean`
  - Example: `astrolabe.surroundedPalaces("命宮").have(["紫微", "右弼"]);`

  ***

  #### notHave()

  - Purpose: Tests whether none of the supplied stars occur across the four palaces.
  - Definition: `type notHave = (stars: StarName[]) => boolean;`
  - Parameters: `stars` — [`StarName[]`](../type-definition.md#starname), required.
  - Return value: `boolean`
  - Example: `astrolabe.surroundedPalaces("命宮").notHave(["地空", "地劫"]);`

  ***

  #### haveOneOf()

  - Purpose: Tests whether any one supplied star occurs across the four palaces.
  - Definition: `type haveOneOf = (stars: StarName[]) => boolean;`
  - Parameters: `stars` — [`StarName[]`](../type-definition.md#starname), required.
  - Return value: `boolean`
  - Example: `astrolabe.surroundedPalaces("命宮").haveOneOf(["天魁", "天鉞"]);`

  ***

  #### haveMutagen()

  - Purpose: Tests whether a natal Four Transformation occurs across the four palaces.
  - Definition: `type haveMutagen = (mutagen: Mutagen) => boolean;`
  - Parameters: `mutagen` — [`Mutagen`](../type-definition.md#mutagen), required.
  - Return value: `boolean`
  - Example: `astrolabe.surroundedPalaces("命宮").haveMutagen("祿");`

  ***

  #### notHaveMutagen()

  - Purpose: Tests whether a natal Four Transformation does not occur across the four palaces.
  - Definition: `type notHaveMutagen = (mutagen: Mutagen) => boolean;`
  - Parameters: `mutagen` — [`Mutagen`](../type-definition.md#mutagen), required.
  - Return value: `boolean`
  - Example: `astrolabe.surroundedPalaces("命宮").notHaveMutagen("忌");`

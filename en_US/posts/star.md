---
outline: deep
description: "Zi Wei Academy, iztro official documentation, FunctionalStar API and examples."
---

# Stars

## Introduction

Stars are an important part of Zi Wei Dou Shu (紫微斗數); different star combinations form different character patterns. This page focuses on development usage. In `iztro`, major stars (主星), auxiliary stars (輔星), and miscellaneous stars (雜曜) are all grouped under the star system. The Forty-Eight Deities and Sha (四十八神煞) are not included.

## Functional class definition

As with [FunctionalAstrolabe](./astrolabe.md#functionalastrolabe) and [FunctionalPalace](./palace.md#functionalpalace), do not create `FunctionalStar` manually. Use an instance returned by another object instead.

### FunctionalStar <Badge type="warning" text="^1.2.0" />

---

<Badge type="tip" text="implements" /> `IFunctionalStar` <Badge type="tip" text="extends" /> [`Star`](../type-definition.md#star)

All properties of this class are inherited from `Star`; the interface adds methods for analysis.

- Interface definition

  ```ts
  interface IFunctionalStar extends Star {
    toJSON: () => Star;
    palace: () => IFunctionalPalace | undefined;
    setPalace: (p: IFunctionalPalace) => void;
    setAstrolabe: (a: IFunctionalAstrolabe) => void;
    surroundedPalaces: () => IFunctionalSurpalaces | undefined;
    oppositePalace: () => IFunctionalPalace | undefined;
    withBrightness: (brightness: Brightness | Brightness[]) => boolean;
    withMutagen: (mutagen: Mutagen | Mutagen[]) => boolean;
  }
  ```

- Properties

  See [`Star`](../type-definition.md#star).

- Methods

  ### toJSON() <Badge type="warning" text="^2.6.0" />

  - Purpose

    Converts the functional star into a plain JSON object. Analysis methods and runtime palace or astrolabe references are excluded; circular references are safely omitted.

  - Definition

    ```ts
    type toJSON = () => Star;
    ```

  - Parameters

    None

  - Return value

    [`Star`](../type-definition.md#star)

  - Example

    ```ts
    const data = astrolabe.star("紫微").toJSON();
    ```

  ***

  :::danger
  `setPalace()` and `setAstrolabe()` were added to make `FunctionalStar` work smoothly. Do not call them manually, otherwise data may become inconsistent.
  :::

  ### palace()

  - Purpose

    Gets the palace (宮位) containing this star.

  - Definition

    ```ts
    type palace = () => IFunctionalPalace | undefined;
    ```

  - Parameters

    None

  - Return value

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - Example

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
    const palace = astrolabe.star("紫微").palace();
    ```

  ***

  ### surroundedPalaces()

  - Purpose

    Gets the Three Harmonies and Opposition (三方四正) palaces of this star.

  - Definition

    ```ts
    type surroundedPalaces = () => IFunctionalSurpalaces | undefined;
    ```

  - Parameters

    None

  - Return value

    [`FunctionalSurpalaces`](palace.md#functionalsurpalaces) | `undefined`

  - Example

    ```ts
    const palaces = astrolabe.star("紫微").surroundedPalaces();
    ```

  ***

  ### oppositePalace()

  - Purpose

    Gets the opposite palace (對宮) of this star.

  - Definition

    ```ts
    type oppositePalace = () => IFunctionalPalace | undefined;
    ```

  - Parameters

    None

  - Return value

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - Example

    ```ts
    const palace = astrolabe.star("紫微").oppositePalace();
    ```

  ***

  ### withBrightness()

  - Purpose

    Tests whether the star has the supplied brightness. Multiple grades are allowed; the method returns `true` when any grade matches.

  - Definition

    ```ts
    type withBrightness = (brightness: Brightness | Brightness[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | brightness | [`Brightness`](../type-definition.md#brightness) \| [`Brightness[]`](../type-definition.md#brightness) | `true` | - | Star brightness to test |

  - Return value

    `boolean`

  - Example

    ```ts
    const result = astrolabe.star("紫微").withBrightness(["廟", "旺"]);
    ```

  ***

  ### withMutagen()

  - Purpose

    Tests whether the star has a Four Transformation (四化). Multiple transformations are allowed; the method returns `true` when any one matches.

  - Definition

    ```ts
    type withMutagen = (mutagen: Mutagen | Mutagen[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required | Default | Description |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Four Transformation: Prosperity (祿), Authority (權), Academic Distinction (科), or Obstruction (忌) |

  - Return value

    `boolean`

  - Example

    ```ts
    const result = astrolabe.star("紫微").withMutagen(["權", "科"]);
    ```

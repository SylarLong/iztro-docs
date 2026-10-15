---
outline: deep
description: "Query stars in a Zi Wei Dou Shu chart with iztro’s star API, with properties, methods, and examples."
---

# Stars（星曜）   {#星曜}

## Introduction   {#前言}

Stars（星曜） are central to Zi Wei Dou Shu（紫微斗數）: different combinations are used to describe different personality traits. For that background, see [the star system（星曜系統）](/en_US/learn/star.md). This chapter focuses on using stars in development.

:::tip Tips
`iztro` groups `major stars`（主星）, `auxiliary stars`（輔星）, and `miscellaneous stars`（雜曜） into its star system, while `48 symbolic stars`（48神煞） are handled separately. If you are unfamiliar with `48 symbolic stars`（48神煞）, see [the 48 symbolic stars（48神煞）](/en_US/learn/dec-star.md).
:::

## Classes and analysis methods {#功能类定义}

As with [FunctionalAstrolabe](./astrolabe.md#functionalastrolabe) and [FunctionalPalace](./palace.md#functionalpalace), use `FunctionalStar` instances returned by other objects rather than constructing them manually.

### FunctionalStar <Badge type="warning" text="^1.2.0" /> {#functionalstar}

---

<Badge type="tip" text="implements" /> `IFunctionalStar` <Badge type="tip" text="extends" /> [`Star`](/en_US/type-definition.md#star)

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

  Reference [Star](/en_US/type-definition.md#star)

- Methods

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Purpose

    Converts the functional star to a plain JSON object. Analysis methods and runtime references to its palace and chart are excluded; circular references are safely ignored.

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

  :::danger ❗️Attention
  `FunctionalStar` includes `setPalace()` and `setAstrolabe()` to connect a star with its palace and chart. Do not call these methods manually during normal use, as doing so can cause data errors.
  :::

  ### palace() {#palace}

  - Purpose

    Retrieves the palace containing the star.

  - Definition

    ```ts
    type palace = () => IFunctionalPalace | undefined;
    ```

  - Parameters

    `none`

  - Return value

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - Example

    Retrieves the palace containing `emperor`（紫微）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").palace();
    ```

  ***

  ### surroundedPalaces() {#surroundedpalaces}

  - Purpose

    Retrieves the star’s own palace, its two trine palaces, and its opposite palace（三方四正）.

  - Definition

    ```ts
    type surroundedPalaces = () => IFunctionalSurpalaces | undefined;
    ```

  - Parameters

    `none`

  - Return value

    [`FunctionalSurpalaces`](palace.md#functionalsurpalaces) | `undefined`

  - Example

    Retrieves `emperor`（紫微）’s associated `trine and opposite palaces`（三方四正）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palaces = astrolabe.star("紫微").surroundedPalaces();
    ```

  ***

  ### oppositePalace() {#oppositepalace}

  - Purpose

    Retrieves the palace opposite the star’s palace.

  - Definition

    ```ts
    type oppositePalace = () => IFunctionalPalace | undefined;
    ```

  - Parameters

    `none`

  - Return value

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - Example

    Retrieves `emperor`（紫微）’s associated `opposite palace`（對宮）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").oppositePalace();
    ```

  ***

  ### withBrightness() {#withbrightness}

  - Purpose

    Checks whether the star has the specified brightness. If several brightness values are supplied, matching any one of them returns `true`.

  - Definition

    ```ts
    type withBrightness = (brightness: Brightness | Brightness[]) => boolean;
    ```

  - Parameters


   | Parameter | Type | Required? | Default value | Description |
   | --- | --- | --- | --- | --- |
   | brightness | [`Brightness`](/en_US/type-definition.md#brightness)  \|  [`Brightness[]`](/en_US/type-definition.md#brightness) | `true` | - | Star brightness to check |

  - Return value

    `boolean`

  - Example

    Determine whether `emperor`（紫微） is in the state of `[+3]`（廟） or `[+2]`（旺）

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withBrightness(["庙", "旺"]);
    ```

  ***

  ### withMutagen() {#withmutagen}

  - Purpose

    Checks whether the star has a specified transformation（四化）. If several are supplied, matching any one returns `true`.

  - Definition

    ```ts
    type withMutagen = (mutagen: Mutagen | Mutagen[]) => boolean;
    ```

  - Parameters


   | Parameter | Type | Required? | Default value | Description |
   | --- | --- | --- | --- | --- |
   | mutagen | [`Mutagen`](/en_US/type-definition.md#mutagen)  \|  [`Mutagen[]`](/en_US/type-definition.md#mutagen) | `true` | - | Four transformations: A（祿）, B（權）, C（科）, D（忌） |

  - Return value

    `boolean`

  - Example

    Determine whether `emperor`（紫微） is in the state of `B`（化權） or `C`（化科）

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withMutagen(["权", "科"]);
    ```

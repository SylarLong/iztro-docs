---
outline: deep
description: "Query the twelve palaces in a Zi Wei Dou Shu chart with iztro’s palace API, with properties, methods, and examples."
---

# Palaces（宮位）   {#宫位}

## Introduction   {#前言}

Zi Wei Dou Shu（紫微斗數） has `twelve` palaces, collectively called the `twelve palaces of human affairs`（十二人事宮）. They represent the people and aspects of life connected with a person. In order, they are `soul`（命宮）, `siblings`（兄弟）, `spouse`（夫妻）, `children`（子女）, `wealth`（財帛）, `health`（疾厄）, `surface`（遷移）, `friends`（僕役）, `career`（官祿）, `property`（田宅）, `spirit`（福德）, and `parents`（父母）. Besides these twelve palaces shown on the [chart](./astrolabe.md), there are three hidden palaces: `body`（身宮）, `origin`（來因）, and `hidden partner palace`（暗合宮）. Each has its own meaning, which is beyond the scope of this API page. For an introduction or a deeper explanation, see [The palace system](../learn/palace.md). The earthly branches run clockwise around the chart, while the palace names run counterclockwise, as the table below illustrates:

<table class="astrolabe">
    <tr>
        <td>si（巳）<code>property</code>（田宅）</td>
        <td>woo（午）<code>career</code>（官祿）</td>
        <td>wei（未）<code>friends</code>（僕役）</td>
        <td>shen（申）<code>surface</code>（遷移）</td>
    </tr>
    <tr>
        <td>chen（辰）<code>spirit</code>（福德）</td>
        <td class="center-palace" rowspan="2" colspan="2">central palace</td>
        <td>you（酉）<code>health</code>（疾厄）</td>
    </tr>
    <tr>
        <td>mao（卯）<code>parents</code>（父母）</td>
        <td>xu（戌）<code>wealth</code>（財帛）</td>
    </tr>
    <tr>
        <td>yin（寅）<code>soul</code>（命宮）</td>
        <td>chou（丑）<code>siblings</code>（兄弟）</td>
        <td>zi（子）<code>spouse</code>（夫妻）</td>
        <td>hai（亥）<code>children</code>（子女）</td>
    </tr>
</table>

> The table above is only an example. The location of `soul`（命宮） depends on your `date of birth` and `time of birth`. It can occupy any of the twelve positions shown, but the sequence of palace names remains the same.

The Chinese expression for a palace position combines two concepts: `palace` and `position`. The placement calculated from your `date of birth` and `time of birth` is the `palace` itself. Thus, `wealth`（財帛） has a fixed location in your natal chart. If `natal chart`（本命盤） is unfamiliar, start with [The basics](/en_US/learn/basis.md). A `position`, however, is `relative` to another palace: taking `spouse`（夫妻） as the reference, its `wealth position`（財帛位） falls in `surface`（遷移）. This can seem complicated, but you only need to understand the distinction; there is no need to memorize all these relationships.
## Classes and analysis methods {#功能类定义}

:::warning Development suggestions

A palace belongs to a chart, so instead of creating a palace object manually with `new`, use one from the chart returned by a static charting method. The chart’s `palaces` property holds all twelve palaces. They follow the earthly-branch sequence clockwise, starting at `yin palace`（寅宮）.

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
```

You can get the target palace from the above `astrolabe` variable in several ways. Please use it according to your actual needs:

1. Access `palaces` by array index

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palaces[1];
    ```

2. On a `FunctionalAstrolabe` instance, call `palace()` with the palace `Index`.

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palace(1);
    ```

3. On a `FunctionalAstrolabe` instance, call `palace()` with the palace `Name`.

    ```ts
    // 获取命宫
    const palace = astrolabe.palace("命宫");
    ```

### FunctionalPalace {#functionalpalace}

***

<Badge type="tip" text="implements" /> `IFunctionalPalace` <Badge type="tip" text="extends" /> [`Palace`](../type-definition.md#palace)

This class inherits its properties from [Palace](../type-definition.md#palace) and adds methods for analyzing the stars（星曜） in a palace.

- Interface definition

  ```ts
  interface IFunctionalPalace extends Palace {
    toJSON: () => Palace;
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

  Reference [Palace](../type-definition.md#palace)

- Methods

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Purpose

    Converts the functional palace to a plain JSON object. The result excludes analysis methods and runtime references such as the associated chart. Circular references are safely ignored.

  - Definition

    ```ts
    type toJSON = () => Palace;
    ```

  - Parameters

    None

  - Return value

    [`Palace`](../type-definition.md#palace)

  - Example

    ```ts
    const data = astrolabe.palace("命宫")?.toJSON();
    ```

  ***

  #### has() <Badge type="warning" text="^1.0.0" /> {#has}

  - Purpose

    Checks the supplied `stars`（星曜） in a palace. `all specified stars` must be `present` for the method to return `true`.

  - Definition

    ```ts
    type has = (stars: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Star names; may include major stars, auxiliary stars, and miscellaneous stars |

  - Return value

    `boolean`

  - Example

    If you want to see if `soul`（命宮） has `emperor`（紫微） and `helper`（右弼）
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.has(["紫微", "右弼"]);
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.palace("命宫").has(["紫微", "右弼"]);
    ```

  ***
  #### notHave() <Badge type="warning" text="^1.0.0" /> {#nothave}

  - Purpose

    Checks the supplied `stars`（星曜） against the palace. The condition is `none of them present`: only then does the method return `true`.

  - Definition

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Star names; may include major stars, auxiliary stars, and miscellaneous stars |

  - Return value

    `boolean`

  - Example

    To check whether `soul`（命宮） contains neither `ideologue`（地空） nor `fickle`（地劫）:
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHave(["地空", "地劫"]);
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.palace("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### hasOneOf() <Badge type="warning" text="^1.0.0" /> {#hasoneof}

  - Purpose

    Checks the supplied `stars`（星曜） in the palace. `at least one match` is enough to return `true`.

  - Definition

    ```ts
    type hasOneOf = (stars: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Star names; may include major stars, auxiliary stars, and miscellaneous stars |

  - Return value

    `boolean`

  - Example

    If you want to see if `soul`（命宮） has `assistant`（天魁） or `aide`（天鉞）
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasOneOf(["天魁", "天钺"]);
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.palace("命宫").hasOneOf(["天魁", "天钺"]);
    ```

  ***
  #### hasMutagen() <Badge type="warning" text="^1.2.0" /> {#hasmutagen}

  - Purpose

    Checks whether the palace contains the specified birth-year transformation（生年四化）.

  - Definition

    ```ts
    type hasMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Transformation name: A（祿）, B（權）, C（科） or D（忌） |

  - Return value

    `boolean`

  - Example

    If you want to see if `soul`（命宮） has `A`（化祿）
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasMutagen("禄");
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.palace("命宫").hasMutagen("禄");
    ```

  ***
  #### notHaveMutagen() <Badge type="warning" text="^1.2.0" /> {#nothavemutagen}

  - Purpose

    Checks whether the specified birth-year transformation（生年四化） is absent from the palace.

  - Definition

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Transformation name: A（祿）, B（權）, C（科） or D（忌） |

  - Return value

    `boolean`

  - Example

    To check whether `soul`（命宮） has no `D`（化忌）:
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.palace("命宫").notHaveMutagen("忌");
    ```
  #### isEmpty() <Badge type="warning" text="^2.0.6" /> {#isempty}

  - Purpose

    Checks whether a palace is empty（空宮）, meaning that it has no major stars（主星）. Some schools do not consider a palace empty when certain other stars are present. The optional star-list parameter lets you specify those exceptions.

  - Definition

    ```ts
    type isEmpty = (excludeStars?: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | excludeStars | [`StarName[]`](../type-definition.md#starname) | `false` | - | Array of star names |

  - Return value

    `boolean`
  #### astrolabe() <Badge type="warning" text="^2.1.0" /> {#astrolabe}

  - Purpose

    Returns the chart object to which the current palace belongs.

  - Definition

    ```ts
    type astrolabe = () => IFunctionalAstrolabe | undefined;
    ```

  - Parameters

    None

  - Return value

  [`IFunctionalAstrolabe`](./astrolabe.md#functionalastrolabe) | `undefined`;
  #### fliesTo() <Badge type="warning" text="^2.1.0" /> {#fliesto}

  - Purpose

    Checks transformations sent from the source palace to the target palace. Accepts one transformation or an array; all supplied transformations must reach the target to return `true`.

  - Definition

    ```ts
    type fliesTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Target-palace index or name |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Four transformations: A（祿）, B（權）, C（科）, D（忌） |

  - Return value

    `boolean`
  #### fliesOneOfTo() <Badge type="warning" text="^2.1.0" /> {#fliesoneofto}

  - Purpose

    Returns `true` if at least one supplied transformation is sent from the source palace to the target palace.

  - Definition

    ```ts
    type fliesOneOfTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Target-palace index or name |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Four transformations: A（祿）, B（權）, C（科）, D（忌） |

  - Return value

    `boolean`
  #### notFlyTo() <Badge type="warning" text="^2.1.0" /> {#notflyto}

  - Purpose

    Checks that no supplied transformation is sent from the source palace to the target. Accepts one transformation or an array; every supplied transformation must fail to reach the target to return `true`.

  - Definition

    ```ts
    type notFlyTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Target-palace index or name |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Four transformations: A（祿）, B（權）, C（科）, D（忌） |

  - Return value

    `boolean`
  #### selfMutaged() <Badge type="warning" text="^2.1.0" /> {#selfmutaged}

  - Purpose

    Checks for self-transformations（自化） in the palace. When an array is supplied, all specified transformations must be present to return `true`.

  - Definition

    ```ts
    type selfMutaged = (
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Four transformations: A（祿）, B（權）, C（科）, D（忌） |

  - Return value

    `boolean`
  #### selfMutagedOneOf() <Badge type="warning" text="^2.1.0" /> {#selfmutagedoneof}

  - Purpose

    Checks for self-transformations（自化）. If no argument is supplied, all four types are considered; any one match returns `true`.

  - Definition

    ```ts
    type selfMutagedOneOf = (
      withMutagens?: Mutagen[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | Four transformations: A（祿）, B（權）, C（科）, D（忌） |

  - Return value

    `boolean`
  #### notSelfMutaged() <Badge type="warning" text="^2.1.0" /> {#notselfmutaged}

  - Purpose

    Checks that none of the specified transformations is a self-transformation（自化） in the palace. If no argument is supplied, it checks all four types.

  - Definition

    ```ts
    type notSelfMutaged = (
      withMutagens?: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | Four transformations: A（祿）, B（權）, C（科）, D（忌） |

  - Return value

    `boolean`
  #### mutagedPlaces() <Badge type="warning" text="^2.1.0" /> {#mutagedplaces}

  - Purpose

    Returns an array of the four palaces receiving transformations from the current palace, in the order prosperity（化祿）, power（化權）, recognition（化科）, and obstruction（化忌）.

  - Definition

    ```ts
    type mutagedPlaces = () => (IFunctionalPalace | undefined)[];
    ```

  - Parameters

    None

  - Return value

    ([`IFunctionalPalace`](#functionalpalace) | `undefined`)[]
### FunctionalSurpalaces <Badge type="warning" text="^1.2.0" /> {#functionalsurpalaces}

***

<Badge type="tip" text="implements" /> `IFunctionalSurpalaces` <Badge type="tip" text="extends" /> [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

This class inherits its properties from [SurroundedPalaces](../type-definition.md#surroundedpalaces) and adds methods for analyzing stars（星曜） across the four related palaces.

- Interface definition

  ```ts
  interface FunctionalSurpalaces extends SurroundedPalaces {
    toJSON: () => SurroundedPalaces;
    have: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    haveOneOf: (stars: StarName[]) => boolean;
    haveMutagen: (mutagen: Mutagen) => boolean;
    notHaveMutagen: (mutagen: Mutagen): boolean;
  }
  ```

- Properties

  Reference [SurroundedPalaces](../type-definition.md#surroundedpalaces)

- Methods

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson-1}

  - Purpose

    Converts the functional object for the palace and its trine and opposite palaces（三方四正） to a plain JSON object. The result excludes analysis methods and runtime references. Circular references are safely ignored.

  - Definition

    ```ts
    type toJSON = () => SurroundedPalaces;
    ```

  - Parameters

    None

  - Return value

    [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

  - Example

    ```ts
    const data = astrolabe.surroundedPalaces("命宫").toJSON();
    ```

  ***

  #### have() {#have}

  - Purpose

    Checks the supplied `stars`（星曜） across the palace and its trine and opposite palaces（三方四正）. `all specified stars` must be `present` somewhere within that group for the method to return `true`.

  - Definition

    ```ts
    type have = (stars: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Star names; may include major stars, auxiliary stars, and miscellaneous stars |

  - Return value

    `boolean`

  - Example

    To check whether `soul`（命宮） and its trine and opposite palaces（三方四正） contain both `emperor`（紫微） and `helper`（右弼）:
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.have(["紫微", "右弼"]);
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").have(["紫微", "右弼"]);
    ```

  ***
  #### notHave() {#nothave-1}

  - Purpose

    Checks the supplied `stars`（星曜） across the palace and its trine and opposite palaces（三方四正）. The condition is `none of them present` anywhere in that group; only then does the method return `true`.

  - Definition

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Star names; may include major stars, auxiliary stars, and miscellaneous stars |

  - Return value

    `boolean`

  - Example

    To check whether `soul`（命宮） and its trine and opposite palaces（三方四正） contain neither `ideologue`（地空） nor `fickle`（地劫）:

    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.notHave(["地空", "地劫"]);
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### haveOneOf() {#haveoneof}

  - Purpose

    Checks whether any supplied star is present in the palace or its trine or opposite palaces（三方四正）. A single match anywhere in that group returns `true`.

  - Definition

    ```ts
    type haveOneOf = (stars: StarName[]) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Star names; may include major stars, auxiliary stars, and miscellaneous stars |

  - Return value

    `boolean`

  - Example

    To check whether `soul`（命宮） and its trine and opposite palaces（三方四正） contain `assistant`（天魁） or `aide`（天鉞）:

    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveOneOf(["天魁", "天钺"]);
    ```

  ***
  #### haveMutagen() {#havemutagen}

  - Purpose

    Checks whether the specified birth-year transformation（生年四化） is present in the palace or its trine or opposite palaces（三方四正）.

  - Definition

    ```ts
    type haveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Transformation name: A（祿）, B（權）, C（科） or D（忌） |

  - Return value

    `boolean`

  - Example

    To check whether `soul`（命宮） and its trine and opposite palaces（三方四正） contain `A`（化祿）:
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.haveMutagen("禄");
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveMutagen("禄");
    ```

  ***
  #### notHaveMutagen() {#nothavemutagen-1}

  - Purpose

    Checks whether the specified birth-year transformation（生年四化） is absent from the palace and all its trine and opposite palaces（三方四正）.

  - Definition

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Parameters

    | Parameter | Type | Required? | Default value | Description |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Transformation name: A（祿）, B（權）, C（科） or D（忌） |

  - Return value

    `boolean`

  - Example

    To check whether `soul`（命宮） and its trine and opposite palaces（三方四正） contain no `D`（化忌）:
    ```ts
    const palace = astrolabe.surroundedPalaces("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    You can also simplify the code with `method chaining`.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHaveMutagen("忌");
    ```

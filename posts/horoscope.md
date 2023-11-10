---
outline: deep
description: "紫微研习社，iztro官方文档，iztro开发文档，iztro紫微斗数运限介绍，iztro的horoscope对象使用方法以及示例代码。"
---

# 运限

## 前言

紫微斗数的运限分为 `大限`、`小限`、`流年`、`流月`、`流日`、`流时`、`流分`、`流秒` 等等，如果你还不知道运限的概念或不知道能为你做什么，请阅读 [紫微斗数运限](/learn/horoscope.md)。在 `iztro` 中，仅提供 `大限`、`小限`、`流年`、`流月`、`流日`、`流时`。其中，`大限` 和 `流年` 有 `流耀` 和 `四化` 存在，而其他运限只有 `四化`。`小限` 比较特殊，它既没有流耀，也不产生四化，`小限` 的四化是以该宫位的 `宫干` 来起四化的。


## 功能类定义

:::warning 开发建议

因为运限是基于星盘而存在的，所以我们并不推荐你手动 `new` 一个运限对象，而是使用星盘实例的方法返回的对象使用。星盘的 [`horoscope()`](./astrolabe.md#horoscope) 方法将会返回运限对象。

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
const horoscope = astrolabe.horoscope('2023-10-26', 2);
```

上述代码执行以后将返回一个 `FunctionalHoroscope` 的实例。

### FunctionalHoroscope

***

<Badge type="tip" text="implements" /> `IFunctionalHoroscope` <Badge type="tip" text="extends" /> [`Horoscope`](../type-definition.md#horoscope)

该类所有属性都是继承自 [Horoscope](../type-definition.md#horoscope)，然后在接口内定义了一些方法用于对星耀进行分析。

- 接口定义

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

- 属性

  参考 [Horoscope](../type-definition.md#horoscope)

- 方法
  
  ### agePalace() <Badge type="warning" text="v1.3.0" />

  - 用途

    获取 `小限` 所在宫位

  - 定义

    ```ts
    type agePalace: () => FunctionalPalace | undefined;
    ```

  - 参数

    无

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

    获取指定运限宫位

  - 定义

    ```ts
    type palace = (
      palaceName: PalaceName, 
      scope: Scope
    ) => FunctionalPalace | undefined;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 运限名称 |

  - 返回值

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - 示例

    如果你想获取 `大限` 的 `夫妻宫`

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

    获取运限指定宫位的三方四正宫位

  - 定义

    ```ts
    type surroundPalaces = (
      palaceName: PalaceName, 
      scope: Scope
    ) => FunctionalSurpalaces | undefined;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 运限名称 |

  - 返回值

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces) | `undefined`

  - 示例

    如果你想获取 `流年夫妻宫` 的三方四正宫位 

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

    判断在指定运限的宫位内是否包含流耀，需要全部**包含**才返回true

  - 定义

    ```ts
    type hasHoroscopeStars = (
      palaceName: PalaceName, 
      scope: Scope, 
      horoscopeStar: StarName[]
    ) => boolean;
    ```

  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 运限名称 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流耀数组 |

  - 返回值

    `boolean`

  - 示例

    如果你想获取 `流年夫妻宫` 内是否有 `流喜` 和 `流曲`

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

    判断指定运限宫位内是否不含流耀，需要全部**不包含**才返回true

  - 定义

    ```ts
    type notHaveHoroscopeStars = (
      palaceName: PalaceName, 
      scope: Scope, 
      horoscope: StarName[]
    ) => boolean;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 运限名称 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流耀数组 |

  - 返回值

    `boolean`

  - 示例

    如果你想获取 `流年夫妻宫` 内是否没有 `流喜` 和 `流曲`

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

    判断指定运限宫位内是否含有指定流耀，只要包含**其中一颗**就返回true

  - 定义

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 运限名称 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流耀数组 |

  - 返回值

    `boolean`

  - 示例

    如果你想获取 `流年夫妻宫` 内是否有 `流喜` 或 `流曲`

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

    判断指定运限宫位内是否存在运限四化

  - 定义

    ```ts
    type hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 运限名称 |
    | horoscopeMutagen | [`Mutagen`](../type-definition.md#mutagen) | `true`   | -      | 四化 |

  - 返回值

    `boolean`

  - 示例

    如果你想获取 `流年夫妻宫` 内是否有 `化禄`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeMutagen("夫妻", "yearly", "禄");
    ```

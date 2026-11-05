---
title: "iztro horoscope API：运限查询与分析"
description: "使用 iztro 的 horoscope API 查询大限、小限、流年、流月、流日和流时，获取运限宫位、流曜与四化，并查看方法示例。"
outline: deep
---

# 运限

<Badge type="warning" text="^2.6.2" /> 运限查询使用所属星盘生成时保存的配置和语言。修改全局默认值或创建另一张星盘不会改变已有星盘的查询结果。`horoscope()` 可接受有效的 `Date` 对象或日期字符串；省略日期时使用调用时的当前时间。显式时辰必须为 0～12 的整数，非法日期和时辰会抛出错误。

## 前言

紫微斗数的运限分为 `大限`、`小限`、`流年`、`流月`、`流日`、`流时`、`流分`、`流秒` 等等，如果你还不知道运限的概念或不知道能为你做什么，请阅读 [紫微斗数运限](/learn/horoscope.md)。在 `iztro` 中，仅提供 `大限`、`小限`、`流年`、`流月`、`流日`、`流时`。其中，`大限`、`流年`、`流月`、`流日` 和 `流时` 都会提供 `流曜` 与 `四化`；`流月`、`流日`、`流时` 的流曜从 `v2.4.4` 起提供。`小限` 比较特殊，它没有独立的流曜，`小限` 的四化是以该宫位的 `宫干` 来起四化的。

:::tip 提示
运限的年、月干支分界由星盘生成时保存的配置项 [`horoscopeDivide`](./config-n-plugin.md#配置) 控制；`ageDivide` 控制虚岁计算，影响大限与小限。
:::

### 虚岁与宫位索引 {#虚岁与宫位索引}

默认的 `ageDivide: 'normal'` 使用传统虚岁：出生记为一岁，每逢农历正月初一加一岁。计算公式为“查询日期的农历年 − 出生日期的农历年 + 1”，并非公历周岁；`horoscopeDivide` 不改变这个虚岁公式。

`ageDivide: 'birthday'` 使用另一种分界规则：比较农历月、日，查询日在农历生日当天或之前时取农历年差，生日之后才再加一。这不是公历周岁的计算方法。

例如，公历 `1980-02-14` 出生对应农历 `1979-12-28`，查询公历 `1990-02-14` 对应农历 `1990-01-19`，传统虚岁为 `1990 - 1979 + 1 = 12`：

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

该盘为水二局，首个大限为 2–11 虚岁，第二个大限为 12–21 虚岁，因此已进入第二个大限。`decadal.index` 是当前大限所在的本命宫位索引；`decadal.palaceNames[i]` 则是固定索引 `i` 上的运限宫名，不能把 `palaceNames[0]` 当成当前大限所在的本命宫名。本例第二个大限位于本命兄弟宫，固定第 0 宫的运限宫名为 `spirit`（福德），新版结果符合传统虚岁规则。

`v2.4.3` 在此例计算为 11 岁并返回 `parents`。当前版本若选择 `ageDivide: 'birthday'`，此例也会得到 11 岁和 `parents`；该选项包含后续版本的年龄修复，并不是保证所有结果与 `v2.4.3` 一致的兼容开关。


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

该类所有属性都是继承自 [Horoscope](../type-definition.md#horoscope)，然后在接口内定义了一些方法用于对星曜进行分析。

- 接口定义

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

  <Badge type="warning" text="^2.6.1" /> `palaceName` 支持任一已配置语言的宫位名称，不要求与星盘的输出语言一致。例如，中文星盘也可以传入英文宫位名 `"soul"`。

- 属性

  参考 [Horoscope](../type-definition.md#horoscope)

- 方法

  ### toJSON() <Badge type="warning" text="^2.6.0" />

  - 用途

    将功能运限转换为普通 JSON 对象。返回结果不包含分析方法和关联星盘等运行时引用；循环引用会被安全忽略。

  - 定义

    ```ts
    type toJSON = () => Horoscope;
    ```

  - 参数

    无

  - 返回值

    [`Horoscope`](../type-definition.md#horoscope)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.horoscope("2023-8-19").toJSON();
    ```

  ***
  
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

    判断在指定运限的宫位内是否包含流曜，需要全部**包含**才返回true

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
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流曜数组 |

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

    判断指定运限宫位内是否不含流曜，需要全部**不包含**才返回true

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
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流曜数组 |

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

    判断指定运限宫位内是否含有指定流曜，只要包含**其中一颗**就返回true

  - 定义

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true`   | -      | 运限名称 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 流曜数组 |

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

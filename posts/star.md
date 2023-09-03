---
outline: deep
description: "iztro紫微斗数星耀介绍，iztro的star对象使用方法以及示例代码。"
---

# 星耀

### 概述

星耀是紫微斗数里的重要组成部分，人的个性主要收到星耀的影响。不同的星耀组合形成了不同的个性，如果你对星耀部分感兴趣，我们强烈建议你点击 [传送门](/learn/star.md) 进行相关知识学习。本篇主要关注的是开发层面。

:::tip 提示
在 `iztro` 里，`主星`、`辅星`、`杂耀` 都被统归到星耀系统里，但是 `48神煞` 没有被归类到星耀，如果你还不知道 `48神煞` 是什么，欢迎点击 [传送门](/learn/dec-star.md) 进行学习。
:::

### 功能类定义

与 [FunctionalAstrolabe](./astrolabe.md#functionalastrolabe) 和 [FunctionalPalace](./palace.md#functionalpalace) 一样，我们并不建议你手动去创建一个 `FunctionalStar` 对象，而是使用其他对象返回的实例。

#### FunctionalStar <Badge type="warning" text="^1.2.0" />

---

<Badge type="tip" text="implements" /> `IFunctionalStar` <Badge type="tip" text="extends" /> [`Star`](../type-definition.md#star)

- 接口定义

  ```ts
  interface IFunctionalStar extends Star {
    palace: () => IFunctionalPalace | undefined;
    setPalace: (p: IFunctionalPalace) => void;
    setAstrolabe: (a: IFunctionalAstrolabe) => void;
    surroundedPalaces: () => IFunctionalSurpalaces | undefined;
    oppositePalace: () => IFunctionalPalace | undefined;
    withBrightness: (brightness: Brightness | Brightness[]) => boolean;
    withMutagen: (mutagen: Mutagen | Mutagen[]) => boolean;
  }
  ```

- 属性
  
  参考 [Star](../type-definition.md#star)

- 方法

  :::danger ❗️注意
  为了使 `FunctionalStar` 类使用起来更顺畅，所以引入了 `setPalace()` 和 `setAstrolabe()` 两个方法，但实际使用过程中请不要手动去调用这两个方法，以免造成数据错误。
  :::

  ##### palace()

  - 用途

    获取星耀所在宫位

  - 定义

    ```ts
    type palace = () => IFunctionalPalace | undefined;
    ```

  - 参数

    `none`

  - 返回值

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`
  
  - 示例

    获取 `紫微星` 所在的宫位

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微星").palece();
    ```

  ***

  ##### surroundedPalaces()

  - 用途

    获取当前星耀的三方四正宫位

  - 定义

    ```ts
    type surroundedPalaces = () => IFunctionalSurpalaces | undefined;
    ```

  - 参数

    `none`

  - 返回值

    [`FunctionalSurpalaces`](palace.md#functionalsurpalaces) | `undefined`
  
  - 示例

    获取 `紫微星` 的 `三方四正` 宫位

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palaces = astrolabe.star("紫微星").surroundedPalaces();
    ```

  ***

  ##### oppositePalace()

  - 用途

    获取当前星耀的对宫

  - 定义

    ```ts
    type oppositePalace = () => IFunctionalPalace | undefined;
    ```

  - 参数

    `none`

  - 返回值

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`
  
  - 示例

    获取 `紫微星` 的 `对宫`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微星").oppositePalace();
    ```

  ***

  ##### withBrightness()

  - 用途

    判断星耀是否是传入的亮度，也可以传入多个亮度，只要匹配到一个亮度就会返回 `true`

  - 定义

    ```ts
    type withBrightness = (brightness: Brightness | Brightness[]) => boolean;
    ```

  - 参数

  
   | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
   | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
   | brightness |  [ `Brightness`](/type-definition.md#brightness) \| [`Brightness[]`]((/type-definition.md#brightness)) | `true`   | -      | 需要判断的星耀亮度  |

  - 返回值

    `boolean`
  
  - 示例

    判断 `紫微星` 是否处于 `庙` 或者 `旺` 的状态

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微星").withBrightness(["庙", "旺"]);
    ```

  ***

  ##### withMutagen()

  - 用途

    判断星耀是否产生了四化，也可以传入多个四化进行判断，只要匹配到一个亮度就会返回 `true`

  - 定义

    ```ts
    type withMutagen = (mutagen: Mutagen | Mutagen[]) => boolean;
    ```

  - 参数

  
   | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
   | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
   | mutagen |  [ `Mutagen`](/type-definition.md#mutagen) \| [`Mutagen[]`]((/type-definition.md#mutagen)) | `true`   | -      | 四化【禄｜权｜科｜忌】  |

  - 返回值

    `boolean`
  
  - 示例

    判断 `紫微星` 是否处于 `化权` 或者 `华科` 的状态

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微星").withMutagen(["权", "科"]);
    ```

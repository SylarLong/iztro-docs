---
outline: deep
description: "iztro紫微斗数宫位介绍，iztro的palace对象使用方法以及示例代码。"
---

# 宫位

### 概述

紫微斗数中一共有 `十二` 个宫位，叫做 `十二人事宫`，囊括了与人有关的其他人和事物，这十二宫按顺序分别是 `命宫`、`兄弟宫`、`夫妻宫`、`子女宫`、`财帛宫`、`疾厄宫`、`迁移宫`、`仆役宫`、`官禄宫`、`田宅宫`、`福德宫`、`父母宫`。除了这展示在 [星盘](./astrolabe.md) 里的十二宫以外，紫微斗数还有三个隐藏宫位，它们分别是 `身宫`、`来因宫`、`暗合宫`。每一个宫位有着它特殊的意义，但本页不详细展开来叙述。如果你对紫微斗数的宫位没有概念，或者想深入研究，可以点击 [传送门](../learn/palace.md) 查看详细资料。与宫位地支顺时针排列相反，宫位名称是按逆时针排列的。如下面表格所示：

<table class="astrolabe">
    <tr>
        <td>巳 <code>田宅</code></td>
        <td>午 <code>官禄</code></td>
        <td>未 <code>仆役</code></td>
        <td>申 <code>迁移</code></td>
    </tr>
    <tr>
        <td>辰 <code>福德</code></td>
        <td class="center-palace" rowspan="2" colspan="2">中宫</td>
        <td>酉 <code>疾厄</code></td>
    </tr>
    <tr>
        <td>卯 <code>父母</code></td>
        <td>戌 <code>财帛</code></td>
    </tr>
    <tr>
        <td>寅 <code>命宫</code></td>
        <td>丑 <code>兄弟</code></td>
        <td>子 <code>夫妻</code></td>
        <td>亥 <code>子女</code></td>
    </tr>
</table>

> 以上表格只是一个例子，`命宫` 的位置会根据你的 `出生日期` 和 `出生时间` 的不同而不同，它可能出现在上述任何一个宫位，但这个顺序是不会变的。

宫位其实是 `宫` 和 `位` 两个概念组成的，通过 `出生日期` 和 `出生时间` 计算出来的，叫 `宫`，所以你星盘中的 `财帛宫` 位置在本命盘中是固定的，如果你不知道什么叫 `本命盘`，我们强烈建议你点击 [传送门](/learn/basis.md) 学习。`位` 则是一个 `相对` 位置，比如 `夫妻宫` 的 `财帛位` 是 `迁移宫`。这听起来有些绕，好消息是，你不需要记忆这些烧脑的信息，只需要有这么一个概念就可以了。
### 功能类定义

:::warning 开发建议

因为宫位是基于星盘而存在的，所以我们并不推荐你手动 `new` 一个宫位对象，而是使用星盘静态方法返回的对象使用。星盘的 `palaces` 属性包含了十二宫的数据，为了和地支的顺序保持一致，它是从 `寅宫` 开始按照地支顺序顺时针排列的。

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
```

你可以有几种方式从上述 `astrolabe` 变量里获取到目标宫位，请根据实际需求使用：

1. 通过 `palaces` 的下标获取

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palaces[1];
    ```

2. 通过 `FunctionalAstrolabe` 类的 `palace()` 方法传入宫位 `索引` 获取

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palace(1);
    ```

3. 通过 `FunctionalAstrolabe` 类的 `palace()` 方法传入宫位 `名称` 获取

    ```ts
    // 获取命宫
    const palace = astrolabe.palace("命宫");
    ```

#### FunctionalAstrolabe

***

<Badge type="tip" text="implements" /> `IFuncionalPalace` <Badge type="tip" text="extends" /> [`Palace`](../type-definition.md#palace)

该类所有属性都是继承自 [Palace](../type-definition.md#palace)，然后在接口内定义了一些方法用于对星耀进行分析。

- 接口定义

  ```ts
  interface IFunctionalPalace extends Palace {
    has: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    hasOneOf: (stars: StarName[]) => boolean;
  }
  ```

- 属性

  参考 [Palace](../type-definition.md#palace)

- 方法
  
  ##### has() <Badge type="warning" text="^1.0.0" />

  - 用途

    判断某个宫位内是否有传入的 `星耀`，要 `所有` 星耀 `都在` 宫位内才会返回 `true`

  - 定义

    ```ts
    type has = (stars: StarName[]) => boolean;
    ```

  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名称，可以包含主星、辅星、杂耀 |

  - 返回值

    `boolean`

  - 示例

    如果你想查看 `命宫` 是否有 `紫微星` 和 `右弼星`
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.has(["紫微", "右弼"]);
    ```

    当然你也可以使用 `链式调用` 来简化代码
    ```ts
    const result = astrolabe.palace("命宫").has(["紫微", "右弼"]);
    ```

  ***
  ##### notHave() <Badge type="warning" text="^1.0.0" />

  - 用途

    判断某个宫位内是否有传入的 `星耀`，要所有星耀 `都不在` 宫位内才会返回 `true`

  - 定义

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名称，可以包含主星、辅星、杂耀 |

  - 返回值

    `boolean`

  - 示例

    如果你想查看 `命宫` 是没有 `地空星` 和 `地劫星`
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHave(["地空", "地劫"]);
    ```

    当然你也可以使用 `链式调用` 来简化代码
    ```ts
    const result = astrolabe.palace("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  ##### hasOneOf() <Badge type="warning" text="^1.0.0" />

  - 用途

    判断某个宫位内是否有传入 `星耀` 的其中一个，只要 `命中一个` 就会返回 `true`

  - 定义

    ```ts
    type hasOneOf = (stars: StarName[]) => boolean;
    ```
    
  - 参数

    | 参数        | 类型                                      | 是否必填 | 默认值 | 说明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名称，可以包含主星、辅星、杂耀 |

  - 返回值

    `boolean`

  - 示例

    如果你想查看 `命宫` 是否有 `天魁星` 或 `天钺星`
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasOneOf(["天魁", "天钺"]);
    ```

    当然你也可以使用 `链式调用` 来简化代码
    ```ts
    const result = astrolabe.palace("命宫").hasOneOf(["天魁", "天钺"]);
    ```

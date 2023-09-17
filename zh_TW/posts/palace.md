---
outline: deep
description: "iztro紫微鬥數宮位介紹，iztro的palace對象使用方法以及示例代碼。"
---

# 宮位

## 概述

紫微鬥數中壹共有 `十二` 個宮位，叫做 `十二人事宮`，囊括了與人有關的其他人和事物，這十二宮按順序分別是 `命宮`、`兄弟宮`、`夫妻宮`、`子女宮`、`財帛宮`、`疾厄宮`、`遷移宮`、`仆役宮`、`官祿宮`、`田宅宮`、`福德宮`、`父母宮`。除了這展示在 [星盤](./astrolabe.md) 裏的十二宮以外，紫微鬥數還有三個隱藏宮位，它們分別是 `身宮`、`來因宮`、`暗合宮`。每壹個宮位有著它特殊的意義，但本頁不詳細展開來敘述。如果妳對紫微鬥數的宮位沒有概念，或者想深入研究，可以點擊 [傳送門](../learn/palace.md) 查看詳細資料。與宮位地支順時針排列相反，宮位名稱是按逆時針排列的。如下面表格所示：

<table class="astrolabe">
    <tr>
        <td>巳 <code>田宅</code></td>
        <td>午 <code>官祿</code></td>
        <td>未 <code>仆役</code></td>
        <td>申 <code>遷移</code></td>
    </tr>
    <tr>
        <td>辰 <code>福德</code></td>
        <td class="center-palace" rowspan="2" colspan="2">中宮</td>
        <td>酉 <code>疾厄</code></td>
    </tr>
    <tr>
        <td>卯 <code>父母</code></td>
        <td>戌 <code>財帛</code></td>
    </tr>
    <tr>
        <td>寅 <code>命宮</code></td>
        <td>醜 <code>兄弟</code></td>
        <td>子 <code>夫妻</code></td>
        <td>亥 <code>子女</code></td>
    </tr>
</table>

> 以上表格隻是壹個例子，`命宮` 的位置會根據妳的 `出生日期` 和 `出生時間` 的不同而不同，它可能出現在上述任何壹個宮位，但這個順序是不會變的。

宮位其實是 `宮` 和 `位` 兩個概念組成的，通過 `出生日期` 和 `出生時間` 計算出來的，叫 `宮`，所以妳星盤中的 `財帛宮` 位置在本命盤中是固定的，如果妳不知道什麽叫 `本命盤`，我們強烈建議妳點擊 [傳送門](/learn/basis.md) 學習。`位` 則是壹個 `相對` 位置，比如 `夫妻宮` 的 `財帛位` 是 `遷移宮`。這聽起來有些繞，好消息是，妳不需要記憶這些燒腦的信息，隻需要有這麽壹個概念就可以了。
## 功能類定義

:::warning 開發建議

因為宮位是基於星盤而存在的，所以我們並不推薦妳手動 `new` 壹個宮位對象，而是使用星盤靜態方法返回的對象使用。星盤的 `palaces` 屬性包含了十二宮的數據，為了和地支的順序保持壹致，它是從 `寅宮` 開始按照地支順序順時針排列的。

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
```

妳可以有幾種方式從上述 `astrolabe` 變量裏獲取到目標宮位，請根據實際需求使用：

1. 通過 `palaces` 的下標獲取

    ```ts
    // 獲取卯宮宮位
    const palace = astrolabe.palaces[1];
    ```

2. 通過 `FunctionalAstrolabe` 類的 `palace()` 方法傳入宮位 `索引` 獲取

    ```ts
    // 獲取卯宮宮位
    const palace = astrolabe.palace(1);
    ```

3. 通過 `FunctionalAstrolabe` 類的 `palace()` 方法傳入宮位 `名稱` 獲取

    ```ts
    // 獲取命宮
    const palace = astrolabe.palace("命宮");
    ```

### FunctionalPalace

***

<Badge type="tip" text="implements" /> `IFuncionalPalace` <Badge type="tip" text="extends" /> [`Palace`](../type-definition.md#palace)

該類所有屬性都是繼承自 [Palace](../type-definition.md#palace)，然後在接口內定義了壹些方法用於對星耀進行分析。

- 接口定義

  ```ts
  interface IFunctionalPalace extends Palace {
    has: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    hasOneOf: (stars: StarName[]) => boolean;
    hasMutagen: (mutagen: Mutagen): boolean;
    notHaveMutagen: (mutagen: Mutagen): boolean;
  }
  ```

- 屬性

  參考 [Palace](../type-definition.md#palace)

- 方法
  
  ### has() <Badge type="warning" text="^1.0.0" />

  - 用途

    判斷某個宮位內是否有傳入的 `星耀`，要 `所有` 星耀 `都在` 宮位內才會返回 `true`

  - 定義

    ```ts
    type has = (stars: StarName[]) => boolean;
    ```

  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名稱，可以包含主星、輔星、雜耀 |

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 是否有 `紫微星` 和 `右弼星`
    ```ts
    const palace = astrolabe.palace("命宮");
    const result = palace.has(["紫微", "右弼"]);
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.palace("命宮").has(["紫微", "右弼"]);
    ```

  ***
  ### notHave() <Badge type="warning" text="^1.0.0" />

  - 用途

    判斷某個宮位內是否沒有傳入的 `星耀`，要所有星耀 `都不在` 宮位內才會返回 `true`

  - 定義

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名稱，可以包含主星、輔星、雜耀 |

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 是沒有 `地空星` 和 `地劫星`
    ```ts
    const palace = astrolabe.palace("命宮");
    const result = palace.notHave(["地空", "地劫"]);
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.palace("命宮").notHave(["地空", "地劫"]);
    ```

  ***
  ### hasOneOf() <Badge type="warning" text="^1.0.0" />

  - 用途

    判斷某個宮位內是否有傳入 `星耀` 的其中壹個，隻要 `命中壹個` 就會返回 `true`

  - 定義

    ```ts
    type hasOneOf = (stars: StarName[]) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名稱，可以包含主星、輔星、雜耀 |

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 是否有 `天魁星` 或 `天鉞星`
    ```ts
    const palace = astrolabe.palace("命宮");
    const result = palace.hasOneOf(["天魁", "天鉞"]);
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.palace("命宮").hasOneOf(["天魁", "天鉞"]);
    ```

  ***

  ### hasMutagen() <Badge type="warning" text="^1.2.0" />

  - 用途

    判斷宮位內是否有生年四化

  - 定義

    ```ts
    type hasMutagen = (mutagen: Mutagen) => boolean;
    ```

  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true`   | -      | 四化名稱【祿｜權｜科｜忌】|

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 是否有 `化祿`
    ```ts
    const palace = astrolabe.palace("命宮");
    const result = palace.hasMutagen("祿");
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.palace("命宮").hasMutagen("祿");
    ```

  ***
  ### notHaveMutagen() <Badge type="warning" text="^1.2.0" />

  - 用途

    判斷宮位內是否沒有生年四化

  - 定義

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true`   | -      | 四化名稱【祿｜權｜科｜忌】|

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 是不是沒有 `化忌`
    ```ts
    const palace = astrolabe.palace("命宮");
    const result = palace.notHaveMutagen("忌");
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.palace("命宮").notHaveMutagen("忌");
    ```
### FunctionalSurpalaces <Badge type="warning" text="^1.2.0" />

***

<Badge type="tip" text="implements" /> `IFunctionalSurpalaces` <Badge type="tip" text="extends" /> [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

該類所有屬性都是繼承自 [SurroundedPalaces](../type-definition.md#surroundedpalaces)，然後在接口內定義了壹些方法用於對星耀進行分析。

- 接口定義

  ```ts
  interface FunctionalSurpalaces extends SurroundedPalaces {
    have: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    haveOneOf: (stars: StarName[]) => boolean;
    haveMutagen: (mutagen: Mutagen) => boolean;
    notHaveMutagen: (mutagen: Mutagen): boolean;
  }
  ```

- 屬性

  參考 [SurroundedPalaces](../type-definition.md#surroundedpalaces)

- 方法
  
  ### have()

  - 用途

    判斷某個宮三方四正內是否有傳入的 `星耀`，要 `所有` 星耀 `都在` 三方四正內才會返回 `true`

  - 定義

    ```ts
    type have = (stars: StarName[]) => boolean;
    ```

  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名稱，可以包含主星、輔星、雜耀 |

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 三方四正是否有 `紫微星` 和 `右弼星`
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宮");
    const result = palaces.have(["紫微", "右弼"]);
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.surroundedPalaces("命宮").have(["紫微", "右弼"]);
    ```

  ***
  ### notHave()

  - 用途

    判斷某個宮三方四正內是否沒有傳入的 `星耀`，要所有星耀 `都不在` 三方四正內才會返回 `true`

  - 定義

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名稱，可以包含主星、輔星、雜耀 |

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 三方四正是否沒有 `地空星` 和 `地劫星`

    ```ts
    const palaces = astrolabe.surroundedPalaces("命宮");
    const result = palaces.notHave(["地空", "地劫"]);
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.surroundedPalaces("命宮").notHave(["地空", "地劫"]);
    ```

  ***
  ### haveOneOf()

  - 用途

    判斷某個宮位的三方四正內是否有傳入 `星耀` 的其中壹個，隻要 `命中壹個` 就會返回 `true`

  - 定義

    ```ts
    type haveOneOf = (stars: StarName[]) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true`   | -      | 星耀名稱，可以包含主星、輔星、雜耀 |

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 三方四正是否有 `天魁星` 或 `天鉞星`
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宮");
    const result = palaces.haveOneOf(["天魁", "天鉞"]);
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.surroundedPalaces("命宮").haveOneOf(["天魁", "天鉞"]);
    ```

  ***

  ### haveMutagen()

  - 用途

    判斷宮位三方四正內是否有生年四化

  - 定義

    ```ts
    type haveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true`   | -      | 四化名稱【祿｜權｜科｜忌】|

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 三方四正是否有 `化祿`
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宮");
    const result = palaces.haveMutagen("祿");
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.surroundedPalaces("命宮").haveMutagen("祿");
    ```

  ***
  ### notHaveMutagen()

  - 用途

    判斷宮位三方四正內是否沒有生年四化

  - 定義

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```
    
  - 參數

    | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
    | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true`   | -      | 四化名稱【祿｜權｜科｜忌】|

  - 返回值

    `boolean`

  - 示例

    如果妳想查看 `命宮` 三方四正是不是沒有 `化忌`
    ```ts
    const palace = astrolabe.surroundedPalaces("命宮");
    const result = palace.notHaveMutagen("忌");
    ```

    當然妳也可以使用 `鏈式調用` 來簡化代碼
    ```ts
    const result = astrolabe.surroundedPalaces("命宮").notHaveMutagen("忌");
    ```
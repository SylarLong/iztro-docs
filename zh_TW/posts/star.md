---
outline: deep
description: "iztro紫微鬥數星曜介紹，iztro的star對象使用方法以及示例代碼。"
---

# 星曜

## 前言

星曜是紫微鬥數裏的重要組成部分，人的個性主要受到星曜的影響。不同的星曜組合形成了不同的個性，如果妳對星曜部分感興趣，我們強烈建議妳點擊 [傳送門](/learn/star.md) 進行相關知識學習。本篇主要關註的是開發層面。

:::tip 提示
在 `iztro` 裏，`主星`、`輔星`、`雜耀` 都被統歸到星曜係統裏，但是 `48神煞` 沒有被歸類到星曜，如果妳還不知道 `48神煞` 是什麽，歡迎點擊 [傳送門](/learn/dec-star.md) 進行學習。
:::

## 功能類定義

與 [FunctionalAstrolabe](./astrolabe.md#functionalastrolabe) 和 [FunctionalPalace](./palace.md#functionalpalace) 壹樣，我們並不建議妳手動去創建壹個 `FunctionalStar` 對象，而是使用其他對象返回的實例。

### FunctionalStar <Badge type="warning" text="^1.2.0" />

---

<Badge type="tip" text="implements" /> `IFunctionalStar` <Badge type="tip" text="extends" /> [`Star`](/type-definition.md#star)

- 接口定義

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

- 屬性
  
  參考 [Star](/type-definition.md#star)

- 方法

  :::danger ❗️註意
  為了使 `FunctionalStar` 類使用起來更順暢，所以引入了 `setPalace()` 和 `setAstrolabe()` 兩個方法，但實際使用過程中請不要手動去調用這兩個方法，以免造成數據錯誤。
  :::

  ### palace()

  - 用途

    獲取星曜所在宮位

  - 定義

    ```ts
    type palace = () => IFunctionalPalace | undefined;
    ```

  - 參數

    `none`

  - 返回值

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`
  
  - 示例

    獲取 `紫微星` 所在的宮位

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微星").palace();
    ```

  ***

  ### surroundedPalaces()

  - 用途

    獲取當前星曜的三方四正宮位

  - 定義

    ```ts
    type surroundedPalaces = () => IFunctionalSurpalaces | undefined;
    ```

  - 參數

    `none`

  - 返回值

    [`FunctionalSurpalaces`](palace.md#functionalsurpalaces) | `undefined`
  
  - 示例

    獲取 `紫微星` 的 `三方四正` 宮位

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palaces = astrolabe.star("紫微星").surroundedPalaces();
    ```

  ***

  ### oppositePalace()

  - 用途

    獲取當前星曜的對宮

  - 定義

    ```ts
    type oppositePalace = () => IFunctionalPalace | undefined;
    ```

  - 參數

    `none`

  - 返回值

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`
  
  - 示例

    獲取 `紫微星` 的 `對宮`

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微星").oppositePalace();
    ```

  ***

  ### withBrightness()

  - 用途

    判斷星曜是否是傳入的亮度，也可以傳入多個亮度，隻要匹配到壹個亮度就會返回 `true`

  - 定義

    ```ts
    type withBrightness = (brightness: Brightness | Brightness[]) => boolean;
    ```

  - 參數

  
   | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
   | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
   | brightness |  [ `Brightness`](/type-definition.md#brightness) \| [`Brightness[]`]((/type-definition.md#brightness)) | `true`   | -      | 需要判斷的星曜亮度  |

  - 返回值

    `boolean`
  
  - 示例

    判斷 `紫微星` 是否處於 `廟` 或者 `旺` 的狀態

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微星").withBrightness(["廟", "旺"]);
    ```

  ***

  ### withMutagen()

  - 用途

    判斷星曜是否產生了四化，也可以傳入多個四化進行判斷，隻要匹配到壹個亮度就會返回 `true`

  - 定義

    ```ts
    type withMutagen = (mutagen: Mutagen | Mutagen[]) => boolean;
    ```

  - 參數

  
   | 參數        | 類型                                      | 是否必填 | 默認值 | 說明                 |
   | ----------- | --------------------------------------- | -------- | ------ | -------------------- |
   | mutagen |  [ `Mutagen`](/type-definition.md#mutagen) \| [`Mutagen[]`]((/type-definition.md#mutagen)) | `true`   | -      | 四化【祿｜權｜科｜忌】  |

  - 返回值

    `boolean`
  
  - 示例

    判斷 `紫微星` 是否處於 `化權` 或者 `化科` 的狀態

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微星").withMutagen(["權", "科"]);
    ```

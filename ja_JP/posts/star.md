---
title: "iztro star API：星曜の取得と分析"
outline: deep
description: "iztroのstar APIを使って命盤の星曜を調べる方法と、プロパティやメソッドをコード例で解説します。"
---

# 星曜  {#星曜}

## はじめに  {#前言}

星曜は紫微斗数の重要な構成要素であり、組み合わせによって異なる性格を表します。背景を学びたい方は[星曜の体系](/ja_JP/learn/star.md)をご覧ください。この章は開発での扱い方を説明します。

:::tip ヒント
`iztro`では、`主星`、`補助星`、`雑曜`を星曜の体系にまとめ、`48 神煞`は別に扱います。`48 神煞`については[48神煞](/ja_JP/learn/dec-star.md)をご覧ください。
:::

## クラスと分析メソッド {#功能类定义}

[FunctionalAstrolabe](./astrolabe.md#functionalastrolabe)や[FunctionalPalace](./palace.md#functionalpalace)と同様に、`FunctionalStar`を自分で生成するより、他のオブジェクトが返すインスタンスを使ってください。

### FunctionalStar <Badge type="warning" text="^1.2.0" /> {#functionalstar}

---

<Badge type="tip" text="implements" /> `IFunctionalStar` <Badge type="tip" text="extends" /> [`Star`](/ja_JP/type-definition.md#star)

- インターフェースの定義

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

- プロパティ

  参照 [Star](/ja_JP/type-definition.md#star)

- メソッド

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 目的

    機能付き星曜を通常のJSONオブジェクトに変換します。分析メソッド、関連する宮や命盤などの実行時参照は含めず、循環参照も安全に除外します。

  - 定義

    ```ts
    type toJSON = () => Star;
    ```

  - パラメータ

    なし

  - 戻り値

    [`Star`](../type-definition.md#star)

  - 使用例

    ```ts
    const data = astrolabe.star("紫微").toJSON();
    ```

  ***

  :::danger ❗️注意
  `FunctionalStar`には、星を所属する宮と命盤に結び付ける`setPalace()`と`setAstrolabe()`があります。通常の利用では、データの誤りを避けるために直接呼び出さないでください。
  :::

  ### palace() {#palace}

  - 目的

    星曜がある宮を取得します。

  - 定義

    ```ts
    type palace = () => IFunctionalPalace | undefined;
    ```

  - パラメータ

    `none`

  - 戻り値

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - 使用例

    `紫微`がある宮を取得します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").palace();
    ```

  ***

  ### surroundedPalaces() {#surroundedpalaces}

  - 目的

    現在の星曜の三方四正に当たる宮を取得します。

  - 定義

    ```ts
    type surroundedPalaces = () => IFunctionalSurpalaces | undefined;
    ```

  - パラメータ

    `none`

  - 戻り値

    [`FunctionalSurpalaces`](palace.md#functionalsurpalaces) | `undefined`

  - 使用例

    `紫微`がある宮の`三方四正`に当たる宮を取得します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palaces = astrolabe.star("紫微").surroundedPalaces();
    ```

  ***

  ### oppositePalace() {#oppositepalace}

  - 目的

    現在の星曜がある宮の対宮を取得します。

  - 定義

    ```ts
    type oppositePalace = () => IFunctionalPalace | undefined;
    ```

  - パラメータ

    `none`

  - 戻り値

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - 使用例

    `紫微`がある宮の`対宮`を取得します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").oppositePalace();
    ```

  ***

  ### withBrightness() {#withbrightness}

  - 目的

    星曜が指定した輝度かどうかを判定します。複数の輝度を渡した場合は、そのうち一つでも一致すれば `true` を返します。

  - 定義

    ```ts
    type withBrightness = (brightness: Brightness | Brightness[]) => boolean;
    ```

  - パラメータ


   | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
   | --- | --- | --- | --- | --- |
   | brightness | [ `Brightness`](/ja_JP/type-definition.md#brightness) \| [`Brightness[]`](/ja_JP/type-definition.md#brightness) | `true` | - | 判定する星曜の輝度 |

  - 戻り値

    `boolean`

  - 使用例

    `紫微` が `廟` または `旺` の状態であるかどうかを確認します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withBrightness(["庙", "旺"]);
    ```

  ***

  ### withMutagen() {#withmutagen}

  - 目的

    星曜に指定した四化があるかを判定します。複数を渡した場合は、そのうち一つでも一致すれば `true` を返します。

  - 定義

    ```ts
    type withMutagen = (mutagen: Mutagen | Mutagen[]) => boolean;
    ```

  - パラメータ


   | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
   | --- | --- | --- | --- | --- |
   | mutagen | [ `Mutagen`](/ja_JP/type-definition.md#mutagen) \| [`Mutagen[]`](/ja_JP/type-definition.md#mutagen) | `true` | - | 四化（祿・權・科・忌） |

  - 戻り値

    `boolean`

  - 使用例

    `紫微` が `權` または `科` の状態であるかどうかを確認します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withMutagen(["权", "科"]);
    ```

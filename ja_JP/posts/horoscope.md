---
title: "iztro horoscope API：運限の取得と分析"
outline: deep
description: "iztroのhoroscope APIを使って命盤の運限を調べる方法と、プロパティやメソッドをコード例で解説します。"
---

# 運限  {#运限}

<Badge type="warning" text="^2.6.2" /> 運限の取得には、命盤の生成時に保存された設定と言語が使われます。グローバルの既定値を変更したり別の命盤を作ったりしても、既存の命盤での取得結果は変わりません。`horoscope()`には有効な`Date`オブジェクトか日付文字列を渡せます。日付を省略すると、呼び出し時の現在時刻を使います。時刻のインデックスを明示する場合は0～12の整数が必要です。無効な日付や時刻インデックスはエラーになります。

## はじめに  {#前言}

紫微斗数の運限には、`大限`、`小限`、`流年`、`流月`、`流日`、`流時`、`分単位の運限`、`秒単位の運限`などがあります。概念と活用法は[運限の説明](/ja_JP/learn/horoscope.md)をご覧ください。`iztro`は`大限`、`小限`、`流年`、`流月`、`流日`、`流時`を提供します。そのうち`大限`、`流年`、`流月`、`流日`、`流時`には`流曜`と`四化`があります。`流月`、`流日`、`流時`の流曜は`v2.4.4`から提供されています。`小限`には独立した流曜がなく、`小限`の四化はその宮の`宮干`から計算されます。

:::tip ヒント
運限の年・月の干支の切り替わりは、命盤に保存された[`horoscopeDivide`](./config-n-plugin.md#配置)の設定に従います。小限の数え年の切り替わりは`ageDivide`で決まります。
:::


## クラスと分析メソッド {#功能类定义}

:::warning 開発提案

運限は命盤に基づくため、`new`で直接生成するより、命盤のインスタンスから取得してください。命盤の[`horoscope()`](./astrolabe.md#horoscope)メソッドが運限のオブジェクトを返します。

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
const horoscope = astrolabe.horoscope('2023-10-26', 2);
```

上記のコードを実行すると、`FunctionalHoroscope` のインスタンスが返されます。

### FunctionalHoroscope {#functionalhoroscope}

***

<Badge type="tip" text="implements" /> `IFunctionalHoroscope` <Badge type="tip" text="extends" /> [`Horoscope`](../type-definition.md#horoscope)

このクラスのプロパティはすべて[Horoscope](../type-definition.md#horoscope)から継承され、インターフェースには運限の星曜を分析するメソッドが加わります。

- インターフェースの定義

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

  <Badge type="warning" text="^2.6.1" /> `palaceName`には、命盤の出力言語にかかわらず、設定されたどの言語の宮名でも渡せます。例えば、中国語で出力する命盤にも英語の宮名`"soul"`を指定できます。

- プロパティ

  参照 [Horoscope](../type-definition.md#horoscope)

- メソッド

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 目的

    機能付き運限のオブジェクトを通常のJSONオブジェクトに変換します。分析メソッドや所属する命盤などの実行時参照は含めず、循環参照も安全に除外します。

  - 定義

    ```ts
    type toJSON = () => Horoscope;
    ```

  - パラメータ

    なし

  - 戻り値

    [`Horoscope`](../type-definition.md#horoscope)

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.horoscope("2023-8-19").toJSON();
    ```

  ***

  ### agePalace() <Badge type="warning" text="v1.3.0" /> {#agepalace}

  - 目的

    `小限`が位置する宮を取得します。

  - 定義

    ```ts
    type agePalace: () => FunctionalPalace | undefined;
    ```

  - パラメータ

    なし

  - 戻り値

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const agePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .agePalace();
    ```

  ***

  ### palace() <Badge type="warning" text="v1.3.0" /> {#palace}

  - 目的

    指定した運限の宮を取得します。

  - 定義

    ```ts
    type palace = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalPalace | undefined;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮の名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 運限の名称 |

  - 戻り値

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - 使用例

    `大限`の`夫妻`宮を取得します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const spousePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .palace("夫妻", "decadal");
    ```

  ***

  ### surroundPalaces() <Badge type="warning" text="^1.3.0" /> {#surroundpalaces}

  - 目的

    指定した運限の宮について、三方四正に当たる宮を取得します。

  - 定義

    ```ts
    type surroundPalaces = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalSurpalaces | undefined;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮の名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 運限の名称 |

  - 戻り値

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces) | `undefined`

  - 使用例

    `流年夫妻宮`の三方四正に当たる宮を取得します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const surpalaces = astrolabe
      .horoscope('2023-10-26', 2)
      .surroundPalaces("夫妻", "yearly");
    ```

  ***

  ### hasHoroscopeStars() <Badge type="warning" text="^1.3.0" /> {#hashoroscopestars}

  - 目的

    指定した運限の宮に流曜があるかを判定します。指定した星曜が **すべて存在する** 場合のみtrueを返します。

  - 定義

    ```ts
    type hasHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscopeStar: StarName[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮の名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 運限の名称 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | 流曜の配列 |

  - 戻り値

    `boolean`

  - 使用例

    `流年夫妻宮`に`年の喜`と`年の曲`の両方があるか確認します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

  ***

  ### notHaveHoroscopeStars() <Badge type="warning" text="^1.3.2" /> {#nothavehoroscopestars}

  - 目的

    指定した運限の宮に、指定した流曜が **一つも存在しない** 場合のみtrueを返します。

  - 定義

    ```ts
    type notHaveHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscope: StarName[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮の名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 運限の名称 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | 流曜の配列 |

  - 戻り値

    `boolean`

  - 使用例

    `流年夫妻宮`に`年の喜`も`年の曲`もないか確認します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .notHaveHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasOneOfHoroscopeStars() <Badge type="warning" text="^1.3.3" /> {#hasoneofhoroscopestars}

  - 目的

    指定した運限の宮に、指定した流曜が **一つでも存在する** 場合にtrueを返します。

  - 定義

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮の名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 運限の名称 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | 流曜の配列 |

  - 戻り値

    `boolean`

  - 使用例

    `流年夫妻宮`に`年の喜`か`年の曲`の少なくとも一方があるか確認します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasOneOfHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasHoroscopeMutagen() <Badge type="warning" text="^1.3.4" /> {#hashoroscopemutagen}

  - 目的

    指定した運限の四化が、対象の宮にあるか確認します。

  - 定義

    ```ts
    type hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮の名称 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 運限の名称 |
    | horoscopeMutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 四化 |

  - 戻り値

    `boolean`

  - 使用例

    `流年夫妻宮`に`禄`があるか確認します。

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeMutagen("夫妻", "yearly", "禄");
    ```

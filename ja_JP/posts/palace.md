---
title: "iztro palace API：宮位の取得と分析"
outline: deep
description: "iztroのpalace APIを使って命盤の十二宮を調べる方法と、プロパティやメソッドをコード例で解説します。"
---

# 宮位  {#宫位}

## はじめに  {#前言}

紫微斗数には `12` 個の宮があり、まとめて `十二人事宮` と呼ばれます。一人の人間に関わる人々や生活のさまざまな側面を表し、順に `命宮`、`兄弟`、`夫妻`、`子女`、`財帛`、`疾厄`、`遷移`、`奴僕`、`官禄`、`田宅`、`福徳`、`父母` と並びます。[命盤](./astrolabe.md)に表示されるこの十二宮に加え、`身宮`、`来因`、`暗合宮` という三つの隠れた宮もあります。各宮の意味は、このAPIのページでは詳しく扱いません。基本的な概念や詳しい説明は[宮の体系](../learn/palace.md)を参照してください。地支が時計回りに並ぶのに対し、宮の名前は反時計回りに並びます。以下の表はその例です。

<table class="astrolabe">
    <tr>
        <td>巳<code>田宅</code></td>
        <td>午<code>官禄</code></td>
        <td>未<code>奴僕</code></td>
        <td>申<code>遷移</code></td>
    </tr>
    <tr>
        <td>辰<code>福徳</code></td>
        <td class="center-palace" rowspan="2" colspan="2">中宮</td>
        <td>酉<code>疾厄</code></td>
    </tr>
    <tr>
        <td>卯<code>父母</code></td>
        <td>戌<code>財帛</code></td>
    </tr>
    <tr>
        <td>寅<code>命宮</code></td>
        <td>丑<code>兄弟</code></td>
        <td>子<code>夫妻</code></td>
        <td>亥<code>子女</code></td>
    </tr>
</table>

> 上の表は一例です。`命宮` の位置は `生年月日` と `出生時間` によって変わり、十二のどの位置にも配置されます。ただし、宮の名前の並び順は変わりません。

宮位という言葉には `宮` と `位置` という二つの概念があります。`生年月日` と `出生時間` から配置を計算する対象が `宮` です。そのため、出生時の命盤では `財帛` 宮の位置は固定されています。`本命盤` という概念になじみがなければ、まず[基礎知識](/ja_JP/learn/basis.md)を読んでください。一方、`位置` は基準となる宮によって決まる `相対的な` 位置です。例えば、`夫妻` 宮を基準とすると、その `財帛の位置` に当たるのは `遷移` 宮です。少し複雑に感じるかもしれませんが、すべての関係を暗記する必要はなく、この違いを理解しておけば十分です。
## クラスと分析メソッド {#功能类定义}

:::warning 開発提案

宮は命盤に属するため、`new` で宮オブジェクトを直接作るのではなく、命盤を生成する静的メソッドの戻り値から取得してください。命盤の `palaces` プロパティには十二宮のデータが入り、地支の順序に合わせて `寅の宮` から時計回りに並んでいます。

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
```

上記の `astrolabe` 変数からターゲットの宮を取得するには、いくつかの方法があります。実際のニーズに応じて使用してください。

1. `palaces` 配列のインデックスで取得する

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palaces[1];
    ```

2. `FunctionalAstrolabe` インスタンスの `palace()` メソッドに宮の `インデックス` を渡して取得します。

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palace(1);
    ```

3. `FunctionalAstrolabe` インスタンスの `palace()` メソッドに宮の `名称` を渡して取得します。

    ```ts
    // 获取命宫
    const palace = astrolabe.palace("命宫");
    ```

### FunctionalPalace {#functionalpalace}

***

<Badge type="tip" text="implements" /> `IFunctionalPalace` <Badge type="tip" text="extends" /> [`Palace`](../type-definition.md#palace)

このクラスは[Palace](../type-definition.md#palace)のプロパティを継承し、宮内の星曜を分析するメソッドを追加します。

- インターフェースの定義

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

- プロパティ

  参照 [Palace](../type-definition.md#palace)

- メソッド

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 目的

    分析機能を持つ宮オブジェクトを通常のJSONオブジェクトに変換します。戻り値には、分析メソッドや関連する命盤などへの実行時参照は含まれません。循環参照は安全に除外されます。

  - 定義

    ```ts
    type toJSON = () => Palace;
    ```

  - パラメータ

    なし

  - 戻り値

    [`Palace`](../type-definition.md#palace)

  - 例

    ```ts
    const data = astrolabe.palace("命宫")?.toJSON();
    ```

  ***

  #### has() <Badge type="warning" text="^1.0.0" /> {#has}

  - 目的

    宮に指定した `星曜` があるかを判定します。`すべての指定星曜`が宮内に`すべて存在する`場合のみ `true` を返します。

  - 定義

    ```ts
    type has = (stars: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜の名称。主星・輔星・雑曜を指定できます |

  - 戻り値

    `boolean`

  - 例

    `命宮` に `紫微` と `右弼` があるかどうかを確認したい場合
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.has(["紫微", "右弼"]);
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.palace("命宫").has(["紫微", "右弼"]);
    ```

  ***
  #### notHave() <Badge type="warning" text="^1.0.0" /> {#nothave}

  - 目的

    指定した `星曜` が宮に存在しないかを判定します。`一つも存在しない`場合のみ `true` を返します。

  - 定義

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜の名称。主星・輔星・雑曜を指定できます |

  - 戻り値

    `boolean`

  - 例

    `命宮` に `地空` も `地劫` もないかを確認する場合：
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHave(["地空", "地劫"]);
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.palace("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### hasOneOf() <Badge type="warning" text="^1.0.0" /> {#hasoneof}

  - 目的

    宮に指定した `星曜` があるかを判定します。指定した星曜が`一つでも存在する`場合に `true` を返します。

  - 定義

    ```ts
    type hasOneOf = (stars: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜の名称。主星・輔星・雑曜を指定できます |

  - 戻り値

    `boolean`

  - 例

    `命宮` に `天魁` または `天鉞` があるかどうかを確認したい場合
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasOneOf(["天魁", "天钺"]);
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.palace("命宫").hasOneOf(["天魁", "天钺"]);
    ```

  ***
  #### hasMutagen() <Badge type="warning" text="^1.2.0" /> {#hasmutagen}

  - 目的

    宮に指定した生年四化があるかを判定します。

  - 定義

    ```ts
    type hasMutagen = (mutagen: Mutagen) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 四化の名称：禄・権・科・忌 |

  - 戻り値

    `boolean`

  - 例

    `命宮` に `禄` があるかどうかを確認したい場合
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasMutagen("禄");
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.palace("命宫").hasMutagen("禄");
    ```

  ***
  #### notHaveMutagen() <Badge type="warning" text="^1.2.0" /> {#nothavemutagen}

  - 目的

    宮に指定した生年四化がないかを判定します。

  - 定義

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 四化の名称：禄・権・科・忌 |

  - 戻り値

    `boolean`

  - 例

    `命宮` に `忌` がないかを確認する場合：
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.palace("命宫").notHaveMutagen("忌");
    ```
  #### isEmpty() <Badge type="warning" text="^2.0.6" /> {#isempty}

  - 目的

    宮が空宮、つまり主星のない宮かを判定します。流派によっては、特定のほかの星曜があれば空宮とみなしません。その例外となる星曜の一覧を、任意の引数として指定できます。

  - 定義

    ```ts
    type isEmpty = (excludeStars?: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | excludeStars | [`StarName[]`](../type-definition.md#starname) | `false` | - | 星曜名の配列 |

  - 戻り値

    `boolean`
  #### astrolabe() <Badge type="warning" text="^2.1.0" /> {#astrolabe}

  - 目的

    現在の宮が属する命盤オブジェクトを取得します。

  - 定義

    ```ts
    type astrolabe = () => IFunctionalAstrolabe | undefined;
    ```

  - パラメータ

    なし

  - 戻り値

  [`IFunctionalAstrolabe`](./astrolabe.md#functionalastrolabe) | `undefined`;
  #### fliesTo() <Badge type="warning" text="^2.1.0" /> {#fliesto}

  - 目的

    元の宮から対象の宮への飛化を判定します。四化を一つ、または配列で指定でき、指定した四化がすべて対象の宮に飛化する場合に `true` を返します。

  - 定義

    ```ts
    type fliesTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | to | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 対象の宮のインデックスまたは名称 |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen) \|[`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 四化（禄・権・科・忌） |

  - 戻り値

    `boolean`
  #### fliesOneOfTo() <Badge type="warning" text="^2.1.0" /> {#fliesoneofto}

  - 目的

    指定した四化のうち一つでも、元の宮から対象の宮へ飛化すれば `true` を返します。

  - 定義

    ```ts
    type fliesOneOfTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | to | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 対象の宮のインデックスまたは名称 |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen) \|[`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 四化（禄・権・科・忌） |

  - 戻り値

    `boolean`
  #### notFlyTo() <Badge type="warning" text="^2.1.0" /> {#notflyto}

  - 目的

    元の宮から対象の宮へ指定した四化が飛化しないことを判定します。一つまたは配列で指定でき、すべての指定四化が対象の宮へ飛化しない場合のみ `true` を返します。

  - 定義

    ```ts
    type notFlyTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | to | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 対象の宮のインデックスまたは名称 |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen) \|[`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 四化（禄・権・科・忌） |

  - 戻り値

    `boolean`
  #### selfMutaged() <Badge type="warning" text="^2.1.0" /> {#selfmutaged}

  - 目的

    宮の自化を判定します。四化の配列を渡した場合は、指定した四化がすべて自化しているときに `true` を返します。

  - 定義

    ```ts
    type selfMutaged = (
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen) \|[`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 四化（禄・権・科・忌） |

  - 戻り値

    `boolean`
  #### selfMutagedOneOf() <Badge type="warning" text="^2.1.0" /> {#selfmutagedoneof}

  - 目的

    宮の自化を判定します。引数を省略した場合は四種類すべてを対象とし、一つでも一致すれば `true` を返します。

  - 定義

    ```ts
    type selfMutagedOneOf = (
      withMutagens?: Mutagen[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | 四化（禄・権・科・忌） |

  - 戻り値

    `boolean`
  #### notSelfMutaged() <Badge type="warning" text="^2.1.0" /> {#notselfmutaged}

  - 目的

    宮に指定した四化の自化が一つもないかを判定します。引数を省略した場合は、四種類すべてを確認します。

  - 定義

    ```ts
    type notSelfMutaged = (
      withMutagens?: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen) \|[`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | 四化（禄・権・科・忌） |

  - 戻り値

    `boolean`
  #### mutagedPlaces() <Badge type="warning" text="^2.1.0" /> {#mutagedplaces}

  - 目的

    現在の宮から生じる四化が入る四つの宮を配列で返します。添字の順序は化禄、化権、化科、化忌です。

  - 定義

    ```ts
    type mutagedPlaces = () => (IFunctionalPalace | undefined)[];
    ```

  - パラメータ

    なし

  - 戻り値

    ([`IFunctionalPalace`](#functionalpalace) | `undefined`)[]
### FunctionalSurpalaces <Badge type="warning" text="^1.2.0" /> {#functionalsurpalaces}

***

<Badge type="tip" text="implements" /> `IFunctionalSurpalaces` <Badge type="tip" text="extends" /> [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

このクラスは[SurroundedPalaces](../type-definition.md#surroundedpalaces)のプロパティを継承し、三方四正の星曜を分析するメソッドを追加します。

- インターフェースの定義

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

- プロパティ

  参照 [SurroundedPalaces](../type-definition.md#surroundedpalaces)

- メソッド

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson-1}

  - 目的

    分析機能を持つ三方四正オブジェクトを通常のJSONオブジェクトに変換します。戻り値には分析メソッドや実行時参照は含まれません。循環参照は安全に除外されます。

  - 定義

    ```ts
    type toJSON = () => SurroundedPalaces;
    ```

  - パラメータ

    なし

  - 戻り値

    [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

  - 例

    ```ts
    const data = astrolabe.surroundedPalaces("命宫").toJSON();
    ```

  ***

  #### have() {#have}

  - 目的

    宮の三方四正に指定した `星曜` があるかを判定します。`すべての指定星曜` がその範囲内に `すべて存在する` 場合のみ `true` を返します。

  - 定義

    ```ts
    type have = (stars: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜の名称。主星・輔星・雑曜を指定できます |

  - 戻り値

    `boolean`

  - 例

    `命宮` の三方四正に `紫微` と `右弼` の両方があるかを確認する場合：
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.have(["紫微", "右弼"]);
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").have(["紫微", "右弼"]);
    ```

  ***
  #### notHave() {#nothave-1}

  - 目的

    指定した `星曜` が宮の三方四正に存在しないかを判定します。指定した星曜がその範囲に`一つも存在しない`場合のみ `true` を返します。

  - 定義

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜の名称。主星・輔星・雑曜を指定できます |

  - 戻り値

    `boolean`

  - 例

    `命宮` の三方四正に `地空` も `地劫` もないかを確認する場合：

    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.notHave(["地空", "地劫"]);
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### haveOneOf() {#haveoneof}

  - 目的

    宮の三方四正に指定した星曜が一つでもあるかを判定します。その範囲内に一つでもあれば `true` を返します。

  - 定義

    ```ts
    type haveOneOf = (stars: StarName[]) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜の名称。主星・輔星・雑曜を指定できます |

  - 戻り値

    `boolean`

  - 例

    `命宮` の三方四正に `天魁` または `天鉞` があるかを確認します：

    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveOneOf(["天魁", "天钺"]);
    ```

  ***
  #### haveMutagen() {#havemutagen}

  - 目的

    宮の三方四正に指定した生年四化があるかを判定します。

  - 定義

    ```ts
    type haveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 四化の名称：禄・権・科・忌 |

  - 戻り値

    `boolean`

  - 例

    `命宮` の三方四正に `禄` があるかを確認する場合：
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.haveMutagen("禄");
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveMutagen("禄");
    ```

  ***
  #### notHaveMutagen() {#nothavemutagen-1}

  - 目的

    宮の三方四正のどこにも、指定した生年四化がないかを判定します。

  - 定義

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 四化の名称：禄・権・科・忌 |

  - 戻り値

    `boolean`

  - 例

    `命宮` の三方四正に `忌` がないかを確認する場合：
    ```ts
    const palace = astrolabe.surroundedPalaces("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    `メソッドチェーン` を使うと、コードをより簡潔に書けます。
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHaveMutagen("忌");
    ```

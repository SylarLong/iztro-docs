---
title: "iztro astro API：命盤の作成と分析"
outline: deep
description: "iztroのastro APIを使った命盤の作成・照会方法と、命盤のプロパティやメソッドをコード例で解説します。"
---

# 命盤  {#星盘}

## はじめに  {#前言}

紫微斗数の星盤は命盤とも呼ばれ、`十二の宮`と`中宮`から成ります。各宮の`地支`は固定され、並びは`寅`から始まり、`子`からではありません。旧暦の正月が寅月に当たるためで、これを`旧暦正月は寅に対応する`といいます。`iztro`では、`寅の宮`のインデックスが`0`、`卯の宮`が`1`となり、時計回りに続きます。次の表をご覧ください。

<table class="astrolabe">
    <tr>
        <td>巳<code>3</code></td>
        <td>午<code>4</code></td>
        <td>未<code>5</code></td>
        <td>申<code>6</code></td>
    </tr>
    <tr>
        <td>辰<code>2</code></td>
        <td class="center-palace" rowspan="2" colspan="2">中宮</td>
        <td>酉<code>7</code></td>
    </tr>
    <tr>
        <td>卯<code>1</code></td>
        <td>戌<code>8</code></td>
    </tr>
    <tr>
        <td>寅<code>0</code></td>
        <td>丑<code>11</code></td>
        <td>子<code>10</code></td>
        <td>亥<code>9</code></td>
    </tr>
</table>

`中宮`には任意の情報を表示でき、通常は命盤全体の解釈に影響しません。周囲の`十二宮`には星曜、四化、運限、宮名などの情報を格納します。`宮位`の詳細は[宮の説明](./palace.md)をご覧ください。このページは命盤全体の情報を扱います。命盤は宮と星曜から成るため、初めての方には[基礎知識](/ja_JP/learn/basis.md)からの学習をお勧めします。

`iztro`をインストールしたら、次のコードで`命盤 (astro)`オブジェクトを読み込めます。`iztro`の導入方法は[インストール手順](/ja_JP/quick-start.md#安装)をご覧ください。

## `astro`の静的メソッド {#astro-的静态方法}

静的メソッドを使うには、まず`import`でオブジェクトを読み込んでください。

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";
```

== CommonJS

```js
var { astro } = require("iztro");
```

:::

---

### 命盤の設定と入力値の検証 <Badge type="warning" text="^2.6.2" /> {#排盘配置与输入校验}

`bySolar`、`byLunar`、`withOptions`が返す命盤は、生成時の設定と言語を保存します。グローバルの既定値を変更したり、別の言語で命盤を作ったりしても、既存の命盤の運限や四化の分析結果は変わりません。

`withOptions`の`type`は省略でき、既定では陽暦を使います。`config`はその命盤の設定だけを上書きします。命盤の生成や日付補助メソッドで`language`を省略すると`zh-CN`となり、言語を指定しても他の呼び出しには影響しません。対応する値は`zh-CN`、`zh-TW`、`en-US`、`ja-JP`、`ko-KR`、`vi-VN`です。

年は1～9999で、陽暦または旧暦に実在する日付が必要です。日付文字列はハイフン、スラッシュ、ピリオドで区切れ、` HH:mm`または` HH:mm:ss`を付けられます。過去の陽暦の日付は、基盤となる暦のユリウス暦・グレゴリオ暦の切り替え規則に従います。時刻インデックスは0～12の整数です。未対応の性別、言語、日付の種類、命盤の種類や、真偽値でない閏月オプションはエラーになります。旧暦の日付は実際の月の日数で検証し、閏月のない月では`isLeapMonth: true`を無視します。

設定の適用範囲、`getConfig()`が返す独立したコピー、`resetConfig()`については、[設定とプラグイン](./config-n-plugin.md)をご覧ください。

### astrolabeBySolarDate <Badge type="danger" text="deprecated" /> {#astrolabebysolardate}

このメソッドは`v2.0.5`で非推奨になりました。引数と戻り値は同じなので、[`bySolar`](#bysolar)を使ってください。

### bySolar <Badge type="warning" text="^2.0.5" /> {#bysolar}

- 目的

  陽暦の日付から命盤を生成します。

- 定義

  ```ts
  export type bySolar = (
    solarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    fixLeap: boolean = true,
    language: Language = "zh-CN"
  ) => FunctionalAstrolabe;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | グレゴリオ暦の日付【YYYY-M-D】 |
  | timeIndex | `number` | `true` | - | 出生時辰のインデックス [0–12]。早子時 (0) から晩子時 (12) に対応します。 |
  | gender | [`GenderName`](/ja_JP/type-definition.md#gendername) | `true` | - | 性別【男性/女性】 |
  | fixLeap | `boolean` | `false` | `true` | 閏月を調整するかどうか。`true` の場合、閏月の前半を前月、後半を翌月として扱います。 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 戻り値

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 使用例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
  ```

---

### astrolabeByLunarDate <Badge type="danger" text="deprecated" /> {#astrolabebylunardate}

このメソッドは`v2.0.5`で非推奨になりました。引数と戻り値は同じなので、[`byLunar`](#bylunar)を使ってください。

### byLunar <Badge type="warning" text="^2.0.5" /> {#bylunar}

- 目的

  旧暦の日付から命盤を生成します。筆者は`bySolar`を直接使うことを勧めています。このメソッドも旧暦を陽暦に変換した後、`bySolar`を呼んで結果を得るためです。

- 定義

  ```ts
  export type byLunar = (
    lunarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language
  ) => FunctionalAstrolabe;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | 旧暦の日付 [YYYY-M-D]。`旧暦2000年7月17日`なら `2000-7-17` を渡します。 |
  | timeIndex | `number` | `true` | - | 出生時辰のインデックス [0–12]。早子時 (0) から晩子時 (12) に対応します。 |
  | gender | [`GenderName`](/ja_JP/type-definition.md#gendername) | `true` | - | 性別【男性/女性】 |
  | isLeapMonth | `boolean` | `false` | `false` | 指定した旧暦の月が閏月かどうか。その月に閏月がない場合、この引数は無効です。 |
  | fixLeap | `boolean` | `false` | `true` | 閏月を調整するかどうか。`true` の場合、閏月の前半を前月、後半を翌月として扱います。 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 戻り値

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 使用例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.byLunar("2000-8-16", 2, "女", false, true, "zh-CN");
  ```

---

### withOptions <Badge type="warning" text="^2.4.1" /> {#withoptions}

- 目的

  `bySolar`と`byLunar`を呼び出しやすくしたラッパーを使って、命盤を生成します。

- 定義

  ```ts
  type Option = {
    type?: 'solar' | 'lunar';
    dateStr: string;
    timeIndex: number;
    gender: GenderName;
    isLeapMonth?: boolean;
    fixLeap?: boolean;
    language?: Language;
    config?: Config;
    astroType?: AstroType;
  };

  export type withOptions = (
    option: Option
  ) => FunctionalAstrolabe;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | type | `solar` \| `lunar` | `false` | `solar` | 日付型 |
  | dateStr | `string` | `true` | - | YYYY-M-D形式の生年月日 |
  | timeIndex | `number` | `true` | - | 出生時辰のインデックス [0–12]。早子時 (0) から晩子時 (12) に対応します。 |
  | gender | [`GenderName`](/ja_JP/type-definition.md#gendername) | `true` | - | 性別【男性/女性】 |
  | isLeapMonth | `boolean` | `false` | `false` | 指定した旧暦の月が閏月かどうか。その月に閏月がない場合、この引数は無効です。 |
  | fixLeap | `boolean` | `false` | `true` | 閏月を調整するかどうか。`true` の場合、閏月の前半を前月、後半を翌月として扱います。 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |
  | config | [`Config`](../type-definition.md#config) | `false` | - | 今回作成する命盤に限り、輝度・四化・時刻の区切り設定を上書きします (^2.6.2)。 |
  | astroType <Badge type="warning" text="^2.5.0" /> | [`AstroType`](../type-definition.md#astrotype) | `false` | `heaven` | 命盤の種類。`config.algorithm` が `zhongzhou` のときだけ、天盤・地盤・人盤の選択に使います。 |

- 戻り値

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 使用例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.withOptions({
      type: 'solar',
      dateStr: '1999-12-29',
      timeIndex: 2,
      gender: 'female',
      isLeapMonth: false,
      fixLeap: true,
      language: 'zh-CN',
      config: { algorithm: 'zhongzhou' },
      astroType: 'earth'
    })
  ```

  :::tip ヒント
  `astroType`には`heaven`、`earth`、`human`を指定できます。既定の`heaven`は天盤です。`earth`は身宮を命宮とし、`human`は福德宮を命宮とします。[`AstroType`](../type-definition.md#astrotype)をご覧ください。
  :::

---

### getMajorStarBySolarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbysolardate}

- 目的

  陽暦の日付から命宮の主星を取得します。

- 定義

  ```ts
  type getMajorStarBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    fixLeap: boolean = true,
    language?: Language,
  ) => string;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | グレゴリオ暦の日付【YYYY-M-D】 |
  | timeIndex | `number` | `true` | - | 出生時辰のインデックス [0–12]。早子時 (0) から晩子時 (12) に対応します。 |
  | fixLeap | `boolean` | `false` | `true` | 閏月を調整するかどうか。`true` の場合、閏月の前半を前月、後半を翌月として扱います。 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 使用例

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarBySolarDate('2023-4-7', 0);
  ```

---

### getMajorStarByLunarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbylunardate}

- 目的

  旧暦の日付から命宮の主星を取得します。

- 定義

  ```ts
  type getMajorStarByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language,
  ) =>
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | 旧暦の日付 [YYYY-M-D]。`旧暦2000年7月17日`なら `2000-7-17` を渡します。 |
  | timeIndex | `number` | `true` | - | 出生時辰のインデックス [0–12]。早子時 (0) から晩子時 (12) に対応します。 |
  | isLeapMonth | `boolean` | `false` | `false` | 指定した旧暦の月が閏月かどうか。その月に閏月がない場合、この引数は無効です。 |
  | fixLeap | `boolean` | `false` | `true` | 閏月を調整するかどうか。`true` の場合、閏月の前半を前月、後半を翌月として扱います。 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 使用例

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarByLunarDate('2023-2-17', 0, true, false);
  ```

---

### getSignBySolarDate <Badge type="warning" text="^1.2.1" /> {#getsignbysolardate}

- 目的

  陽暦の日付から星座を取得します。

- 定義

  ```ts
  type getSignBySolarDate = (
    solarDateStr: string,
    language?: Language
  ) => string;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | グレゴリオ暦の日付【YYYY-M-D】 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 使用例

  ```ts
  import { astro } from 'isztro';

  const result = getSignBySolarDate('2023-9-5');
  ```

---

### getSignByLunarDate <Badge type="warning" text="^1.2.1" /> {#getsignbylunardate}

- 目的

  旧暦の日付から星座を取得します。

- 定義

  ```ts
  type getSignByLunarDate = (
    lunarDateStr: string,
    isLeapMonth?: boolean,
    language?: Language
  ) => string;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | 旧暦の日付 [YYYY-M-D]。`旧暦2000年7月17日`なら `2000-7-17` を渡します。 |
  | isLeapMonth | `boolean` | `false` | `false` | 指定した旧暦の月が閏月かどうか。その月に閏月がない場合、この引数は無効です。 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 使用例

  ```ts
  import { astro } from 'isztro';

  const result = getSignByLunarDate('2023-7-21');
  ```


---

### getZodiacBySolarDate <Badge type="warning" text="^1.2.1" /> {#getzodiacbysolardate}

- 目的

  陽暦の日付から十二支の動物を取得します。

- 定義

  ```ts
  type getZodiacBySolarDate = (solarDateStr: string, language?: Language) => string;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | グレゴリオ暦の日付【YYYY-M-D】 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 使用例

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacBySolarDate('2023-2-20');
  ```

---

### getZodiacByLunarYear <Badge type="warning" text="^1.2.1" /> {#getzodiacbylunaryear}

- 目的

  旧暦の年から十二支の動物を取得します。

- 定義

  ```ts
  type getZodiacByLunarYear = (year: number, language?: Language) => string;
  ```

- パラメータ

  | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
  | --- | --- | --- | --- | --- |
  | year | `number` | `true` | - | 旧暦の年 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 戻り値に使用する言語です。`zh-CN`、`zh-TW`、`en-US`、`ko-KR`、`ja-JP`、`vi-VN`に対応しています。 |

- 使用例

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacByLunarYear(2023);
  ```

---

## クラスと分析メソッド {#功能类定义}

::: warning 開発提案
`FunctionalAstrolabe`を直接生成するより、[astroの静的メソッド](./astrolabe.md#astro-的静态方法)でデータを取得することをお勧めします。
:::

### FunctionalAstrolabe {#functionalastrolabe}

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

このクラスは[Astrolabe](../type-definition.md#astrolabe)のプロパティを継承し、命盤を分析するメソッドを加えます。[`bySolar()`](./astrolabe.md#bysolar)と[`byLunar()`](./astrolabe.md#bylunar)は、このクラスのインスタンスを返します。

- インターフェースの定義

  ```ts
  interface IFunctionalAstrolabe extends Astrolabe {
    toJSON: () => Astrolabe;
    use(plugin: Plugin): void;
    horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;
    decadalList: () => DecadalHoroscope[];
    yearlyList: (indexOrName: number | PalaceName) => YearlyHoroscope[];
    monthlyList: (year: number, fixLeap?: boolean) => MonthlyHoroscope[];
    palace: (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;
    surroundedPalaces: (indexOrName: number | PalaceName) => SurroundedPalaces;
    isSurrounded: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    isSurroundedOneOf: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    notSurrounded: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    hasMutagenInSurroundedPalace: (
      indexOrName: number | PalaceName,
      mutagen: Mutagen
    ) => boolean;
    hasMutagenInOppositePalace: (
      indexOrName: number | PalaceName,
      mutagen: Mutagen
    ) => boolean;
  }
  ```

- プロパティ

  リファレンス [Astrolabe](../type-definition.md#astrolabe)

- メソッド

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 目的

    機能付き命盤を通常のJSONオブジェクトに変換します。分析メソッド、プラグイン関数、実行時参照は含めず、循環参照も安全に除外します。

  - 定義

    ```ts
    type toJSON = () => Astrolabe;
    ```

  - パラメータ

    なし

  - 戻り値

    [`Astrolabe`](../type-definition.md#astrolabe)

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.toJSON();
    ```

  ***

  ### use() <Badge type="warning" text="^2.3.0" /> {#use}

  - 目的

    現在の命盤のインスタンスにプラグインを適用します。[`astro.loadPlugin()`](./config-n-plugin.md#插件)と異なり、`use()`はこのインスタンスだけに作用します。

  - 定義

    ```ts
    type use = (plugin: Plugin) => void;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | plugin | [`Plugin`](../type-definition.md#plugin) | `true` | - | 現在の命盤に適用するプラグイン関数 |

  - 戻り値

    `void`

  - 使用例

    ```ts
    import { astro, FunctionalAstrolabe } from "iztro";

    interface IAstrolabe extends FunctionalAstrolabe {
      soulPalaceName: () => string;
    }

    function soulPalacePlugin(this: IAstrolabe) {
      this.soulPalaceName = () => this.palace("命宫")?.name ?? "";
    }

    const astrolabe = astro.bySolar<IAstrolabe>("2000-8-16", 2, "女");
    astrolabe.use(soulPalacePlugin);
    const name = astrolabe.soulPalaceName();
    ```

  ***

  ### horoscope() <Badge type="warning" text="^0.2.0" /> {#horoscope}

  - 目的

    運限のデータを取得します。呼び出し時点のデータが必要なら引数をすべて省略でき、その時点のシステム時刻で計算します。

    :::warning 注記

    - `date`が`YYYY-M-D`形式の日付だけの文字列で、`timeIndex`を省略した場合は、`date`の当日の`早子時`を`流時`の時刻として使います。
    - `date`が`YYYY-M-D HH`形式の時刻を含む、または`Date`インスタンスで、`timeIndex`を省略した場合は、`date`の時を時辰に変換し、`流時`の計算に使います。
    - `timeIndex`を指定すると、日付から求めた時刻より優先されます。
      :::

  - 定義

    ```ts
    type horoscope = (date?: string | Date, timeIndex?: number) => FunctionalHoroscope;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | date | `string` \| `Date` | `false` | `new Date()` | グレゴリオ暦の日付【YYYY-M-D】 |
    | timeIndex | `number` | `false` | `0` | 時辰のインデックス [0–12] |

  - 戻り値

    [`FunctionalHoroscope`](./horoscope.md#functionalhoroscope)

    :::danger 注記
    `v1.3.4`で戻り値の型は`Horoscope`から`FunctionalHoroscope`に変わりましたが、既存の使い方と互換性があります。
    :::

  - 使用例

    :::tabs
    == パラメータは渡されません

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope();
    ```

    == 日付文字列を渡します

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate(
      "2000-8-16",
      2,
      "女",
      true,
      "zh-CN"
    );
    const horoscope = astrolabe.horoscope("2023-8-31");
    ```

    == Date オブジェクトを渡す

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392));
    ```

    == 日付と時刻インデックスを渡します

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392), 3);
    ```

    :::

  ***

  ### decadalList() <Badge type="warning" text="^2.6.0" /> {#decadallist}

  - 目的

    大限を開始順に並べた一覧を取得します。配列のインデックス`0`は最初の大限です。各項目には、対応する宮、開始・終了時の数え年と年、干支、四化、流曜、大限の十二宮が含まれます。

  - 定義

    ```ts
    type decadalList = () => DecadalHoroscope[];
    ```

  - 戻り値

    [`DecadalHoroscope[]`](../type-definition.md#decadalhoroscope)

  - 使用例

    ```ts
    const decadals = astrolabe.decadalList();
    const firstDecadal = decadals[0];
    ```

  ***

  ### yearlyList() <Badge type="warning" text="^2.6.0" /> {#yearlylist}

  - 目的

    大限のインデックスまたは本命の宮名から、その大限に含まれる流年の一覧を取得します。各項目には数え年、年、流年の干支、四化、流曜、流年の十二宮が含まれます。

  - 定義

    ```ts
    type yearlyList = (
      indexOrName: number | PalaceName
    ) => YearlyHoroscope[];
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 大限のインデックス（`0`が最初の大限）、または本命盤の宮名 |

  - 戻り値

    [`YearlyHoroscope[]`](../type-definition.md#yearlyhoroscope)

  - 使用例

    ```ts
    const firstDecadalYearlies = astrolabe.yearlyList(0);
    const soulPalaceYearlies = astrolabe.yearlyList("命宫");
    ```

  ***

  ### monthlyList() <Badge type="warning" text="^2.6.0" /> {#monthlylist}

  - 目的

    指定した年の流月の一覧を取得します。各項目には数え年、年、月、流月の干支、四化、流曜、流月の十二宮が含まれます。

    閏月がなければ12項目を返します。閏月があり`fixLeap=false`の場合は13項目、`fixLeap=true`の場合は閏月を1日～15日と16日～月末に分け、14項目を返します。

  - 定義

    ```ts
    type monthlyList = (
      year: number,
      fixLeap?: boolean
    ) => MonthlyHoroscope[];
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | year | `number` | `true` | - | 流年の年。`yearlyList()` が返す項目の `year` をそのまま使えます。 |
    | fixLeap | `boolean` | `false` | `true` | 閏月の前半と後半を分けて計算するかどうか |

  - 戻り値

    [`MonthlyHoroscope[]`](../type-definition.md#monthlyhoroscope)

  - 使用例

    ```ts
    const year = astrolabe.yearlyList(0)[0].year;
    const adjusted = astrolabe.monthlyList(year);
    const unadjusted = astrolabe.monthlyList(year, false);
    ```

  ***

  ### star() <Badge type="warning" text="^1.2.0" /> {#star}

  - 目的

    星曜の名前から、そのオブジェクトのインスタンスを取得します。

  - 定義

    ```ts
    type star = (starName: StarName) => IFunctionalStar;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | starName | [`StarName`](../type-definition.md#starname) | `true` | - | 星曜名 |

  - 戻り値

    [`FunctionalStar`](./star.md#functionalstar)

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `紫微星` 所在宫位
    const star = astrolabe.star("紫微");
    ```

  ***
  ### palace() <Badge type="warning" text="^1.0.0" /> {#palace}

  - 目的

    命盤から指定した`宮`を取得します。

  - 定義

    ```ts
    type palace = (
      indexOrName: number | PalaceName
    ) => IFunctionalPalace | undefined;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮のインデックスまたは名称 |

  - 戻り値

    [`FunctionalPalace`](./palace.md#functionalpalace)

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫`
    const palace = astrolabe.palace(0);

    // 获取 `命宫`
    const soulPalace = astrolabe.palace("命宫");
    ```

  ***

  ### surroundedPalaces() <Badge type="warning" text="^1.1.0" /> {#surroundedpalaces}

  - 目的

    `三方四正`に当たる宮を取得します。入力した`対象の宮`、その`対宮`、相対的な`財帛の位置`と`官禄の位置`の計四宮です。`宮`と`位置`は異なる概念です。宮や三方四正の意味は、[宮の説明](./palace.md)をご覧ください。

  - 定義

    ```ts
    type surroundedPalaces = (
      indexOrName: number | PalaceName
    ) => IFunctionalSurpalaces;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮のインデックスまたは名称 |

  - 戻り値

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces)

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫` 三方四正
    const surroundedPalaces = astrolabe.surroundedPalaces(0);

    // 获取 `命宫` 三方四正
    const surroundedPalacesOfSoul = astrolabe.surroundedPalaces("命宫");
    ```

  ***

  ### isSurrounded() <Badge type="warning" text="^1.0.0" /> <Badge type="danger" text="deprecated" /> {#issurrounded}

  :::danger 注記
  このメソッドは`v1.2.0`で非推奨になりました。[FunctionalSurpalaces](palace.md#functionalsurpalaces)の[have()](palace.md#have)メソッドを使ってください。
  :::

  - 目的

    指定した宮の`三方四正`に、対象の`星曜`が**すべて**ある場合にのみ`true`を返します。

  - 定義

    ```ts
    type isSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮のインデックスまたは名称 |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜名の配列 |

  - 戻り値

    `boolean`

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.isSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.isSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### isSurroundedOneOf() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" /> {#issurroundedoneof}

  :::danger 注記
  このメソッドは`v1.2.0`で非推奨になりました。[FunctionalSurpalaces](palace.md#functionalsurpalaces)の[haveOneOf()](palace.md#haveoneof)メソッドを使ってください。
  :::

  - 目的

    指定した宮の`三方四正`に、入力した星の`いずれか一つ`があるか確認します。`一つ`でもあれば`true`を返します。

  - 定義

    ```ts
    type isSurroundedOneOf = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮のインデックスまたは名称 |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜名の配列 |

  - 戻り値

    `boolean`

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const palace = astrolabe.isSurroundedOneOf(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const soulPalace = astrolabe.isSurroundedOneOf("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### notSurrounded() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" /> {#notsurrounded}

  :::danger 注記
  このメソッドは`v1.2.0`で非推奨になりました。[FunctionalSurpalaces](palace.md#functionalsurpalaces)の[notHave()](palace.md#nothave-1)メソッドを使ってください。
  :::

  - 目的

    指定した宮の`三方四正`が対象の星を`含まないか`判定します。すべての対象星が`存在しない`場合にのみ`true`を返します。

  - 定義

    ```ts
    type notSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - パラメータ

    | パラメータ | 型 | 必須 | デフォルト値 | 説明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 宮のインデックスまたは名称 |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 星曜名の配列 |

  - 戻り値

    `boolean`

  - 使用例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.notSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.notSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

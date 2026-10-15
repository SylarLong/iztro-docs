---
outline: deep
description: "iztroの計算設定を変更する方法と、プラグインで命盤の機能を拡張する方法を解説します。"
---

# 設定とプラグイン<Badge type="warning" text="^2.3.0" />  {#配置和插件}

iztroの設定とプラグイン機能を紹介します。紫微斗数には多くの流派があり、四化や星曜の輝度に少しずつ違いがあります。こうした違いに対応し、機能を拡張できるように、iztroは`v2.3.0`でグローバル設定と外部プラグインの機能を導入しました。

:::tip ヒント
iztro向けのオープンソースのプラグインライブラリを開発した方は、[作者にご連絡ください](../about.md#怎么联系我❓)。他の方が利用できるよう、ドキュメントの一覧に掲載できます。
:::

## 設定 {#配置}

設定項目は[設定の定義](../type-definition.md#config)を参照してください。グローバル設定は、命盤を作成するメソッドの呼び出し前に`astro.config()`を呼び出すだけです。

```ts
import { astro } from 'iztro';

astro.config({
  mutagens: { 庚: ['太阳', '武曲', '天同', '天相'] },
  brightness: {
    贪狼: ['旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺'],
  },
});
```

上記のコードを実行してから命盤を作成すると、指定した設定が既定の設定と統合されて適用されます。既定値と同じ項目を改めて指定する必要はありません。四化の既定値は[十天干四化表](../learn/mutagen.md#十天干四化表)、星曜の輝度の既定値は[星曜輝度表](../learn/star.md#星曜亮度表)を参照してください。

`mutagens`と`brightness`のほか、次のオプションで命盤計算の規則を調整できます。

| 設定項目 | 指定できる値 | デフォルト値 | 説明 |
| --- | --- | --- | --- |
| `yearDivide` <Badge type="warning" text="^2.4.0" /> | `normal` \| `exact` | `normal` | 年の干支の区切り。`normal` は旧暦正月初一、`exact` は節気の立春を境とします。 |
| `horoscopeDivide` <Badge type="warning" text="^2.4.3" /> | `normal` \| `exact` | `normal` | 運限で使う年と月の干支の区切り |
| `ageDivide` <Badge type="warning" text="^2.4.5" /> | `normal` \| `birthday` | `normal` | 小限の数え年の区切り。`normal` は暦年、`birthday` は旧暦の誕生日を境とします。 |
| `dayDivide` <Badge type="warning" text="^2.5.2" /> | `forward` \| `current` | `forward` | 晩子時をどの日に属させるか。`forward` は翌日、`current` は当日として扱います。 |
| `algorithm` <Badge type="warning" text="^2.5.0" /> | `default` \| `zhongzhou` | `default` | 星曜の配置規則。`default` は一般的な方式、`zhongzhou` は中州派の方式です。 |

:::warning 注記
`v2.6.2` 以降、`astro.config()` が設定するのは、その後に作成する命盤の既定値だけです。`withOptions({ config })` は今回作成する命盤の設定だけを上書きし、グローバルな既定値を変更しません。既存の命盤とその運限・四化分析は、作成時の設定と言語を保持します。単発の命盤作成でグローバル設定を変更する古いコードは、`astro.config()` の明示的な呼び出しに変更してください。
:::

### getConfig() <Badge type="warning" text="^2.3.0" /> {#getconfig}

- 目的

  現在有効なグローバル設定を取得します。戻り値の `mutagens` と `brightness` には、ライブラリ内部で統一されたキー名が使われます。デバッグや設定内容の確認に利用できます。

  <Badge type="warning" text="^2.6.2" /> 戻り値は独立したディープコピーです。オブジェクトや、その中の四化・輝度の配列を変更しても、ライブラリの設定は変わりません。

- 定義

  ```ts
  type getConfig = () => {
    mutagens: Partial<Record<HeavenlyStemKey, StarKey[]>>;
    brightness: Partial<Record<StarKey, BrightnessKey[]>>;
    yearDivide: 'normal' | 'exact';
    ageDivide: 'normal' | 'birthday';
    dayDivide: 'current' | 'forward';
    horoscopeDivide: 'normal' | 'exact';
    algorithm: 'default' | 'zhongzhou';
  };
  ```

- パラメータ

  なし

- 戻り値

  現在有効な構成オブジェクト

- 例

  ```ts
  import { astro } from 'iztro';

  astro.config({ algorithm: 'zhongzhou', ageDivide: 'birthday' });

  const currentConfig = astro.getConfig();
  ```

### resetConfig() <Badge type="warning" text="^2.6.2" /> {#resetconfig}

既定の設定に戻し、独自に設定した四化表と輝度表をすべて消去します。作成済みの命盤には影響しません。

```ts
type resetConfig = () => void;
```

既定の区切り規則は`yearDivide: 'normal'`、`horoscopeDivide: 'normal'`、`ageDivide: 'normal'`、`dayDivide: 'forward'`で、星曜の配置方法は`algorithm: 'default'`です。このメソッドには引数も戻り値もありません。読み込み済みのプラグインはリセットしません。

```ts
const chart = astro.withOptions({
  dateStr: '2000-8-16',
  timeIndex: 3,
  gender: '男',
  config: { ageDivide: 'birthday' },
});
astro.resetConfig();
chart.horoscope('2026-3-1'); // 仍使用该星盘生成时的生日分界配置
```

## プラグイン  {#插件}

iztroのプラグインは、命盤オブジェクトに機能を追加する関数です。必要に応じて機能を拡張できます。TypeScriptで開発する場合は、`FunctionalAstrolabe`を継承するインターフェイスにプラグインのメソッドを宣言してください。

インターフェイスは次のように宣言されます。

```ts
export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}
```

`myNewFunc`と`majorStar`は必要に応じて定義できます。インターフェイスのメソッドは、1つのプラグイン関数にまとめて実装しても、複数のプラグイン関数に分けて実装してもかまいません。

```ts
// 创建一个插件函数
export function myTestPlugin(this: IAstrolabe): void {
  // 实现插件应用逻辑
  this.myNewFunc = () => {
    return this.fiveElementsClass;
  };
}

// 创建二个插件函数
export function myTestPlugin2(this: IAstrolabe): void {
  // 实现插件应用逻辑
  this.majorStar = () => {
    let stars = this.palace('命宫')
      ?.majorStars.filter((item) => item.type === 'major' && !['禄存', '天马'].includes(item.name))
      .map((item) => item.name)
      .join(',');

    if (!stars) {
      stars = this.palace('迁移')
        ?.majorStars.filter((item) => item.type === 'major' && !['禄存', '天马'].includes(item.name))
        .map((item) => item.name)
        .join(',');
    }

    return stars ?? '';
  };
}
```

プラグインを登録するには、`astro`をインポートした後に`loadPlugin()`または`loadPlugins()`を呼び出します。どちらで登録しても、プラグインは**その後新しく作成する**命盤のインスタンスに適用されます。

```ts
import {astro} from iztro;

// 批量挂载插件
astro.loadPlugins([myTestPlugin， myTestPlugin2]);

// 逐个加载插件
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
```

作成済みの特定の命盤だけにプラグインを適用するには、その命盤のインスタンスの`use()`メソッドを呼び出します。

```ts
const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

astrolabe.use(myTestPlugin);
astrolabe.myNewFunc();
```

:::tip ヒント

TypeScriptでプラグインを使う際は、追加したメソッドが未定義と判断されないよう、ジェネリック型を指定してください。例えば、上記のプラグインのメソッドを使う場合は次のようにします。

```ts
 const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

 // 使用插件定义的方法
 astrolabe.myNewFunc();   // 火六局

 // 使用第二个插件方法
 astrolabe.majorStar();   // 七杀
```

:::

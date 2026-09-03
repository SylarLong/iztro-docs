---
outline: deep
description: "紫微研习社，iztro官方文档，iztro开发文档，iztro紫微斗数星盘介绍，iztro的astro对象使用方法以及示例代码。"
---

# 星盘

## 前言

紫微斗数星盘又叫紫微斗数命盘，是由 `十二个宫位` 和一个 `中宫` 构成，宫位的 `地支` 是固定的，并且是由 `寅` 开始，而不是由 `子` 开始。这是因为农历的正月是寅月，这就是所谓的 `正月建寅`。在 `iztro` 里面，`寅宫` 的索引是 `0`，`卯宫` 的索引是 `1`，如此按照顺时针的方向排列。如下面表格所示：

<table class="astrolabe">
    <tr>
        <td>巳 <code>3</code></td>
        <td>午 <code>4</code></td>
        <td>未 <code>5</code></td>
        <td>申 <code>6</code></td>
    </tr>
    <tr>
        <td>辰 <code>2</code></td>
        <td class="center-palace" rowspan="2" colspan="2">中宫</td>
        <td>酉 <code>7</code></td>
    </tr>
    <tr>
        <td>卯 <code>1</code></td>
        <td>戌 <code>8</code></td>
    </tr>
    <tr>
        <td>寅 <code>0</code></td>
        <td>丑 <code>11</code></td>
        <td>子 <code>10</code></td>
        <td>亥 <code>9</code></td>
    </tr>
</table>

`中宫` 通常可以用来展示任何你想展示的信息，一般不会对整个星盘产生影响。周围的 `十二宫` 用于存放星曜，四化，运限，宫位名称等信息。关于 `宫位` 的详细信息，可以进入 [宫位传送门](./palace.md) 查看详细介绍，本页面主要关注星盘的信息。紫微斗数星盘是由宫位和星曜组成的，如果你还没有建立起它们的概念，我们强烈推荐你进入 [基础知识扫盲](/learn/basis.md) 开始学习有趣的紫微斗数知识。

在安装好 `iztro` 依赖以后你可以用如下代码将 `星盘(astro)` 对象引入你的代码。如果你还不知道如何安装 `iztro`，请点击 [安装iztro](/quick-start.md#安装) 跳转到相关说明文档。

## `astro` 的静态方法

要使用该对象的静态方法，请先将该对象 `import` 到你的代码里

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

### astrolabeBySolarDate <Badge type="danger" text="deprecated" />

本方法在 `v2.0.5` 版本被废弃了，请使用 [`bySolar`](#bysolar) 方法代替，所有参数和返回值均不变。

### bySolar <Badge type="warning" text="^2.0.5" />

- 用途

  通过阳历获取星盘信息

- 定义

  ```ts
  export type bySolar = (
    solarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    fixLeap: boolean = true,
    language: Language = "zh-CN"
  ) => FunctionalAstrolabe;
  ```

- 参数

  | 参数         | 类型                                         | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 阳历日期【YYYY-M-D】                                                              |
  | timeIndex    | `number`                                     | `true`   | -       | 出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号                   |
  | gender       | [`GenderName`](/type-definition.md#gendername)| `true`   | -       | 性别【男/女】                                                                     |
  | fixLeap      | `boolean`                                    | `false`  | `true`  | 是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 返回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 示例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
  ```

---

### astrolabeByLunarDate <Badge type="danger" text="deprecated" />

本方法在 `v2.0.5` 版本被废弃了，请使用 [`byLunar`](#bylunar) 方法代替，所有参数和返回值均不变。

### byLunar <Badge type="warning" text="^2.0.5" />

- 用途

  通过农历日期获取星盘信息。我们强烈建议你优先使用 `astrolabeBySolarDate` 方法，因为该方法也是将农历日期转化为阳历以后调用 `astrolabeBySolarDate` 获得结果的。

- 定义

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

- 参数

  | 参数         | 类型       | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | lunarDateStr | `string`   | `true`   | -       | 农历日期【YYYY-M-D】，例如 `2000年七月十七` 则传入 `2000-7-17`                    |
  | timeIndex    | `number`   | `true`   | -       | 出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号                   |
  | gender       | [`GenderName`](/type-definition.md#gendername)   | `true`   | -       | 性别【男/女】                                                                     |
  | isLeapMonth  | `boolean`  | `false`  | `false` | 是否闰月，当实际月份没有闰月时该参数不生效                                        |
  | fixLeap      | `boolean`  | `false`  | `true`  | 是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 返回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 示例

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.byLunar("2000-8-16", 2, "女", false, true, "zh-CN");
  ```

---

### withOptions <Badge type="warning" text="^2.4.1" />

- 用途

  获取星盘信息。其实它内部实现是调用了 `bySolar` 和 `byLunar` 方法，只是为了方便大家调用加了一个壳。

- 定义

  ```ts
  type Option = {
    type: 'solar' | 'lunar';
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

- 参数

  | 参数         | 类型       | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | type | `solar` \| `lunar`   | `false`   | `solar`       | 日期类型
  | dateStr    | `string`   | `true`   | -       | 出生日期，格式为 YYYY-M-D
  | timeIndex    | `number`   | `true`   | -       | 出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号                   |                 |
  | gender       | [`GenderName`](/type-definition.md#gendername)   | `true`   | -       | 性别【男/女】                                                                     |
  | isLeapMonth  | `boolean`  | `false`  | `false` | 是否闰月，当实际月份没有闰月时该参数不生效                                        |
  | fixLeap      | `boolean`  | `false`  | `true`  | 是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |
  | config     | [`Config`](../type-definition.md#config) | `false`  | - | 自定义亮度、四化以及时间分割点配置 |
  | astroType <Badge type="warning" text="^2.5.0" /> | [`AstroType`](../type-definition.md#astrotype) | `false` | `heaven` | 星盘类型；仅在 `config.algorithm` 为 `zhongzhou` 时用于选择天盘、地盘或人盘 |

- 返回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 示例

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

  :::tip 提示
  `astroType` 可取 `heaven`、`earth` 或 `human`。默认的 `heaven` 为天盘；`earth` 以身宫为命宫，`human` 以福德宫为命宫。详见 [`AstroType`](../type-definition.md#astrotype)。
  :::

---

### getMajorStarBySolarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通过阳历获取命宫主星

- 定义

  ```ts
  type getMajorStarBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    fixLeap: boolean = true,
    language?: Language,
  ) => string;
  ```

- 参数

  | 参数         | 类型                                         | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 阳历日期【YYYY-M-D】                                                              |
  | timeIndex    | `number`                                     | `true`   | -       | 出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号                   |
  | fixLeap      | `boolean`                                    | `false`  | `true`  | 是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarBySolarDate('2023-4-7', 0);
  ```

---

### getMajorStarByLunarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通过农历获取命宫主星

- 定义

  ```ts
  type getMajorStarByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language,
  ) =>
  ```

- 参数

  | 参数         | 类型       | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | lunarDateStr | `string`   | `true`   | -       | 农历日期【YYYY-M-D】，例如 `2000年七月十七` 则传入 `2000-7-17`                    |
  | timeIndex    | `number`   | `true`   | -       | 出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号                   |
  | isLeapMonth  | `boolean`  | `false`  | `false` | 是否闰月，当实际月份没有闰月时该参数不生效                                        |
  | fixLeap      | `boolean`  | `false`  | `true`  | 是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月                    |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarByLunarDate('2023-2-17', 0, true, false);
  ```

---

### getSignBySolarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通过阳历获取星座

- 定义

  ```ts
  type getSignBySolarDate = (
    solarDateStr: string, 
    language?: Language
  ) => string;
  ```

- 参数

  | 参数         | 类型                                         | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 阳历日期【YYYY-M-D】                                                              |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getSignBySolarDate('2023-9-5');
  ```

---

### getSignByLunarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通过农历获取星座

- 定义

  ```ts
  type getSignByLunarDate = (
    lunarDateStr: string, 
    isLeapMonth?: boolean, 
    language?: Language
  ) => string;
  ``` 

- 参数

  | 参数         | 类型       | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | ---------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | lunarDateStr | `string`   | `true`   | -       | 农历日期【YYYY-M-D】，例如 `2000年七月十七` 则传入 `2000-7-17`                    |
  | isLeapMonth  | `boolean`  | `false`  | `false` | 是否闰月，当实际月份没有闰月时该参数不生效                                        |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getSignByLunarDate('2023-7-21');
  ```


---

### getZodiacBySolarDate <Badge type="warning" text="^1.2.1" />

- 用途

  通过公历获取十二生肖

- 定义

  ```ts
  type getZodiacBySolarDate = (solarDateStr: string, language?: Language) => string;
  ```

- 参数

  | 参数         | 类型                                         | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | solarDateStr | `string`                                     | `true`   | -       | 阳历日期【YYYY-M-D】                                                              |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |

- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacBySolarDate('2023-2-20');
  ```

---

### getZodiacByLunarYear <Badge type="warning" text="^1.2.1" />

- 用途

  通过农历年份获取十二生肖

- 定义

  ```ts
  type getZodiacByLunarYear = (year: number, language?: Language) => string;
  ```

- 参数

  | 参数         | 类型                                         | 是否必填 | 默认值  | 说明                                                                              |
  | ------------ | -------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
  | year | `number`                                     | `true`   | -       | 农历年份                                                             |
  | language     | [`Language`](../type-definition.md#language) | `false`  | `zh-CN` | 返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP` |
  
- 示例

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacByLunarYear(2023);
  ```

---

## 功能类定义

::: warning 开发建议
我们推荐你直接调用 [astro 的静态方法](./astrolabe.md#astro-的静态方法) 来获取数据，而不是手动去创建一个 `FunctionalAstrolabe` 类的实例。
:::

### FunctionalAstrolabe

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

该类所有属性都是继承自 [Astrolabe](../type-definition.md#astrolabe)，然后在接口内定义了一些方法用于对星盘的分析。[`astrolabeBySolarDate()`](./astrolabe.md#astrolabebysolardate) 和 [`astrolabeByLunarDate()`](./astrolabe.md#astrolabeByLunarDate) 方法会返回一个该类的实例。

- 接口定义

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

- 属性

  参考 [Astrolabe](../type-definition.md#astrolabe)

- 方法

  ### toJSON() <Badge type="warning" text="^2.6.0" />

  - 用途

    将功能星盘转换为普通 JSON 对象。返回结果不包含分析方法、插件函数和运行时引用；循环引用会被安全忽略。

  - 定义

    ```ts
    type toJSON = () => Astrolabe;
    ```

  - 参数

    无

  - 返回值

    [`Astrolabe`](../type-definition.md#astrolabe)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.toJSON();
    ```

  ***

  ### use() <Badge type="warning" text="^2.3.0" />

  - 用途

    为当前星盘实例应用一个插件。与 [`astro.loadPlugin()`](./config-n-plugin.md#插件) 不同，`use()` 只影响当前实例。

  - 定义

    ```ts
    type use = (plugin: Plugin) => void;
    ```

  - 参数

    | 参数 | 类型 | 是否必填 | 默认值 | 说明 |
    | --- | --- | --- | --- | --- |
    | plugin | [`Plugin`](../type-definition.md#plugin) | `true` | - | 要应用到当前星盘的插件函数 |

  - 返回值

    `void`

  - 示例

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

  ### horoscope() <Badge type="warning" text="^0.2.0" />

  - 用途

    获取运限数据。如果只是想获取调用时的运限数据，可以不传任何参数，该方法会获取系统当前时间进行计算。

    :::warning 注意

    - 当 `date` 为 `YYYY-M-D` 格式的字符串而没有传 `timeIndex` 参数时，会取 `date` 当日 `早子时` 的时间点作为 `流时` 的时间
    - 当 `date` 为 `YYYY-M-D HH` 格式时间或是一个 `Date` 实例而没有传 `timeIndex` 参数时，会将 `date` 里的小时转化为时辰作为 `流时` 的时间
    - 当传入 `timeIndex` 参数时，会优先使用该参数
      :::

  - 定义

    ```ts
    type horoscope = (date?: string | Date, timeIndex?: number) => FunctionalHoroscope;
    ```

  - 参数

    | 参数      | 类型               | 是否必填 | 默认值       | 说明                 |
    | --------- | ------------------ | -------- | ------------ | -------------------- |
    | date      | `string` \| `Date` | `false`  | `new Date()` | 阳历日期【YYYY-M-D】 |
    | timeIndex | `number`           | `false`  | `0`          | 时辰索引【0~12】     |

  - 返回值

    [`FunctionalHoroscope`](./horoscope.md#functionalhoroscope)

    :::danger 注意
    返回值已经在 `v1.3.4` 从 `Horoscope` 改为 `FunctionalHoroscope`，但使用上是向后兼容的。
    :::

  - 示例

    :::tabs
    == 不传参数

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope();
    ```

    == 传入 date 字符串

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

    == 传入 Date 对象

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392));
    ```

    == 传入 date 和 timeIndex

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392), 3);
    ```

    :::

  ***

  ### decadalList() <Badge type="warning" text="^2.6.0" />

  - 用途

    获取按起运先后排列的大限列表。数组索引 `0` 表示第一个大限。每一项包含大限所在宫位、起止虚岁、起止年份、干支、四化、流曜和大限十二宫。

  - 定义

    ```ts
    type decadalList = () => DecadalHoroscope[];
    ```

  - 返回值

    [`DecadalHoroscope[]`](../type-definition.md#decadalhoroscope)

  - 示例

    ```ts
    const decadals = astrolabe.decadalList();
    const firstDecadal = decadals[0];
    ```

  ***

  ### yearlyList() <Badge type="warning" text="^2.6.0" />

  - 用途

    根据大限序号或本命宫位名称，获取该大限内的流年列表。每一项包含虚岁、年份、流年干支、四化、流曜和流年十二宫。

  - 定义

    ```ts
    type yearlyList = (
      indexOrName: number | PalaceName
    ) => YearlyHoroscope[];
    ```

  - 参数

    | 参数 | 类型 | 是否必填 | 默认值 | 说明 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true` | - | 大限序号（`0` 为第一个大限）或本命宫位名称 |

  - 返回值

    [`YearlyHoroscope[]`](../type-definition.md#yearlyhoroscope)

  - 示例

    ```ts
    const firstDecadalYearlies = astrolabe.yearlyList(0);
    const soulPalaceYearlies = astrolabe.yearlyList("命宫");
    ```

  ***

  ### monthlyList() <Badge type="warning" text="^2.6.0" />

  - 用途

    获取指定年份的流月列表。每一项包含虚岁、年份、月份、流月干支、四化、流曜和流月十二宫。

    闰月规则：无闰月时返回 12 项；有闰月且 `fixLeap=false` 时返回 13 项；有闰月且 `fixLeap=true` 时将闰月按初一至十五、十六至月底拆分，返回 14 项。

  - 定义

    ```ts
    type monthlyList = (
      year: number,
      fixLeap?: boolean
    ) => MonthlyHoroscope[];
    ```

  - 参数

    | 参数 | 类型 | 是否必填 | 默认值 | 说明 |
    | --- | --- | --- | --- | --- |
    | year | `number` | `true` | - | 流年年份，可直接使用 `yearlyList()` 返回项的 `year` |
    | fixLeap | `boolean` | `false` | `true` | 是否将闰月前后半月分开计算 |

  - 返回值

    [`MonthlyHoroscope[]`](../type-definition.md#monthlyhoroscope)

  - 示例

    ```ts
    const year = astrolabe.yearlyList(0)[0].year;
    const adjusted = astrolabe.monthlyList(year);
    const unadjusted = astrolabe.monthlyList(year, false);
    ```

  ***

  ### star() <Badge type="warning" text="^1.2.0" />

  - 用途

    通过星曜名称获取到当前星曜的对象实例

  - 定义

    ```ts
    type star = (starName: StarName) => IFunctionalStar;
    ```

  - 参数

    | 参数        | 类型                                                         | 是否必填 | 默认值 | 说明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | starName | [`StarName`](../type-definition.md#starname) | `true`   | -      | 星曜名称 |

  - 返回值

    [`FunctionalStar`](./star.md#functionalstar)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `紫微星` 所在宫位
    const star = astrolabe.star("紫微");
    ```

  ***
  ### palace() <Badge type="warning" text="^1.0.0" />

  - 用途

    获取星盘的指定 `宫位`

  - 定义

    ```ts
    type palace = (
      indexOrName: number | PalaceName
    ) => IFunctionalPalace | undefined;
    ```

  - 参数

    | 参数        | 类型                                                         | 是否必填 | 默认值 | 说明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位索引或者宫位名称 |

  - 返回值

    [`FunctionalPalace`](./palace.md#functionalpalace)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫`
    const palace = astrolabe.palace(0);

    // 获取 `命宫`
    const soulPalace = astrolabe.palace("命宫");
    ```

  ***

  ### surroundedPalaces() <Badge type="warning" text="^1.1.0" />

  - 用途

    获取 `三方四正` 宫位，所谓三方四正就是传入的 `目标宫`，以及其 `对宫`，`财帛位` 和 `官禄位`，总共四个宫位。`宫` 和 `位` 是两个概念，如果你对宫位和三方四正的概念不清楚，可以点击 [宫位](./palace.md) 查看详细信息。

  - 定义

    ```ts
    type surroundedPalaces = (
      indexOrName: number | PalaceName
    ) => IFunctionalSurpalaces;
    ```

  - 参数

    | 参数        | 类型                                                         | 是否必填 | 默认值 | 说明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位索引或者宫位名称 |

  - 返回值

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces)

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫` 三方四正
    const surroundedPalaces = astrolabe.surroundedPalaces(0);

    // 获取 `命宫` 三方四正
    const surroundedPalacesOfSoul = astrolabe.surroundedPalaces("命宫");
    ```

  ***

  ### isSurrounded() <Badge type="warning" text="^1.0.0" /> <Badge type="danger" text="deprecated" />

  :::danger 注意
  该方法已经在 `v1.2.0` 废弃，请使用 [FunctionalSurpalaces](palace.md#functionalsurpalaces) 的 [have()](palace.md#have) 方法代替
  :::

  - 用途

    判断某一个宫位 `三方四正` 是否包含目标 `星曜`，必须要**全部**包含才会返回 `true`

  - 定义

    ```ts
    type isSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 参数

    | 参数        | 类型                                                         | 是否必填 | 默认值 | 说明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位索引或者宫位名称 |
    | stars       | [`StarName[]`](../type-definition.md#starname)               | `true`   | -      | 星曜名称数组         |

  - 返回值

    `boolean`

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.isSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.isSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### isSurroundedOneOf() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" />

  :::danger 注意
  该方法已经在 `v1.2.0` 废弃，请使用 [FunctionalSurpalaces](palace.md#functionalsurpalaces) 的 [haveOneOf()](palace.md#haveoneof) 方法代替
  :::

  - 用途

    判断指定宫位 `三方四正` 内是否有传入星曜的 `其中一个`，只要命中 `一个` 就会返回 `true`

  - 定义

    ```ts
    type isSurroundedOneOf = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 参数

    | 参数        | 类型                                                         | 是否必填 | 默认值 | 说明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位索引或者宫位名称 |
    | stars       | [`StarName[]`](../type-definition.md#starname)               | `true`   | -      | 星曜名称数组         |

  - 返回值

    `boolean`

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const palace = astrolabe.isSurroundedOneOf(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const soulPalace = astrolabe.isSurroundedOneOf("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### notSurrounded() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" />
 
  :::danger 注意
  该方法已经在 `v1.2.0` 废弃，请使用 [FunctionalSurpalaces](palace.md#functionalsurpalaces) 的 [notHave()](palace.md#nothave-1) 方法代替
  :::

  - 用途

    判断指定宫位 `三方四正` 是否 `不含` 目标星曜，必须要全部都 `不在` 三方四正内含才会返回 `true`

  - 定义

    ```ts
    type notSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 参数

    | 参数        | 类型                                                         | 是否必填 | 默认值 | 说明                 |
    | ----------- | ------------------------------------------------------------ | -------- | ------ | -------------------- |
    | indexOrName | `number` \| [`PalaceName`](../type-definition.md#palacename) | `true`   | -      | 宫位索引或者宫位名称 |
    | stars       | [`StarName[]`](../type-definition.md#starname)               | `true`   | -      | 星曜名称数组         |

  - 返回值

    `boolean`

  - 示例

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.notSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.notSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

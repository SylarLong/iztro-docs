---
outline: deep
---

# 星盘

紫微斗数星盘是由 `十二个宫位` 和一个 `中宫` 构成，宫位的 `地支` 是固定的，并且是由 `寅` 开始，而不是由 `子` 开始。这是因为农历的正月是寅月，这就是所谓的 `正月建寅`。在 `iztro` 里面，`寅宫` 的索引是 `0`，`卯宫` 的索引是 `1`，如此按照顺时针的方向排列。如下面表格所示：

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

`中宫` 通常可以用来展示任何你想展示的信息，一般不会对整个星盘产生影响。周围的 `十二宫` 用于存放星耀，四化，运限，宫位名称等信息。关于 `宫位` 的详细信息，可以进入 [宫位](./palace.md) 查看详细介绍，本页面主要关注星盘的信息。

在安装好 `iztro` 依赖以后你可以用如下代码将 `星盘(astro)` 对象引入你的代码。如果你还不知道如何安装 `iztro`，请 [点击此处](../quick-start.md#安装) 跳转到相关说明文档。

:::tabs
== ES6 Module
```ts
import { astro } from 'iztro';
```
== CommonJS
```js
var iztro = require('iztro');
```
:::

### 静态方法

::: warning 开发建议
我们推荐你直接调用 `静态方法` 来获取数据，而不是手动去创建一个 `FunctionalAstrolabe` 类的实例。
:::

---

#### astrolabeBySolarDate

- 用途

  通过阳历获取星盘信息
  
- 定义

  ```ts
  export type astrolabeBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    fixLeap: boolean = true,
    language: Language = 'zh-CN',
  ) => FunctionalAstrolabe;
  ```

- 参数

  |参数|类型|是否必填|默认值|说明|
  |--|--|--|--|--|
  |solarDateStr|`string`|`true`|-|阳历日期【YYYY-M-D】|
  |timeIndex|`number`|`true`|-|出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号|
  |gender|`string`|`true`|-|性别【男/女】|
  |fixLeap|`boolean`|`false`|`true`|是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月|
  |language|[`Language`](../type-definition.md#language)|`false`|`zh-CN`|返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP`|

- 返回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)
  
- 示例

  ```ts
  import { astro } from 'iztro';

  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');
  ```

- 示例返回值

  ::: details 返回值
  ```ts
  {
    // 阳历日期
    solarDate: '2000-8-16',
    // 农历日期
    lunarDate: '二〇〇〇年七月十七',
    // 四柱
    chineseDate: '庚辰 甲申 丙午 庚寅',
    // 时辰
    time: '寅时',
    // 时辰对应的时间段
    timeRange: '03:00~05:00',
    // 星座
    sign: '狮子座',
    // 生肖
    zodiac: '龙',
    // 命宫地支
    earthlyBranchOfSoulPalace: '午',
    // 身宫地支
    earthlyBranchOfBodyPalace: '戌',
    // 命主
    soul: '破军',
    // 身主
    body: '文昌',
    // 五行局
    fiveElementsClass: '木三局',
    // 十二宫数据
    palaces: [
      {
        // 宫名
        name: '财帛',
        // 是否身宫
        isBodyPalace: false,
        // 是否来因宫
        isOriginalPalace: false,
        // 宫位天干
        heavenlyStem: '戊',
        // 宫位地支
        earthlyBranch: '寅',
        // 主星（含天马禄存）
        majorStars: [
          { name: '武曲', type: 'major', scope: 'origin', brightness: '得' },
          { name: '天相', type: 'major', scope: 'origin', brightness: '庙' },
          { name: '天马', type: 'tianma', scope: 'origin', brightness: '' },
        ],
        // 辅星（含六吉六煞）
        minorStars: [],
        // 杂耀
        adjectiveStars: [
          { name: '月解', type: 'helper', scope: 'origin' },
          { name: '三台', type: 'adjective', scope: 'origin' },
          { name: '天寿', type: 'adjective', scope: 'origin' },
          { name: '天巫', type: 'adjective', scope: 'origin' },
          { name: '天厨', type: 'adjective', scope: 'origin' },
          { name: '阴煞', type: 'adjective', scope: 'origin' },
          { name: '天哭', type: 'adjective', scope: 'origin' },
        ],
        // 长生12神
        changsheng12: '绝',
        // 博士12神
        boshi12: '蜚廉',
        // 流年将前12神
        jiangqian12: '岁驿',
        // 流年岁前12神
        suiqian12: '吊客',
        // 大限
        stage: { range: [44, 53], heavenlyStem: '戊' },
        // 小限
        ages: [9, 21, 33, 45, 57, 69, 81],
      },
      {
        name: '子女',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '己',
        earthlyBranch: '卯',
        majorStars: [
          { name: '太阳', type: 'major', scope: 'origin', brightness: '庙' },
          { name: '天梁', type: 'major', scope: 'origin', brightness: '庙' },
        ],
        minorStars: [],
        adjectiveStars: [{ name: '天刑', type: 'adjective', scope: 'origin' }],
        changsheng12: '墓',
        boshi12: '奏书',
        jiangqian12: '息神',
        suiqian12: '病符',
        stage: { range: [34, 43], heavenlyStem: '己' },
        ages: [8, 20, 32, 44, 56, 68, 80],
      },
      {
        name: '夫妻',
        isBodyPalace: false,
        isOriginalPalace: true,
        heavenlyStem: '庚',
        earthlyBranch: '辰',
        majorStars: [{ name: '七杀', type: 'major', scope: 'origin', brightness: '庙' }],
        minorStars: [
          { name: '右弼', type: 'soft', scope: 'origin', brightness: '' },
          { name: '火星', type: 'tough', scope: 'origin', brightness: '陷' },
        ],
        adjectiveStars: [
          { name: '封诰', type: 'adjective', scope: 'origin' },
          { name: '华盖', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '死',
        boshi12: '将军',
        jiangqian12: '华盖',
        suiqian12: '岁建',
        stage: { range: [24, 33], heavenlyStem: '庚' },
        ages: [7, 19, 31, 43, 55, 67, 79],
      },
      {
        name: '兄弟',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '辛',
        earthlyBranch: '巳',
        majorStars: [{ name: '天机', type: 'major', scope: 'origin', brightness: '平' }],
        minorStars: [],
        adjectiveStars: [
          { name: '天喜', type: 'flower', scope: 'origin' },
          { name: '天空', type: 'adjective', scope: 'origin' },
          { name: '孤辰', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '病',
        boshi12: '小耗',
        jiangqian12: '劫煞',
        suiqian12: '晦气',
        stage: { range: [14, 23], heavenlyStem: '辛' },
        ages: [6, 18, 30, 42, 54, 66, 78],
      },
      {
        name: '命宫',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '壬',
        earthlyBranch: '午',
        majorStars: [{ name: '紫微', type: 'major', scope: 'origin', brightness: '庙' }],
        minorStars: [{ name: '文曲', type: 'soft', scope: 'origin', brightness: '陷' }],
        adjectiveStars: [
          { name: '年解', type: 'helper', scope: 'origin' },
          { name: '凤阁', type: 'adjective', scope: 'origin' },
          { name: '天福', type: 'adjective', scope: 'origin' },
          { name: '截路', type: 'adjective', scope: 'origin' },
          { name: '蜚廉', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '衰',
        boshi12: '青龙',
        jiangqian12: '灾煞',
        suiqian12: '丧门',
        stage: { range: [4, 13], heavenlyStem: '壬' },
        ages: [5, 17, 29, 41, 53, 65, 77],
      },
      {
        name: '父母',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '癸',
        earthlyBranch: '未',
        majorStars: [],
        minorStars: [
          { name: '天钺', type: 'soft', scope: 'origin', brightness: '' },
          { name: '陀罗', type: 'tough', scope: 'origin', brightness: '庙' },
        ],
        adjectiveStars: [
          { name: '天姚', type: 'flower', scope: 'origin' },
          { name: '空亡', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '帝旺',
        boshi12: '力士',
        jiangqian12: '天煞',
        suiqian12: '贯索',
        stage: { range: [114, 123], heavenlyStem: '癸' },
        ages: [4, 16, 28, 40, 52, 64, 76],
      },
      {
        name: '福德',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '甲',
        earthlyBranch: '申',
        majorStars: [
          { name: '破军', type: 'major', scope: 'origin', brightness: '得' },
          { name: '禄存', type: 'lucun', scope: 'origin', brightness: '' },
        ],
        minorStars: [{ name: '文昌', type: 'soft', scope: 'origin', brightness: '得' }],
        adjectiveStars: [
          { name: '龙池', type: 'adjective', scope: 'origin' },
          { name: '台辅', type: 'adjective', scope: 'origin' },
          { name: '旬空', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '临官',
        boshi12: '博士',
        jiangqian12: '指背',
        suiqian12: '官符',
        stage: { range: [104, 113], heavenlyStem: '甲' },
        ages: [3, 15, 27, 39, 51, 63, 75],
      },
      {
        name: '田宅',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '乙',
        earthlyBranch: '酉',
        majorStars: [],
        minorStars: [
          { name: '地空', type: 'tough', scope: 'origin', brightness: '' },
          { name: '擎羊', type: 'tough', scope: 'origin', brightness: '陷' },
        ],
        adjectiveStars: [
          { name: '咸池', type: 'flower', scope: 'origin' },
          { name: '天贵', type: 'adjective', scope: 'origin' },
          { name: '月德', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '冠带',
        boshi12: '官府',
        jiangqian12: '咸池',
        suiqian12: '小耗',
        stage: { range: [94, 103], heavenlyStem: '乙' },
        ages: [2, 14, 26, 38, 50, 62, 74],
      },
      {
        name: '官禄',
        isBodyPalace: true,
        isOriginalPalace: false,
        heavenlyStem: '丙',
        earthlyBranch: '戌',
        majorStars: [
          { name: '廉贞', type: 'major', scope: 'origin', brightness: '利' },
          { name: '天府', type: 'major', scope: 'origin', brightness: '庙' },
        ],
        minorStars: [{ name: '左辅', type: 'soft', scope: 'origin', brightness: '' }],
        adjectiveStars: [
          { name: '天才', type: 'adjective', scope: 'origin' },
          { name: '天虚', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '沐浴',
        boshi12: '伏兵',
        jiangqian12: '月煞',
        suiqian12: '大耗',
        stage: { range: [84, 93], heavenlyStem: '丙' },
        ages: [1, 13, 25, 37, 49, 61, 73],
      },
      {
        name: '仆役',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '丁',
        earthlyBranch: '亥',
        majorStars: [{ name: '太阴', type: 'major', scope: 'origin', brightness: '庙' }],
        minorStars: [],
        adjectiveStars: [
          { name: '红鸾', type: 'flower', scope: 'origin' },
          { name: '恩光', type: 'adjective', scope: 'origin' },
          { name: '天官', type: 'adjective', scope: 'origin' },
          { name: '天月', type: 'adjective', scope: 'origin' },
          { name: '天伤', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '长生',
        boshi12: '大耗',
        jiangqian12: '亡神',
        suiqian12: '龙德',
        stage: { range: [74, 83], heavenlyStem: '丁' },
        ages: [12, 24, 36, 48, 60, 72, 84],
      },
      {
        name: '迁移',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '戊',
        earthlyBranch: '子',
        majorStars: [{ name: '贪狼', type: 'major', scope: 'origin', brightness: '旺' }],
        minorStars: [{ name: '铃星', type: 'tough', scope: 'origin', brightness: '陷' }],
        adjectiveStars: [{ name: ' 八座', type: 'adjective', scope: 'origin' }],
        changsheng12: '养',
        boshi12: '病符',
        jiangqian12: '将星',
        suiqian12: '白虎',
        stage: { range: [64, 73], heavenlyStem: '戊' },
        ages: [11, 23, 35, 47, 59, 71, 83],
      },
      {
        name: '疾厄',
        isBodyPalace: false,
        isOriginalPalace: false,
        heavenlyStem: '己',
        earthlyBranch: '丑',
        majorStars: [
          { name: '天同', type: 'major', scope: 'origin', brightness: '不' },
          { name: '巨门', type: 'major', scope: 'origin', brightness: '不' },
        ],
        minorStars: [
          { name: '天魁', type: 'soft', scope: 'origin', brightness: '' },
          { name: '地劫', type: 'tough', scope: 'origin', brightness: '' },
        ],
        adjectiveStars: [
          { name: '天德', type: 'adjective', scope: 'origin' },
          { name: '寡宿', type: 'adjective', scope: 'origin' },
          { name: '破碎', type: 'adjective', scope: 'origin' },
          { name: '天使', type: 'adjective', scope: 'origin' },
        ],
        changsheng12: '胎',
        boshi12: '喜神',
        jiangqian12: '攀鞍',
        suiqian12: '天德',
        stage: { range: [54, 63], heavenlyStem: '己' },
        ages: [10, 22, 34, 46, 58, 70, 82],
      },
    ],
  }
  ```
  :::

---

#### astrolabeByLunarDate

- 用途
  
  通过农历日期获取星盘信息。我们强烈建议你优先使用 `astrolabeBySolarDate` 方法，因为该方法也是将农历日期转化为阳历以后调用 `astrolabeBySolarDate` 获得结果的。

- 定义

  ```ts
  export type astrolabeByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language,
  ) => FunctionalAstrolabe;
  ```

- 参数

  |参数|类型|是否必填|默认值|说明|
  |--|--|--|--|--|
  |lunarDateStr|`string`|`true`|-|农历日期【YYYY-M-D】，例如 `2000年七月十七` 则传入 `2000-7-17`|
  |timeIndex|`number`|`true`|-|出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号|
  |gender|`string`|`true`|-|性别【男/女】|
  |isLeapMonth|`boolean`|`false`|`false`|是否闰月，当实际月份没有闰月时该参数不生效|
  |fixLeap|`boolean`|`false`|`true`|是否调整闰月，为`true`闰月的前半个月算上个月，后半个月算下个月|
  |language|`Language`|`false`|`zh-CN`|返回数据将被国际化为指定语言。目前支持 `zh-CN`,`zh-TW`,`en-US`,`ko-KR` 和 `ja-JP`|

- 返回值

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 示例

  ```ts
  import { astro } from 'iztro';

  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', false, true, 'zh-CN');
  ```

- 示例返回值

  参考 [astrolabeBySolarDate](./astrolabe.md#astrolabebysolardate) 的示例返回值

---

### 功能类定义

::: warning 开发建议
功能类一般不直接使用，而是调用 `静态方法` 返回一个该类的实例。
:::

#### FunctionalAstrolabe 

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

该类所有属性都是继承自 [Astrolabe](../type-definition.md#astrolabe)，然后在接口内定义了一些方法用于对星盘的分析。[`astrolabeBySolarDate()`](./astrolabe.md#astrolabebysolardate) 和 [`astrolabeByLunarDate()`](./astrolabe.md#astrolabeByLunarDate) 方法会返回一个该类的实例。

- 接口定义

  ```ts
  interface IFunctionalAstrolabe extends Astrolabe {
    horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;
    palace: (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;
    surroundedPalaces: (indexOrName: number | PalaceName) => SurroundedPalaces;
    isSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
    isSurroundedOneOf: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
    notSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
  }
  ```

- 属性

  参考 [Astrolabe](../type-definition.md#astrolabe)

- 方法

  ##### horoscope() <Badge type="warning" text="^0.2.0" />

  - 用途

    获取运限数据。如果只是想获取调用时的运限数据，可以不传任何参数，该方法会获取系统当前时间进行计算。

    :::warning 注意
    - 当 `date` 为 `YYYY-M-D` 格式的字符串而没有传 `timeIndex` 参数时，会取 `date` 当日 `早子时` 的时间点作为 `流时` 的时间
    - 当 `date` 为 `YYYY-M-D HH` 格式时间或是一个 `Date` 实例而没有传 `timeIndex` 参数时，会将 `date` 里的小时转化为时辰作为 `流时` 的时间
    - 当传入 `timeIndex` 参数时，会优先使用该参数
    :::

  - 定义

    ```ts
    type horoscope = (date?: string | Date, timeIndex?: number) => Horoscope;
    ```

  - 参数

    |参数|类型|是否必填|默认值|说明|
    |--|--|--|--|--|
    |date|`string` \| `Date`|`false`|`new Date()`|阳历日期【YYYY-M-D】|
    |timeIndex|`number`|`false`|`0`|时辰索引【0~12】|

  - 返回值

    [Horoscope](../type-definition.md#horoscope)

  - 示例

    :::tabs
    == 不传参数
    ```ts
    import { astro } from 'iztro';

    const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');
    const horoscope = astrolabe.horoscope();
    ```
    == 传入date字符串
    ```ts
    import { astro } from 'iztro';

    const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');
    const horoscope = astrolabe.horoscope('2023-8-31');
    ```
    == 传入Date对象
    ```ts
    import { astro } from 'iztro';

    const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');
    const horoscope = astrolabe.horoscope(new Date(1693494208392));
    ```
    == 传入date和timeIndex
    ```ts
    import { astro } from 'iztro';

    const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');
    const horoscope = astrolabe.horoscope(new Date(1693494208392), 3);
    ```
    :::

  ---

  ##### palace() <Badge type="warning" text="^1.0.0" />

  - 用途

    获取星盘的指定 `宫位`

  - 定义

    ```ts
    type palace = (
      indexOrName: number | PalaceName
    ) => IFunctionalPalace | undefined;
    ```

  - 参数
  - 返回值

    [IFunctionalPalace](./palace.md#functionalpalace)

  - 示例

  ---

  ##### isSurrounded() <Badge type="warning" text="^1.0.0" />

  - 用途

    判断某一个宫位 `三方四正` 是否包含目标 `星耀`，必须要**全部**包含才会返回 `true`

  - 定义

    ```ts
    type isSurrounded = (
      indexOrName: number | PalaceName, 
      stars: StarName[]
    ) => boolean;
    ```

  - 参数
  - 返回值

    `boolean`

  - 示例

  ---

  ##### surroundedPalaces() <Badge type="warning" text="^1.1.0" />

  - 用途

    获取 `三方四正` 宫位，所谓三方四正就是传入的 `目标宫`，以及其 `对宫`，`财帛位` 和 `官禄位`，总共四个宫位。`宫` 和 `位` 是两个概念，如果你对宫位和三方四正的概念不清楚，可以点击 [宫位](./palace.md) 查看详细信息。

  - 定义

    ```ts
    type surroundedPalaces = (
      indexOrName: number | PalaceName
    ) => SurroundedPalaces;
    ```

  - 参数
  - 返回值

    [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

  - 示例

  ---

  ##### isSurroundedOneOf() <Badge type="warning" text="^1.1.0" />

  - 用途

    判断指定宫位 `三方四正` 内是否有传入星耀的 `其中一个`，只要命中 `一个` 就会返回 `true`

  - 定义

    ```ts
    type isSurroundedOneOf = (
      indexOrName: number | PalaceName, 
      stars: StarName[]
    ) => boolean;
    ```

  - 参数
  - 返回值

    `boolean`
    
  - 示例

  ---

  ##### notSurrounded() <Badge type="warning" text="^1.1.0" />

  - 用途

    判断指定宫位 `三方四正` 是否 `不含` 目标星耀，必须要全部都 `不在` 三方四正内含才会返回 `true`

  - 定义

    ```ts
    type notSurrounded = (
      indexOrName: number | PalaceName, 
      stars: StarName[]
    ) => boolean;
    ```

  - 参数
  - 返回值

    `boolean`
    
  - 示例

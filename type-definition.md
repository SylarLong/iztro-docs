# 类型定义

本页介绍了`iztro`中的类型定义，除了[国际化类型](/type-definition.html#国际化类型)被定义在了[i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts)文件夹内，其他类型都定义在[types](https://github.com/SylarLong/iztro/tree/main/src/data/types)文件夹内。

## 国际化类型

`iztro`为了支持国际化输入输出，对需要进行参数输入输出的数据进行了多语言定义，在输入的时候，你可以输入**任意语言**的值，比如在需要传`HeavenlyStemName`的地方，你可以传入 `甲`，也可以传入 `갑` `jia`。当然输出的时候会统一按照你指定的语言进行输出。如果你发现翻译中有不对的地方，可以在[这里](https://github.com/SylarLong/iztro/issues)创建Issue指出，非常感谢。

#### `HeavenlyStemName`

定义了`十天干`

:::tabs
== 简体中文
`甲` | `乙` | `丙` | `丁` | `戊` | `己` | `庚` | `辛` | `壬` | `癸`
== 繁體中文
`甲` | `乙` | `丙` | `丁` | `戊` | `己` | `庚` | `辛` | `壬` | `癸`
== English
`jia` | `yi` | `bing` | `ding` | `wu` | `ji` | `geng` | `xin` | `ren` | `gui`
== 한국어
`갑` | `을` | `병` | `정` | `무` | `기` | `경` | `신` | `임` | `계`
== 日本語
`甲` | `乙` | `丙` | `丁` | `戊` | `己` | `庚` | `辛` | `壬` | `癸`
:::

---

#### `EarthlyBranchName`

定义了`十二地支`，地支中的`午`英文和天干中的`戊`相同，为了解决国际化时的冲突，固将地支中的`午`翻译成了`woo`。

:::tabs
== 简体中文
`子` | `丑` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
== 繁體中文 
`子` | `醜` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
== English
`zi` | `chou` | `yin` | `mao` | `chen` | `si` | `woo` | `wei` | `shen` | `you` | `xu` | `hai`
== 한국어
`자` | `축` | `인` | `묘` | `진` | `사` | `오` | `미` | `신` | `유` | `술` | `해`
== 日本語
`子` | `醜` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
:::

---

#### `PalaceName`


---

#### `Brightness`

定义了星耀的`亮度`

:::tabs
== 简体中文
`""` | `庙` | `旺` | `得` | `利` | `平` | `不` | `陷`
== 繁體中文
`""` | `廟` | `旺` | `得` | `利` | `平` | `不` | `陷`
== English
`""` | `[+3]` | `[+2]` | `[+1]` | `[0]` | `[-1]` | `[-2]` | `[-3]`
== 한국어
`""` | `[+3]` | `[+2]` | `[+1]` | `[0]` | `[-1]` | `[-2]` | `[-3]`
== 日本語
`""` | `廟` | `旺` | `得` | `利` | `平` | `不` | `陷`
:::

---

#### `Mutagen`

---

#### `StarName`

---

#### `FiveElementsClassName`

---

#### `GenderName`


## 通用

####  `Language`

```ts
export type Language = `zh-CN` | `zh-TW` | `en-US` | `ko-KR` | `ja-JP`;
```

定义了支持的`语言`，目前支持的语言有：

- `zh-CN`：简体中文
- `zh-TW`：繁體中文
- `en-US`：English
- `ko-KR`：한국어
- `ja-JP`：日本語

---

##### `Scope`

```ts
export type Scope = 'origin' | 'decadal' | 'yearly';
```

定义了星耀的`作用范围`，用于区分本命星耀和流耀：

- `origin`：本命星耀
- `decadal`：大限星耀
- `yearly`：流年星耀

---

#### `StarType`

```ts
export type StarType = 
  | 'major' 
  | 'soft' 
  | 'tough' 
  | 'adjective' 
  | 'flower' 
  | 'helper' 
  | 'lucun' 
  | 'tianma';
```

定义了星耀`类型`，其中`桃花星`和`解神星`（包含`年解`）虽然是杂耀，但是在解盘中有着特殊的意义，所以单独归类，`禄存`和`天马`二辅星也是比较特殊，所以单独归类：

- `major`：主星
- `soft`：吉星
- `tough`：煞星
- `adjective`：杂耀
- `flower`：桃花
- `helper`：解神
- `lucun`：禄存
- `tianma`：天马

## 星盘

#### `HoroscopeItem`

```ts
export type HoroscopeItem = {
  index: number;
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
  palaceNames: PalaceName[];
  mutagen: StarName[];
  stars?: Star[][];
};
```

定义了`运限对象`

|取值|解释|类型|
|--|--|--|
|`index`|所在宫位的索引|`number`|
|`heavenlyStem`|运限天干|`HeavenlyStemName`|
|`earthlyBranch`|运限地支|`EarthlyBranchName`|
|`palaceNames`|运限的十二宫|`PalaceName[]`|
|`mutagen`|四化星|`StarName[]`|
|`stars`|流耀|`Star[][]`|

---

#### `Decadal`

```ts
export type Decadal = {
  range: [number, number];
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
};
```

定义了星盘的`大限`，此类型主要用在[Palace](/type-definition.html#palace)内。

|取值|解释|类型|
|--|--|--|
|`range`|大限起止年龄 [`起始年龄`, `截止年龄`]|`[number, number]`|
|`heavenlyStem`|大限天干|`HeavenlyStemName`|
|`earthlyBranch`|大限地支|`EarthlyBranchName`|

---

#### `Astrolabe`

## 星耀

### Star

## 宫位

#### `Palace`

## 运限

### Horoscope
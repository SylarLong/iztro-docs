# 类型定义

本页介绍了 `iztro` 中的类型定义，除了 [国际化类型](/type-definition.html#国际化类型) 被定义在了 [i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts) 文件夹内，其他类型都定义在 [types](https://github.com/SylarLong/iztro/tree/main/src/data/types) 文件夹内。

你可以使用如下代码引入 `国际化类型`:

```ts
import { HeavenlyStemName } from "iztro/lib/i18n";
```

而当你需要引入其他类型的时候，则需要：

```ts
import { Palace } from "iztro/lib/data/types";
```

## 国际化类型

`iztro` 为了支持国际化输入输出，对需要进行参数输入输出的数据进行了多语言定义，在输入的时候，你可以输入 **任意语言** 的值，比如在需要传 `HeavenlyStemName` 的地方，你可以传入 `甲`，也可以传入 `갑` 或者 `jia`。

比如在调用`getHoroscopeStar()`方法的时候，你可以以中文的干支作为参数：

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar('甲','子','decadal');
```

也可以用其他语言的翻译作为参数甚至中文和外文混合使用，也是可以的：

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar('갑','zi','decadal');
```

当然输出的时候会统一按照你指定的语言进行输出。你可以在调用上述方法之前设置你的输出语言：

```ts
import { setLanguage } from "iztro/lib/i18n";

setLanguage('ko-KR');

const horoscopeStar = getHoroscopeStar('甲','zi','decadal');
```

此时 `horoscopeStar` 的输出结果会是 `韩文` 的。

<details class='custom-block'>
<summary><code>horoscopeStar</code> 输出结果</summary>

```json
[
    [
        {
            "name": "록존(십년)",
            "type": "lucun",
            "scope": "decadal"
        },
        {
            "name": "천마(십년)",
            "type": "tianma",
            "scope": "decadal"
        }
    ],
    [
        {
            "name": "경양(십년)",
            "type": "tough",
            "scope": "decadal"
        },
        {
            "name": "홍란(십년)",
            "type": "flower",
            "scope": "decadal"
        }
    ],
    [],
    [
        {
            "name": "문창(십년)",
            "type": "soft",
            "scope": "decadal"
        }
    ],
    [],
    [
        {
            "name": "천월(십년)",
            "type": "soft",
            "scope": "decadal"
        }
    ],
    [],
    [
        {
            "name": "문곡(십년)",
            "type": "soft",
            "scope": "decadal"
        },
        {
            "name": "천희(십년)",
            "type": "flower",
            "scope": "decadal"
        }
    ],
    [],
    [],
    [],
    [
        {
            "name": "천괴(십년)",
            "type": "soft",
            "scope": "decadal"
        },
        {
            "name": "타라(십년)",
            "type": "tough",
            "scope": "decadal"
        }
    ]
]
```

</details>

如果你发现翻译中有不对的地方，可以在 [这里](https://github.com/SylarLong/iztro/issues) 创建Issue指出，非常感谢。

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

定义了 `十二地支`，地支中的 `午` 英文和天干中的 `戊` 相同，为了解决国际化时的冲突，固将地支中的 `午` 翻译成了 `woo`。

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

定义了紫微斗数宫位的 `名称`。

:::tabs
== 简体中文 
`命宫` | `身宫` | `兄弟` | `夫妻` | `子女` | `财帛` | `疾厄` | `迁移` | `仆役` | `官禄` | `田宅` | `福德` | `父母` | `来因`
== 繁體中文
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `僕役` | `官祿` | `田宅` | `福德` | `父母` | `来因`
== English
`soul` | `body` | `siblings` | `spouse` | `children` | `wealth` | `health` | `surface` | `friends` | `career` | `property` | `spirit` | `parents` | `origin`
== 한국어
`명궁` | `신궁` | `형제` | `부처` | `자녀` | `재백` | `질액` | `천이` | `노복` | `관록` | `전택` | `복덕` | `부모` | `라인`
== 日本語
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `僕役` | `官祿` | `田宅` | `福德` | `父母` | `来因`
:::

---

#### `Brightness`

定义了星耀的 `亮度`

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

定义了紫微斗数中 `四化星` 的名称

:::tabs
== 简体中文
`禄` | `权` | `科` | `忌`
== 繁體中文
`祿` | `權` | `科` | `忌`
== English
`addtional` | `forceful` | `easygoing` | `focused`
== 한국어
`록` | `권` | `과` | `기`
== 日本語
`祿` | `權` | `科` | `忌`
:::

---

#### `StarName`

定义了紫微斗数中 `星耀` 的名称，包括 `流耀`

:::tabs
== 简体中文
`紫微`
| `天机`
| `太阳`
| `武曲`
| `天同`
| `廉贞`
| `天府`
| `太阴`
| `贪狼`
| `巨门`
| `天相`
| `天梁`
| `七杀`
| `破军`
| `左辅`
| `右弼`
| `文昌`
| `文曲`
| `禄存`
| `天马`
| `擎羊`
| `陀罗`
| `火星`
| `铃星`
| `天魁`
| `天钺`
| `地空`
| `地劫`
| `天空`
| `天刑`
| `天姚`
| `解神`
| `阴煞`
| `天喜`
| `天官`
| `天福`
| `天哭`
| `天虚`
| `龙池`
| `凤阁`
| `红鸾`
| `孤辰`
| `寡宿`
| `蜚廉`
| `破碎`
| `台辅`
| `封诰`
| `天巫`
| `天月`
| `三台`
| `八座`
| `恩光`
| `天贵`
| `天才`
| `天寿`
| `截空`
| `旬中`
| `旬空`
| `空亡`
| `截路`
| `月德`
| `天伤`
| `天使`
| `天厨`
| `长生`
| `沐浴`
| `冠带`
| `临官`
| `帝旺`
| `衰`
| `病`
| `死`
| `墓`
| `绝`
| `胎`
| `养`
| `博士`
| `力士`
| `青龙`
| `小耗`
| `将军`
| `奏书`
| `飞廉`
| `喜神`
| `病符`
| `大耗`
| `伏兵`
| `官府`
| `岁建`
| `晦气`
| `丧门`
| `贯索`
| `官符`
| `龙德`
| `白虎`
| `天德`
| `吊客`
| `将星`
| `攀鞍`
| `岁驿`
| `息神`
| `华盖`
| `劫煞`
| `灾煞`
| `天煞`
| `指背`
| `咸池`
| `月煞`
| `亡神`
| `运魁`
| `运钺`
| `运昌`
| `运曲`
| `运鸾`
| `运喜`
| `运禄`
| `运羊`
| `运陀`
| `运马`
| `流魁`
| `流钺`
| `流昌`
| `流曲`
| `流鸾`
| `流喜`
| `流禄`
| `流羊`
| `流陀`
| `流马`
| `年解`
== 繁體中文
`紫微`
| `天機`
| `太陽`
| `武曲`
| `天同`
| `廉貞`
| `天府`
| `太陰`
| `貪狼`
| `巨門`
| `天相`
| `天梁`
| `七殺`
| `破軍`
| `左輔`
| `右弼`
| `文昌`
| `文曲`
| `祿存`
| `天馬`
| `擎羊`
| `陀羅`
| `火星`
| `鈴星`
| `天魁`
| `天鉞`
| `地空`
| `地劫`
| `天空`
| `天刑`
| `天姚`
| `解神`
| `陰煞`
| `天喜`
| `天官`
| `天福`
| `天哭`
| `天虛`
| `龍池`
| `鳳閣`
| `紅鸞`
| `孤辰`
| `寡宿`
| `蜚廉`
| `破碎`
| `台輔`
| `封誥`
| `天巫`
| `天月`
| `三台`
| `八座`
| `恩光`
| `天貴`
| `天才`
| `天壽`
| `截空`
| `旬中`
| `旬空`
| `空亡`
| `截路`
| `月德`
| `天傷`
| `天使`
| `天廚`
| `長生`
| `沐浴`
| `冠帶`
| `臨官`
| `帝旺`
| `衰`
| `病`
| `死`
| `墓`
| `絕`
| `胎`
| `養`
| `博士`
| `力士`
| `青龍`
| `小耗`
| `將軍`
| `奏書`
| `飛廉`
| `喜神`
| `病符`
| `大耗`
| `伏兵`
| `官府`
| `歲建`
| `晦氣`
| `喪門`
| `貫索`
| `官符`
| `龍德`
| `白虎`
| `天德`
| `弔客`
| `將星`
| `攀鞍`
| `歲驛`
| `息神`
| `華蓋`
| `劫煞`
| `災煞`
| `天煞`
| `指背`
| `咸池`
| `月煞`
| `亡神`
| `運魁`
| `運鉞`
| `運昌`
| `運曲`
| `運鸞`
| `運喜`
| `運祿`
| `運羊`
| `運陀`
| `運馬`
| `流魁`
| `流鉞`
| `流昌`
| `流曲`
| `流鸞`
| `流喜`
| `流祿`
| `流羊`
| `流陀`
| `流馬`
| `年解`
== English
`emperor`
| `advisor`
| `sun`
| `general`
| `fortunate`
| `judge`
| `empress`
| `moon`
| `wolf`
| `advocator`
| `minister`
| `sage`
| `marshal`
| `rebel`
| `officer`
| `helper`
| `scholar`
| `artist`
| `money`
| `horse`
| `goat`
| `dala`
| `mars`
| `spark`
| `assistant`
| `aide`
| `ideologue`
| `scatterbrain`
| `utopian`
| `serious`
| `social`
| `considery`
| `gloomy`
| `cheerful`
| `solemn`
| `lucky`
| `upset`
| `frail`
| `talented`
| `refined`
| `attractive`
| `alone`
| `lonely`
| `instigated`
| `broken`
| `honorable`
| `awarded`
| `psychic`
| `sickly`
| `senior`
| `dignified`
| `grateful`
| `noble`
| `gifted`
| `ageless`
| `interrupted`
| `meditative`
| `fancied`
| `bottomless`
| `intercepted`
| `peaceful`
| `wounded`
| `heaven`
| `gourmet`
| `born`
| `infancy`
| `adolescence`
| `adulthood`
| `prime`
| `weak`
| `sick`
| `dead`
| `buried`
| `dissipated`
| `embryo`
| `molding`
| `doctor`
| `sumo`
| `dragon`
| `consumer`
| `general`
| `book`
| `gossip`
| `happiness`
| `illness`
| `wastrel`
| `ambush`
| `government`
| `initial`
| `unlucky`
| `downcast`
| `tied`
| `official`
| `virtuous`
| `sinister`
| `blessed`
| `sorrowing`
| `capable`
| `admired`
| `varied`
| `listless`
| `religious`
| `robbed`
| `disastery`
| `condemned`
| `insidious`
| `passionate`
| `hapless`
| `perished`
| `assistant(decadal)`
| `aide(decadal)`
| `scholar(decadal)`
| `artist(decadal)`
| `attractive(decadal)`
| `cheerful(decadal)`
| `money(decadal)`
| `goat(decadal)`
| `dala(decadal)`
| `horse(decadal)`
| `assistant(yearly)`
| `aide(yearly)`
| `scholar(yearly)`
| `artist(yearly)`
| `attractive(yearly)`
| `cheerful(yearly)`
| `money(yearly)`
| `goat(yearly)`
| `dala(yearly)`
| `horse(yearly)`
| `considery(yearly)`
== 한국어
`자미`
| `천기`
| `태양`
| `무곡`
| `천동`
| `염정`
| `천부`
| `태음`
| `탐랑`
| `거문`
| `천상`
| `천량`
| `칠살`
| `파군`
| `좌보`
| `우필`
| `문창`
| `문곡`
| `록존`
| `천마`
| `경양`
| `타라`
| `화성`
| `령성`
| `천괴`
| `천월`
| `지공`
| `지겁`
| `천공`
| `천형`
| `천요`
| `해신`
| `음살`
| `천희`
| `천관`
| `천복`
| `천곡`
| `천허`
| `용지`
| `봉각`
| `홍란`
| `고진`
| `과숙`
| `비렴`
| `파쇄`
| `태보`
| `봉고`
| `천무`
| `천월`
| `삼태`
| `팔좌`
| `은광`
| `천귀`
| `천재`
| `천수`
| `절중`
| `순중`
| `순공`
| `공망`
| `절로`
| `월덕`
| `천상`
| `천사`
| `천주`
| `장생`
| `목욕`
| `관대`
| `임관`
| `제왕`
| `쇠`
| `병`
| `사`
| `묘`
| `절`
| `태`
| `양`
| `박사`
| `역사`
| `청룡`
| `소모`
| `장군`
| `주서`
| `비렴`
| `희신`
| `병부`
| `대모`
| `복병`
| `관부`
| `태세`
| `회기`
| `상문`
| `관색`
| `관부`
| `용덕`
| `백호`
| `복덕`
| `조객`
| `장성`
| `반안`
| `세역`
| `식신`
| `화개`
| `겁살`
| `재살`
| `천살`
| `지배`
| `함지`
| `월살`
| `망신`
| `천괴(십년)`
| `천월(십년)`
| `문창(십년)`
| `문곡(십년)`
| `홍란(십년)`
| `천희(십년)`
| `록존(십년)`
| `경양(십년)`
| `타라(십년)`
| `천마(십년)`
| `천괴(년)`
| `천월(년)`
| `문창(년)`
| `문곡(년)`
| `홍란(년)`
| `천희(년)`
| `록존(년)`
| `경양(년)`
| `타라(년)`
| `천마(년)`
| `해신(년)`
== 日本語
`紫微`
| `天機`
| `太陽`
| `武曲`
| `天同`
| `廉貞`
| `天府`
| `太陰`
| `貪狼`
| `巨門`
| `天相`
| `天梁`
| `七殺`
| `破軍`
| `左輔`
| `右弼`
| `文昌`
| `文曲`
| `祿存`
| `天馬`
| `擎羊`
| `陀羅`
| `火星`
| `鈴星`
| `天魁`
| `天鉞`
| `地空`
| `地劫`
| `天空`
| `天刑`
| `天姚`
| `解神`
| `陰煞`
| `天喜`
| `天官`
| `天福`
| `天哭`
| `天虛`
| `龍池`
| `鳳閣`
| `紅鸞`
| `孤辰`
| `寡宿`
| `蜚廉`
| `破碎`
| `台輔`
| `封誥`
| `天巫`
| `天月`
| `三台`
| `八座`
| `恩光`
| `天貴`
| `天才`
| `天壽`
| `截空`
| `旬中`
| `旬空`
| `空亡`
| `截路`
| `月德`
| `天傷`
| `天使`
| `天廚`
| `長生`
| `沐浴`
| `冠帶`
| `臨官`
| `帝旺`
| `衰`
| `病`
| `死`
| `墓`
| `絕`
| `胎`
| `養`
| `博士`
| `力士`
| `青龍`
| `小耗`
| `將軍`
| `奏書`
| `飛廉`
| `喜神`
| `病符`
| `大耗`
| `伏兵`
| `官府`
| `歲建`
| `晦氣`
| `喪門`
| `貫索`
| `官符`
| `龍德`
| `白虎`
| `天德`
| `弔客`
| `將星`
| `攀鞍`
| `歲驛`
| `息神`
| `華蓋`
| `劫煞`
| `災煞`
| `天煞`
| `指背`
| `咸池`
| `月煞`
| `亡神`
| `運魁`
| `運鉞`
| `運昌`
| `運曲`
| `運鸞`
| `運喜`
| `運祿`
| `運羊`
| `運陀`
| `運馬`
| `流魁`
| `流鉞`
| `流昌`
| `流曲`
| `流鸞`
| `流喜`
| `流祿`
| `流羊`
| `流陀`
| `流馬`
| `年解`
:::

---

#### `FiveElementsClassName`

定义了紫微斗数中 `五行局` 的名称

:::tabs
== 简体中文
`水二局` | `木三局` | `金四局` | `土五局` | `火六局`
== 繁體中文
`水二局` | `木三局` | `金四局` | `土五局` | `火六局`
== English
`water 2nd` | `wood 3rd` | `metal 4th` | `earth 5th` | `fire 6th`
== 한국어
`수이국` | `목삼국` | `금사국` | `토오국` | `화육국`
== 日本語
`水の二局` | `木の三局` | `金の四局` | `土の五局` | `火の六局`
:::

---

#### `GenderName`

定义 `性别` 的名称

:::tabs
== 简体中文
`男` | `女`
== 繁體中文
`男` | `女`
== English
`male` | `female`
== 한국어
`남성` | `여자`
== 日本語
`男` | `女`
:::

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
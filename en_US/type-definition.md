---
description: "Reference for iztro types, localized values, and the data returned by the astro API."
---

# Type definitions {#类型定义}

## Introduction   {#前言}

This page describes the types in `iztro`. [Internationalized types](#国际化类型) are defined in [i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts), while the other types are defined in [types](https://github.com/SylarLong/iztro/tree/main/src/data/types).

Import `internationalized types` with the following code:

```ts
import { HeavenlyStemName } from "iztro/lib/i18n";
```

To import other types, use:

```ts
import { Palace } from "iztro/lib/data/types";
```

::: tip Tips
If you find an error or an unsuitable choice in the `translations` or `type definitions`, please [open an issue](https://github.com/SylarLong/iztro/issues). Thank you!
:::

## Internationalized types {#国际化类型}

To support internationalized input and output, `iztro` defines localized values for its parameters and results. You can pass a value in **any supported language**: for example, a [`HeavenlyStemName`](#heavenlystemname) can be `甲`, `갑` or `jia`.

For example, when calling `getHoroscopeStar()`, you can pass the Chinese names of the Heavenly Stems（天干） and Earthly Branches（地支） as arguments:

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("甲", "子", "decadal");
```

You can also pass names in other supported languages, or mix languages in the same call:

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("갑", "zi", "decadal");
```

The output uses the language you select, regardless of the languages used in the input. Set the output language before calling the method:

```ts
import { setLanguage } from "iztro/lib/i18n";

setLanguage("ko-KR");

const horoscopeStar = getHoroscopeStar("甲", "zi", "decadal");
```

The output of `horoscopeStar` will then be in `Korean`.

::: details `horoscopeStar` output result

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

:::

---

### `HeavenlyStemName` {#heavenlystemname}

Defines the names of the `ten Heavenly Stems`（十天干）.

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
== Tiếng Việt
`Giáp` | `Ất` | `Bính` | `Đinh` | `Mậu` | `Kỷ` | `Canh` | `Tân` | `Nhâm` | `Quý`
:::

---

### `EarthlyBranchName` {#earthlybranchname}

Defines the `twelve Earthly Branches`（十二地支）. The standard romanization of the Earthly Branch `woo`（午） and the Heavenly Stem `wu`（戊） is “wu” in both cases. To avoid a naming conflict in multilingual input, the library represents the branch `woo`（午） as `woo`.

:::tabs
== 简体中文
`子` | `丑` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
== 繁體中文
`子` | `丑` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
== English
`zi` | `chou` | `yin` | `mao` | `chen` | `si` | `woo` | `wei` | `shen` | `you` | `xu` | `hai`
== 한국어
`자` | `축` | `인` | `묘` | `진` | `사` | `오` | `미` | `신` | `유` | `술` | `해`
== 日本語
`子` | `丑` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
== Tiếng Việt
`Tý` | `Sửu` | `Dần` | `Mão` | `Thìn` | `Tỵ` | `Ngọ` | `Mùi` | `Thân` | `Dậu` | `Tuất` | `Hợi`
:::

---

### `PalaceName` {#palacename}

Defines the `Name` of Zi Wei Dou Shu（紫微斗數） palaces（宮位）.

:::tabs
== 简体中文
`命宫` | `身宫` | `兄弟` | `夫妻` | `子女` | `财帛` | `疾厄` | `迁移` | `仆役` | `官禄` | `田宅` | `福德` | `父母` | `来因`
== 繁體中文
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `僕役` | `官祿` | `田宅` | `福德` | `父母` | `来因`
== English
`soul` | `body` | `siblings` | `spouse` | `children` | `wealth` | `health` | `surface` | `friends` | `career` | `property` | `spirit` | `parents` | `origin`
== 한국어
`명궁` | `신궁` | `형제` | `부처` | `자녀` | `재백` | `질액` | `천이` | `노복` | `관록` | `전택` | `복덕` | `부모` | `래인`
== 日本語
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `僕役` | `官祿` | `田宅` | `福德` | `父母` | `来因`
== Tiếng Việt
`Mệnh` | `Thân` | `Huynh Đệ` | `Phu Thê` | `Tử Nữ` | `Tài Bạch` | `Tật Ách` | `Thiên Di` | `Nô Bộc` | `Quan Lộc` | `Điền Trạch` | `Phúc Đức` | `Phụ Mẫu` | `Lai Nhân`
:::

---

### `Brightness` {#brightness}

Defines star（星曜） `brightness`.

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
== Tiếng Việt
`""` | `Miếu` | `Vượng` | `Đắc` | `Lợi` | `Bình` | `Bất` | `Hạn`
:::

---

### `Mutagen` {#mutagen}

Defines the name of `four transformation stars`（四化星） in Zi Wei Dou Shu（紫微斗數）

:::tabs
== 简体中文
`禄` | `权` | `科` | `忌`
== 繁體中文
`祿` | `權` | `科` | `忌`
== English
`A` | `B` | `C` | `D`
== 한국어
`록` | `권` | `과` | `기`
== 日本語
`祿` | `權` | `科` | `忌`
== Tiếng Việt
`Lộc` | `Quyền` | `Khoa` | `Kỵ`
:::

---

### `StarName` {#starname}

Defines the names of `stars`（星曜） in Zi Wei Dou Shu（紫微斗數）, including `transit stars`（流曜）.

<Badge type="warning" text="^2.6.1" /> The English names for warrior（武曲） and breaker（歲破） are `warrior` and `breaker`, respectively.

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
| `劫杀`
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
| `岁破`
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
| `月魁`
| `月钺`
| `月昌`
| `月曲`
| `月鸾`
| `月喜`
| `月禄`
| `月羊`
| `月陀`
| `月马`
| `日魁`
| `日钺`
| `日昌`
| `日曲`
| `日鸾`
| `日喜`
| `日禄`
| `日羊`
| `日陀`
| `日马`
| `时魁`
| `时钺`
| `时昌`
| `时曲`
| `时鸾`
| `时喜`
| `时禄`
| `时羊`
| `时陀`
| `时马`
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
| `劫殺`
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
| `歲破`
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
| `月魁`
| `月鉞`
| `月昌`
| `月曲`
| `月鸞`
| `月喜`
| `月祿`
| `月羊`
| `月陀`
| `月馬`
| `日魁`
| `日鉞`
| `日昌`
| `日曲`
| `日鸞`
| `日喜`
| `日祿`
| `日羊`
| `日陀`
| `日馬`
| `時魁`
| `時鉞`
| `時昌`
| `時曲`
| `時鸞`
| `時喜`
| `時祿`
| `時羊`
| `時陀`
| `時馬`
== English
`emperor`
| `advisor`
| `sun`
| `warrior`
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
| `driven`
| `tangled`
| `impulsive`
| `spark`
| `assistant`
| `aide`
| `ideologue`
| `fickle`
| `murder`
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
| `breaker`
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
| `assistant(D)`
| `aide(D)`
| `scholar(D)`
| `artist(D)`
| `attractive(D)`
| `cheerful(D)`
| `money(D)`
| `driven(D)`
| `tangled(D)`
| `horse(D)`
| `assistant(Y)`
| `aide(Y)`
| `scholar(Y)`
| `artist(Y)`
| `attractive(Y)`
| `cheerful(Y)`
| `money(Y)`
| `driven(Y)`
| `tangled(Y)`
| `horse(Y)`
| `considery(Y)`
| `assistant(M)`
| `aide(M)`
| `scholar(M)`
| `artist(M)`
| `attractive(M)`
| `cheerful(M)`
| `money(M)`
| `driven(M)`
| `tangled(M)`
| `horse(M)`
| `assistant(d)`
| `aide(d)`
| `scholar(d)`
| `artist(d)`
| `attractive(d)`
| `cheerful(d)`
| `money(d)`
| `driven(d)`
| `tangled(d)`
| `horse(d)`
| `assistant(H)`
| `aide(H)`
| `scholar(H)`
| `artist(H)`
| `attractive(H)`
| `cheerful(H)`
| `money(H)`
| `driven(H)`
| `tangled(H)`
| `horse(H)`
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
| `겁살`
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
| `태파`
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
| `천괴(월)`
| `천월(월)`
| `문창(월)`
| `문곡(월)`
| `홍란(월)`
| `천희(월)`
| `록존(월)`
| `경양(월)`
| `타라(월)`
| `천마(월)`
| `천괴(일)`
| `천월(일)`
| `문창(일)`
| `문곡(일)`
| `홍란(일)`
| `천희(일)`
| `록존(일)`
| `경양(일)`
| `타라(일)`
| `천마(일)`
| `천괴(시)`
| `천월(시)`
| `문창(시)`
| `문곡(시)`
| `홍란(시)`
| `천희(시)`
| `록존(시)`
| `경양(시)`
| `타라(시)`
| `천마(시)`
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
| `劫殺`
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
| `歲破`
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
| `限の魁`
| `限の钺`
| `限の昌`
| `限の曲`
| `限の鸾`
| `限の喜`
| `限の祿`
| `限の羊`
| `限の陀`
| `限の馬`
| `年の魁`
| `年の钺`
| `年の昌`
| `年の曲`
| `年の鸾`
| `年の喜`
| `年の祿`
| `年の羊`
| `年の陀`
| `年の馬`
| `年の解`
| `月の魁`
| `月の钺`
| `月の昌`
| `月の曲`
| `月の鸾`
| `月の喜`
| `月の祿`
| `月の羊`
| `月の陀`
| `月の馬`
| `日の魁`
| `日の钺`
| `日の昌`
| `日の曲`
| `日の鸾`
| `日の喜`
| `日の祿`
| `日の羊`
| `日の陀`
| `日の馬`
| `時の魁`
| `時の钺`
| `時の昌`
| `時の曲`
| `時の鸾`
| `時の喜`
| `時の祿`
| `時の羊`
| `時の陀`
| `時の馬`
== Tiếng Việt
`Tử Vi`
| `Thiên Cơ`
| `Thái Dương`
| `Vũ Khúc`
| `Thiên Đồng`
| `Liêm Trinh`
| `Thiên Phủ`
| `Thái Âm`
| `Tham Lang`
| `Cự Môn`
| `Thiên Tướng`
| `Thiên Lương`
| `Thất Sát`
| `Phá Quân`
| `Tả Phù`
| `Hữu Bật`
| `Văn Xương`
| `Văn Khúc`
| `Lộc Tồn`
| `Thiên Mã`
| `Kình Dương`
| `Đà La`
| `Hỏa Tinh`
| `Linh Tinh`
| `Thiên Khôi`
| `Thiên Việt`
| `Địa Không`
| `Địa Kiếp`
| `Kiếp Sát`
| `Thiên Không`
| `Thiên Hình`
| `Thiên Diêu`
| `Giải Thần`
| `Âm Sát`
| `Thiên Hỷ`
| `Thiên Quan`
| `Thiên Phúc`
| `Thiên Khốc`
| `Thiên Hư`
| `Long Trì`
| `Phụng Các`
| `Hồng Loan`
| `Cô Thần`
| `Quả Tú`
| `Phi Liêm`
| `Phá Toái`
| `Đài Phụ`
| `Phong Cáo`
| `Thiên Vu`
| `Thiên Nguyệt`
| `Tam Thai`
| `Bát Tọa`
| `Ân Quang`
| `Thiên Quý`
| `Thiên Tài`
| `Thiên Thọ`
| `Triệt Không`
| `Tuần Trung`
| `Tuần Không`
| `Không Vong`
| `Triệt Lộ`
| `Nguyệt Đức`
| `Thiên Thương`
| `Thiên Sứ`
| `Thiên Trù`
| `Trường Sinh`
| `Mục Dục`
| `Quan Đới`
| `Lâm Quan`
| `Đế Vượng`
| `Suy`
| `Bệnh`
| `Tử`
| `Mộ`
| `Tuyệt`
| `Thai`
| `Dưỡng`
| `Bác Sỹ`
| `Lực Sỹ`
| `Thanh Long`
| `Tiểu Hao`
| `Tướng Quân`
| `Tấu Thư`
| `Phi Liêm`
| `Hỷ Thần`
| `Bệnh Phù`
| `Đại Hao`
| `Tuế Phá`
| `Phục Binh`
| `Quan Phủ`
| `Tuế Kiện`
| `Hối Khí`
| `Tang Môn`
| `Quán Tác`
| `Quan Phù`
| `Long Đức`
| `Bạch Hổ`
| `Thiên Đức`
| `Điếu Khách`
| `Tướng Tinh`
| `Phan Án`
| `Tuế Dịch`
| `Tức Thần`
| `Hoa Cái`
| `Kiếp Sát`
| `Tai Sát`
| `Thiên Sát`
| `Chỉ Bối`
| `Hàm Trì`
| `Nguyệt Sát`
| `Vong Thần`
| `Vận Khôi`
| `Vận Việt`
| `Vận Xương`
| `Vận Khúc`
| `Vận Loan`
| `Vận Hỷ`
| `Vận Lộc`
| `Vận Dương`
| `Vận Đà`
| `Vận Mã`
| `Lưu Khôi`
| `Lưu Việt`
| `Lưu Xương`
| `Lưu Khúc`
| `Lưu Loan`
| `Lưu Hỷ`
| `Lưu Lộc`
| `Lưu Dương`
| `Lưu Đà`
| `Lưu Mã`
| `Niên Giải`
| `Thiên Khôi(M)`
| `Thiên Nguyệt(M)`
| `Văn Xương(M)`
| `Văn Khúc(M)`
| `Hồng Loan(M)`
| `Thiên Hỷ(M)`
| `Lộc Tồn(M)`
| `Kình Dương(M)`
| `Đà La(M)`
| `Thiên Mã(M)`
| `Thiên Khôi(d)`
| `Thiên Nguyệt(d)`
| `Văn Xương(d)`
| `Văn Khúc(d)`
| `Hồng Loan(d)`
| `Thiên Hỷ(d)`
| `Lộc Tồn(d)`
| `Kình Dương(d)`
| `Đà La(d)`
| `Thiên Mã(d)`
| `Thiên Khôi(H)`
| `Thiên Nguyệt(H)`
| `Văn Xương(H)`
| `Văn Khúc(H)`
| `Hồng Loan(H)`
| `Thiên Hỷ(H)`
| `Lộc Tồn(H)`
| `Kình Dương(H)`
| `Đà La(H)`
| `Thiên Mã(H)`
:::

:::tip Alias of the same name stars ^2.6.1
When two stars（星曜） share the same Korean or Vietnamese name, use an alias qualified with Chinese characters to identify the intended star precisely. These aliases are accepted only as input; translated output still uses the original names.

- Korean: `천상(天相)`, `천상(天傷)`, `천월(天鉞)`, `천월(天月)`, `겁살(劫殺)`, `겁살(劫煞)`, `비렴(蜚廉)`, `비렴(飛廉)`, `관부(官府)`, `관부(官符)`
- Vietnamese: `Kiếp Sát(劫殺)`, `Kiếp Sát(劫煞)`, `Phi Liêm(蜚廉)`, `Phi Liêm(飛廉)`
:::

---

### `FiveElementsClassName` {#fiveelementsclassname}

Defines the name of `Five Elements Class`（五行局） in Zi Wei Dou Shu（紫微斗數）

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
== Tiếng Việt
`Thủy Nhị Cục` | `Mộc Tam Cục` | `Kim Tứ Cục` | `Thổ Ngũ Cục` | `Hỏa Lục Cục`
:::

---

### `GenderName` {#gendername}

Defines the names used for `gender`.

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
== Tiếng Việt
`Nam` | `Nữ`
:::

## Common types {#通用}

### `Language` {#language}

```ts
export type Language = `zh-CN` | `zh-TW` | `en-US` | `ko-KR` | `ja-JP` | `vi-VN`;
```

Defines the supported `language` values:

- `zh-CN`: Simplified Chinese
- `zh-TW`: Traditional Chinese
- `en-US`：English
- `ko-KR`：한국어
- `ja-JP`: Japanese
- `vi-VN`: Vietnamese

---

### `Scope` {#scope}

```ts
export type Scope = "origin" | "decadal" | "yearly";
```

Defines the `scope` of stars（星曜）, distinguishing natal stars（本命星曜） from transit stars（流曜）:

- `origin`: natal stars（本命星曜）
- `decadal`: decadal-cycle stars（大限星曜）
- `yearly`: yearly transit stars（流年星曜）

---

### `StarType` {#startype}

```ts
export type StarType =
  | "major"
  | "soft"
  | "tough"
  | "adjective"
  | "flower"
  | "helper"
  | "lucun"
  | "tianma";
```

Defines star（星曜） `Type`. Although `romance stars`（桃花星） and `considery`（解神） (including `considery(Y)`（年解）) are miscellaneous stars（雜曜）, they have special significance in chart interpretation and are therefore classified separately. The two auxiliary stars `money`（祿存） and `horse`（天馬） also have distinct roles, so each has its own category:

- `major`: major stars（主星）
- `soft`: auspicious stars（吉星）
- `tough`: malefic stars（煞星）
- `adjective`: miscellaneous stars（雜曜）
- `flower`: romance stars（桃花）
- `helper`：considery（解神）
- `lucun`：money（祿存）
- `tianma`：horse（天馬）

## Stars（星曜）   {#星曜}

### `Star` {#star}

```ts
export type Star = {
  name: StarName;
  type: StarType;
  scope: Scope;
  brightness?: Brightness;
  mutagen?: Mutagen;
};
```

Defines the data structure for `stars`（星曜）.

| Properties | Meaning | Type |
| --- | --- | --- |
| `name` | Star name（星曜名稱） | [`StarName`](#starname) |
| `type` | Star type（星曜類型） | [`StarType`](#startype) |
| `scope` | Scope | [`Scope`](#scope) |
| `brightness` | Star brightness | [`Brightness`](#brightness) |
| `mutagen` | four transformations（四化） | [`Mutagen`](#mutagen) |

## Palaces（宮位）   {#宫位}

### `SoulAndBody` {#soulandbody}

```ts
export type SoulAndBody = {
  soulIndex: number;
  bodyIndex: number;
  heavenlyStemOfSoul: HeavenlyStemName;
  earthlyBranchOfSoul: EarthlyBranchName;
};
```

Defines the positions of the `soul`（命宮） and `body`（身宮） palaces.

| Properties | Meaning | Type |
| --- | --- | --- |
| `soulIndex` | soul（命宮） index | `number` |
| `bodyIndex` | body（身宮） index | `number` |
| `heavenlyStemOfSoul` | Heavenly Stem of the soul palace（命宮天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranchOfSoul` | Earthly Branch of the soul palace（命宮地支） | [`EarthlyBranchName`](#earthlybranchname) |

---

### `Palace` {#palace}

```ts
export type Palace = {
  name: PalaceName;
  isBodyPalace: boolean;
  isOriginalPalace: boolean;
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
  majorStars: Star[];
  minorStars: Star[];
  adjectiveStars: Star[];
  changsheng12: StarName;
  boshi12: StarName;
  jiangqian12: StarName;
  suiqian12: StarName;
  decadal: Decadal;
  ages: number[];
};
```

Defines the data structure for `palaces`（宮位）.

| Properties | Meaning | Type |
| --- | --- | --- |
| `name` | Palace name（宮位名稱） | [`PalaceName`](#palacename) |
| `isBodyPalace` | Whether this is the body palace（身宮） | `boolean` |
| `isOriginalPalace` | Whether this is the origin palace（來因宮） | `boolean` |
| `heavenlyStem` | Palace Heavenly Stem（宮位天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | Palace Earthly Branch（宮位地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `majorStars` | major stars（主星） | [`Star[]`](#star) |
| `minorStars` | auxiliary stars（輔星） | [`Star[]`](#star) |
| `adjectiveStars` | miscellaneous stars（雜曜） | [`Star[]`](#star) |
| `changsheng12` | Twelve growth-stage stars | [`StarName`](#starname) |
| `boshi12` | Twelve Doctor-cycle stars（博士十二神） | [`StarName`](#starname) |
| `jiangqian12` | Twelve yearly General-front stars | [`StarName`](#starname) |
| `suiqian12` | Twelve yearly Year-front stars | [`StarName`](#starname) |
| `decadal` | decadal（大限） | [`Decadal`](#decadal) |
| `ages` | age（小限） | `number[]` |

---

### `SurroundedPalaces` {#surroundedpalaces}

```ts
export type SurroundedPalaces = {
  target: IFunctionalPalace;
  opposite: IFunctionalPalace;
  wealth: IFunctionalPalace;
  career: IFunctionalPalace;
};
```

Defines an object containing the `trine and opposite palaces`（三方四正）.

| Properties | Meaning | Type |
| --- | --- | --- |
| `target` | target palace | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `opposite` | opposite palace | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `wealth` | Wealth position（財帛位） | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `career` | Career position（官祿位） | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |

## Horoscope periods（運限）   {#运限}

### `HoroscopeItem` {#horoscopeitem}

```ts
export type HoroscopeItem = {
  index: number;
  name: string;
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
  palaceNames: PalaceName[];
  mutagen: StarName[];
  stars?: Star[][];
};
```

Defines the data structure used for individual `horoscope periods`（運限）.

| Properties | Meaning | Type |
| --- | --- | --- |
| `index` | Index of the corresponding palace | `number` |
| `name`   <Badge type="warning" text="^1.2.3" /> | Horoscope-period name（運限名稱） | `string` |
| `heavenlyStem` | Horoscope-period Heavenly Stem（運限天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | Horoscope-period Earthly Branch（運限地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `palaceNames` | Twelve palaces of the horoscope period（運限十二宮） | [`PalaceName[]`](#palacename) |
| `mutagen` | four transformation stars（四化星） | [`StarName[]`](#starname) |
| `stars` | transit stars（流曜） | [`Star[][]`](#star) |

---

### `Decadal` {#decadal}

```ts
export type Decadal = {
  range: [number, number];
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
};
```

Defines the chart’s `decadal`（大限） data. This type is mainly used in [Palace](#palace).

| Properties | Meaning | Type |
| --- | --- | --- |
| `range` | Decadal-period starting and ending ages [`starting age`, `ending age`] | `[number, number]` |
| `heavenlyStem` | Decadal-period Heavenly Stem（大限天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | Decadal-period Earthly Branch（大限地支） | [`EarthlyBranchName`](#earthlybranchname) |

---

### `DecadalHoroscope` {#decadalhoroscope}

```ts
export type DecadalHoroscope = HoroscopeItem & {
  palaceName: PalaceName;
  ageRange: [number, number];
  yearRange: [number, number];
};
```

Defines a decadal-cycle（大限） list item returned by `decadalList()`.

| Properties | Meaning | Type |
| --- | --- | --- |
| `palaceName` | Natal palace occupied by the decadal period（大限所在本命宮位） | [`PalaceName`](#palacename) |
| `ageRange` | Decadal-period starting and ending nominal ages（虛歲） | `[number, number]` |
| `yearRange` | Decadal-period starting and ending years | `[number, number]` |

This type also contains all attributes of [`HoroscopeItem`](#horoscopeitem).

---

### `YearlyHoroscope` {#yearlyhoroscope}

```ts
export type YearlyHoroscope = HoroscopeItem & {
  age: number;
  year: number;
};
```

Defines a yearly-cycle（流年） list item returned by `yearlyList()`.

| Properties | Meaning | Type |
| --- | --- | --- |
| `age` | Nominal age corresponding to the annual period（流年虛歲） | `number` |
| `year` | Year of the annual period（流年年份） | `number` |

This type also contains all attributes of [`HoroscopeItem`](#horoscopeitem).

---

### `MonthlyHoroscope` {#monthlyhoroscope}

```ts
export type MonthlyHoroscope = YearlyHoroscope & {
  month: number;
  isLeapMonth: boolean;
  part: 'normal' | 'first' | 'second';
  dayRange: [number, number];
};
```

Defines a monthly-cycle（流月） list item returned by `monthlyList()`.

| Properties | Meaning | Type |
| --- | --- | --- |
| `month` | Lunar month, the first month is `1` | `number` |
| `isLeapMonth` | Is it a leap month? | `boolean` |
| `part` | Ordinary month, first half of leap month or second half of leap month | `'normal'`  \|  `'first'`  \|  `'second'` |
| `dayRange` | The corresponding lunar date range for this item | `[number, number]` |

This type contains all properties of both [`YearlyHoroscope`](#yearlyhoroscope) and [`HoroscopeItem`](#horoscopeitem).

---

### `Horoscope` {#horoscope}

```ts
export type Horoscope = {
  lunarDate: string;
  solarDate: string;
  decadal: HoroscopeItem;
  age: {
    index: number;
    nominalAge: number;
  };
  yearly: HoroscopeItem & {
    yearlyDecStar: {
      jiangqian12: StarName[];
      suiqian12: StarName[]
      }
    };
  monthly: HoroscopeItem;
  daily: HoroscopeItem;
  hourly: HoroscopeItem;
};
```

Defines a `horoscope-period`（運限） object containing `decadal`（大限）, `yearly`（流年）, `monthly`（流月）, `daily`（流日）, and `hourly`（流時） data.

| Properties | Meaning | Type |
| --- | --- | --- |
| `lunarDate` | Lunar-calendar date | `string` |
| `solarDate` | Gregorian date | `string` |
| `decadal` | decadal（大限） | [`HoroscopeItem`](#horoscopeitem) |
| `age` | age（小限） | { index:  `number`, nominalAge:  `number`  } |
| `yearly` | yearly（流年） | [`HoroscopeItem`](#horoscopeitem)   & { yearlyDecStar: { jiangqian12:  [`StarName[]`](/en_US/type-definition.md#starname); suiqian12:  [`StarName[]`](/en_US/type-definition.md#starname)  } } |
| `monthly` | monthly（流月） | [`HoroscopeItem`](#horoscopeitem) |
| `daily` | daily（流日） | [`HoroscopeItem`](#horoscopeitem) |
| `hourly` | hourly（流時） | [`HoroscopeItem`](#horoscopeitem) |

## Chart（星盤）   {#星盘}

### `Astrolabe` {#astrolabe}

```ts
export type Astrolabe = {
  gender: GenderName;
  solarDate: string;
  lunarDate: string;
  chineseDate: string;
  rawDates: {
    lunarDate: LunarDate;
    chineseDate: HeavenlyStemAndEarthlyBranchDate;
  };
  time: string;
  timeRange: string;
  sign: string;
  zodiac: string;
  earthlyBranchOfSoulPalace: EarthlyBranchName;
  earthlyBranchOfBodyPalace: EarthlyBranchName;
  soul: StarName;
  body: StarName;
  fiveElementsClass: FiveElementsClassName;
  palaces: IFunctionalPalace[];
};
```

Defines a `chart`（星盤） object.

| Properties | Meaning | Type |
| --- | --- | --- |
| `gender` | gender <Badge type="warning" text="^2.0.3" /> | [`GenderName`](#gendername) |
| `solarDate` | Gregorian date | `string` |
| `lunarDate` | Lunar-calendar date | `string` |
| `chineseDate` | Date expressed using Heavenly Stems and Earthly Branches（干支） | `string` |
| `rawDates` | Raw date data for future use by internal methods | { lunarDate:  `LunarDate`, chineseDate:  `HeavenlyStemAndEarthlyBranchDate`  } |
| `time` | Traditional double-hour（時辰） | `string` |
| `timeRange` | Clock-time range corresponding to the traditional double-hour | `string` |
| `sign` | Western zodiac sign（星座） | `string` |
| `zodiac` | Chinese zodiac animal（生肖） | `string` |
| `earthlyBranchOfSoulPalace` | Earthly Branch of the soul palace（命宮地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `earthlyBranchOfBodyPalace` | Earthly Branch of the body palace（身宮地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `soul` | Soul ruler star（命主） | [`StarName`](#starname) |
| `body` | Body ruler star（身主） | [`StarName`](#starname) |
| `fiveElementsClass` | Five Elements Class（五行局） | [`FiveElementsClassName`](#fiveelementsclassname) |
| `palaces` | Data for the twelve palaces（十二宮） | [`IFunctionalPalace[]`](./posts/palace.md#functionalpalace) |

## Configuration and plugins <Badge type="warning" text="^2.3.0" />   {#配置和插件}

### `ConfigMutagens` {#configmutagens}

Defines the `four transformations`（四化） parameter in the global configuration.

```ts
type ConfigMutagens = Partial<Record<HeavenlyStemName, StarName[]>>;
```

### `ConfigBrightness` {#configbrightness}

Defines the `brightness` parameter in the global configuration.

```ts
type ConfigBrightness = Partial<Record<StarName, Brightness[]>>;
```

### `Config` {#config}

Defines chart-calculation settings. Use `astro.config()` to set defaults for subsequently generated charts, or `withOptions({ config })` to override the settings for just the chart being generated. Existing charts retain the settings used at their creation (^2.6.2).

```ts
type Config = {
  // 星曜四化配置
  mutagens?: ConfigMutagens;
  // 星曜亮度配置
  brightness?: ConfigBrightness;
  // 年分割点配置
  yearDivide?: 'normal' | 'exact';
  // 运限分割点配置（^v2.4.3）
  horoscopeDivide?: 'normal' | 'exact';
  // 小限分割点配置，normal为以自然年分界，birthday为生日分界（^v2.4.5）
  // 默认为 normal
  ageDivide?: 'normal' | 'birthday';
  // 晚子时配置，current 时晚子时算当日，forward 时晚子时算次日（^v2.5.2）
  // 默认为 forward
  dayDivide?: 'current' | 'forward';
  // 安星方法，default 为通行版本，zhongzhou 为中州派版本（^v2.5.0）
  // 默认为 default
  algorithm?: 'default' | 'zhongzhou';
};
```

For `yearDivide` and `horoscopeDivide`, `normal` uses the first day of the first Chinese lunar month as the year boundary, while `exact` uses the solar term Start of Spring（立春）.

`dayDivide` only controls which calendar day the late Zi hour（晚子時） belongs to (`timeIndex` is `12`): `forward` assigns it to the following day, and `current` assigns it to the current day.

### `AstroType` <Badge type="warning" text="^2.5.0" /> {#astrotype}

Defines the chart type used by the Zhongzhou school（中州派）.

```ts
type AstroType = 'heaven' | 'earth' | 'human';
```

| value | Description |
| --- | --- |
| `heaven` | Natal chart（天盤）, the default |
| `earth` | Earth chart（地盤）: derive the Five Elements Class from the body palace's stem and branch, and use that palace as the soul palace. |
| `human` | Human chart（人盤）: derive the Five Elements Class from the spirit palace's stem and branch, and use that palace as the soul palace. |

### `Plugin` {#plugin}

Defines the plugin type. A plugin is simply a function.

```ts
type Plugin = () => void;
```

:::tip Tips
A plugin function implicitly receives a `this` parameter of type `T extends FunctionalAstrolabe`. See [Plugins](./posts/config-n-plugin.md#插件) for details on creating one.
:::

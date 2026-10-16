---
title: "iztro の TypeScript 型定義と多言語の値"
description: "iztroの型定義、多言語の値、astro APIが返すデータ構造を解説します。"
---

# 型定義  {#类型定义}

## はじめに  {#前言}

このページでは `iztro` の型定義を説明します。[国際化された型](#国际化类型)は [i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts) に、それ以外の型は [types](https://github.com/SylarLong/iztro/tree/main/src/data/types) に定義されています。

次のコードで `国際化された型` をインポートできます。

```ts
import { HeavenlyStemName } from "iztro/lib/i18n";
```

他の型をインポートする場合は、次のようにします。

```ts
import { Palace } from "iztro/lib/data/types";
```

::: tip ヒント
`翻訳`や`型定義`に誤りや不適切な点があれば、[Issueを作成してお知らせください](https://github.com/SylarLong/iztro/issues)。ご協力ありがとうございます。
:::

## 国際化された型  {#国际化类型}

`iztro` は多言語の入出力に対応するため、引数と戻り値に各言語の名称を定義しています。入力には **対応する任意の言語** の値を使えます。例えば [`HeavenlyStemName`](#heavenlystemname) には `甲`、`갑`、`jia` を指定できます。

例えば `getHoroscopeStar()` を呼び出す際、天干と地支の中国語名を引数に指定できます。

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("甲", "子", "decadal");
```

ほかの対応言語の名称を引数に使ったり、一度の呼び出しで複数の言語を組み合わせたりすることもできます。

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("갑", "zi", "decadal");
```

入力にどの言語を使っても、出力は指定した言語に統一されます。メソッドを呼び出す前に、出力言語を設定してください。

```ts
import { setLanguage } from "iztro/lib/i18n";

setLanguage("ko-KR");

const horoscopeStar = getHoroscopeStar("甲", "zi", "decadal");
```

このとき、`horoscopeStar`の出力結果は`韓国語`となります。

::: details `horoscopeStar`の出力結果

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

`十天干`の定義

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

`十二地支`を定義します。地支の`午`と天干の`戊`は、どちらも通常のローマ字表記では「wu」になります。多言語入力での名前の衝突を避けるため、ライブラリでは地支の`午`を`woo`と表記します。

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

紫微斗数の宮位の`名称`を定義します。

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
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `奴僕` | `官禄` | `田宅` | `福徳` | `父母` | `来因`
== Tiếng Việt
`Mệnh` | `Thân` | `Huynh Đệ` | `Phu Thê` | `Tử Nữ` | `Tài Bạch` | `Tật Ách` | `Thiên Di` | `Nô Bộc` | `Quan Lộc` | `Điền Trạch` | `Phúc Đức` | `Phụ Mẫu` | `Lai Nhân`
:::

---

### `Brightness` {#brightness}

星曜の`明るさ`を定義します。

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
`""` | `廟` | `旺` | `得` | `利` | `平` | `不` | `陥`
== Tiếng Việt
`""` | `Miếu` | `Vượng` | `Đắc` | `Lợi` | `Bình` | `Bất` | `Hãm`
:::

---

### `Mutagen` {#mutagen}

紫微斗数の`四化星`の名前を定義します

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
`禄` | `権` | `科` | `忌`
== Tiếng Việt
`Lộc` | `Quyền` | `Khoa` | `Kỵ`
:::

---

### `StarName` {#starname}

紫微斗数の`星曜`の名称を定義します。`流曜`も含まれます。

<Badge type="warning" text="^2.6.1" /> 武曲と歳破の英語名は、それぞれ`warrior`と`breaker`です。

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
| `영성`
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
| `절공`
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
| `세파`
| `복병`
| `관부`
| `태세`
| `회기`
| `상문`
| `관색`
| `관부`
| `용덕`
| `백호`
| `천덕`
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
| `禄存`
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
| `天虚`
| `竜池`
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
| `天寿`
| `截空`
| `旬中`
| `旬空`
| `空亡`
| `截路`
| `月徳`
| `天傷`
| `天使`
| `天厨`
| `長生`
| `沐浴`
| `冠帯`
| `臨官`
| `帝旺`
| `衰`
| `病`
| `死`
| `墓`
| `絶`
| `胎`
| `養`
| `博士`
| `力士`
| `青竜`
| `小耗`
| `将軍`
| `奏書`
| `飛廉`
| `喜神`
| `病符`
| `大耗`
| `歳破`
| `伏兵`
| `官府`
| `歳建`
| `晦気`
| `喪門`
| `貫索`
| `官符`
| `竜徳`
| `白虎`
| `天徳`
| `弔客`
| `将星`
| `攀鞍`
| `歳駅`
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
| `限の鉞`
| `限の昌`
| `限の曲`
| `限の鸞`
| `限の喜`
| `限の禄`
| `限の羊`
| `限の陀`
| `限の馬`
| `年の魁`
| `年の鉞`
| `年の昌`
| `年の曲`
| `年の鸞`
| `年の喜`
| `年の禄`
| `年の羊`
| `年の陀`
| `年の馬`
| `年の解`
| `月の魁`
| `月の鉞`
| `月の昌`
| `月の曲`
| `月の鸞`
| `月の喜`
| `月の禄`
| `月の羊`
| `月の陀`
| `月の馬`
| `日の魁`
| `日の鉞`
| `日の昌`
| `日の曲`
| `日の鸞`
| `日の喜`
| `日の禄`
| `日の羊`
| `日の陀`
| `日の馬`
| `時の魁`
| `時の鉞`
| `時の昌`
| `時の曲`
| `時の鸞`
| `時の喜`
| `時の禄`
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
| `Mộc Dục`
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
| `Thiên Việt(M)`
| `Văn Xương(M)`
| `Văn Khúc(M)`
| `Hồng Loan(M)`
| `Thiên Hỷ(M)`
| `Lộc Tồn(M)`
| `Kình Dương(M)`
| `Đà La(M)`
| `Thiên Mã(M)`
| `Thiên Khôi(d)`
| `Thiên Việt(d)`
| `Văn Xương(d)`
| `Văn Khúc(d)`
| `Hồng Loan(d)`
| `Thiên Hỷ(d)`
| `Lộc Tồn(d)`
| `Kình Dương(d)`
| `Đà La(d)`
| `Thiên Mã(d)`
| `Thiên Khôi(H)`
| `Thiên Việt(H)`
| `Văn Xương(H)`
| `Văn Khúc(H)`
| `Hồng Loan(H)`
| `Thiên Hỷ(H)`
| `Lộc Tồn(H)`
| `Kình Dương(H)`
| `Đà La(H)`
| `Thiên Mã(H)`
:::

:::tip 同じ名前のエイリアス 星曜 ^2.6.1
異なる星曜が韓国語やベトナム語で同じ名前になる場合は、漢字を付けた識別用の別名を入力して、対象の星曜を正確に指定できます。この別名は入力専用で、翻訳後の出力には従来の名称を使います。

- 韓国語：`천상(天相)`、`천상(天傷)`、`천월(天鉞)`、`천월(天月)`、`겁살(劫殺)`、`겁살(劫煞)`、`비렴(蜚廉)`、`비렴(飛廉)`、`관부(官府)`、`관부(官符)`
- ベトナム語: `Kiếp Sát(劫殺)`、`Kiếp Sát(劫煞)`、`Phi Liêm(蜚廉)`、`Phi Liêm(飛廉)`
:::

---

### `FiveElementsClassName` {#fiveelementsclassname}

紫微斗数の`五行局`の名前を定義します

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

`性別`の名前を定義します

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

## 共通の型 {#通用}

### `Language` {#language}

```ts
export type Language = `zh-CN` | `zh-TW` | `en-US` | `ko-KR` | `ja-JP` | `vi-VN`;
```

サポートされる `言語` が定義されています。現在サポートされている言語は次のとおりです。

- `zh-CN`: 簡体字中国語
- `zh-TW`: 繁体字中国語
- `en-US`：English
- `ko-KR`：한국어
- `ja-JP`: 日本語
- `vi-VN`: ベトナム語

---

### `Scope` {#scope}

```ts
export type Scope = "origin" | "decadal" | "yearly";
```

星曜の`適用範囲`を定義し、本命の星曜と流曜を区別します。

- `origin`: 本命の星曜
- `decadal`: 大限の星曜
- `yearly`: 流年の星曜

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

星曜の`タイプ`を定義します。`桃花星`と`解神`（`年の解`を含む）は雑曜ですが、命盤の解釈で特別な意味を持つため、別の分類を設けています。補助的な星曜である`禄存`と`天馬`も特殊な役割を持つため、それぞれ独立した分類にしています。

- `major`: 主星
- `soft`: 吉星
- `tough`: 煞星
- `adjective`: 雑曜
- `flower`: 桃花星
- `helper`：解神
- `lucun`：禄存
- `tianma`：天馬

## 星曜  {#星曜}

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

`星曜` オブジェクトを定義します

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `name` | 星曜の名前 | [`StarName`](#starname) |
| `type` | 星曜の種類 | [`StarType`](#startype) |
| `scope` | 範囲 | [`Scope`](#scope) |
| `brightness` | 星の明るさ | [`Brightness`](#brightness) |
| `mutagen` | 四化 | [`Mutagen`](#mutagen) |

## 宮位  {#宫位}

### `SoulAndBody` {#soulandbody}

```ts
export type SoulAndBody = {
  soulIndex: number;
  bodyIndex: number;
  heavenlyStemOfSoul: HeavenlyStemName;
  earthlyBranchOfSoul: EarthlyBranchName;
};
```

`命宮`、`身宮`の位置情報が定義されています

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `soulIndex` | 命宮 インデックス | `number` |
| `bodyIndex` | 身宮 インデックス | `number` |
| `heavenlyStemOfSoul` | 命宮の天干 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranchOfSoul` | 命宮の地支 | [`EarthlyBranchName`](#earthlybranchname) |

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

`宮位` オブジェクトを定義します

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `name` | 宮の名称 | [`PalaceName`](#palacename) |
| `isBodyPalace` | 身宮かどうか | `boolean` |
| `isOriginalPalace` | 来因宮かどうか | `boolean` |
| `heavenlyStem` | 宮の天干 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | 宮の地支 | [`EarthlyBranchName`](#earthlybranchname) |
| `majorStars` | 主星 | [`Star[]`](#star) |
| `minorStars` | 補助星 | [`Star[]`](#star) |
| `adjectiveStars` | 雑曜 | [`Star[]`](#star) |
| `changsheng12` | 長生十二神 | [`StarName`](#starname) |
| `boshi12` | 博士十二神 | [`StarName`](#starname) |
| `jiangqian12` | 流年将前十二神 | [`StarName`](#starname) |
| `suiqian12` | 流年歳前十二神 | [`StarName`](#starname) |
| `decadal` | 大限 | [`Decadal`](#decadal) |
| `ages` | 小限 | `number[]` |

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

`三方四正` オブジェクトを定義します

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `target` | 対象の宮 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `opposite` | 対宮 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `wealth` | 財帛の位置 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `career` | 官禄の位置 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |

## 運限  {#运限}

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

`運限` オブジェクトを定義します

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `index` | 対応する宮のインデックス | `number` |
| `name` <Badge type="warning" text="^1.2.3" /> | 運限の名称 | `string` |
| `heavenlyStem` | 運限の天干 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | 運限の地支 | [`EarthlyBranchName`](#earthlybranchname) |
| `palaceNames` | 運限の十二宮 | [`PalaceName[]`](#palacename) |
| `mutagen` | 四化星 | [`StarName[]`](#starname) |
| `stars` | 流曜 | [`Star[][]`](#star) |

---

### `Decadal` {#decadal}

```ts
export type Decadal = {
  range: [number, number];
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
};
```

命盤の`大限`のデータを定義します。この型は主に[Palace](#palace)で使います。

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `range` | 大限の開始年齢と終了年齢 [`開始年齢`, `終了年齢`] | `[number, number]` |
| `heavenlyStem` | 大限の天干 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | 大限の地支 | [`EarthlyBranchName`](#earthlybranchname) |

---

### `DecadalHoroscope` {#decadalhoroscope}

```ts
export type DecadalHoroscope = HoroscopeItem & {
  palaceName: PalaceName;
  ageRange: [number, number];
  yearRange: [number, number];
};
```

`decadalList()` が返す大限の一覧の要素を定義します。

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `palaceName` | 大限が位置する本命の宮 | [`PalaceName`](#palacename) |
| `ageRange` | 大限の開始・終了時の数え年 | `[number, number]` |
| `yearRange` | 大限の開始年と終了年 | `[number, number]` |

このタイプには、[`HoroscopeItem`](#horoscopeitem) のすべての属性も含まれます。

---

### `YearlyHoroscope` {#yearlyhoroscope}

```ts
export type YearlyHoroscope = HoroscopeItem & {
  age: number;
  year: number;
};
```

`yearlyList()` が返す流年の一覧の要素を定義します。

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `age` | 流年に対応する数え年 | `number` |
| `year` | 流年の年 | `number` |

このタイプには、[`HoroscopeItem`](#horoscopeitem) のすべての属性も含まれます。

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

`monthlyList()` が返す流月の一覧の要素を定義します。

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `month` | 旧暦の月。正月を`1`とします。 | `number` |
| `isLeapMonth` | 閏月ですか？ | `boolean` |
| `part` | 通常月、閏月前半または閏月後半 | `'normal'` \| `'first'` \| `'second'` |
| `dayRange` | この項目に対応する旧暦の日付範囲 | `[number, number]` |

このタイプには、[`YearlyHoroscope`](#yearlyhoroscope) と [`HoroscopeItem`](#horoscopeitem) の両方のプロパティがすべて含まれています。

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

`運限`のオブジェクトを定義します。`大限`、`流年`、`流月`、`流日`、`流時`のデータを含みます。

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `lunarDate` | 旧暦の日付 | `string` |
| `solarDate` | グレゴリオ暦の日付 | `string` |
| `decadal` | 大限 | [`HoroscopeItem`](#horoscopeitem) |
| `age` | 小限 | { index: `number`, nominalAge: `number` } |
| `yearly` | 流年 | [`HoroscopeItem`](#horoscopeitem)  & { yearlyDecStar: { jiangqian12: [`StarName[]`](/ja_JP/type-definition.md#starname); suiqian12: [`StarName[]`](/ja_JP/type-definition.md#starname) } } |
| `monthly` | 流月 | [`HoroscopeItem`](#horoscopeitem) |
| `daily` | 流日 | [`HoroscopeItem`](#horoscopeitem) |
| `hourly` | 流時 | [`HoroscopeItem`](#horoscopeitem) |

## 命盤  {#星盘}

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

`命盤` オブジェクトを定義します

| プロパティ | 意味 | 型 |
| --- | --- | --- |
| `gender` | 性別<Badge type="warning" text="^2.0.3" /> | [`GenderName`](#gendername) |
| `solarDate` | グレゴリオ暦の日付 | `string` |
| `lunarDate` | 旧暦の日付 | `string` |
| `chineseDate` | 干支で表した日付 | `string` |
| `rawDates` | 内部メソッドで将来使用するための生の日付データ | { lunarDate: `LunarDate`, chineseDate: `HeavenlyStemAndEarthlyBranchDate` } |
| `time` | 時辰 | `string` |
| `timeRange` | 時辰に対応する時刻の範囲 | `string` |
| `sign` | 西洋占星術の星座 | `string` |
| `zodiac` | 十二支の動物 | `string` |
| `earthlyBranchOfSoulPalace` | 命宮の地支 | [`EarthlyBranchName`](#earthlybranchname) |
| `earthlyBranchOfBodyPalace` | 身宮の地支 | [`EarthlyBranchName`](#earthlybranchname) |
| `soul` | 命主星 | [`StarName`](#starname) |
| `body` | 身主星 | [`StarName`](#starname) |
| `fiveElementsClass` | 五行局 | [`FiveElementsClassName`](#fiveelementsclassname) |
| `palaces` | 十二宮のデータ | [`IFunctionalPalace[]`](./posts/palace.md#functionalpalace) |

## 設定とプラグイン<Badge type="warning" text="^2.3.0" />  {#配置和插件}

### `ConfigMutagens` {#configmutagens}

グローバル設定で `四化` パラメータを定義します。

```ts
type ConfigMutagens = Partial<Record<HeavenlyStemName, StarName[]>>;
```

### `ConfigBrightness` {#configbrightness}

グローバル設定で `明るさ` パラメータを定義します。

```ts
type ConfigBrightness = Partial<Record<StarName, Brightness[]>>;
```

### `Config` {#config}

命盤計算の設定オブジェクトを定義します。`astro.config()` で以後作成する命盤の既定値を設定でき、`withOptions({ config })` で今回作成する命盤だけの設定を上書きできます。作成済みの命盤は作成時の設定を保持します（^2.6.2）。

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

`yearDivide` と `horoscopeDivide` は、`normal` の場合は旧暦の正月1日を、`exact` の場合は二十四節気の立春を年の区切りとします。

`dayDivide` は、晩子時（`timeIndex` が `12` の場合）をどの日付に含めるかだけに影響します。`forward` は翌日、`current` は当日に含めます。

### `AstroType` <Badge type="warning" text="^2.5.0" /> {#astrotype}

中州派の命盤の型を定義します。

```ts
type AstroType = 'heaven' | 'earth' | 'human';
```

| 値 | 説明 |
| --- | --- |
| `heaven` | 天盤。既定値。 |
| `earth` | 地盤。身宮の干支から五行局を求め、身宮を命宮として扱います。 |
| `human` | 人盤。福徳宮の干支から五行局を求め、福徳宮を命宮として扱います。 |

### `Plugin` {#plugin}

プラグインの型を定義します。プラグインの実体は関数です。

```ts
type Plugin = () => void;
```

:::tip ヒント
プラグイン関数は暗黙的に `this` パラメーターを受け取り、その型は `T extends FunctionalAstrolabe` です。作成方法は[プラグイン](./posts/config-n-plugin.md#插件)を参照してください。
:::

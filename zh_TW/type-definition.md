---
title: "iztro TypeScript 型別與國際化定義"
description: "查閱 iztro 的 TypeScript 型別、國際化輸入值與星盤資料結構，了解星曜、宮位、運限和設定參數的定義。"

---

# 類型定義

## 前言

本頁介紹了 `iztro` 中的類型定義，除了 [國際化類型](./type-definition.md#國際化類型) 被定義在了 [i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts) 文件夾內，其他類型都定義在 [types](https://github.com/SylarLong/iztro/tree/main/src/data/types) 文件夾內。

你可以使用如下代碼引入 `國際化類型`:

```ts
import { HeavenlyStemName } from "iztro/lib/i18n";
```

而當你需要引入其他類型的時候，則需要：

```ts
import { Palace } from "iztro/lib/data/types";
```

::: tip 提示
如果你發現 `翻譯` 和 `類型定義` 中有不對或者不恰當的地方，可以在 [這裏](https://github.com/SylarLong/iztro/issues) 創建 Issue 指出，非常感謝。
:::

## 國際化類型

`iztro` 為了支持國際化輸入輸出，對需要進行參數輸入輸出的數據進行了多語言定義，在輸入的時候，你可以輸入 **任意語言** 的值，比如在需要傳 [`HeavenlyStemName`](./type-definition.md#heavenlystemname) 的地方，你可以傳入 `甲`，也可以傳入 `갑` 或者 `jia`。

比如在調用`getHoroscopeStar()`方法的時候，你可以以中文的干支作為參數：

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("甲", "子", "decadal");
```

也可以用其他語言的翻譯作為參數甚至中文和外文混合使用，也是可以的：

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("갑", "zi", "decadal");
```

當然輸出的時候會統一按照你指定的語言進行輸出。你可以在調用上述方法之前設置你的輸出語言：

```ts
import { setLanguage } from "iztro/lib/i18n";

setLanguage("ko-KR");

const horoscopeStar = getHoroscopeStar("甲", "zi", "decadal");
```

此時 `horoscopeStar` 的輸出結果會是 `韓文` 的。

::: details `horoscopeStar` 輸出結果

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

### `HeavenlyStemName`

定義了`十天干`

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

### `EarthlyBranchName`

定義了 `十二地支`，地支中的 `午` 英文和天干中的 `戊` 相同，為了解決國際化時的沖突，故將地支中的 `午` 翻譯成了 `woo`。

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

### `PalaceName`

定義了紫微斗數宮位的 `名稱`。

:::tabs
== 简体中文
`命宫` | `身宫` | `兄弟` | `夫妻` | `子女` | `财帛` | `疾厄` | `迁移` | `僕役` | `官禄` | `田宅` | `福德` | `父母` | `来因`
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

### `Brightness`

定義了星曜的 `亮度`

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

### `Mutagen`

定義了紫微斗數中 `四化星` 的名稱

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

### `StarName`

定義了紫微斗數中 `星曜` 的名稱，包括 `流曜`

<Badge type="warning" text="^2.6.1" /> 武曲和歲破的英文名分別為 `warrior` 和 `breaker`。

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

:::tip 同名星曜別名 ^2.6.1
韓文或越南語星曜名稱出現重名時，可以傳入帶漢字的限定別名進行準確反查。限定別名只用於輸入，翻譯輸出仍使用原名稱。

- 韓文：`천상(天相)`、`천상(天傷)`、`천월(天鉞)`、`천월(天月)`、`겁살(劫殺)`、`겁살(劫煞)`、`비렴(蜚廉)`、`비렴(飛廉)`、`관부(官府)`、`관부(官符)`
- 越南語：`Kiếp Sát(劫殺)`、`Kiếp Sát(劫煞)`、`Phi Liêm(蜚廉)`、`Phi Liêm(飛廉)`
:::

---

### `FiveElementsClassName`

定義了紫微斗數中 `五行局` 的名稱

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

### `GenderName`

定義 `性別` 的名稱

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

## 通用

### `Language`

```ts
export type Language = `zh-CN` | `zh-TW` | `en-US` | `ko-KR` | `ja-JP` | `vi-VN`;
```

定義了支持的 `語言`，目前支持的語言有：

- `zh-CN`：簡體中文
- `zh-TW`：繁體中文
- `en-US`：English
- `ko-KR`：한국어
- `ja-JP`：日本語
- `vi-VN`：Tiếng Việt

---

### `Scope`

```ts
export type Scope = "origin" | "decadal" | "yearly";
```

定義了星曜的 `作用範圍`，用於區分本命星曜和流曜：

- `origin`：本命星曜
- `decadal`：大限星曜
- `yearly`：流年星曜

---

### `StarType`

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

定義了星曜 `類型`，其中 `桃花星` 和 `解神星`（包含 `年解`）雖然是雜曜，但是在解盤中有著特殊的意義，所以單獨歸類，`祿存` 和 `天馬` 二輔星也是比較特殊，所以單獨歸類：

- `major`：主星
- `soft`：吉星
- `tough`：煞星
- `adjective`：雜曜
- `flower`：桃花
- `helper`：解神
- `lucun`：祿存
- `tianma`：天馬

## 星曜

### `Star`

```ts
export type Star = {
  name: StarName;
  type: StarType;
  scope: Scope;
  brightness?: Brightness;
  mutagen?: Mutagen;
};
```

定義了 `星曜` 對象

| 屬性         | 解釋     | 類型                                             |
| ------------ | -------- | ------------------------------------------------ |
| `name`       | 星曜名字 | [`StarName`](./type-definition.md#starname)     |
| `type`       | 星曜類型 | [`StarType`](./type-definition.md#startype)     |
| `scope`      | 作用範圍 | [`Scope`](./type-definition.md#scope)           |
| `brightness` | 星曜亮度 | [`Brightness`](./type-definition.md#brightness) |
| `mutagen`    | 四化     | [`Mutagen`](./type-definition.md#mutagen)       |

## 宮位

### `SoulAndBody`

```ts
export type SoulAndBody = {
  soulIndex: number;
  bodyIndex: number;
  heavenlyStemOfSoul: HeavenlyStemName;
  earthlyBranchOfSoul: EarthlyBranchName;
};
```

定義了 `命宮` 和 `身宮` 位置信息

| 屬性                  | 解釋     | 類型                                                           |
| --------------------- | -------- | -------------------------------------------------------------- |
| `soulIndex`           | 命宮索引 | `number`                                                       |
| `bodyIndex`           | 身宮索引 | `number`                                                       |
| `heavenlyStemOfSoul`  | 命宮天干 | [`HeavenlyStemName`](./type-definition.md#heavenlystemname)   |
| `earthlyBranchOfSoul` | 命宮地支 | [`EarthlyBranchName`](./type-definition.md#earthlybranchname) |

---

### `Palace`

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

定義了 `宮位` 對象

| 屬性               | 解釋           | 類型                                                           |
| ------------------ | -------------- | -------------------------------------------------------------- |
| `name`             | 宮位名稱       | [`PalaceName`](./type-definition.md#palacename)               |
| `isBodyPalace`     | 是否身宮       | `boolean`                                                      |
| `isOriginalPalace` | 是否來因宮     | `boolean`                                                      |
| `heavenlyStem`     | 宮位天干       | [`HeavenlyStemName`](./type-definition.md#heavenlystemname)   |
| `earthlyBranch`    | 宮位地支       | [`EarthlyBranchName`](./type-definition.md#earthlybranchname) |
| `majorStars`       | 主星           | [`Star[]`](./type-definition.md#star)                         |
| `minorStars`       | 輔星           | [`Star[]`](./type-definition.md#star)                         |
| `adjectiveStars`   | 雜曜           | [`Star[]`](./type-definition.md#star)                         |
| `changsheng12`     | 長生 12 神     | [`StarName`](./type-definition.md#starname)                   |
| `boshi12`          | 博士 12 神     | [`StarName`](./type-definition.md#starname)                   |
| `jiangqian12`      | 流年將前 12 神 | [`StarName`](./type-definition.md#starname)                   |
| `suiqian12`        | 流年歲前 12 神 | [`StarName`](./type-definition.md#starname)                   |
| `decadal`          | 大限           | [`Decadal`](./type-definition.md#decadal)                     |
| `ages`             | 小限           | `number[]`                                                     |

---

### `SurroundedPalaces`

```ts
export type SurroundedPalaces = {
  target: IFunctionalPalace;
  opposite: IFunctionalPalace;
  wealth: IFunctionalPalace;
  career: IFunctionalPalace;
};
```

定義了 `三方四正` 對象

| 屬性       | 解釋   | 類型                |
| ---------- | ------ | ------------------- |
| `target`   | 本宮   | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `opposite` | 對宮   | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `wealth`   | 財帛位 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `career`   | 官祿位 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |

## 運限

### `HoroscopeItem`

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

定義了 `運限` 對象

| 屬性            | 解釋           | 類型                                                           |
| --------------- | -------------- | -------------------------------------------------------------- |
| `index`         | 所在宮位的索引 | `number`                                                       |
| `name` <Badge type="warning" text="^1.2.3" />        | 運限的名稱 | `string`                                                       |
| `heavenlyStem`  | 運限天干       | [`HeavenlyStemName`](./type-definition.md#heavenlystemname)   |
| `earthlyBranch` | 運限地支       | [`EarthlyBranchName`](./type-definition.md#earthlybranchname) |
| `palaceNames`   | 運限的十二宮   | [`PalaceName[]`](./type-definition.md#palacename)             |
| `mutagen`       | 四化星         | [`StarName[]`](./type-definition.md#starname)                 |
| `stars`         | 流曜           | [`Star[][]`](./type-definition.md#star)                       |

---

### `Decadal`

```ts
export type Decadal = {
  range: [number, number];
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
};
```

定義了星盤的 `大限`，此類型主要用在 [Palace](./type-definition.md#palace) 內。

| 屬性            | 解釋                                  | 類型                                                           |
| --------------- | ------------------------------------- | -------------------------------------------------------------- |
| `range`         | 大限起止年齡 [`起始年齡`, `截止年齡`] | `[number, number]`                                             |
| `heavenlyStem`  | 大限天干                              | [`HeavenlyStemName`](./type-definition.md#heavenlystemname)   |
| `earthlyBranch` | 大限地支                              | [`EarthlyBranchName`](./type-definition.md#earthlybranchname) |

---

### `DecadalHoroscope`

```ts
export type DecadalHoroscope = HoroscopeItem & {
  palaceName: PalaceName;
  ageRange: [number, number];
  yearRange: [number, number];
};
```

定義了 `decadalList()` 返回的大限列表項。

| 屬性 | 解釋 | 類型 |
| --- | --- | --- |
| `palaceName` | 大限所在的本命宮位 | [`PalaceName`](./type-definition.md#palacename) |
| `ageRange` | 大限起止虛歲 | `[number, number]` |
| `yearRange` | 大限起止年份 | `[number, number]` |

該類型同時包含 [`HoroscopeItem`](./type-definition.md#horoscopeitem) 的全部屬性。

---

### `YearlyHoroscope`

```ts
export type YearlyHoroscope = HoroscopeItem & {
  age: number;
  year: number;
};
```

定義了 `yearlyList()` 返回的流年列表項。

| 屬性 | 解釋 | 類型 |
| --- | --- | --- |
| `age` | 流年對應的虛歲 | `number` |
| `year` | 流年年份 | `number` |

該類型同時包含 [`HoroscopeItem`](./type-definition.md#horoscopeitem) 的全部屬性。

---

### `MonthlyHoroscope`

```ts
export type MonthlyHoroscope = YearlyHoroscope & {
  month: number;
  isLeapMonth: boolean;
  part: 'normal' | 'first' | 'second';
  dayRange: [number, number];
};
```

定義了 `monthlyList()` 返回的流月列表項。

| 屬性 | 解釋 | 類型 |
| --- | --- | --- |
| `month` | 農曆月份，正月為 `1` | `number` |
| `isLeapMonth` | 是否為閏月 | `boolean` |
| `part` | 普通月份、閏月前半段或閏月後半段 | `'normal'` \| `'first'` \| `'second'` |
| `dayRange` | 該項對應的農曆日期範圍 | `[number, number]` |

該類型同時包含 [`YearlyHoroscope`](./type-definition.md#yearlyhoroscope) 和 [`HoroscopeItem`](./type-definition.md#horoscopeitem) 的全部屬性。

---

### `Horoscope`

```ts
export type Horoscope = {
  lunarDate: string;
  solarDate: string;
  decadal: HoroscopeItem;
  age: {
    index: number;
    nominalAge: number;
  };
  yearly: HoroscopeItem;
  monthly: HoroscopeItem;
  daily: HoroscopeItem;
  hourly: HoroscopeItem;
};
```

定義了 `運限` 對象，包含 `大限`，`流年`，`流月`，`流日`，`流時`

| 屬性        | 解釋     | 類型                                                   |
| ----------- | -------- | ------------------------------------------------------ |
| `lunarDate` | 農曆日期 | `string`                                               |
| `solarDate` | 陽曆日期 | `string`                                               |
| `decadal`   | 大限     | [`HoroscopeItem`](./type-definition.md#horoscopeitem) |
| `age`       | 小限     | { index: `number`, nominalAge: `number` }              |
| `yearly`    | 流年     | [`HoroscopeItem`](./type-definition.md#horoscopeitem)  & { yearlyDecStar: { jiangqian12: [`StarName[]`](/zh_TW/type-definition.md#starname); suiqian12: [`StarName[]`](/zh_TW/type-definition.md#starname) } }|
| `monthly`   | 流月     | [`HoroscopeItem`](./type-definition.md#horoscopeitem) |
| `daily`     | 流日     | [`HoroscopeItem`](./type-definition.md#horoscopeitem) |
| `hourly`    | 流時     | [`HoroscopeItem`](./type-definition.md#horoscopeitem) |

## 星盤

### `Astrolabe`

```ts
export type Astrolabe = {
  /** 陽曆日期 */
  solarDate: string;
  /** 農曆日期 */
  lunarDate: string;
  /** 干支紀年日期 */
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

定義了 `星盤` 對象

| 屬性                        | 解釋                               | 類型                                                                        |
| --------------------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| `gender`    | 性別 <Badge type="warning" text="^2.0.3" />     | [`GenderName`](./type-definition.md#gendername)                            |
| `solarDate`                 | 陽曆日期                           | `string`                                                                    |
| `lunarDate`                 | 農曆日期                           | `string`                                                                    |
| `chineseDate`               | 干支紀年日期                       | `string`                                                                    |
| `rawDates`                  | 原始日期數據，用於今後內部方法使用 | { lunarDate: `LunarDate`, chineseDate: `HeavenlyStemAndEarthlyBranchDate` } |
| `time`                      | 時辰                               | `string`                                                                    |
| `timeRange`                 | 時辰對應的時間段                   | `string`                                                                    |
| `sign`                      | 星座                               | `string`                                                                    |
| `zodiac`                    | 生肖                               | `string`                                                                    |
| `earthlyBranchOfSoulPalace` | 命宮地支                           | [`EarthlyBranchName`](./type-definition.md#earthlybranchname)              |
| `earthlyBranchOfBodyPalace` | 身宮地支                           | [`EarthlyBranchName`](./type-definition.md#earthlybranchname)              |
| `soul`                      | 命主                               | [`StarName`](./type-definition.md#starname)                                |
| `body`                      | 身主                               | [`StarName`](./type-definition.md#starname)                                |
| `fiveElementsClass`         | 五行局                             | [`FiveElementsClassName`](./type-definition.md#fiveelementsclassname)      |
| `palaces`                   | 十二宮數據                         | [`IFunctionalPalace[]`](./posts/palace.md#functionalpalace)                 |

## 配置和插件 <Badge type="warning" text="^2.3.0" />

### `ConfigMutagens`

定義了全局配置中的 `四化` 參數。

```ts
type ConfigMutagens = Partial<Record<HeavenlyStemName, StarName[]>>;
```

### `ConfigBrightness`

定義了全局配置中的 `亮度` 參數。

```ts
type ConfigBrightness = Partial<Record<StarName, Brightness[]>>;
```

### `Config`

定義排盤配置物件，可透過 `astro.config()` 設定後續排盤的預設值，亦可透過 `withOptions({ config })` 僅覆蓋當前星盤；既有星盤保留產生時的配置（^2.6.2）。

```ts
type Config = {
 // 星曜四化配置
 mutagens?: ConfigMutagens;
 // 星曜亮度配置
 brightness?: ConfigBrightness;
 // 年分割點配置
 yearDivide?: 'normal' | 'exact';
 // 運限分割點配置（^v2.4.3）
 horoscopeDivide?: 'normal' | 'exact';
 // 小限分割點配置，normal為以自然年分界，birthday為生日分界（^v2.4.5）
 // 預設為 normal
 ageDivide?: 'normal' | 'birthday';
 // 晚子時配置，current 時晚子時算當日，forward 時晚子時算次日（^v2.5.2）
 // 預設為 forward
 dayDivide?: 'current' | 'forward';
 // 安星方法，default 為通行版本，zhongzhou 為中州派版本（^v2.5.0）
 // 預設為 default
 algorithm?: 'default' | 'zhongzhou';
};
```

其中當 `yearDivide` 和 `horoscopeDivide` 為 `normal` 時，會以正月初一為分界，為 `exact` 時會以立春為分界。

`dayDivide` 僅影響晚子時（`timeIndex` 為 `12`）的日期歸屬：`forward` 將其歸入次日，`current` 將其歸入當日。

### `AstroType` <Badge type="warning" text="^2.5.0" />

定義中州派星盤類型。

```ts
type AstroType = 'heaven' | 'earth' | 'human';
```

| 值 | 說明 |
| --- | --- |
| `heaven` | 天盤，預設值 |
| `earth` | 地盤，以身宮干支起五行局，並以身宮為命宮 |
| `human` | 人盤，以福德宮干支起五行局，並以福德宮為命宮 |

### `Plugin`

定義了插件類型。實際上，插件就是一個函數。

```ts
type Plugin = () => void;
```

:::tip 提示
插件方法會隱式的接受一個 `this` 參數，該參數類型為 `T extends FunctionalAstrolabe`。詳細創建插件方法見 [插件](./posts/config-n-plugin.md#插件)
:::

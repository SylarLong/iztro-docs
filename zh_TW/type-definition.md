---
outline: deep
description: "iztro類型定義，iztro的astro對象使用方法以及示例代碼。紫微鬥數信息國際化內容的輸出定義。"
---

# 類型定義

## 前言

本頁介紹了 `iztro` 中的類型定義，除了 [國際化類型](./type-definition.html#國際化類型) 被定義在了 [i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts) 文件夾內，其他類型都定義在 [types](https://github.com/SylarLong/iztro/tree/main/src/data/types) 文件夾內。

妳可以使用如下代碼引入 `國際化類型`:

```ts
import { HeavenlyStemName } from "iztro/lib/i18n";
```

而當妳需要引入其他類型的時候，則需要：

```ts
import { Palace } from "iztro/lib/data/types";
```

::: tip 提示
如果妳發現 `翻譯` 和 `類型定義` 中有不對或者不恰當的地方，可以在 [這裏](https://github.com/SylarLong/iztro/issues) 創建 Issue 指出，非常感謝。
:::

## 國際化類型

`iztro` 為了支持國際化輸入輸出，對需要進行參數輸入輸出的數據進行了多語言定義，在輸入的時候，妳可以輸入 **任意語言** 的值，比如在需要傳 [`HeavenlyStemName`](./type-definition.html#heavenlystemname) 的地方，妳可以傳入 `甲`，也可以傳入 `갑` 或者 `jia`。

比如在調用`getHoroscopeStar()`方法的時候，妳可以以中文的幹支作為參數：

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("甲", "子", "decadal");
```

也可以用其他語言的翻譯作為參數甚至中文和外文混合使用，也是可以的：

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("갑", "zi", "decadal");
```

當然輸出的時候會統壹按照妳指定的語言進行輸出。妳可以在調用上述方法之前設置妳的輸出語言：

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
== 簡體中文
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

### `EarthlyBranchName`

定義了 `十二地支`，地支中的 `午` 英文和天干中的 `戊` 相同，為了解決國際化時的沖突，固將地支中的 `午` 翻譯成了 `woo`。

:::tabs
== 簡體中文
`子` | `丑` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
== 繁體中文
`子` | `丑` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
== English
`zi` | `chou` | `yin` | `mao` | `chen` | `si` | `woo` | `wei` | `shen` | `you` | `xu` | `hai`
== 한국어
`자` | `축` | `인` | `묘` | `진` | `사` | `오` | `미` | `신` | `유` | `술` | `해`
== 日本語
`子` | `丑` | `寅` | `卯` | `辰` | `巳` | `午` | `未` | `申` | `酉` | `戌` | `亥`
:::

---

### `PalaceName`

定義了紫微鬥數宮位的 `名稱`。

:::tabs
== 簡體中文
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `仆役` | `官祿` | `田宅` | `福德` | `父母` | `來因`
== 繁體中文
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `僕役` | `官祿` | `田宅` | `福德` | `父母` | `來因`
== English
`soul` | `body` | `siblings` | `spouse` | `children` | `wealth` | `health` | `surface` | `friends` | `career` | `property` | `spirit` | `parents` | `origin`
== 한국어
`명궁` | `신궁` | `형제` | `부처` | `자녀` | `재백` | `질액` | `천이` | `노복` | `관록` | `전택` | `복덕` | `부모` | `라인`
== 日本語
`命宮` | `身宮` | `兄弟` | `夫妻` | `子女` | `財帛` | `疾厄` | `遷移` | `僕役` | `官祿` | `田宅` | `福德` | `父母` | `來因`
:::

---

### `Brightness`

定義了星曜的 `亮度`

:::tabs
== 簡體中文
`""` | `廟` | `旺` | `得` | `利` | `平` | `不` | `陷`
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

### `Mutagen`

定義了紫微鬥數中 `四化星` 的名稱

:::tabs
== 簡體中文
`祿` | `權` | `科` | `忌`
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

### `StarName`

定義了紫微鬥數中 `星曜` 的名稱，包括 `流耀`

:::tabs
== 簡體中文
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
| `臺輔`
| `封誥`
| `天巫`
| `天月`
| `三臺`
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
| `吊客`
| `將星`
| `攀鞍`
| `歲驛`
| `息神`
| `華蓋`
| `劫煞`
| `災煞`
| `天煞`
| `指背`
| `鹹池`
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
| `臺輔`
| `封誥`
| `天巫`
| `天月`
| `三臺`
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
| `鹹池`
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
| `臺輔`
| `封誥`
| `天巫`
| `天月`
| `三臺`
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
| `鹹池`
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

### `FiveElementsClassName`

定義了紫微鬥數中 `五行局` 的名稱

:::tabs
== 簡體中文
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

### `GenderName`

定義 `性別` 的名稱

:::tabs
== 簡體中文
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

### `Language`

```ts
export type Language = `zh-CN` | `zh-TW` | `en-US` | `ko-KR` | `ja-JP`;
```

定義了支持的 `語言`，目前支持的語言有：

- `zh-CN`：簡體中文
- `zh-TW`：繁體中文
- `en-US`：English
- `ko-KR`：한국어
- `ja-JP`：日本語

---

### `Scope`

```ts
export type Scope = "origin" | "decadal" | "yearly";
```

定義了星曜的 `作用範圍`，用於區分本命星曜和流耀：

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

定義了星曜 `類型`，其中 `桃花星` 和 `解神星`（包含 `年解`）雖然是雜耀，但是在解盤中有著特殊的意義，所以單獨歸類，`祿存` 和 `天馬` 二輔星也是比較特殊，所以單獨歸類：

- `major`：主星
- `soft`：吉星
- `tough`：煞星
- `adjective`：雜耀
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
| `name`       | 星曜名字 | [`StarName`](./type-definition.html#starname)     |
| `type`       | 星曜類型 | [`StarType`](./type-definition.html#startype)     |
| `scope`      | 作用範圍 | [`Scope`](./type-definition.html#scope)           |
| `brightness` | 星曜亮度 | [`Brightness`](./type-definition.html#brightness) |
| `mutagen`    | 四化     | [`Mutagen`](./type-definition.html#mutagen)       |

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
| `heavenlyStemOfSoul`  | 命宮天干 | [`HeavenlyStemName`](./type-definition.html#heavenlystemname)   |
| `earthlyBranchOfSoul` | 命宮地支 | [`EarthlyBranchName`](./type-definition.html#earthlybranchname) |

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
| `name`             | 宮位名稱       | [`PalaceName`](./type-definition.html#palacename)               |
| `isBodyPalace`     | 是否身宮       | `boolean`                                                      |
| `isOriginalPalace` | 是否來因宮     | `boolean`                                                      |
| `heavenlyStem`     | 宮位天干       | [`HeavenlyStemName`](./type-definition.html#heavenlystemname)   |
| `earthlyBranch`    | 宮位地支       | [`EarthlyBranchName`](./type-definition.html#earthlybranchname) |
| `majorStars`       | 主星           | [`Star[]`](./type-definition.html#star)                         |
| `minorStars`       | 輔星           | [`Star[]`](./type-definition.html#star)                         |
| `adjectiveStars`   | 雜耀           | [`Star[]`](./type-definition.html#star)                         |
| `changsheng12`     | 長生 12 神     | [`StarName`](./type-definition.html#starname)                   |
| `boshi12`          | 博士 12 神     | [`StarName`](./type-definition.html#starname)                   |
| `jiangqian12`      | 流年將前 12 神 | [`StarName`](./type-definition.html#starname)                   |
| `suiqian12`        | 流年歲前 12 神 | [`StarName`](./type-definition.html#starname)                   |
| `decadal`          | 大限           | [`Decadal`](./type-definition.html#decadal)                     |
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
| `name` <Badge type="warning" text="^1.2.3" />        | 運限的名称 | `string`                                                       |
| `heavenlyStem`  | 運限天干       | [`HeavenlyStemName`](./type-definition.html#heavenlystemname)   |
| `earthlyBranch` | 運限地支       | [`EarthlyBranchName`](./type-definition.html#earthlybranchname) |
| `palaceNames`   | 運限的十二宮   | [`PalaceName[]`](./type-definition.html#palacename)             |
| `mutagen`       | 四化星         | [`StarName[]`](./type-definition.html#starname)                 |
| `stars`         | 流耀           | [`Star[][]`](./type-definition.html#star)                       |

---

### `Decadal`

```ts
export type Decadal = {
  range: [number, number];
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
};
```

定義了星盤的 `大限`，此類型主要用在 [Palace](./type-definition.html#palace) 內。

| 屬性            | 解釋                                  | 類型                                                           |
| --------------- | ------------------------------------- | -------------------------------------------------------------- |
| `range`         | 大限起止年齡 [`起始年齡`, `截止年齡`] | `[number, number]`                                             |
| `heavenlyStem`  | 大限天干                              | [`HeavenlyStemName`](./type-definition.html#heavenlystemname)   |
| `earthlyBranch` | 大限地支                              | [`EarthlyBranchName`](./type-definition.html#earthlybranchname) |

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
| `lunarDate` | 農歷日期 | `string`                                               |
| `solarDate` | 陽歷日期 | `string`                                               |
| `decadal`   | 大限     | [`HoroscopeItem`](./type-definition.html#horoscopeitem) |
| `age`       | 小限     | { index: `number`, nominalAge: `number` }              |
| `yearly`    | 流年     | [`HoroscopeItem`](./type-definition.html#horoscopeitem) |
| `monthly`   | 流月     | [`HoroscopeItem`](./type-definition.html#horoscopeitem) |
| `daily`     | 流日     | [`HoroscopeItem`](./type-definition.html#horoscopeitem) |
| `hourly`    | 流時     | [`HoroscopeItem`](./type-definition.html#horoscopeitem) |

## 星盤

### `Astrolabe`

```ts
export type Astrolabe = {
  /** 陽歷日期 */
  solarDate: string;
  /** 農歷日期 */
  lunarDate: string;
  /** 幹支紀年日期 */
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
| `solarDate`                 | 陽歷日期                           | `string`                                                                    |
| `lunarDate`                 | 農歷日期                           | `string`                                                                    |
| `chineseDate`               | 幹支紀年日期                       | `string`                                                                    |
| `rawDates`                  | 原始日期數據，用於今後內部方法使用 | { lunarDate: `LunarDate`, chineseDate: `HeavenlyStemAndEarthlyBranchDate` } |
| `time`                      | 時辰                               | `string`                                                                    |
| `timeRange`                 | 時辰對應的時間段                   | `string`                                                                    |
| `sign`                      | 星座                               | `string`                                                                    |
| `zodiac`                    | 生肖                               | `string`                                                                    |
| `earthlyBranchOfSoulPalace` | 命宮地支                           | [`EarthlyBranchName`](./type-definition.html#earthlybranchname)              |
| `earthlyBranchOfBodyPalace` | 身宮地支                           | [`EarthlyBranchName`](./type-definition.html#earthlybranchname)              |
| `soul`                      | 命主                               | [`StarName`](./type-definition.html#starname)                                |
| `body`                      | 身主                               | [`StarName`](./type-definition.html#starname)                                |
| `fiveElementsClass`         | 五行局                             | [`FiveElementsClassName`](./type-definition.html#fiveelementsclassName)      |
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

定義了全局參數對象。

```ts
type Config = {
 // 星耀四化配置
 mutagens?: ConfigMutagens;
 // 星耀亮度配置
 brightness?: ConfigBrightness;
 // 年分割點配置
 yearDivide?: 'normal' | 'exact';
 // 運限分割點配置（^v2.4.3）
 horoscopeDivide?: 'normal' | 'exact'
};
```

其中當 `yearDivide` 和 `horoscopeDivide` 為 `normal` 時，會以正月初一為分界，為 `exact` 時會以立春為分界。

### `Plugin`

定義了插件類型。實際上，插件就是一個函數。

```ts
type Plugin = () => void;
```

:::tip 提示
插件方法會隱式的接受一個 `this` 參數，該參數類型為 `T extends FunctionalAstrolabe`。詳細創建插件方法見 [插件](./posts/config-n-plugin.md#插件)
:::
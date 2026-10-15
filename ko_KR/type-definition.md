---
title: "iztro TypeScript 타입과 다국어 값 정의"
description: "iztro의 타입 정의, 언어별 값, astro API가 반환하는 데이터 구조를 설명합니다."
---

# 타입 정의 {#类型定义}

## 서문   {#前言}

이 페이지에서는 `iztro`의 타입 정의를 설명합니다. [국제화 타입](#国际化类型)은 [i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts)에 정의되어 있으며, 나머지 타입은 [types](https://github.com/SylarLong/iztro/tree/main/src/data/types)에 정의되어 있습니다.

다음 코드로 `국제화 타입`을 가져올 수 있습니다:

```ts
import { HeavenlyStemName } from "iztro/lib/i18n";
```

다른 타입은 다음과 같이 가져옵니다:

```ts
import { Palace } from "iztro/lib/data/types";
```

::: tip 팁
`번역`이나 `타입 정의`에서 오류나 부적절한 내용을 발견하면 [이슈를 등록해 주세요](https://github.com/SylarLong/iztro/issues). 감사합니다!
:::

## 국제화 타입   {#国际化类型}

`iztro`는 다국어 입력과 출력을 지원하기 위해 매개변수와 결과 값에 여러 언어의 이름을 정의합니다. 입력값은 **지원되는 어떤 언어로도** 지정할 수 있습니다. 예를 들어 [`HeavenlyStemName`](#heavenlystemname)에는 `甲`, `갑`, `jia`를 전달할 수 있습니다.

예를 들어 `getHoroscopeStar()`를 호출할 때 천간（天干）과 지지（地支）의 중국어 이름을 인수로 전달할 수 있습니다:

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("甲", "子", "decadal");
```

다른 지원 언어의 이름을 인수로 전달하거나, 한 번의 호출에서 여러 언어를 섞어 사용할 수도 있습니다:

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("갑", "zi", "decadal");
```

입력에 어떤 언어를 사용하든 출력은 지정한 언어로 통일됩니다. 메서드를 호출하기 전에 출력 언어를 설정하세요:

```ts
import { setLanguage } from "iztro/lib/i18n";

setLanguage("ko-KR");

const horoscopeStar = getHoroscopeStar("甲", "zi", "decadal");
```

이때 `horoscopeStar`의 출력 결과는 `한국어`가 됩니다.

::: details `horoscopeStar` 출력 결과

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

`십천간`（十天干）의 이름을 정의합니다.

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

`십이지지`（十二地支）를 정의합니다. 지지 `오`（午）와 천간 `무`（戊）는 영어 표기로 옮기면 모두 “wu”가 됩니다. 다국어 입력에서 이름이 충돌하지 않도록, 라이브러리에서는 지지 `오`（午）를 `woo`로 표기합니다.

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

자미두수（紫微斗數） 궁위（宮位）의 `이름`을 정의합니다.

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

성요（星曜）의 `밝기`를 정의합니다.

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

자미두수（紫微斗數）에서 `사화성`（四化星）의 이름을 정의합니다.

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

자미두수（紫微斗數）의 `성요`（星曜） 이름을 정의하며, `유요`（流曜）도 포함합니다.

<Badge type="warning" text="^2.6.1" /> 무곡（武曲）과 세파（歲破）의 영어 이름은 각각 `warrior`와 `breaker`입니다.

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

:::tip 동명의 별칭 성요（星曜） ^2.6.1
서로 다른 성요（星曜）의 한국어 또는 베트남어 이름이 같을 때는 한자가 붙은 구분용 별칭을 입력해 원하는 성요를 정확히 지정할 수 있습니다. 이 별칭은 입력에만 사용하며, 번역된 출력에는 기존 이름이 표시됩니다.

- 한국어: `천상(天相)`, `천상(天傷)`, `천월(天鉞)`, `천월(天月)`, `겁살(劫殺)`, `겁살(劫煞)`, `비렴(蜚廉)`, `비렴(飛廉)`, `관부(官府)`, `관부(官符)`
- 베트남어: `Kiếp Sát(劫殺)`, `Kiếp Sát(劫煞)`, `Phi Liêm(蜚廉)`, `Phi Liêm(飛廉)`
:::

---

### `FiveElementsClassName` {#fiveelementsclassname}

자미두수（紫微斗數）에서 `오행국`（五行局）의 이름을 정의합니다.

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

`성별`의 이름을 정의합니다.

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

## 공통 타입 {#通用}

### `Language` {#language}

```ts
export type Language = `zh-CN` | `zh-TW` | `en-US` | `ko-KR` | `ja-JP` | `vi-VN`;
```

지원되는 `언어`가 정의됩니다. 현재 지원되는 언어는 다음과 같습니다.

- `zh-CN`: 중국어 간체
- `zh-TW`: 중국어(번체)
- `en-US`：English
- `ko-KR`：한국어
- `ja-JP`: 일본어
- `vi-VN`: 베트남어

---

### `Scope` {#scope}

```ts
export type Scope = "origin" | "decadal" | "yearly";
```

성요（星曜）의 `적용 범위`를 정의하여 본명 성요（本命星曜）와 유요（流曜）를 구분합니다:

- `origin`: 본명 성요（本命星曜）
- `decadal`: 대한 성요（大限星曜）
- `yearly`: 유년 성요（流年星曜）

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

성요（星曜）의 `유형`을 정의합니다. `도화성`（桃花星）과 `해신`（解神）(`해신(년)`（年解） 포함)은 잡요（雜曜）이지만 명반 해석에서 특별한 의미가 있어 별도로 분류합니다. 두 보조 성요인 `록존`（祿存）과 `천마`（天馬）도 특수한 역할이 있어 각각 따로 분류합니다:

- `major`: 주성（主星）
- `soft`: 길성（吉星）
- `tough`: 살성（煞星）
- `adjective`: 잡요（雜曜）
- `flower`: 도화성（桃花）
- `helper`：해신（解神）
- `lucun`：록존（祿存）
- `tianma`：천마（天馬）

## 성요（星曜）   {#星曜}

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

`성요`（星曜） 객체를 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `name` | 성요 이름 | [`StarName`](#starname) |
| `type` | 성요 타입 | [`StarType`](#startype) |
| `scope` | 범위 | [`Scope`](#scope) |
| `brightness` | 별의 밝기 | [`Brightness`](#brightness) |
| `mutagen` | 사화（四化） | [`Mutagen`](#mutagen) |

## 궁（宮位）   {#宫位}

### `SoulAndBody` {#soulandbody}

```ts
export type SoulAndBody = {
  soulIndex: number;
  bodyIndex: number;
  heavenlyStemOfSoul: HeavenlyStemName;
  earthlyBranchOfSoul: EarthlyBranchName;
};
```

`명궁`（命宮） 및 `신궁`（身宮） 위치 정보가 정의됩니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `soulIndex` | 명궁 인덱스 | `number` |
| `bodyIndex` | 신궁 인덱스 | `number` |
| `heavenlyStemOfSoul` | 명궁의 천간 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranchOfSoul` | 명궁의 지지 | [`EarthlyBranchName`](#earthlybranchname) |

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

`궁`（宮位） 객체를 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `name` | 궁 이름 | [`PalaceName`](#palacename) |
| `isBodyPalace` | 신궁（身宮） 여부 | `boolean` |
| `isOriginalPalace` | 래인궁 여부 | `boolean` |
| `heavenlyStem` | 궁의 천간 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | 궁의 지지 | [`EarthlyBranchName`](#earthlybranchname) |
| `majorStars` | 주성（主星） | [`Star[]`](#star) |
| `minorStars` | 보조성（輔星） | [`Star[]`](#star) |
| `adjectiveStars` | 잡요（雜曜） | [`Star[]`](#star) |
| `changsheng12` | 장생 십이신（長生十二神） | [`StarName`](#starname) |
| `boshi12` | 박사 십이신（博士十二神） | [`StarName`](#starname) |
| `jiangqian12` | 유년 장전 십이신（流年將前十二神） | [`StarName`](#starname) |
| `suiqian12` | 유년 세전 십이신（流年歲前十二神） | [`StarName`](#starname) |
| `decadal` | 대한（大限） | [`Decadal`](#decadal) |
| `ages` | 소한（小限） | `number[]` |

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

`삼방사정`（三方四正） 객체를 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `target` | 본궁 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `opposite` | 대궁 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `wealth` | 재백 위치 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `career` | 관록 위치 | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |

## 운한（運限）   {#运限}

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

`운한`（運限） 객체를 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `index` | 해당 궁의 인덱스 | `number` |
| `name`   <Badge type="warning" text="^1.2.3" /> | 운한의 이름 | `string` |
| `heavenlyStem` | 운한의 천간 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | 운한의 지지 | [`EarthlyBranchName`](#earthlybranchname) |
| `palaceNames` | 운한의 십이궁 | [`PalaceName[]`](#palacename) |
| `mutagen` | 사화성（四化星） | [`StarName[]`](#starname) |
| `stars` | 유요（流曜） | [`Star[][]`](#star) |

---

### `Decadal` {#decadal}

```ts
export type Decadal = {
  range: [number, number];
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
};
```

명반의 `대한`（大限） 데이터를 정의합니다. 이 타입은 주로 [Palace](#palace)에서 사용합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `range` | 대한의 시작·종료 연령 [`시작 연령`, `종료 연령`] | `[number, number]` |
| `heavenlyStem` | 대한의 천간 | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | 대한의 지지 | [`EarthlyBranchName`](#earthlybranchname) |

---

### `DecadalHoroscope` {#decadalhoroscope}

```ts
export type DecadalHoroscope = HoroscopeItem & {
  palaceName: PalaceName;
  ageRange: [number, number];
  yearRange: [number, number];
};
```

`decadalList()`이 반환하는 대한（大限） 목록 항목을 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `palaceName` | 대한이 위치한 본명반의 궁 | [`PalaceName`](#palacename) |
| `ageRange` | 대한 시작·종료 시점의 세는나이 | `[number, number]` |
| `yearRange` | 대한의 시작·종료 연도 | `[number, number]` |

이 유형에는 [`HoroscopeItem`](#horoscopeitem)의 모든 속성도 포함되어 있습니다.

---

### `YearlyHoroscope` {#yearlyhoroscope}

```ts
export type YearlyHoroscope = HoroscopeItem & {
  age: number;
  year: number;
};
```

`yearlyList()`이 반환하는 유년（流年） 목록 항목을 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `age` | 유년에 해당하는 세는나이 | `number` |
| `year` | 유년의 연도 | `number` |

이 유형에는 [`HoroscopeItem`](#horoscopeitem)의 모든 속성도 포함되어 있습니다.

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

`monthlyList()`이 반환하는 유월（流月） 목록 항목을 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `month` | 음력의 달, 첫 번째 달은 `1` | `number` |
| `isLeapMonth` | 윤달인가요? | `boolean` |
| `part` | 일반 월, 윤달 전반부 또는 윤달 후반부 | `'normal'`  \|  `'first'`  \|  `'second'` |
| `dayRange` | 이 항목에 해당하는 음력 날짜 범위 | `[number, number]` |

이 유형에는 [`YearlyHoroscope`](#yearlyhoroscope) 및 [`HoroscopeItem`](#horoscopeitem)의 모든 속성이 포함되어 있습니다.

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

`운한`（運限） 객체를 정의하며, `대한`（大限）, `유년`（流年）, `유월`（流月）, `유일`（流日）, `유시`（流時） 데이터를 포함합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `lunarDate` | 음력 날짜 | `string` |
| `solarDate` | 그레고리력 날짜 | `string` |
| `decadal` | 대한（大限） | [`HoroscopeItem`](#horoscopeitem) |
| `age` | 소한（小限） | { index:  `number`, nominalAge:  `number`  } |
| `yearly` | 유년（流年） | [`HoroscopeItem`](#horoscopeitem)   & { yearlyDecStar: { jiangqian12:  [`StarName[]`](/ko_KR/type-definition.md#starname); suiqian12:  [`StarName[]`](/ko_KR/type-definition.md#starname)  } } |
| `monthly` | 유월（流月） | [`HoroscopeItem`](#horoscopeitem) |
| `daily` | 유일（流日） | [`HoroscopeItem`](#horoscopeitem) |
| `hourly` | 유시（流時） | [`HoroscopeItem`](#horoscopeitem) |

## 명반（星盤）   {#星盘}

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

`명반`（星盤） 객체를 정의합니다.

| 속성 | 설명 | 타입 |
| --- | --- | --- |
| `gender` | 성별 <Badge type="warning" text="^2.0.3" /> | [`GenderName`](#gendername) |
| `solarDate` | 그레고리력 날짜 | `string` |
| `lunarDate` | 음력 날짜 | `string` |
| `chineseDate` | 간지로 나타낸 날짜 | `string` |
| `rawDates` | 이후 내부 메서드에서 사용할 원본 날짜 데이터 | { lunarDate:  `LunarDate`, chineseDate:  `HeavenlyStemAndEarthlyBranchDate`  } |
| `time` | 시진（時辰） | `string` |
| `timeRange` | 시진에 대응하는 시각 범위 | `string` |
| `sign` | 별자리 | `string` |
| `zodiac` | 띠 | `string` |
| `earthlyBranchOfSoulPalace` | 명궁의 지지 | [`EarthlyBranchName`](#earthlybranchname) |
| `earthlyBranchOfBodyPalace` | 신궁의 지지 | [`EarthlyBranchName`](#earthlybranchname) |
| `soul` | 명주성（命主星） | [`StarName`](#starname) |
| `body` | 신주성（身主星） | [`StarName`](#starname) |
| `fiveElementsClass` | 오행국（五行局） | [`FiveElementsClassName`](#fiveelementsclassname) |
| `palaces` | 십이궁 데이터 | [`IFunctionalPalace[]`](./posts/palace.md#functionalpalace) |

## 설정과 플러그인 <Badge type="warning" text="^2.3.0" />   {#配置和插件}

### `ConfigMutagens` {#configmutagens}

전역 구성에서 `사화`（四化） 매개변수를 정의합니다.

```ts
type ConfigMutagens = Partial<Record<HeavenlyStemName, StarName[]>>;
```

### `ConfigBrightness` {#configbrightness}

전역 구성에서 `밝기` 매개변수를 정의합니다.

```ts
type ConfigBrightness = Partial<Record<StarName, Brightness[]>>;
```

### `Config` {#config}

명반 계산 설정 객체를 정의합니다. `astro.config()`로 이후 생성할 명반의 기본값을 설정하거나, `withOptions({ config })`로 지금 생성하는 명반에만 다른 설정을 적용할 수 있습니다. 이미 생성된 명반은 생성 당시의 설정을 유지합니다(^2.6.2).

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

`yearDivide`와 `horoscopeDivide`의 값이 `normal`이면 음력 정월 초하루를 연도의 경계로 사용하고, `exact`이면 절기인 입춘（立春）을 경계로 사용합니다.

`dayDivide`는 만자시（晚子時）(`timeIndex`가 `12`인 경우)를 어느 날짜에 포함할지만 결정합니다. `forward`는 다음 날에, `current`는 당일에 포함합니다.

### `AstroType` <Badge type="warning" text="^2.5.0" /> {#astrotype}

중주파（中州派） 명반의 타입을 정의합니다.

```ts
type AstroType = 'heaven' | 'earth' | 'human';
```

| 값 | 설명 |
| --- | --- |
| `heaven` | 천반, 기본값 |
| `earth` | 지반: 신궁의 간지로 오행국을 정하고, 신궁을 명궁으로 삼습니다. |
| `human` | 인반: 복덕궁의 간지로 오행국을 정하고, 복덕궁을 명궁으로 삼습니다. |

### `Plugin` {#plugin}

플러그인 타입을 정의합니다. 플러그인은 하나의 함수입니다.

```ts
type Plugin = () => void;
```

:::tip 팁
플러그인 함수는 `this` 매개변수를 암묵적으로 받으며, 그 타입은 `T extends FunctionalAstrolabe`입니다. 만드는 방법은 [플러그인](./posts/config-n-plugin.md#插件)을 참고하세요.
:::

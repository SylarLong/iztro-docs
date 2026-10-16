---
title: "Kiểu TypeScript và giá trị đa ngôn ngữ trong iztro"
description: "Tra cứu các kiểu dữ liệu của iztro, giá trị theo từng ngôn ngữ và cấu trúc dữ liệu do API astro trả về."
---

# Định nghĩa kiểu dữ liệu {#类型定义}

## Lời mở đầu   {#前言}

Trang này mô tả các kiểu dữ liệu trong `iztro`. [Các kiểu dữ liệu quốc tế hóa](#国际化类型) được định nghĩa trong [i18n](https://github.com/SylarLong/iztro/blob/main/src/i18n/index.ts), còn các kiểu khác nằm trong [types](https://github.com/SylarLong/iztro/tree/main/src/data/types).

Bạn có thể nhập `các kiểu dữ liệu quốc tế hóa` bằng đoạn mã sau:

```ts
import { HeavenlyStemName } from "iztro/lib/i18n";
```

Để nhập các kiểu dữ liệu khác, hãy dùng:

```ts
import { Palace } from "iztro/lib/data/types";
```

::: tip Mẹo
Nếu phát hiện lỗi hoặc điểm chưa phù hợp trong `bản dịch` hay `định nghĩa kiểu`, hãy [tạo một issue](https://github.com/SylarLong/iztro/issues) để báo cho chúng tôi. Xin cảm ơn!
:::

## Các kiểu dữ liệu đa ngôn ngữ {#国际化类型}

Để hỗ trợ đầu vào và đầu ra đa ngôn ngữ, `iztro` định nghĩa tên gọi bằng nhiều ngôn ngữ cho các tham số và kết quả. Bạn có thể nhập giá trị bằng **bất kỳ ngôn ngữ được hỗ trợ nào**; ví dụ, [`HeavenlyStemName`](#heavenlystemname) chấp nhận `甲`, `갑` hoặc `jia`.

Ví dụ, khi gọi `getHoroscopeStar()`, bạn có thể truyền tên thiên can（天干） và địa chi（地支） bằng tiếng Trung làm đối số:

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("甲", "子", "decadal");
```

Bạn cũng có thể truyền tên gọi bằng ngôn ngữ khác được hỗ trợ, hoặc kết hợp nhiều ngôn ngữ trong cùng một lần gọi:

```ts
import { getHoroscopeStar } from "iztro/lib/star";

getHoroscopeStar("갑", "zi", "decadal");
```

Dù đầu vào dùng ngôn ngữ nào, kết quả vẫn được xuất thống nhất bằng ngôn ngữ bạn chọn. Hãy đặt ngôn ngữ đầu ra trước khi gọi phương thức:

```ts
import { setLanguage } from "iztro/lib/i18n";

setLanguage("ko-KR");

const horoscopeStar = getHoroscopeStar("甲", "zi", "decadal");
```

Lúc này, kết quả đầu ra của `horoscopeStar` sẽ là `tiếng Hàn`.

::: details Kết quả đầu ra `horoscopeStar`

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

Định nghĩa tên gọi của `mười thiên can`（十天干）.

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

Định nghĩa `mười hai địa chi`（十二地支）. Địa chi `Ngọ`（午） và thiên can `Mậu`（戊） đều có cách phiên âm thông thường là “wu”. Để tránh trùng tên khi xử lý đầu vào đa ngôn ngữ, thư viện biểu thị địa chi `Ngọ`（午） bằng tên `woo`.

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

Định nghĩa `Tên` của các cung（宮位） trong Tử Vi Đẩu Số（紫微斗數）.

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

Định nghĩa `độ sáng` của sao（星曜）.

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

Xác định tên của `sao tứ hóa`（四化星） trong Tử Vi Đẩu Số（紫微斗數）

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

Định nghĩa tên các `sao`（星曜） trong Tử Vi Đẩu Số（紫微斗數）, bao gồm cả `lưu diệu`（流曜）.

<Badge type="warning" text="^2.6.1" /> Tên tiếng Anh của Vũ Khúc（武曲） và Tuế Phá（歲破） lần lượt là `warrior` và `breaker`.

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

:::tip Bí danh cùng tên sao（星曜） ^2.6.1
Khi các sao（星曜） khác nhau có cùng tên tiếng Hàn hoặc tiếng Việt, bạn có thể nhập bí danh kèm chữ Hán để xác định chính xác sao cần tìm. Các bí danh này chỉ dùng cho đầu vào; đầu ra đã dịch vẫn sử dụng tên gốc.

- Tiếng Hàn: `천상(天相)`, `천상(天傷)`, `천월(天鉞)`, `천월(天月)`, `겁살(劫殺)`, `겁살(劫煞)`, `비렴(蜚廉)`, `비렴(飛廉)`, `관부(官府)`, `관부(官符)`
- Tiếng Việt: `Kiếp Sát(劫殺)`, `Kiếp Sát(劫煞)`, `Phi Liêm(蜚廉)`, `Phi Liêm(飛廉)`
:::

---

### `FiveElementsClassName` {#fiveelementsclassname}

Xác định tên của `Cục ngũ hành`（五行局） trong Tử Vi Đẩu Số（紫微斗數）

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

Xác định tên của `giới tính`

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

## Các kiểu dữ liệu dùng chung {#通用}

### `Language` {#language}

```ts
export type Language = `zh-CN` | `zh-TW` | `en-US` | `ko-KR` | `ja-JP` | `vi-VN`;
```

`ngôn ngữ` được hỗ trợ đã được xác định. Các ngôn ngữ hiện được hỗ trợ là:

- `zh-CN`: Tiếng Trung giản thể
- `zh-TW`: Tiếng Trung phồn thể
- `en-US`：English
- `ko-KR`：한국어
- `ja-JP`: Tiếng Nhật
- `vi-VN`: Tiếng Việt

---

### `Scope` {#scope}

```ts
export type Scope = "origin" | "decadal" | "yearly";
```

Định nghĩa `phạm vi áp dụng` của sao（星曜） để phân biệt sao bản mệnh（本命星曜） với lưu diệu（流曜）:

- `origin`: sao bản mệnh（本命星曜）
- `decadal`: sao đại hạn（大限星曜）
- `yearly`: sao lưu niên（流年星曜）

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

Định nghĩa `loại` của sao（星曜）. Dù `sao đào hoa`（桃花星） và `Giải Thần`（解神） (bao gồm `Niên Giải`（年解）) thuộc tạp diệu（雜曜）, chúng có ý nghĩa riêng trong luận giải lá số nên được phân loại riêng. Hai phụ tinh `Lộc Tồn`（祿存） và `Thiên Mã`（天馬） cũng có vai trò đặc biệt, nên mỗi sao được xếp vào một nhóm riêng:

- `major`: chính tinh（主星）
- `soft`: cát tinh（吉星）
- `tough`: sát tinh（煞星）
- `adjective`: tạp diệu（雜曜）
- `flower`: sao đào hoa（桃花）
- `helper`：Giải Thần（解神）
- `lucun`：Lộc Tồn（祿存）
- `tianma`：Thiên Mã（天馬）

## Sao（星曜）   {#星曜}

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

Định nghĩa cấu trúc dữ liệu cho đối tượng `sao`（星曜）.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `name` | Tên sao（星曜名稱） | [`StarName`](#starname) |
| `type` | Loại sao（星曜類型） | [`StarType`](#startype) |
| `scope` | Phạm vi | [`Scope`](#scope) |
| `brightness` | Độ sáng của sao | [`Brightness`](#brightness) |
| `mutagen` | tứ hóa（四化） | [`Mutagen`](#mutagen) |

## Cung（宮位）   {#宫位}

### `SoulAndBody` {#soulandbody}

```ts
export type SoulAndBody = {
  soulIndex: number;
  bodyIndex: number;
  heavenlyStemOfSoul: HeavenlyStemName;
  earthlyBranchOfSoul: EarthlyBranchName;
};
```

Định nghĩa thông tin vị trí của cung `Mệnh`（命宮） và cung `Thân`（身宮）.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `soulIndex` | Chỉ số Mệnh（命宮） | `number` |
| `bodyIndex` | Chỉ số Thân（身宮） | `number` |
| `heavenlyStemOfSoul` | Thiên can của cung Mệnh（命宮天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranchOfSoul` | Địa chi của cung Mệnh（命宮地支） | [`EarthlyBranchName`](#earthlybranchname) |

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

Định nghĩa cấu trúc dữ liệu cho đối tượng `cung`（宮位）.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `name` | Tên cung（宮位名稱） | [`PalaceName`](#palacename) |
| `isBodyPalace` | Có phải cung Thân（身宮） hay không | `boolean` |
| `isOriginalPalace` | Có phải cung Lai Nhân（來因宮） hay không | `boolean` |
| `heavenlyStem` | Thiên can của cung（宮位天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | Địa chi của cung（宮位地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `majorStars` | chính tinh（主星） | [`Star[]`](#star) |
| `minorStars` | phụ tinh（輔星） | [`Star[]`](#star) |
| `adjectiveStars` | tạp diệu（雜曜） | [`Star[]`](#star) |
| `changsheng12` | Mười hai sao vòng Tràng Sinh（長生十二神） | [`StarName`](#starname) |
| `boshi12` | Mười hai sao vòng Bác Sĩ（博士十二神） | [`StarName`](#starname) |
| `jiangqian12` | Mười hai sao Tướng Tiền của lưu niên（流年將前十二神） | [`StarName`](#starname) |
| `suiqian12` | Mười hai sao Tuế Tiền của lưu niên（流年歲前十二神） | [`StarName`](#starname) |
| `decadal` | Đại Hạn（大限） | [`Decadal`](#decadal) |
| `ages` | Tiểu Hạn（小限） | `number[]` |

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

Định nghĩa cấu trúc dữ liệu cho đối tượng `tam phương tứ chính`（三方四正）.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `target` | cung đang xét | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `opposite` | đối cung | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `wealth` | Vị trí Tài Bạch（財帛位） | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |
| `career` | Vị trí Quan Lộc（官祿位） | [`IFunctionalPalace`](./posts/palace.md#functionalpalace) |

## Vận hạn（運限）   {#运限}

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

Định nghĩa cấu trúc dữ liệu cho đối tượng `vận hạn`（運限）.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `index` | Chỉ số của cung tương ứng | `number` |
| `name`   <Badge type="warning" text="^1.2.3" /> | Tên vận hạn（運限名稱） | `string` |
| `heavenlyStem` | Thiên can của vận hạn（運限天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | Địa chi của vận hạn（運限地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `palaceNames` | Mười hai cung của vận hạn（運限十二宮） | [`PalaceName[]`](#palacename) |
| `mutagen` | sao tứ hóa（四化星） | [`StarName[]`](#starname) |
| `stars` | lưu diệu（流曜） | [`Star[][]`](#star) |

---

### `Decadal` {#decadal}

```ts
export type Decadal = {
  range: [number, number];
  heavenlyStem: HeavenlyStemName;
  earthlyBranch: EarthlyBranchName;
};
```

Định nghĩa dữ liệu `Đại Hạn`（大限） của lá số. Kiểu này chủ yếu được dùng trong [Palace](#palace).

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `range` | Tuổi bắt đầu và kết thúc đại hạn [`tuổi bắt đầu`, `tuổi kết thúc`] | `[number, number]` |
| `heavenlyStem` | Thiên can của đại hạn（大限天干） | [`HeavenlyStemName`](#heavenlystemname) |
| `earthlyBranch` | Địa chi của đại hạn（大限地支） | [`EarthlyBranchName`](#earthlybranchname) |

---

### `DecadalHoroscope` {#decadalhoroscope}

```ts
export type DecadalHoroscope = HoroscopeItem & {
  palaceName: PalaceName;
  ageRange: [number, number];
  yearRange: [number, number];
};
```

Định nghĩa một mục trong danh sách đại hạn（大限） do `decadalList()` trả về.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `palaceName` | Cung trên lá số bản mệnh nơi đại hạn tọa lạc（大限所在本命宮位） | [`PalaceName`](#palacename) |
| `ageRange` | Tuổi mụ（虛歲） bắt đầu và kết thúc đại hạn | `[number, number]` |
| `yearRange` | Năm bắt đầu và kết thúc đại hạn | `[number, number]` |

Loại này cũng chứa tất cả các thuộc tính của [`HoroscopeItem`](#horoscopeitem).

---

### `YearlyHoroscope` {#yearlyhoroscope}

```ts
export type YearlyHoroscope = HoroscopeItem & {
  age: number;
  year: number;
};
```

Định nghĩa một mục trong danh sách lưu niên（流年） do `yearlyList()` trả về.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `age` | Tuổi mụ tương ứng với lưu niên（流年虛歲） | `number` |
| `year` | Năm của lưu niên（流年年份） | `number` |

Loại này cũng chứa tất cả các thuộc tính của [`HoroscopeItem`](#horoscopeitem).

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

Định nghĩa một mục trong danh sách lưu nguyệt（流月） do `monthlyList()` trả về.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `month` | Tháng âm lịch, tháng đầu tiên là `1` | `number` |
| `isLeapMonth` | Có phải là tháng nhuận không? | `boolean` |
| `part` | Tháng thường, nửa đầu tháng nhuận hoặc nửa sau tháng nhuận | `'normal'`  \|  `'first'`  \|  `'second'` |
| `dayRange` | Phạm vi ngày âm lịch tương ứng cho mục này | `[number, number]` |

Loại này chứa tất cả các thuộc tính của cả [`YearlyHoroscope`](#yearlyhoroscope) và [`HoroscopeItem`](#horoscopeitem).

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

Định nghĩa đối tượng `vận hạn`（運限）, bao gồm dữ liệu `Đại Hạn`（大限）, `Lưu Niên`（流年）, `Lưu Nguyệt`（流月）, `Lưu Nhật`（流日） và `Lưu Thì`（流時）.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `lunarDate` | Ngày âm lịch | `string` |
| `solarDate` | Ngày dương lịch | `string` |
| `decadal` | Đại Hạn（大限） | [`HoroscopeItem`](#horoscopeitem) |
| `age` | Tiểu Hạn（小限） | { index:  `number`, nominalAge:  `number`  } |
| `yearly` | Lưu Niên（流年） | [`HoroscopeItem`](#horoscopeitem)   & { yearlyDecStar: { jiangqian12:  [`StarName[]`](/vi_VN/type-definition.md#starname); suiqian12:  [`StarName[]`](/vi_VN/type-definition.md#starname)  } } |
| `monthly` | Lưu Nguyệt（流月） | [`HoroscopeItem`](#horoscopeitem) |
| `daily` | Lưu Nhật（流日） | [`HoroscopeItem`](#horoscopeitem) |
| `hourly` | Lưu Thì（流時） | [`HoroscopeItem`](#horoscopeitem) |

## Lá số（星盤）   {#星盘}

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

Định nghĩa cấu trúc dữ liệu cho đối tượng `lá số`（星盤）.

| Thuộc tính | Ý nghĩa | Kiểu |
| --- | --- | --- |
| `gender` | giới tính <Badge type="warning" text="^2.0.3" /> | [`GenderName`](#gendername) |
| `solarDate` | Ngày dương lịch | `string` |
| `lunarDate` | Ngày âm lịch | `string` |
| `chineseDate` | Ngày được biểu thị bằng can chi（干支） | `string` |
| `rawDates` | Dữ liệu ngày gốc để các phương thức nội bộ sử dụng về sau | { lunarDate:  `LunarDate`, chineseDate:  `HeavenlyStemAndEarthlyBranchDate`  } |
| `time` | Giờ theo hệ mười hai thời thần（時辰） | `string` |
| `timeRange` | Khoảng thời gian tương ứng với giờ truyền thống | `string` |
| `sign` | Cung hoàng đạo phương Tây（星座） | `string` |
| `zodiac` | Con giáp（生肖） | `string` |
| `earthlyBranchOfSoulPalace` | Địa chi của cung Mệnh（命宮地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `earthlyBranchOfBodyPalace` | Địa chi của cung Thân（身宮地支） | [`EarthlyBranchName`](#earthlybranchname) |
| `soul` | Sao Mệnh chủ（命主） | [`StarName`](#starname) |
| `body` | Sao Thân chủ（身主） | [`StarName`](#starname) |
| `fiveElementsClass` | Cục ngũ hành（五行局） | [`FiveElementsClassName`](#fiveelementsclassname) |
| `palaces` | Dữ liệu của mười hai cung（十二宮） | [`IFunctionalPalace[]`](./posts/palace.md#functionalpalace) |

## Cấu hình và trình cắm <Badge type="warning" text="^2.3.0" />   {#配置和插件}

### `ConfigMutagens` {#configmutagens}

Xác định tham số `tứ hóa`（四化） trong cấu hình chung.

```ts
type ConfigMutagens = Partial<Record<HeavenlyStemName, StarName[]>>;
```

### `ConfigBrightness` {#configbrightness}

Xác định tham số `độ sáng` trong cấu hình chung.

```ts
type ConfigBrightness = Partial<Record<StarName, Brightness[]>>;
```

### `Config` {#config}

Định nghĩa đối tượng cấu hình tính toán lá số. Dùng `astro.config()` để đặt giá trị mặc định cho các lá số được tạo sau đó, hoặc `withOptions({ config })` để chỉ ghi đè cấu hình của lá số đang tạo. Các lá số đã tạo vẫn giữ cấu hình tại thời điểm tạo (^2.6.2).

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

Với `yearDivide` và `horoscopeDivide`, giá trị `normal` lấy mồng một tháng Giêng âm lịch làm mốc chuyển năm, còn `exact` lấy tiết Lập Xuân（立春） làm mốc.

`dayDivide` chỉ quyết định giờ Tý muộn（晚子時）(`timeIndex` bằng `12`) được tính vào ngày nào: `forward` tính vào ngày hôm sau, còn `current` tính vào ngày hiện tại.

### `AstroType` <Badge type="warning" text="^2.5.0" /> {#astrotype}

Định nghĩa kiểu lá số của phái Trung Châu（中州派）.

```ts
type AstroType = 'heaven' | 'earth' | 'human';
```

| giá trị | Mô tả |
| --- | --- |
| `heaven` | Thiên bàn（天盤）, giá trị mặc định |
| `earth` | Địa bàn（地盤）: xác định cục ngũ hành từ can chi của cung Thân, rồi lấy cung Thân làm cung Mệnh. |
| `human` | Nhân bàn（人盤）: xác định cục ngũ hành từ can chi của cung Phúc Đức, rồi lấy cung Phúc Đức làm cung Mệnh. |

### `Plugin` {#plugin}

Định nghĩa kiểu trình cắm. Thực chất, một trình cắm là một hàm.

```ts
type Plugin = () => void;
```

:::tip Mẹo
Hàm của trình cắm ngầm nhận tham số `this` có kiểu `T extends FunctionalAstrolabe`. Xem [Trình cắm](./posts/config-n-plugin.md#插件) để biết cách tạo.
:::

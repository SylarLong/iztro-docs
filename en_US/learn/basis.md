---
outline: deep
description: "An introduction to Zi Wei Dou Shu, its basic concepts, and the terminology used to read a chart."
---

<script setup>
import Donate from '/components/donate.vue'
</script>

# Zi Wei Dou Shu: Basics（紫微斗數基礎）   {#紫微斗数基础}

## Introduction   {#前言}

Zi Wei Dou Shu（紫微斗數） studies the relationship between `people` and the `environment`. This site’s approach may differ from traditional teaching. If you have studied the subject before, some material here may conflict with what you learned, so read it thoughtfully in relation to your existing understanding. The site mainly offers an accessible introduction, explaining how the system works and helping beginners discover its appeal. Corrections are welcome.

>*This series of articles is original. Please indicate the source when reprinting.*

:::tip Tips
This site mainly uses logical reasoning. Readers who prefer a mystical approach should bear that difference in mind.
:::

<Donate />

## What can Zi Wei Dou Shu（紫微斗數） do?   {#紫微斗数能干嘛}

Many readers know Zi Wei Dou Shu（紫微斗數） only as an ancient Chinese divination technique. In my view, that describes its entertainment role rather than its full scope. I hope professional practitioners will not take offense; I am not dismissing what the system can do. Many people seek fortune-telling without understanding it, hoping for supernatural help because the unknown feels frightening. Beginning here, I will introduce the system more fully. What, then, can Zi Wei Dou Shu do?

- Personality analysis

  Both traditional destiny studies and psychological approaches examine personality, including questionnaire-based models such as MBTI. Personality is multifaceted rather than one-dimensional: a person may behave very differently with different people or in different situations. A simple category cannot easily describe all of this. Zi Wei Dou Shu（紫微斗數） uses twelve [`palaces`（宮位）](./palace.md) to examine and classify these different aspects, allowing a detailed description of personality.

  If a personality reading differs greatly from the person’s actual character, stop there. This is the first step, and further interpretation is meaningful only when it fits. What can cause such a mismatch? I have identified the following possible reasons:

  1. Incorrect birth-time information

      Birth time is a common source of error because parents may not remember it accurately. Each traditional time period spans two modern hours. If the recorded time is near a boundary, such as around 3:00, either of two charts may apply. In that case, examine both and compare which better reflects the person’s actual character.

      The recorded birth time can also be wrong. For example, a doctor might record a birth at 2:54 as 3:05, placing it in a different traditional two-hour period.

      Calendar conversions and different boundary conventions can also produce different charts. The Chinese calendar used for Zi Wei Dou Shu（紫微斗數） is itself lunisolar: its months follow the Moon, while solar terms mark the Sun’s seasonal cycle. A lunar-month boundary must therefore be distinguished from a solar-term boundary used in some Heavenly Stem–Earthly Branch（干支） calculations. Solar terms do not necessarily begin at midnight. For a birth near a boundary, check the calendar conversion and the charting rules in use before comparing the possible charts.

      Clock adjustments, such as daylight saving time, can shift the birth-time period. The table below lists the periods when mainland China observed daylight saving time. If you were born during one of them, subtract one hour from the recorded clock time. First check whether your parents have already made that adjustment. See [`Baidu Encyclopedia`](https://baike.baidu.com/item/%E5%A4%8F%E4%BB%A4%E6%97%B6/1809579) for details.

      | Daylight Saving Time in Mainland China |
      | --- |
      | May 4 to September 14, 1986 (because 1986 was the first year of daylight saving time, it started on May 4 and ended on September 14) |
      | April 12 to September 13, 1987 |
      | April 10 to September 11, 1988 |
      | April 16 to September 17, 1989 |
      | April 15 to September 16, 1990 |
      | April 14 to September 15, 1991 |

      For daylight saving time implementation times in other countries or regions, please refer to local official data.

  2. The chart reader’s knowledge of Zi Wei Dou Shu（紫微斗數）

      Readers have different levels of skill, so their analyses can reach opposite conclusions. If you are sure your birth-time information is correct, such inconsistencies are easier to identify. In a face-to-face reading, relying on your reactions and leading remarks may indicate limitations the reader is unwilling to admit. My own skills are limited too, but I am willing to acknowledge an inadequate reading. I hope one inaccurate experience will not make you dismiss Zi Wei Dou Shu（紫微斗數） entirely. This is one reason I published the algorithms and documentation as open source: to give everyone a foundation and interested readers a way to study further.

  3. The chart reader’s ability to communicate

      Communication and understanding can also create a gap. Different readers interpret the same Hamlet differently, or attach different meanings to an author’s blue curtains. In the same way, what a chart reader intends to convey and what the chart owner understands may differ.

- Educating children

  Many parents may think, “Of course I understand my own child.” Yet you see only one side of their personality. You cannot be with them twenty-four hours a day to observe their classmates, friends, interactions with people in different roles, or even how they see you. The author regards the child’s chart as a way to explore these aspects and tailor education to the individual child.

- career planning

  This may be less useful for someone with a clear goal. It can offer a reference for those unsure which work suits them or which university major to choose. It can also provide a forecast-like view of likely favorable or difficult periods in a career, helping them prepare ahead.

- A conversation starter

  Like zodiac signs or MBTI, Zi Wei Dou Shu（紫微斗數） can also be a conversation starter. It can ease the first exchange and help strangers get to know each other faster, especially when both already know something about the system.

- Choosing a partner

  Choosing a partner may bring to mind compatibility matching with birth charts, but that is not the point here. Whether on a matchmaking date or meeting someone naturally, asking for their exact birth date and time can feel awkward. Familiarity with Zi Wei Dou Shu（紫微斗數） may let you infer a rough star combination from conversation and behavior, offering a reference for how to relate to them. If both people know the system, discussing their major stars（主星） as they might discuss zodiac signs can make it much easier to learn about personality and preferences, without asking for private birth details.

## Terminology explanation   {#术语解释}

Zi Wei Dou Shu（紫微斗數） has many technical terms. Knowing them helps you follow other people’s chart readings. With enough exposure, you can try interpreting a chart yourself. Studying charts can be enjoyable; the following explanations introduce the most common terms one by one.

### `Gender yin and yang`   {#性别阴阳}

In Zi Wei Dou Shu（紫微斗數）, you will often hear `Yang-year men and Yin-year women`（陽男陰女） and `Yin-year men and Yang-year women`（陰男陽女）. Combining the Yin–Yang property of the birth year’s `Heavenly Stem`（天干） with gender gives four categories:

- Men born in a yang year（陽男）
- Women born in a yang year（陽女）
- Men born in a yin year（陰男）
- Women born in a yin year（陰女）

Gender and the Yin–Yang property of the birth year affect the direction of some calculations.

### `clockwise` / `counterclockwise`   {#顺行-逆行}

  In Zi Wei Dou Shu（紫微斗數）, forward progression means moving `clockwise`; reverse progression means moving `counterclockwise`. Thus `Yang-year men and Yin-year women progress clockwise`（陽男陰女順行） calls for a `clockwise` arrangement, while `Yin-year men and Yang-year women progress counterclockwise`（陰男陽女逆行或逆部） calls for a `counterclockwise` arrangement.

### `chart`（星盤）   {#星盘}

See [Introduction to charts（星盤介紹）](./astrolabe.md) for more detail.

- Chart construction（排盤）

  The process of constructing a natal chart from the birth date, traditional birth hour and gender.

- chart interpretation

  The process of interpreting the information shown in a chart.

- natal chart（本命盤）

  Traditionally called the Heaven Chart, this `natal chart`（天盤） is calculated from the birth date and hour. Its arrangement is fixed.

- decadal chart（大限盤）

  Traditionally called the Earth Chart, this is the `decadal chart`（地盤）. Each of the natal chart’s twelve palaces takes a turn as the focus for `ten years`. The first period begins in the `soul`（命宮） palace and is called the `first decadal period`（第一大限）. Subsequent periods are numbered in sequence, with the general label `nth decadal period`（第n大限）.

- annual chart（流年盤）

  Traditionally called the Human Chart, this is the `annual chart`（人盤）. Decadal periods change every ten years, whereas annual periods change `every year`. The palace associated with that year’s `Earthly Branch`（地支） becomes the annual soul palace（流年命宮）.

- The Heaven–Earth–Human triad（天地人三才）

  It is the collective name for `natal chart`（本命盤）, `decadal chart`（大限盤）, and `annual chart`（流年盤）.

- Pattern（格局）

  Certain combinations of `stars`（星曜） form a `pattern`（格局）. Its effects resemble a `set bonus` from matching equipment in a game, modifying particular traits.

### `palaces`（宮位）   {#宫位}

See [The palace system（宮位系統）](./palace.md) for the basic concepts of palaces.

- palace stem（宮干）

  The `Heavenly Stem`（天干） assigned to a palace.

- target palace（本宮）

  The palace currently being examined. If you are examining the `spouse`（夫妻） palace, that palace is the `target palace`（本宮）.

- opposite palace（對宮）

  The palace directly across the chart from the target palace, also called the `opposite position`（四正位）.

- trine positions（三合位）

  Also called the `three-position group`（三才方） or `trine positions`（三方）. This group consists of the `target palace`（本宮） together with the two palaces at its index `±4`.

- opposite position（四正位）

  Also called the `opposite palace`（對宮）, this is the position at the index of the `target palace`（本宮） `+6`.

- trine and opposite palaces（三方四正）

  The collective term for `trine positions`（三合位） and the `opposite position`（四正位）.

- Heavenly Net（天羅） and Earth Net（地網）

  These refer to the `chen`（辰） and `xu`（戌） palaces: `chen`（辰） is the Heavenly Net（天羅） position, and `xu`（戌） the Earth Net（地網） position. The concept comes from the Book of Changes（周易）, where chen corresponds to `Heavenly Chief`（天罡） and xu to `River Chief`（河魁）. The latter two also belong to the twelve divine generals（十二神將） in Da Liu Ren（大六壬）. You do not need to memorize this background, but interested readers can explore it further.

- empty palace（空宮）

  A palace without any [major stars（主星）](./major-star.md).

- adjacent palaces（夾宮）

  The two palaces immediately before and after the palace being examined.

- Heavenly Gate（天門） and Earth Gate（地門）

  These concepts come from Feng Shui.

  The Heavenly Gate（天門） is the `hai palace`（亥宮）. In the Later Heaven Bagua（後天八卦）, it occupies the Qian trigram（乾卦） position. In branch terms this covers `xu`（戌） and `hai`（亥）, but xu already represents the `Earth Net position`（地網位）, so the Heavenly Gate is assigned to the `hai palace`（亥宮）. The `Bright moon at the Heavenly Gate`（月朗天門） pattern means that `moon`（太陰） occupies hai in either the soul palace（命宮） or body palace（身宮）.

  The Earth Gate（地門） is the `si palace`（巳宮）, called the `Earth Door position`（地戶位） in feng shui—literally the `door into the earth`. Its branch positions are `chen`（辰） and `si`（巳）. Because chen already represents the `Heavenly Net position`（天羅位）, the Earth Gate is assigned to the `si palace`（巳宮）.

- Thunder Gate（雷門）

  The Thunder Gate（雷門） is the `mao palace`（卯宮）, because that palace occupies the `Zhen`（震） trigram position. Hence its name, `Thunder Gate`（雷門）. The `Sun Illuminating the Thunder Gate`（日照雷門） pattern means that `sun`（太陽） and `sage`（天梁） occupy mao together.

- Heavenly Palace（天宮） and Earth Palace（地宮）

  The Heavenly Palace（天宮） means the `zi palace`（子宮）; the Earth Palace（地宮） means the `chou palace`（丑宮）. The traditional phrase is “天開於子，地闢於丑，人生於寅”. This concept is used when discussing the origin palace（來因宮）. Do not confuse `Heavenly Palace`（天宮） and `Earth Palace`（地宮） with `Heavenly Gate`（天門） and `Earth Gate`（地門）: they come from different traditions and refer to different positions despite the similar names.

### `stars`（星曜）   {#星曜}

Stars（星曜） are important components of the palaces in Zi Wei Dou Shu（紫微斗數）. See [The star system](./star.md) for details.

- transit stars（流曜）

  Stars that change with the `decadal`（大限） and `yearly`（流年） cycles.

- Meeting, joining, encountering, and sharing a palace（遇・加・逢・同宮・同度）

  These mean that stars occupy the same palace. For example, `emperor`（紫微） and `helper`（右弼） “sharing a palace” means that both are placed in that palace.

- Trine meeting, aspecting, opposing, and supporting（會・照・衝・扶拱）

  `meet in trine`（會） and `supporting aspect`（扶拱） describe stars in the target palace’s `trine positions`（三方位）. `aspect`（照） and `opposing aspect`（衝） describe stars in its `opposite position`（四正位）. If a reading says a star “meets or aspects” the target, it only needs to be within the `trine and opposite palaces`（三方四正） group.

- Sitting in, occupying, and guarding a palace（坐・據・守）

  These describe a star occupying a palace. For example, `wolf`（貪狼） “sitting in” the `spouse`（夫妻） palace means that it is placed there.

- Emptiness stars（空星・空曜）

  Refers to `ideologue`（地空）, `utopian`（天空）, `fancied`（旬空）, `bottomless`（空亡）

- Dark star（暗曜）

  Refers to [`advocator`（巨門）](./major-star.md#巨门星)

- martial star（英星）

  Refers to [`rebel`（破軍）](./major-star.md#破军星)

- General star（將星）

  Refers to [`marshal`（七殺）](./major-star.md#七杀星)

## Yin Yang and five elements（五行）   {#阴阳五行}

In Chinese Daoist thought, `Yin and Yang`（陰陽） and the `five elements`（五行） are fundamental concepts. We only introduce them briefly here.

- Yin and Yang（陰陽）

  In Daoist thought, the two that arise from one are Yin and Yang, representing two complementary aspects of things. For example:

  - `light` is `Yang`, and `shadow` is `Yin`.
  - `male` is `Yang`, and `female` is `Yin`.
  - `positive charge` is `Yang`, and `negative charge` is `Yin`.

  Yin and Yang（陰陽） are relative, complementary aspects of things; good and bad fortune are likewise interconnected. The aim is to find a balance, avoiding both excess and deficiency. `Yang` suggests strength and intensity, while `Yin` suggests softness and restraint.

- five elements（五行）

  Different cultures describe `elements` differently. Ancient Greece, for example, used four: `Earth`, `wind`, `Water`, and `Fire`.

  <img src="/.vitepress/public/4elements.webp" alt="four elements" width="300" />

  Ancient India’s `five elements` add `space` to the Greek four: `Earth`, `wind`, `Water`, `Fire` and `space`.

  <img src="/.vitepress/public/5elements-1.webp" alt="five elements" width="300" />

  China’s `five elements`（五行） system shares some concepts with other element systems but differs in others. The `five elements`（五行） are `Water`, `Wood`, `Metal`, `Earth`, and `Fire`. A different order may be more familiar in Chinese, but this order matches the [Five Elements Class（五行局）](#五行局) used in Zi Wei Dou Shu（紫微斗數）.

  <img src="/.vitepress/public/5elements-2.webp" alt="five elements" width="300" />

## Heavenly Stems and Earthly Branches（天干地支）   {#天干地支}

In traditional Chinese culture, `sexagenary year numbering`（干支紀年） is a fundamental concept, just like addition, subtraction, multiplication and division in mathematics, and the 26 letters in English. In Zi Wei Dou Shu（紫微斗數）, the arrangement of the entire chart（星盤） is calculated according to `Heavenly Stem`（天干） and `Earthly Branch`（地支）. Learning these stems and branches is therefore an essential first step.

### ten Heavenly Stems（十天干）   {#十天干}

  The ten Heavenly Stems（十天干） determine the `four transformations`（四化）, an important and useful part of Zi Wei Dou Shu（紫微斗數）. See [The four transformations（四化星）](./mutagen.md) to learn more.

  | Name | five elements（五行） | Yin and Yang（陰陽） |
  | --- | --- | --- |
  | jia（甲） | 🪵 Wood | 🌕 Yang |
  | yi（乙） | 🪵 Wood | 🌑 Yin |
  | bing（丙） | 🔥 Fire | 🌕 Yang |
  | ding（丁） | 🔥 Fire | 🌑 Yin |
  | wu（戊） | ⛰️ Earth | 🌕 Yang |
  | ji（己） | ⛰️ Earth | 🌑 Yin |
  | geng（庚） | 🪙 Metal | 🌕 Yang |
  | xin（辛） | 🪙 Metal | 🌑 Yin |
  | ren（壬） | 🌊 Water | 🌕 Yang |
  | gui（癸） | 🌊 Water | 🌑 Yin |

### twelve Earthly Branches（十二地支）   {#十二地支}

  The Earthly Branches（地支） provide fixed positions in the Zi Wei Dou Shu（紫微斗數） palace system. Think of classrooms whose locations are fixed once a school is built. The `soul`（命宮） palace, however, can occupy different positions, like a student assigned to Class 1 or Class 10. The table below shows the branches’ positions in the twelve palaces.

  <table class="astrolabe">
    <tr>
        <td>si（巳）<code>3</code></td>
        <td>woo（午）<code>4</code></td>
        <td>wei（未）<code>5</code></td>
        <td>shen（申）<code>6</code></td>
    </tr>
    <tr>
        <td>chen（辰）<code>2</code></td>
        <td class="center-palace" rowspan="2" colspan="2">central palace</td>
        <td>you（酉）<code>7</code></td>
    </tr>
    <tr>
        <td>mao（卯）<code>1</code></td>
        <td>xu（戌）<code>8</code></td>
    </tr>
    <tr>
        <td>yin（寅）<code>0</code></td>
        <td>chou（丑）<code>11</code></td>
        <td>zi（子）<code>10</code></td>
        <td>hai（亥）<code>9</code></td>
    </tr>
  </table>

  Like the Heavenly Stems（天干）, the twelve Earthly Branches（十二地支） each have Yin–Yang（陰陽） and Five Elements（五行） classifications.

  | Name | five elements（五行） | Yin and Yang（陰陽） |
  | --- | --- | --- |
  | zi（子） | 🌊 Water | 🌕 Yang |
  | chou（丑） | ⛰️ Earth | 🌑 Yin |
  | yin（寅） | 🪵 Wood | 🌕 Yang |
  | mao（卯） | 🪵 Wood | 🌑 Yin |
  | chen（辰） | ⛰️ Earth | 🌕 Yang |
  | si（巳） | 🔥 Fire | 🌑 Yin |
  | woo（午） | 🔥 Fire | 🌕 Yang |
  | wei（未） | ⛰️ Earth | 🌑 Yin |
  | shen（申） | 🪙 Metal | 🌕 Yang |
  | you（酉） | 🪙 Metal | 🌑 Yin |
  | xu（戌） | ⛰️ Earth | 🌕 Yang |
  | hai（亥） | 🌊 Water | 🌑 Yin |

#### six pairings of the Earthly Branches（地支六合）   {#地支六合}

  The idea of `combination`（合） includes `mutual support`, provided `secretly`. We will not examine the Earthly Branches（地支） in depth here. The six pairings（六合） are listed because they are needed to explain [hidden partner palaces（暗合宮）](./palace.md#暗合宫).

  - `zi`（子） and `chou`（丑） combine to form `⛰️Earth`.
  - `yin`（寅） and `hai`（亥） combine to form `🪵Wood`.
  - `mao`（卯） and `xu`（戌） combine to form `🔥Fire`.
  - `chen`（辰） and `you`（酉） combine to form `🪙Metal`.
  - `si`（巳） and `shen`（申） combine to form `🌊Water`.
  - `woo`（午） and `wei`（未） combine to form `⛰️Earth`.

#### Earthly Branch trine groups（地支三合局）   {#地支三合局}

  As with the six pairings（六合）, the trine `combination`（合） involves mutual support. Whereas pairings provide help `secretly`, trines provide it openly. We only outline these relationships here because the Earthly Branch（地支） trine groups are needed to explain [trine and opposite palaces（三方四正）](./palace.md#三方四正).

  - `shen`（申）, `zi`（子）, and `chen`（辰） combine into a `🌊Water` group.
  - `hai`（亥）, `mao`（卯）, and `wei`（未） combine into a `🪵Wood` group.
  - `yin`（寅）, `woo`（午）, and `xu`（戌） combine into a `🔥Fire` group.
  - `si`（巳）, `you`（酉）, and `chou`（丑） combine into a `🪙Metal` group.

#### six oppositions of the Earthly Branches（地支六衝）   {#地支六冲}

  An `opposing aspect`（衝） represents conflict and a relationship that takes substantial effort to reconcile. The six opposing Earthly Branch pairs（地支六沖） are used to explain [trine and opposite palaces（三方四正）](./palace.md#三方四正).

  - `zi`（子） and `woo`（午） oppose each other.
  - `mao`（卯） and `you`（酉） oppose each other.
  - `yin`（寅） and `shen`（申） oppose each other.
  - `si`（巳） and `hai`（亥） oppose each other.
  - `chen`（辰） and `xu`（戌） oppose each other.
  - `chou`（丑） and `wei`（未） oppose each other.

## twelve double-hours   {#十二时辰}

Traditional Chinese timekeeping divides a day into `twelve double-hours`（十二時辰）, each spanning two modern hours. The `zi hour` is unusual because it spans `23:00~01:00` and crosses midnight. It is therefore divided into `early Zi hour` and `late Zi hour`. The corresponding clock times are shown below:

| Name | Time range |
| --- | --- |
| early Zi hour | 00:00～01:00 |
| chou hour | 01:00～03:00 |
| yin hour | 03:00～05:00 |
| mao hour | 05:00～07:00 |
| chen hour | 07:00～09:00 |
| si hour | 09:00～11:00 |
| woo hour | 11:00～13:00 |
| wei hour | 13:00～15:00 |
| shen hour | 15:00～17:00 |
| you hour | 17:00～19:00 |
| xu hour | 19:00～21:00 |
| hai hour | 21:00～23:00 |
| late Zi hour | 23:00～00:00 |

## Five Elements Class（五行局）   {#五行局}

The Five Elements Class（五行局） determines the starting age of the first decadal cycle（大限） in Zi Wei Dou Shu（紫微斗數）. It comes from `Nayin for the sixty stem–branch pairs`（六十甲子納音）, but this site does not cover `the sixty Nayin assignments`（六十納音）; interested readers can study it separately. The number in each class’s name gives the starting age: water 2nd（水二局） begins at `2`, and earth 5th（土五局） at `5`. This is enough background for our purposes. There are five classes:

- 🌊 `water 2nd`（水二局）
- 🪵 `wood 3rd`（木三局）
- 🪙 `metal 4th`（金四局）
- ⛰️ `earth 5th`（土五局）
- 🔥 `fire 6th`（火六局）

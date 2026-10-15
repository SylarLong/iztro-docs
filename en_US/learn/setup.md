---
title: "Zi Wei Dou Shu star placement rules"
outline: deep
description: "Learn the star placement rules used to calculate a Zi Wei Dou Shu chart, from palace positions to stars and time cycles."
---

<script setup>
import Donate from '/components/donate.vue'
</script>

# Zi Wei Dou Shu: Star placement rules（紫微斗數安星訣）   {#紫微斗数安星诀}

## Introduction   {#前言}

Star-placement rules（安星訣） are the algorithms used to calculate the data for Zi Wei Dou Shu（紫微斗數）. Classical texts present them as easy-to-remember verses. For now, I am recording those verses; detailed explanations will follow. Maintaining this site alone in my spare time takes considerable effort. Please consider [supporting the site](/en_US/about.md).

:::tip Tips
This chapter assumes some basic knowledge. If you are new to the subject, I strongly recommend reading [the fundamentals](./basis.md) first.
:::

<Donate />

## Star placement rules（安星訣）   {#安星诀}

### 1. Rules for determining the stem of the Yin palace（定寅首訣）   {#_1-定寅首诀}

>甲己年生起丙寅，
>
>乙庚年生起戊寅，
>
>丙辛年生起庚寅，
>
>丁壬年生起壬寅，
>
>戊癸年生起甲寅。 

### 2. Rules for placing the soul and body palaces（安命身宮訣）   {#_2-安命身宫诀}

>寅起正月，順數至生月，逆數生時為命宮。
>
>寅起正月，順數至生月，順數生時為身宮。

### 3. Rules for placing the twelve palaces（定十二宮訣）   {#_3-定十二宫诀}

>由命宮逆數：兄弟、夫妻、子女、財帛、疾厄、遷移、奴僕、事業、田宅、福德、父母。 

### 4. Rules for determining decadal periods（起大限訣）   {#_4-起大限诀}

>大限由命宮起，
>
>陽男陰女順行；
>
>陰男陽女逆行，
>
>每十年過一宮限。

### 5. Rules for determining annual age periods（起小限訣）   {#_5-起小限诀}

>小限一年一度逢，男順女逆不相同，
>
>寅午戌人辰上起，申子辰人自戌宮，
>
>巳酉丑人未宮始，亥卯未人起丑宮。

### 6. Rules for determining the soul ruler（安命主訣）   {#_6-安命主诀}

>子屬貪狼丑亥門，
>
>寅戌生人屬祿存。
>
>卯酉屬文巳未武，
>
>辰申廉宿午破軍。

:::tip Tips
By default, the library determines the soul ruler（命主） from the earthly branch of the soul palace（命宮）. With the Zhongzhou（中州派） algorithm, it uses the birth year’s earthly branch instead.
:::

### 7. Rules for determining the body ruler（安身主訣）   {#_7-安身主诀}

>子午安身鈴火宿，
>
>丑未天相寅申梁，
>
>卯酉天同身主是，
>
>巳亥天機辰戌昌。

:::tip Tips
The body ruler（身主） is determined from the birth year’s earthly branch. Versions of this mnemonic may differ; the library uses impulsive（火星） as the body ruler for both Zi（子） and Woo（午） years.
:::

### 8. Rules for placing emperor（起紫微星訣）   {#_8-起紫微星诀}

>六五四三二，酉午亥辰丑，
>
>局數除日數，商數宮前走；
>
>若見數無餘，便要起虎口，
>
>日數小於局，還直宮中守。

### 9. Rules for placing empress（安天府星訣）   {#_9-安天府星诀}

>天府南斗令，常對紫微宮，
>
>丑卯相更迭，未酉互為根。
>
>往來午與戌，蹀躞子和辰，
>
>巳亥交馳騁，同位在寅申。

:::tip Tips
Determine the position from emperor（紫微）.
:::

### 10. Rules for placing emperor star group（安紫微諸星訣）   {#_10-安紫微诸星诀}

>紫微逆去天機星，
>
>隔一太陽武曲辰，
>
>連接天同空二宮，
>
>廉貞居處方是真。

### 11. Rules for placing empress star group（安天府諸星訣）   {#_11-安天府诸星诀}

>天府順行有太陰，
>
>貪狼而後巨門臨，
>
>隨來天相天梁繼，
>
>七殺空三是破軍。

### 12. Rules for determining the Five Elements Class（定五行局訣）   {#_12-定五行局诀}

>甲乙丙丁一到五，子丑午未一來數，
>
>寅卯申酉二上走，辰巳戌亥三為足。
>
>干支相加多減五，五行木金水火土。

Note:

1. Five-element values（五行取數）: wood 1, metal 2, water 3, fire 4, earth 5.

   - Heavenly-stem values（天干取數）:
      - Jia, Yi（甲乙） → 1
      - Bing, Ding（丙丁） → 2
      - Wu, Ji（戊己） → 3
      - Geng, Xin（庚辛） → 4
      - Ren, Gui（壬癸） → 5

   - Earthly-branch values（地支取數）:
      - Zi, Wu, Chou, Wei（子午丑未） → 1
      - Yin, Shen, Mao, You（寅申卯酉） → 2
      - Chen, Xu, Si, Hai（辰戌巳亥） → 3


2. Calculation method:

    Add the heavenly-stem and earthly-branch values. If the sum exceeds 5, subtract 5. The resulting values 1, 2, 3, 4, and 5 correspond to wood, metal, water, fire, and earth.

3. Example:

     - bing（丙） + zi（子）: 2+1=3 → Water（水） → water 2nd（水二局）
     - Xin-Wei（辛未）: 4+1=5 → earth（土） → earth 5th（土五局）.
     - geng（庚） + shen（申）: 4+2=6 → 6−5=1 → Wood（木） → wood 3rd（木三局）

### 13. Rules for placing officer, helper, scholar, artist, ideologue, fickle（安輔弼、昌曲、空劫訣）   {#_13-安辅弼、昌曲、空劫诀}

>辰上順正尋左輔，戌上逆正右弼當，
>
>辰上順時文曲位，戌上逆時覓文昌，
>
>亥上子時順安劫，逆回便是地空亡。


### 14. Rules for placing assistant, aide（安魁鉞訣）   {#_14-安魁钺诀}

>甲戊庚之年丑未，
>
>乙己之年子申，
>
>辛年午寅，
>
>壬癸之年卯巳，
>
>丙丁之年亥酉。

### 15. Rules for placing money, driven, tangled（定祿存、羊、陀訣）   {#_15-定禄存、羊、陀诀}

>甲祿到寅宮，乙祿居卯府。
>
>丙戊祿在巳，丁己祿在午。
>
>庚祿定居申，辛祿酉上補。
>
>壬祿亥中藏，癸祿居子戶。
>
>祿前羊刃當，祿後陀羅府。

### 16. Rules for placing horse（安天馬訣）   {#_16-安天马诀}

>寅午戌年馬在申，申子辰年馬在寅。
>
>巳酉丑年馬在亥，亥卯未年馬在巳。

:::tip Tips
Use the earthly branch（地支） of the birth year.
:::

### 17. Rules for placing impulsive, spark（安火鈴訣）   {#_17-安火铃诀}

>申子辰人寅戌揚，寅午戌人丑卯方。
>
>巳酉丑人卯戌位，亥卯未人酉戌房。

:::tip Tips
To place impulsive（火星） and spark（鈴星）, first use the birth-year branch to find their Zi-hour（子時） starting palaces from the verse.
:::

For a person born in Ren-Chen（壬辰） year at Mao hour（卯時）, `申子辰人寅戌揚` gives Yin（寅） as impulsive’s（火星） Zi-hour（子時） starting palace and Xu（戌） as spark’s（鈴星）. Count forward to Mao hour: impulsive lands in Si（巳）, and spark in Chou（丑）.

### 18. Rules for placing four transformation stars（安四化星訣）   {#_18-安四化星诀}

>甲廉破武陽，乙機梁紫陰，
>
>丙同機昌廉，丁陰同機巨，
>
>戊貪陰右機。己武貪梁曲，
>
>庚陽武陰同，辛巨陽曲昌，
>
>壬梁紫左武，癸破巨陰貪。

:::tip Tips
Transformation assignments（四化） vary by school; the list above follows the Southern School.
:::

### 19. Rules for placing honorable, awarded（安台輔封誥訣）   {#_19-安台辅封诰诀}

>臺輔午起子順到時，封誥寅宮起子逆到時。

### 20. Rules for placing serious, social（安天刑天姚訣）   {#_20-安天刑天姚诀}

>天刑從酉起正月，順至生月便安之。
>
>天姚丑宮起正月，順到生月即停留。

### 21. Rules for placing considery（安解神訣）   {#_21-安解神诀}

- Monthly considery（月解）

  Monthly considery（月解） is placed according to the birth month.

  >正二在申三四在戌，
  >
  >五六在子七八在寅。
  >
  >九十月坐於辰宮，
  >
  >十一十二在午宮。

- Yearly considery（年解）

  Yearly considery（年解） is the annual form of considery（解神）. It belongs to `transit stars`（流曜） and changes position each year.

  >解神從戌上起子，逆數至當生年太歲上是也

### 22. Rules for placing psychic（安天巫訣）   {#_22-安天巫诀}

>正五九月在巳，二六十月在申，
>
>三七十一在寅，四八十二在亥。

### 23. Rules for placing sickly（安天月訣）   {#_23-安天月诀}

>一犬二蛇三在龍，四虎五羊六兔宮。
>
>七豬八羊九在虎，十馬冬犬臘寅中。

### 24. Rules for placing gloomy（安陰煞訣）   {#_24-安阴煞诀}

>正七月在寅，二八月在子，
>
>三九月在戌，四十月在申，
>
>五十一在午，六十二在辰。

### 25. Rules for placing interrupted（安截路空亡訣）   {#_25-安截路空亡诀}

>甲己之年申酉，
>
>乙庚之年午未，
>
>丙辛之年辰巳，
>
>丁壬之年寅卯，
>
>戊癸之年子丑。

### 26. Rules for placing solemn, lucky（安天官天福貴人訣）   {#_26-安天官天福贵人诀}

>甲喜羊雞乙龍猴，丙年蛇鼠一窩謀。
>
>丁虎擒豬戊玉兔，己雞居然與虎儔。
>
>庚豬馬辛雞蛇走，壬犬馬癸馬蛇遊。

### 27. Rules for placing utopian（安天空訣）   {#_27-安天空诀}

>生年支順數的前一位就是。

### 28. Rules for placing upset, frail（安天哭天虛訣）   {#_28-安天哭天虚诀}

>天哭天虛起午宮，午宮起子兩分蹤，
>
>哭逆行兮虛順轉，數到生年便停留。

### 29. Rules for placing talented, refined（安龍池鳳閣訣）   {#_29-安龙池凤阁诀}

>龍池從辰宮起子，
>
>順至本生年支安之。
>
>鳳閣從戌宮起子，
>
>逆行至本生年支安之。

### 30. Rules for placing attractive, cheerful（安紅鸞天喜訣）   {#_30-安红鸾天喜诀}

>卯上起子逆數之，數到當生太歲支。
>
>坐守此宮紅鸞位，對宮天喜不差移。

### 31. Rules for placing alone, lonely（安孤辰寡宿訣）   {#_31-安孤辰寡宿诀}

>寅卯辰年安巳丑，巳午未年安申辰，
>
>申酉戌年安亥未，亥子丑年安寅戌。

### 32. Rules for placing instigated（安蜚廉訣）   {#_32-安蜚廉诀}

>子丑寅年在申酉戌，卯辰巳年在巳午未，
>
>午未申年在寅卯辰，酉戌亥年在亥子丑。

### 33. Rules for placing broken（安破碎訣）   {#_33-安破碎诀}

>子午卯酉年安巳宮，
>
>寅申巳亥年安酉宮，
>
>辰戌丑未年安丑宮。

### 34. Rules for placing religious（安華蓋訣）   {#_34-安华盖诀}

>子辰申年在辰，丑巳酉年在丑，
>
>寅午戌年在戌，卯未亥年在未。

### 35. Rules for placing passionate（安咸池訣）   {#_35-安咸池诀}

>子辰申年在酉，丑巳酉年在午，
>
>寅午戌年在卯，卯未亥年在子。

### 36. Rules for placing gifted, ageless（安天才天壽訣）   {#_36-安天才天寿诀}

>天才由命宮起子，順行至本生年支安之。
>
>天壽由身宮起子，順行至本生年支安之。

### 37. Rules for placing senior, dignified（安三台八座訣）   {#_37-安三台八座诀}

>由左輔之宮位起初一，順行至生日安三臺。
>
>由右弼之宮位起初一，逆行至生日安八座。

### 38. Rules for placing grateful, noble（安恩光天貴訣）   {#_38-安恩光天贵诀}

>由文昌之宮位起初一，
>
>順行至生日再退一步起恩光。
>
>由文曲之宮位起初一，
>
>順行至生日再退一步起天貴。

### 39. Rules for placing gourmet（安天廚訣）   {#_39-安天厨诀}

>甲丁食蛇口，乙戊辛馬方。
>
>丙從鼠口得，己食於猴房。
>
>庚食虎頭上，壬雞癸豬堂。

### 40. Rules for placing wounded, heaven（安天傷天使訣）   {#_40-安天伤天使诀}

>天傷在僕役宮，天使在疾厄宮。

### 41. Rules for placing the twelve growth-stage stars（安長生十二神）   {#_41-安长生十二神}

>水二局長生在申，
>
>木三局長生在亥，
>
>金四局長生在巳，
>
>土五局長生在申，
>
>火六局長生在寅 ，
>
>陽男陰女順行，
>
>陰男陽女逆行.
>
>安長生、沐浴、冠帶、臨官、帝旺、衰、病、死、墓、絕 、胎、養。

### 42. Rules for placing the twelve Doctor-cycle stars（安博士十二神）   {#_42-安博士十二神}

>從祿存起，
>
>陽男陰女順行，
>
>陰男陽女逆行。
>
>安博士、力士、青龍、小耗、將軍、奏書、飛廉、喜神、病符、大耗、伏兵、官府。

### 43. Rules for placing the twelve yearly Year-front stars（安流年歲前十二神）   {#_43-安流年岁前十二神}

>流年地支起歲建，歲前首先是晦氣，
>
>喪門貫索及官符，小耗大耗龍德繼，
>
>白虎天德連吊客，病符居後須當記。

### 44. Rules for placing the twelve yearly General-front stars（安流年將前十二神）   {#_44-安流年将前十二神}

>寅午戌年將星午，申子辰年子將星，
>
>巳酉丑將酉上駐，亥卯未將卯上停。
>
>攀鞍歲驛並息神，華蓋劫煞災煞輕，
>
>天煞指背咸池續，月煞亡神次第行。

:::tip Tips
Place `capable`（將星） using the annual earthly branch.
:::

### 45. Rules for determining the Zi Dipper direction（安子斗訣）   {#_45-安子斗诀}

The `first-month origin palace`（斗君）, also known by the Chinese name 子斗, marks the first lunar month in the monthly cycle. It is calculated from each person's birth month and double-hour, so it differs between people and changes each year.

>流年歲建起正月，逆逢生月順回程，
>
>回程順至生時止，便是流年正月春。

:::tip Tips

Use the birth `month` and `hour` to find the first lunar month’s palace, then arrange the monthly cycles `clockwise`. Monthly transformations vary by school: some use the `palace stem`（宮干） directly, while others derive a heavenly stem through `Five Tigers stem calculation`（五虎遁）.

:::

Explanation: start at the palace of the annual earthly branch, taking it as lunar month 1. Count backward to the birth month. In that palace start Zi hour（子時）, then count forward to the birth double-hour; place the first-month origin（斗君） there. Once its birth-year position is known, advance one palace for each subsequent year.

### 46. Rules for determining the daily horoscope（定流日）   {#_46-定流日}

>以流月所在的宮起初一，
>
>順行十二宮，一日一宮，
>
>到月底最後一天止。

### 47. Rules for determining the hourly horoscope（定流時）   {#_47-定流时}

>在流日所在的宮上起子時，順布十二宮，每一個時辰占一宮。

### 48. Rules for placing scholar(Y), artist(Y)（安流昌流曲訣）   {#_48-安流昌流曲诀}

>流昌起巳位，甲乙順流去，
>
>不用四墓宮，日月同年歲。
>
>流曲起酉位，甲乙逆行蹤，
>
>亦不用四墓，年日月相同。

:::warning Note
Only the `Zhongzhou school`（中州派） uses `artist(Y)`（流曲）; other schools do not.
:::

### 49. Other transit stars（其餘流曜）   {#_49-其余流曜}

>魁鉞祿羊陀四化加流馬和天盤一樣；
>
>運馬是以大限地支。
>
>流馬是以流年地支。

:::warning Note
Transit stars（流曜） are generally considered primarily for `decadal`（大限） and `yearly`（流年） cycles, with monthly, daily, and hourly transit stars used less often in traditional readings. Since v2.4.4, this library also provides transit stars for those three levels. To distinguish their names, `decadal`（大限） stars use a `decadal marker`, and `yearly`（流年） stars an `annual marker`. For example, decadal `horse`（天馬） is called `horse(D)`（運馬）, while `yearly`（流年） `horse`（天馬） is called `horse(Y)`（流馬）.
:::

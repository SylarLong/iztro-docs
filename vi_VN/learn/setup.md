---
outline: deep
description: "Tìm hiểu quy tắc an sao để lập lá số Tử Vi Đẩu Số, từ vị trí các cung đến cách an sao và tính vận hạn."
---

<script setup>
import Donate from '/components/donate.vue'
</script>

# Quy tắc an sao trong Tử Vi Đẩu Số（紫微斗數安星訣）   {#紫微斗数安星诀}

## Lời mở đầu   {#前言}

Quy tắc an sao là tập hợp các thuật toán dùng để tính dữ liệu Tử Vi Đẩu Số（紫微斗數）. Sách cổ trình bày chúng dưới dạng khẩu quyết dễ nhớ. Trước mắt tôi ghi lại các khẩu quyết, rồi sẽ bổ sung giải thích chi tiết. Tôi duy trì trang bằng thời gian rảnh của mình; nếu thấy hữu ích, mong bạn cân nhắc [ủng hộ trang](/vi_VN/about.md).

:::tip Mẹo
Chương này cần kiến thức nền. Nếu mới bắt đầu, nên học [Kiến thức cơ bản](./basis.md) trước khi đọc.
:::

<Donate />

## Quy tắc an sao（安星訣）   {#安星诀}

### 1. Quy tắc xác định thiên can của cung Dần（定寅首訣）   {#_1-定寅首诀}

>甲己年生起丙寅，
>
>乙庚年生起戊寅，
>
>丙辛年生起庚寅，
>
>丁壬年生起壬寅，
>
>戊癸年生起甲寅。 

### 2. Quy tắc an cung Mệnh và cung Thân（安命身宮訣）   {#_2-安命身宫诀}

>寅起正月，順數至生月，逆數生時為命宮。
>
>寅起正月，順數至生月，順數生時為身宮。

### 3. Quy tắc an mười hai cung（定十二宮訣）   {#_3-定十二宫诀}

>由命宮逆數：兄弟、夫妻、子女、財帛、疾厄、遷移、奴僕、事業、田宅、福德、父母。 

### 4. Quy tắc xác định đại hạn（起大限訣）   {#_4-起大限诀}

>大限由命宮起，
>
>陽男陰女順行；
>
>陰男陽女逆行，
>
>每十年過一宮限。

### 5. Quy tắc xác định tiểu hạn（起小限訣）   {#_5-起小限诀}

>小限一年一度逢，男順女逆不相同，
>
>寅午戌人辰上起，申子辰人自戌宮，
>
>巳酉丑人未宮始，亥卯未人起丑宮。

### 6. Quy tắc xác định Mệnh chủ（安命主訣）   {#_6-安命主诀}

>子屬貪狼丑亥門，
>
>寅戌生人屬祿存。
>
>卯酉屬文巳未武，
>
>辰申廉宿午破軍。

:::tip Mẹo
Theo mặc định, thư viện xác định Mệnh chủ（命主） từ địa chi của cung Mệnh（命宮）. Khi dùng thuật toán Trung Châu phái（中州派）, thư viện dùng địa chi năm sinh.
:::

### 7. Quy tắc xác định Thân chủ（安身主訣）   {#_7-安身主诀}

>子午安身鈴火宿，
>
>丑未天相寅申梁，
>
>卯酉天同身主是，
>
>巳亥天機辰戌昌。

:::tip Mẹo
Thân chủ（身主） được xác định theo địa chi năm sinh. Khẩu quyết có thể khác nhau giữa các tài liệu; thư viện đặt Thân chủ của cả năm Tý（子） và năm Ngọ（午） là Hỏa Tinh（火星）.
:::

### 8. Quy tắc an Tử Vi（起紫微星訣）   {#_8-起紫微星诀}

>六五四三二，酉午亥辰丑，
>
>局數除日數，商數宮前走；
>
>若見數無餘，便要起虎口，
>
>日數小於局，還直宮中守。

### 9. Quy tắc an Thiên Phủ（安天府星訣）   {#_9-安天府星诀}

>天府南斗令，常對紫微宮，
>
>丑卯相更迭，未酉互為根。
>
>往來午與戌，蹀躞子和辰，
>
>巳亥交馳騁，同位在寅申。

:::tip Mẹo
Định theo vị trí Tử Vi（紫微）.
:::

### 10. Quy tắc an nhóm sao Tử Vi（安紫微諸星訣）   {#_10-安紫微诸星诀}

>紫微逆去天機星，
>
>隔一太陽武曲辰，
>
>連接天同空二宮，
>
>廉貞居處方是真。

### 11. Quy tắc an nhóm sao Thiên Phủ（安天府諸星訣）   {#_11-安天府诸星诀}

>天府順行有太陰，
>
>貪狼而後巨門臨，
>
>隨來天相天梁繼，
>
>七殺空三是破軍。

### 12. Quy tắc xác định cục ngũ hành（定五行局訣）   {#_12-定五行局诀}

>甲乙丙丁一到五，子丑午未一來數，
>
>寅卯申酉二上走，辰巳戌亥三為足。
>
>干支相加多減五，五行木金水火土。

Lưu ý:

1. Số ngũ hành（五行取數）: Mộc 1, Kim 2, Thủy 3, Hỏa 4, Thổ 5.

   - Số thiên can（天干取數）:
      - Giáp, Ất（甲乙） → 1
      - Bính, Đinh（丙丁） → 2
      - Mậu, Kỷ（戊己） → 3
      - Canh, Tân（庚辛） → 4
      - Nhâm, Quý（壬癸） → 5

   - Số địa chi（地支取數）:
      - Tý, Ngọ, Sửu, Mùi（子午丑未） → 1
      - Dần, Thân, Mão, Dậu（寅申卯酉） → 2
      - Thìn, Tuất, Tỵ, Hợi（辰戌巳亥） → 3


2. Phương pháp tính toán:

    Cộng số thiên can và địa chi. Tổng vượt 5 thì trừ 5. Kết quả 1, 2, 3, 4, 5 tương ứng Mộc, Kim, Thủy, Hỏa, Thổ.

3. Ví dụ:

     - Bính（丙） + Tý（子）: 2+1=3 → Thủy（水） → Thủy Nhị Cục（水二局）
     - Tân Mùi（辛未）: 4+1=5 → Thổ（土） → Thổ Ngũ Cục（土五局）.
     - Canh（庚） + Thân（申）: 4+2=6 → 6−5=1 → Mộc（木） → Mộc Tam Cục（木三局）

### 13. Quy tắc an Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Địa Không, Địa Kiếp（安輔弼、昌曲、空劫訣）   {#_13-安辅弼、昌曲、空劫诀}

>辰上順正尋左輔，戌上逆正右弼當，
>
>辰上順時文曲位，戌上逆時覓文昌，
>
>亥上子時順安劫，逆回便是地空亡。


### 14. Quy tắc an Thiên Khôi, Thiên Việt（安魁鉞訣）   {#_14-安魁钺诀}

>甲戊庚之年丑未，
>
>乙己之年子申，
>
>辛年午寅，
>
>壬癸之年卯巳，
>
>丙丁之年亥酉。

### 15. Quy tắc an Lộc Tồn, Kình Dương, Đà La（定祿存、羊、陀訣）   {#_15-定禄存、羊、陀诀}

>甲祿到寅宮，乙祿居卯府。
>
>丙戊祿在巳，丁己祿在午。
>
>庚祿定居申，辛祿酉上補。
>
>壬祿亥中藏，癸祿居子戶。
>
>祿前羊刃當，祿後陀羅府。

### 16. Quy tắc an Thiên Mã（安天馬訣）   {#_16-安天马诀}

>寅午戌年馬在申，申子辰年馬在寅。
>
>巳酉丑年馬在亥，亥卯未年馬在巳。

:::tip Mẹo
Dựa theo địa chi（地支） năm sinh.
:::

### 17. Quy tắc an Hỏa Tinh, Linh Tinh（安火鈴訣）   {#_17-安火铃诀}

>申子辰人寅戌揚，寅午戌人丑卯方。
>
>巳酉丑人卯戌位，亥卯未人酉戌房。

:::tip Mẹo
Để an Hỏa Tinh（火星） và Linh Tinh（鈴星）, trước hết hãy dùng địa chi năm sinh để xác định cung bắt đầu đếm từ giờ Tý theo khẩu quyết.
:::

Ví dụ sinh năm Nhâm Thìn（壬辰）, giờ Mão（卯時）: theo `申子辰人寅戌揚`, Hỏa Tinh（火星） khởi giờ Tý（子時） tại Dần（寅）, Linh Tinh（鈴星） tại Tuất（戌）. Đếm thuận đến Mão, Hỏa Tinh ở Tỵ（巳）, Linh Tinh ở Sửu（丑）.

### 18. Quy tắc an sao tứ hóa（安四化星訣）   {#_18-安四化星诀}

>甲廉破武陽，乙機梁紫陰，
>
>丙同機昌廉，丁陰同機巨，
>
>戊貪陰右機。己武貪梁曲，
>
>庚陽武陰同，辛巨陽曲昌，
>
>壬梁紫左武，癸破巨陰貪。

:::tip Mẹo
Cách an tứ hóa（四化） khác theo phái; trên là của Nam phái.
:::

### 19. Quy tắc an Đài Phụ, Phong Cáo（安台輔封誥訣）   {#_19-安台辅封诰诀}

>臺輔午起子順到時，封誥寅宮起子逆到時。

### 20. Quy tắc an Thiên Hình, Thiên Diêu（安天刑天姚訣）   {#_20-安天刑天姚诀}

>天刑從酉起正月，順至生月便安之。
>
>天姚丑宮起正月，順到生月即停留。

### 21. Quy tắc an Giải Thần（安解神訣）   {#_21-安解神诀}

- Nguyệt Giải（月解）

  Nguyệt Giải（月解） an theo tháng sinh.

  >正二在申三四在戌，
  >
  >五六在子七八在寅。
  >
  >九十月坐於辰宮，
  >
  >十一十二在午宮。

- Niên Giải（年解）

  Niên Giải（年解） là Giải Thần（解神） của lưu niên, thuộc `lưu diệu`（流曜）, mỗi năm đổi vị trí.

  >解神從戌上起子，逆數至當生年太歲上是也

### 22. Quy tắc an Thiên Vu（安天巫訣）   {#_22-安天巫诀}

>正五九月在巳，二六十月在申，
>
>三七十一在寅，四八十二在亥。

### 23. Quy tắc an Thiên Nguyệt（安天月訣）   {#_23-安天月诀}

>一犬二蛇三在龍，四虎五羊六兔宮。
>
>七豬八羊九在虎，十馬冬犬臘寅中。

### 24. Quy tắc an Âm Sát（安陰煞訣）   {#_24-安阴煞诀}

>正七月在寅，二八月在子，
>
>三九月在戌，四十月在申，
>
>五十一在午，六十二在辰。

### 25. Quy tắc an Triệt Không（安截路空亡訣）   {#_25-安截路空亡诀}

>甲己之年申酉，
>
>乙庚之年午未，
>
>丙辛之年辰巳，
>
>丁壬之年寅卯，
>
>戊癸之年子丑。

### 26. Quy tắc an Thiên Quan, Thiên Phúc（安天官天福貴人訣）   {#_26-安天官天福贵人诀}

>甲喜羊雞乙龍猴，丙年蛇鼠一窩謀。
>
>丁虎擒豬戊玉兔，己雞居然與虎儔。
>
>庚豬馬辛雞蛇走，壬犬馬癸馬蛇遊。

### 27. Quy tắc an Thiên Không（安天空訣）   {#_27-安天空诀}

>生年支順數的前一位就是。

### 28. Quy tắc an Thiên Khốc, Thiên Hư（安天哭天虛訣）   {#_28-安天哭天虚诀}

>天哭天虛起午宮，午宮起子兩分蹤，
>
>哭逆行兮虛順轉，數到生年便停留。

### 29. Quy tắc an Long Trì, Phụng Các（安龍池鳳閣訣）   {#_29-安龙池凤阁诀}

>龍池從辰宮起子，
>
>順至本生年支安之。
>
>鳳閣從戌宮起子，
>
>逆行至本生年支安之。

### 30. Quy tắc an Hồng Loan, Thiên Hỷ（安紅鸞天喜訣）   {#_30-安红鸾天喜诀}

>卯上起子逆數之，數到當生太歲支。
>
>坐守此宮紅鸞位，對宮天喜不差移。

### 31. Quy tắc an Cô Thần, Quả Tú（安孤辰寡宿訣）   {#_31-安孤辰寡宿诀}

>寅卯辰年安巳丑，巳午未年安申辰，
>
>申酉戌年安亥未，亥子丑年安寅戌。

### 32. Quy tắc an Phi Liêm（安蜚廉訣）   {#_32-安蜚廉诀}

>子丑寅年在申酉戌，卯辰巳年在巳午未，
>
>午未申年在寅卯辰，酉戌亥年在亥子丑。

### 33. Quy tắc an Phá Toái（安破碎訣）   {#_33-安破碎诀}

>子午卯酉年安巳宮，
>
>寅申巳亥年安酉宮，
>
>辰戌丑未年安丑宮。

### 34. Quy tắc an Hoa Cái（安華蓋訣）   {#_34-安华盖诀}

>子辰申年在辰，丑巳酉年在丑，
>
>寅午戌年在戌，卯未亥年在未。

### 35. Quy tắc an Hàm Trì（安咸池訣）   {#_35-安咸池诀}

>子辰申年在酉，丑巳酉年在午，
>
>寅午戌年在卯，卯未亥年在子。

### 36. Quy tắc an Thiên Tài, Thiên Thọ（安天才天壽訣）   {#_36-安天才天寿诀}

>天才由命宮起子，順行至本生年支安之。
>
>天壽由身宮起子，順行至本生年支安之。

### 37. Quy tắc an Tam Thai, Bát Tọa（安三台八座訣）   {#_37-安三台八座诀}

>由左輔之宮位起初一，順行至生日安三臺。
>
>由右弼之宮位起初一，逆行至生日安八座。

### 38. Quy tắc an Ân Quang, Thiên Quý（安恩光天貴訣）   {#_38-安恩光天贵诀}

>由文昌之宮位起初一，
>
>順行至生日再退一步起恩光。
>
>由文曲之宮位起初一，
>
>順行至生日再退一步起天貴。

### 39. Quy tắc an Thiên Trù（安天廚訣）   {#_39-安天厨诀}

>甲丁食蛇口，乙戊辛馬方。
>
>丙從鼠口得，己食於猴房。
>
>庚食虎頭上，壬雞癸豬堂。

### 40. Quy tắc an Thiên Thương, Thiên Sứ（安天傷天使訣）   {#_40-安天伤天使诀}

>天傷在僕役宮，天使在疾厄宮。

### 41. Quy tắc an mười hai sao vòng Tràng Sinh（安長生十二神）   {#_41-安长生十二神}

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

### 42. Quy tắc an mười hai sao vòng Bác Sĩ（安博士十二神）   {#_42-安博士十二神}

>從祿存起，
>
>陽男陰女順行，
>
>陰男陽女逆行。
>
>安博士、力士、青龍、小耗、將軍、奏書、飛廉、喜神、病符、大耗、伏兵、官府。

### 43. Quy tắc an mười hai sao Tuế Tiền của lưu niên（安流年歲前十二神）   {#_43-安流年岁前十二神}

>流年地支起歲建，歲前首先是晦氣，
>
>喪門貫索及官符，小耗大耗龍德繼，
>
>白虎天德連吊客，病符居後須當記。

### 44. Quy tắc an mười hai sao Tướng Tiền của lưu niên（安流年將前十二神）   {#_44-安流年将前十二神}

>寅午戌年將星午，申子辰年子將星，
>
>巳酉丑將酉上駐，亥卯未將卯上停。
>
>攀鞍歲驛並息神，華蓋劫煞災煞輕，
>
>天煞指背咸池續，月煞亡神次第行。

:::tip Mẹo
An `Tướng Tinh`（將星） theo địa chi lưu niên.
:::

### 45. Quy tắc xác định Tý Đẩu（安子斗訣）   {#_45-安子斗诀}

Tử Đẩu（子斗）, còn gọi là `Đẩu Quân`（斗君）, là cung khởi tháng Giêng của lưu nguyệt. Nó được tính từ tháng và giờ sinh của từng người, nên khác nhau giữa các cá nhân và thay đổi theo từng năm.

>流年歲建起正月，逆逢生月順回程，
>
>回程順至生時止，便是流年正月春。

:::tip Mẹo

Dùng `tháng` và `giờ` sinh để tìm cung tháng Giêng, rồi an lưu nguyệt `theo chiều kim đồng hồ`. Tứ hóa lưu nguyệt khác theo phái: có phái dùng trực tiếp `can của cung`（宮干）, có phái theo `Ngũ Hổ Độn`（五虎遁） tìm thiên can.

:::

Giải thích: lấy cung chi lưu niên làm tháng Giêng, đếm nghịch tới tháng sinh. Tại đó khởi giờ Tý（子時）, đếm thuận tới giờ sinh, an Đẩu Quân（斗君）. Biết vị trí Đẩu Quân năm sinh thì năm sau tiến mỗi năm một cung.

### 46. Quy tắc xác định lưu nhật（定流日）   {#_46-定流日}

>以流月所在的宮起初一，
>
>順行十二宮，一日一宮，
>
>到月底最後一天止。

### 47. Quy tắc xác định lưu thời（定流時）   {#_47-定流时}

>在流日所在的宮上起子時，順布十二宮，每一個時辰占一宮。

### 48. Quy tắc an Lưu Xương, Lưu Khúc（安流昌流曲訣）   {#_48-安流昌流曲诀}

>流昌起巳位，甲乙順流去，
>
>不用四墓宮，日月同年歲。
>
>流曲起酉位，甲乙逆行蹤，
>
>亦不用四墓，年日月相同。

:::warning Lưu ý
Ngoài `phái Trung Châu`（中州派）, các phái khác không dùng `Lưu Khúc`（流曲）.
:::

### 49. Các lưu diệu còn lại（其餘流曜）   {#_49-其余流曜}

>魁鉞祿羊陀四化加流馬和天盤一樣；
>
>運馬是以大限地支。
>
>流馬是以流年地支。

:::warning Lưu ý
Lưu diệu（流曜） thường chỉ xét `Đại Hạn`（大限） và `Lưu Niên`（流年）, ít xét lưu nguyệt, lưu nhật, lưu thời. Tuy nhiên, từ v2.4.4, thư viện cũng cung cấp lưu diệu ở cả ba cấp lưu nguyệt, lưu nhật và lưu thời. Để phân biệt tên, sao `Đại Hạn`（大限） dùng `tiền tố đại hạn`; sao `Lưu Niên`（流年） dùng `tiền tố lưu niên`. Ví dụ `Thiên Mã`（天馬） của đại hạn là `Vận Mã`（運馬）; trong `Lưu Niên`（流年）, `Thiên Mã`（天馬） gọi là `Lưu Mã`（流馬）.
:::

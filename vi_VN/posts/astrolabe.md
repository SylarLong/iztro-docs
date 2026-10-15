---
outline: deep
description: "Tạo và truy vấn lá số Tử Vi Đẩu Số bằng iztro: API astro, thuộc tính, phương thức và mã ví dụ."
---

# Lá số（星盤）   {#星盘}

## Lời mở đầu   {#前言}

Lá số Tử Vi Đẩu Số（紫微斗數）, còn gọi là mệnh bàn（命盤）, gồm `mười hai cung` và `Trung cung`. `địa chi`（地支） của mỗi cung là cố định; thứ tự bắt đầu từ `Dần`（寅）, không phải `Tý`（子）, vì tháng Giêng âm lịch ứng với tháng Dần（寅）, theo quy ước `tháng Giêng âm lịch ứng với Dần`（正月建寅）. Trong `iztro`, `cung Dần`（寅宮） có chỉ số `0`, `cung Mão`（卯宮） có chỉ số `1`, rồi tiếp tục theo chiều kim đồng hồ, như bảng dưới đây:

<table class="astrolabe">
    <tr>
        <td>Tỵ（巳）<code>3</code></td>
        <td>Ngọ（午）<code>4</code></td>
        <td>Mùi（未）<code>5</code></td>
        <td>Thân（申）<code>6</code></td>
    </tr>
    <tr>
        <td>Thìn（辰）<code>2</code></td>
        <td class="center-palace" rowspan="2" colspan="2">Trung cung</td>
        <td>Dậu（酉）<code>7</code></td>
    </tr>
    <tr>
        <td>Mão（卯）<code>1</code></td>
        <td>Tuất（戌）<code>8</code></td>
    </tr>
    <tr>
        <td>Dần（寅）<code>0</code></td>
        <td>Sửu（丑）<code>11</code></td>
        <td>Tý（子）<code>10</code></td>
        <td>Hợi（亥）<code>9</code></td>
    </tr>
</table>

`Trung cung` có thể hiển thị thông tin tùy ý và thường không ảnh hưởng đến cách luận toàn lá số. `mười hai cung`（十二宮） xung quanh chứa sao（星曜）, tứ hóa（四化）, vận hạn（運限）, tên cung và dữ liệu khác. Chi tiết về `cung`（宮位） nằm ở [phần cung](./palace.md); trang này tập trung vào lá số. Lá số gồm cung và sao. Nếu chưa quen các khái niệm ấy, hãy bắt đầu từ [kiến thức cơ bản](/vi_VN/learn/basis.md).

Sau khi cài `iztro`, dùng mã dưới đây để nhập đối tượng `lá số (astro)`. Về cách cài `iztro`, xem [hướng dẫn cài đặt](/vi_VN/quick-start.md#安装).

## Các phương thức tĩnh của `astro` {#astro-的静态方法}

Trước khi gọi phương thức tĩnh, hãy dùng `import` để nhập đối tượng vào mã.

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";
```

== CommonJS

```js
var { astro } = require("iztro");
```

:::

---

### Cấu hình lập lá số và kiểm tra đầu vào <Badge type="warning" text="^2.6.2" /> {#排盘配置与输入校验}

Lá số do `bySolar`, `byLunar` và `withOptions` trả về giữ cấu hình, ngôn ngữ lúc tạo. Đổi mặc định toàn cục hay tạo lá số bằng ngôn ngữ khác không làm thay đổi phân tích vận hạn（運限） và tứ hóa（四化） của lá số hiện có.

Trong `withOptions`, `type` có thể bỏ qua và mặc định là dương lịch; `config` chỉ ghi đè cấu hình cho lá số đó. Phương thức tạo lá số và hỗ trợ ngày mặc định `language` là `zh-CN` nếu bỏ qua; chọn ngôn ngữ không ảnh hưởng các lần gọi khác. Hỗ trợ `zh-CN`, `zh-TW`, `en-US`, `ja-JP`, `ko-KR` và `vi-VN`.

Năm phải từ 1 đến 9999, và ngày phải thật sự tồn tại trong dương lịch hoặc âm lịch. Chuỗi ngày nhận dấu gạch ngang, gạch chéo, chấm và có thể thêm ` HH:mm` hoặc ` HH:mm:ss`. Ngày dương lịch trong quá khứ theo quy tắc chuyển Julian/Gregorian của thư viện lịch nền. Chỉ số giờ phải là số nguyên 0–12. Giới tính, ngôn ngữ, loại ngày, loại lá số không được hỗ trợ hoặc tùy chọn tháng nhuận không phải giá trị luận lý đều gây lỗi. Ngày âm lịch được kiểm tra theo số ngày thực của tháng; `isLeapMonth: true` bị bỏ qua nếu tháng ấy không có tháng nhuận tương ứng.

Về phạm vi cấu hình, bản sao độc lập do `getConfig()` trả về và `resetConfig()`, xem [Cấu hình và plugin](./config-n-plugin.md).

### astrolabeBySolarDate <Badge type="danger" text="deprecated" /> {#astrolabebysolardate}

Phương thức này không còn được khuyến nghị từ `v2.0.5`. Hãy dùng [`bySolar`](#bysolar); tham số và giá trị trả về không đổi.

### bySolar <Badge type="warning" text="^2.0.5" /> {#bysolar}

- Mục đích

  Tạo lá số từ ngày dương lịch.

- Định nghĩa

  ```ts
  export type bySolar = (
    solarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    fixLeap: boolean = true,
    language: Language = "zh-CN"
  ) => FunctionalAstrolabe;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Ngày Gregorian \[YYYY-M-D\] |
  | timeIndex | `number` | `true` | - | Chỉ số giờ sinh [0–12], từ giờ Tý sớm (0) đến giờ Tý muộn (12) |
  | gender | [`GenderName`](/vi_VN/type-definition.md#gendername) | `true` | - | Giới tính\[Nam/Nữ\] |
  | fixLeap | `boolean` | `false` | `true` | Có điều chỉnh tháng nhuận hay không. Nếu là `true`, nửa đầu tháng nhuận được tính vào tháng trước, nửa sau vào tháng tiếp theo. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Giá trị trả về

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- Ví dụ

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
  ```

---

### astrolabeByLunarDate <Badge type="danger" text="deprecated" /> {#astrolabebylunardate}

Phương thức này không còn được khuyến nghị từ `v2.0.5`. Hãy dùng [`byLunar`](#bylunar); tham số và giá trị trả về không đổi.

### byLunar <Badge type="warning" text="^2.0.5" /> {#bylunar}

- Mục đích

  Tạo lá số từ ngày âm lịch. Tác giả khuyên dùng trực tiếp `bySolar`, vì phương thức này cũng chuyển ngày âm lịch sang dương lịch rồi gọi `bySolar` để lấy kết quả.

- Định nghĩa

  ```ts
  export type byLunar = (
    lunarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language
  ) => FunctionalAstrolabe;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Ngày âm lịch [YYYY-M-D]. Với `năm 2000 âm lịch, tháng 7, ngày 17`, truyền `2000-7-17`. |
  | timeIndex | `number` | `true` | - | Chỉ số giờ sinh [0–12], từ giờ Tý sớm (0) đến giờ Tý muộn (12) |
  | gender | [`GenderName`](/vi_VN/type-definition.md#gendername) | `true` | - | Giới tính\[Nam/Nữ\] |
  | isLeapMonth | `boolean` | `false` | `false` | Tháng âm lịch được nhập có phải tháng nhuận hay không; tham số không có tác dụng nếu tháng đó không có tháng nhuận tương ứng. |
  | fixLeap | `boolean` | `false` | `true` | Có điều chỉnh tháng nhuận hay không. Nếu là `true`, nửa đầu tháng nhuận được tính vào tháng trước, nửa sau vào tháng tiếp theo. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Giá trị trả về

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- Ví dụ

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.byLunar("2000-8-16", 2, "女", false, true, "zh-CN");
  ```

---

### withOptions <Badge type="warning" text="^2.4.1" /> {#withoptions}

- Mục đích

  Tạo dữ liệu lá số bằng phương thức bao ngoài `bySolar` và `byLunar`, giúp gọi thuận tiện hơn.

- Định nghĩa

  ```ts
  type Option = {
    type?: 'solar' | 'lunar';
    dateStr: string;
    timeIndex: number;
    gender: GenderName;
    isLeapMonth?: boolean;
    fixLeap?: boolean;
    language?: Language;
    config?: Config;
    astroType?: AstroType;
  };

  export type withOptions = (
    option: Option
  ) => FunctionalAstrolabe;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | type | `solar`  \|  `lunar` | `false` | `solar` | loại ngày |
  | dateStr | `string` | `true` | - | Ngày sinh ở định dạng YYYY-M-D |
  | timeIndex | `number` | `true` | - | Chỉ số giờ sinh [0–12], từ giờ Tý sớm (0) đến giờ Tý muộn (12) |
  | gender | [`GenderName`](/vi_VN/type-definition.md#gendername) | `true` | - | Giới tính\[Nam/Nữ\] |
  | isLeapMonth | `boolean` | `false` | `false` | Tháng âm lịch được nhập có phải tháng nhuận hay không; tham số không có tác dụng nếu tháng đó không có tháng nhuận tương ứng. |
  | fixLeap | `boolean` | `false` | `true` | Có điều chỉnh tháng nhuận hay không. Nếu là `true`, nửa đầu tháng nhuận được tính vào tháng trước, nửa sau vào tháng tiếp theo. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |
  | config | [`Config`](../type-definition.md#config) | `false` | - | Chỉ ghi đè cấu hình độ sáng, tứ hóa và mốc phân chia thời gian cho lá số đang được tạo (^2.6.2). |
  | astroType  <Badge type="warning" text="^2.5.0" /> | [`AstroType`](../type-definition.md#astrotype) | `false` | `heaven` | Loại lá số. Chỉ dùng để chọn thiên bàn, địa bàn hoặc nhân bàn khi `config.algorithm` là `zhongzhou`. |

- Giá trị trả về

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- Ví dụ

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.withOptions({
      type: 'solar',
      dateStr: '1999-12-29',
      timeIndex: 2,
      gender: 'female',
      isLeapMonth: false,
      fixLeap: true,
      language: 'zh-CN',
      config: { algorithm: 'zhongzhou' },
      astroType: 'earth'
    })
  ```

  :::tip Mẹo
  `astroType` nhận `heaven`, `earth` hoặc `human`. Mặc định `heaven` là Thiên Bàn（天盤）. `earth` lấy cung Thân（身宮） làm Mệnh（命宮）, còn `human` lấy Phúc Đức（福德宮） làm Mệnh. Xem [`AstroType`](../type-definition.md#astrotype).
  :::

---

### getMajorStarBySolarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbysolardate}

- Mục đích

  Lấy chính tinh（主星） ở Mệnh（命宮） từ ngày dương lịch.

- Định nghĩa

  ```ts
  type getMajorStarBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    fixLeap: boolean = true,
    language?: Language,
  ) => string;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Ngày Gregorian \[YYYY-M-D\] |
  | timeIndex | `number` | `true` | - | Chỉ số giờ sinh [0–12], từ giờ Tý sớm (0) đến giờ Tý muộn (12) |
  | fixLeap | `boolean` | `false` | `true` | Có điều chỉnh tháng nhuận hay không. Nếu là `true`, nửa đầu tháng nhuận được tính vào tháng trước, nửa sau vào tháng tiếp theo. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Ví dụ

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarBySolarDate('2023-4-7', 0);
  ```

---

### getMajorStarByLunarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbylunardate}

- Mục đích

  Lấy chính tinh（主星） ở Mệnh（命宮） từ ngày âm lịch.

- Định nghĩa

  ```ts
  type getMajorStarByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language,
  ) =>
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Ngày âm lịch [YYYY-M-D]. Với `năm 2000 âm lịch, tháng 7, ngày 17`, truyền `2000-7-17`. |
  | timeIndex | `number` | `true` | - | Chỉ số giờ sinh [0–12], từ giờ Tý sớm (0) đến giờ Tý muộn (12) |
  | isLeapMonth | `boolean` | `false` | `false` | Tháng âm lịch được nhập có phải tháng nhuận hay không; tham số không có tác dụng nếu tháng đó không có tháng nhuận tương ứng. |
  | fixLeap | `boolean` | `false` | `true` | Có điều chỉnh tháng nhuận hay không. Nếu là `true`, nửa đầu tháng nhuận được tính vào tháng trước, nửa sau vào tháng tiếp theo. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Ví dụ

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarByLunarDate('2023-2-17', 0, true, false);
  ```

---

### getSignBySolarDate <Badge type="warning" text="^1.2.1" /> {#getsignbysolardate}

- Mục đích

  Lấy cung hoàng đạo từ ngày dương lịch.

- Định nghĩa

  ```ts
  type getSignBySolarDate = (
    solarDateStr: string,
    language?: Language
  ) => string;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Ngày Gregorian \[YYYY-M-D\] |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Ví dụ

  ```ts
  import { astro } from 'isztro';

  const result = getSignBySolarDate('2023-9-5');
  ```

---

### getSignByLunarDate <Badge type="warning" text="^1.2.1" /> {#getsignbylunardate}

- Mục đích

  Lấy cung hoàng đạo từ ngày âm lịch.

- Định nghĩa

  ```ts
  type getSignByLunarDate = (
    lunarDateStr: string,
    isLeapMonth?: boolean,
    language?: Language
  ) => string;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | Ngày âm lịch [YYYY-M-D]. Với `năm 2000 âm lịch, tháng 7, ngày 17`, truyền `2000-7-17`. |
  | isLeapMonth | `boolean` | `false` | `false` | Tháng âm lịch được nhập có phải tháng nhuận hay không; tham số không có tác dụng nếu tháng đó không có tháng nhuận tương ứng. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Ví dụ

  ```ts
  import { astro } from 'isztro';

  const result = getSignByLunarDate('2023-7-21');
  ```


---

### getZodiacBySolarDate <Badge type="warning" text="^1.2.1" /> {#getzodiacbysolardate}

- Mục đích

  Lấy con giáp từ ngày dương lịch.

- Định nghĩa

  ```ts
  type getZodiacBySolarDate = (solarDateStr: string, language?: Language) => string;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | Ngày Gregorian \[YYYY-M-D\] |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Ví dụ

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacBySolarDate('2023-2-20');
  ```

---

### getZodiacByLunarYear <Badge type="warning" text="^1.2.1" /> {#getzodiacbylunaryear}

- Mục đích

  Lấy con giáp theo năm âm lịch.

- Định nghĩa

  ```ts
  type getZodiacByLunarYear = (year: number, language?: Language) => string;
  ```

- Tham số

  | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
  | --- | --- | --- | --- | --- |
  | year | `number` | `true` | - | năm âm lịch |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

- Ví dụ

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacByLunarYear(2023);
  ```

---

## Lớp và phương thức phân tích {#功能类定义}

::: warning Đề xuất phát triển
Nên dùng [phương thức tĩnh của astro](./astrolabe.md#astro-的静态方法) để lấy dữ liệu thay vì tự tạo `FunctionalAstrolabe`.
:::

### FunctionalAstrolabe {#functionalastrolabe}

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

Lớp này kế thừa thuộc tính từ [Astrolabe](../type-definition.md#astrolabe) và thêm phương thức phân tích lá số. [`bySolar()`](./astrolabe.md#bysolar), [`byLunar()`](./astrolabe.md#bylunar) trả về thể hiện của lớp này.

- Định nghĩa giao diện

  ```ts
  interface IFunctionalAstrolabe extends Astrolabe {
    toJSON: () => Astrolabe;
    use(plugin: Plugin): void;
    horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;
    decadalList: () => DecadalHoroscope[];
    yearlyList: (indexOrName: number | PalaceName) => YearlyHoroscope[];
    monthlyList: (year: number, fixLeap?: boolean) => MonthlyHoroscope[];
    palace: (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;
    surroundedPalaces: (indexOrName: number | PalaceName) => SurroundedPalaces;
    isSurrounded: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    isSurroundedOneOf: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    notSurrounded: (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    hasMutagenInSurroundedPalace: (
      indexOrName: number | PalaceName,
      mutagen: Mutagen
    ) => boolean;
    hasMutagenInOppositePalace: (
      indexOrName: number | PalaceName,
      mutagen: Mutagen
    ) => boolean;
  }
  ```

- Thuộc tính

  Tham khảo [Astrolabe](../type-definition.md#astrolabe)

- Phương thức

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Mục đích

    Chuyển lá số có chức năng phân tích thành đối tượng JSON thông thường. Không chứa phương thức phân tích, hàm plugin hay tham chiếu lúc chạy; tham chiếu vòng được bỏ qua an toàn.

  - Định nghĩa

    ```ts
    type toJSON = () => Astrolabe;
    ```

  - Tham số

    Không có

  - Giá trị trả về

    [`Astrolabe`](../type-definition.md#astrolabe)

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.toJSON();
    ```

  ***

  ### use() <Badge type="warning" text="^2.3.0" /> {#use}

  - Mục đích

    Áp dụng plugin cho thể hiện lá số hiện tại. Khác [`astro.loadPlugin()`](./config-n-plugin.md#插件), `use()` chỉ ảnh hưởng thể hiện này.

  - Định nghĩa

    ```ts
    type use = (plugin: Plugin) => void;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | plugin | [`Plugin`](../type-definition.md#plugin) | `true` | - | Hàm trình cắm áp dụng cho lá số hiện tại |

  - Giá trị trả về

    `void`

  - Ví dụ

    ```ts
    import { astro, FunctionalAstrolabe } from "iztro";

    interface IAstrolabe extends FunctionalAstrolabe {
      soulPalaceName: () => string;
    }

    function soulPalacePlugin(this: IAstrolabe) {
      this.soulPalaceName = () => this.palace("命宫")?.name ?? "";
    }

    const astrolabe = astro.bySolar<IAstrolabe>("2000-8-16", 2, "女");
    astrolabe.use(soulPalacePlugin);
    const name = astrolabe.soulPalaceName();
    ```

  ***

  ### horoscope() <Badge type="warning" text="^0.2.0" /> {#horoscope}

  - Mục đích

    Lấy dữ liệu vận hạn（運限）. Để tính cho thời điểm hiện tại, có thể bỏ tất cả đối số; phương thức dùng giờ hệ thống lúc gọi.

    :::warning Lưu ý

    - Nếu `date` là chuỗi chỉ có ngày theo dạng `YYYY-M-D` và bỏ `timeIndex`, thì trên ngày `date`, lấy thời điểm `giờ Tý sớm` làm giờ của `Lưu Thì`（流時）.
    - Nếu `date` có giờ theo dạng `YYYY-M-D HH` hoặc là thể hiện `Date`, và bỏ `timeIndex`, giờ trong `date` được chuyển thành khung giờ truyền thống để tính `Lưu Thì`（流時）.
    - Nếu được truyền, `timeIndex` được ưu tiên hơn giờ suy ra từ ngày.
      :::

  - Định nghĩa

    ```ts
    type horoscope = (date?: string | Date, timeIndex?: number) => FunctionalHoroscope;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | date | `string`  \|  `Date` | `false` | `new Date()` | Ngày Gregorian \[YYYY-M-D\] |
    | timeIndex | `number` | `false` | `0` | Chỉ số giờ truyền thống [0–12] |

  - Giá trị trả về

    [`FunctionalHoroscope`](./horoscope.md#functionalhoroscope)

    :::danger Lưu ý
    Từ `v1.3.4`, kiểu trả về đổi từ `Horoscope` sang `FunctionalHoroscope`, nhưng cách dùng hiện có vẫn tương thích ngược.
    :::

  - Ví dụ

    :::tabs
    == Không có tham số nào được truyền

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope();
    ```

    == Truyền vào chuỗi ngày

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate(
      "2000-8-16",
      2,
      "女",
      true,
      "zh-CN"
    );
    const horoscope = astrolabe.horoscope("2023-8-31");
    ```

    == Truyền vào đối tượng Ngày

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392));
    ```

    == Truyền ngày và giờ Index

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392), 3);
    ```

    :::

  ***

  ### decadalList() <Badge type="warning" text="^2.6.0" /> {#decadallist}

  - Mục đích

    Lấy danh sách đại hạn（大限） theo thứ tự bắt đầu. Chỉ số `0` là đại hạn đầu tiên. Mỗi mục có cung tương ứng, tuổi mụ và năm bắt đầu–kết thúc, can chi, tứ hóa（四化）, lưu diệu（流曜） và mười hai cung của đại hạn.

  - Định nghĩa

    ```ts
    type decadalList = () => DecadalHoroscope[];
    ```

  - Giá trị trả về

    [`DecadalHoroscope[]`](../type-definition.md#decadalhoroscope)

  - Ví dụ

    ```ts
    const decadals = astrolabe.decadalList();
    const firstDecadal = decadals[0];
    ```

  ***

  ### yearlyList() <Badge type="warning" text="^2.6.0" /> {#yearlylist}

  - Mục đích

    Lấy danh sách lưu niên（流年） trong đại hạn（大限） được chọn bằng chỉ số hoặc tên cung bản mệnh. Mỗi mục có tuổi mụ, năm, can chi lưu niên, tứ hóa（四化）, lưu diệu（流曜） và mười hai cung lưu niên.

  - Định nghĩa

    ```ts
    type yearlyList = (
      indexOrName: number | PalaceName
    ) => YearlyHoroscope[];
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số đại hạn (`0` là đại hạn đầu tiên), hoặc tên cung trên lá số bản mệnh |

  - Giá trị trả về

    [`YearlyHoroscope[]`](../type-definition.md#yearlyhoroscope)

  - Ví dụ

    ```ts
    const firstDecadalYearlies = astrolabe.yearlyList(0);
    const soulPalaceYearlies = astrolabe.yearlyList("命宫");
    ```

  ***

  ### monthlyList() <Badge type="warning" text="^2.6.0" /> {#monthlylist}

  - Mục đích

    Lấy danh sách lưu nguyệt（流月） của năm chỉ định. Mỗi mục có tuổi mụ, năm, tháng, can chi lưu nguyệt, tứ hóa（四化）, lưu diệu（流曜） và mười hai cung lưu nguyệt.

    Quy tắc tháng nhuận: không có tháng nhuận thì trả về 12 mục. Có tháng nhuận và `fixLeap=false` thì trả về 13 mục; `fixLeap=true` chia tháng nhuận thành ngày 1–15 và ngày 16 đến hết tháng, trả về 14 mục.

  - Định nghĩa

    ```ts
    type monthlyList = (
      year: number,
      fixLeap?: boolean
    ) => MonthlyHoroscope[];
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | year | `number` | `true` | - | Năm lưu niên; với mỗi mục do `yearlyList()` trả về, có thể dùng trực tiếp trường `year`. |
    | fixLeap | `boolean` | `false` | `true` | Có tính riêng nửa đầu và nửa sau tháng nhuận hay không |

  - Giá trị trả về

    [`MonthlyHoroscope[]`](../type-definition.md#monthlyhoroscope)

  - Ví dụ

    ```ts
    const year = astrolabe.yearlyList(0)[0].year;
    const adjusted = astrolabe.monthlyList(year);
    const unadjusted = astrolabe.monthlyList(year, false);
    ```

  ***

  ### star() <Badge type="warning" text="^1.2.0" /> {#star}

  - Mục đích

    Lấy thể hiện đối tượng sao theo tên.

  - Định nghĩa

    ```ts
    type star = (starName: StarName) => IFunctionalStar;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | starName | [`StarName`](../type-definition.md#starname) | `true` | - | Tên ngôi sao |

  - Giá trị trả về

    [`FunctionalStar`](./star.md#functionalstar)

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `紫微星` 所在宫位
    const star = astrolabe.star("紫微");
    ```

  ***
  ### palace() <Badge type="warning" text="^1.0.0" /> {#palace}

  - Mục đích

    Lấy `cung`（宮位） được chỉ định trong lá số.

  - Định nghĩa

    ```ts
    type palace = (
      indexOrName: number | PalaceName
    ) => IFunctionalPalace | undefined;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung |

  - Giá trị trả về

    [`FunctionalPalace`](./palace.md#functionalpalace)

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫`
    const palace = astrolabe.palace(0);

    // 获取 `命宫`
    const soulPalace = astrolabe.palace("命宫");
    ```

  ***

  ### surroundedPalaces() <Badge type="warning" text="^1.1.0" /> {#surroundedpalaces}

  - Mục đích

    Lấy các cung thuộc `tam phương tứ chính`（三方四正）: `cung đang xét` được truyền vào, `đối cung`（對宮）, cùng `vị trí tài bạch`（財帛位） và `vị trí quan lộc`（官祿位） tính tương đối từ đó, tổng cộng bốn cung. `cung` và `vị trí` là hai khái niệm khác nhau. Xem [phần cung](./palace.md) để hiểu các khái niệm và quan hệ tam phương tứ chính.

  - Định nghĩa

    ```ts
    type surroundedPalaces = (
      indexOrName: number | PalaceName
    ) => IFunctionalSurpalaces;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung |

  - Giá trị trả về

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces)

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `寅宫` 三方四正
    const surroundedPalaces = astrolabe.surroundedPalaces(0);

    // 获取 `命宫` 三方四正
    const surroundedPalacesOfSoul = astrolabe.surroundedPalaces("命宫");
    ```

  ***

  ### isSurrounded() <Badge type="warning" text="^1.0.0" /> <Badge type="danger" text="deprecated" /> {#issurrounded}

  :::danger Lưu ý
  Phương thức này không còn được khuyến nghị từ `v1.2.0`. Hãy dùng [have()](palace.md#have) của [FunctionalSurpalaces](palace.md#functionalsurpalaces).
  :::

  - Mục đích

    Kiểm tra `tam phương tứ chính`（三方四正） của cung được chọn có các `sao`（星曜） yêu cầu hay không. Chỉ trả về `true` khi **tất cả** đều hiện diện.

  - Định nghĩa

    ```ts
    type isSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Mảng tên sao |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.isSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.isSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### isSurroundedOneOf() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" /> {#issurroundedoneof}

  :::danger Lưu ý
  Phương thức này không còn được khuyến nghị từ `v1.2.0`. Hãy dùng [haveOneOf()](palace.md#haveoneof) của [FunctionalSurpalaces](palace.md#functionalsurpalaces).
  :::

  - Mục đích

    Kiểm tra `tam phương tứ chính`（三方四正） của cung đã chọn có `bất kỳ một sao nào` trong danh sách được truyền vào hay không. Chỉ cần `một` sao hiện diện là trả về `true`.

  - Định nghĩa

    ```ts
    type isSurroundedOneOf = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Mảng tên sao |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const palace = astrolabe.isSurroundedOneOf(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否含有 `天府` 星、`红鸾` 星和 `禄存` 星中的一颗
    const soulPalace = astrolabe.isSurroundedOneOf("命宫", ["天府", "红鸾", "禄存"]);
    ```

  ***

  ### notSurrounded() <Badge type="warning" text="^1.1.0" /> <Badge type="danger" text="deprecated" /> {#notsurrounded}

  :::danger Lưu ý
  Phương thức này không còn được khuyến nghị từ `v1.2.0`. Hãy dùng [notHave()](palace.md#nothave-1) của [FunctionalSurpalaces](palace.md#functionalsurpalaces).
  :::

  - Mục đích

    Kiểm tra `tam phương tứ chính`（三方四正） của cung đã chọn `không chứa` các sao yêu cầu. Chỉ khi tất cả các sao ấy đều `không có mặt` mới trả về `true`.

  - Định nghĩa

    ```ts
    type notSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Mảng tên sao |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.notSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.notSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

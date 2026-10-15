---
title: "API horoscope của iztro: truy vấn vận hạn"
outline: deep
description: "Truy vấn vận hạn trên lá số bằng API horoscope của iztro, kèm thuộc tính, phương thức và mã ví dụ."
---

# Vận hạn（運限）   {#运限}

<Badge type="warning" text="^2.6.2" /> Truy vấn vận hạn（運限） dùng cấu hình và ngôn ngữ đã lưu khi tạo lá số. Thay đổi mặc định toàn cục hay tạo lá số khác không làm đổi kết quả truy vấn trên lá số hiện có. `horoscope()` nhận đối tượng `Date` hợp lệ hoặc chuỗi ngày; nếu bỏ ngày, dùng thời điểm hiện tại lúc gọi. Chỉ số giờ được chỉ định phải là số nguyên từ 0 đến 12. Ngày hoặc chỉ số giờ không hợp lệ sẽ gây lỗi.

## Lời mở đầu   {#前言}

Vận hạn（運限） trong Tử Vi Đẩu Số（紫微斗數） gồm `Đại Hạn`（大限）, `Tiểu Hạn`（小限）, `Lưu Niên`（流年）, `Lưu Nguyệt`（流月）, `Lưu Nhật`（流日）, `Lưu Thì`（流時）, `vận hạn theo phút`（流分）, `vận hạn theo giây`（流秒） và các chu kỳ khác. Về khái niệm và cách dùng, xem [vận hạn](/vi_VN/learn/horoscope.md). `iztro` hỗ trợ `Đại Hạn`（大限）, `Tiểu Hạn`（小限）, `Lưu Niên`（流年）, `Lưu Nguyệt`（流月）, `Lưu Nhật`（流日） và `Lưu Thì`（流時）. Trong đó, `Đại Hạn`（大限）, `Lưu Niên`（流年）, `Lưu Nguyệt`（流月）, `Lưu Nhật`（流日）, `Lưu Thì`（流時） cung cấp `lưu diệu`（流曜） và `tứ hóa`（四化）. Lưu diệu cho `Lưu Nguyệt`（流月）, `Lưu Nhật`（流日）, `Lưu Thì`（流時） có từ `v2.4.4`. `Tiểu Hạn`（小限） không có lưu diệu độc lập; tứ hóa của `Tiểu Hạn`（小限） được tính theo `can của cung`（宮干） của cung ấy.

:::tip Mẹo
Ranh giới đổi can chi năm, tháng của vận hạn（運限） theo cấu hình [`horoscopeDivide`](./config-n-plugin.md#配置) đã lưu trong lá số; ranh giới tuổi mụ（虛歲） cho tiểu hạn（小限） do `ageDivide` quy định.
:::


## Lớp và phương thức phân tích {#功能类定义}

:::warning Đề xuất phát triển

Vận hạn（運限） dựa trên lá số, nên hãy lấy đối tượng từ thể hiện lá số thay vì tự tạo bằng `new`. Phương thức [`horoscope()`](./astrolabe.md#horoscope) của lá số trả về đối tượng vận hạn.

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
const horoscope = astrolabe.horoscope('2023-10-26', 2);
```

Sau khi đoạn mã trên được thực thi, một đối tượng `FunctionalHoroscope` sẽ được trả về.

### FunctionalHoroscope {#functionalhoroscope}

***

<Badge type="tip" text="implements" /> `IFunctionalHoroscope` <Badge type="tip" text="extends" /> [`Horoscope`](../type-definition.md#horoscope)

Lớp này kế thừa tất cả thuộc tính từ [Horoscope](../type-definition.md#horoscope), và giao diện bổ sung phương thức phân tích sao trong vận hạn.

- Định nghĩa giao diện

  ```ts
  interface IFunctionalHoroscope extends Horoscope {
    toJSON: () => Horoscope;
    agePalace: () => FunctionalPalace | undefined;
    palace: (palaceName: PalaceName, scope: Scope) => FunctionalPalace | undefined;
    surroundPalaces: (palaceName: PalaceName, scope: Scope) => FunctionalSurpalaces | undefined;
    hasHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    notHaveHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscope: StarName[]) => boolean;
    hasOneOfHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    hasHoroscopeMutagen: (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
  }
  ```

  <Badge type="warning" text="^2.6.1" /> `palaceName` nhận tên cung bằng bất kỳ ngôn ngữ đã cấu hình nào, không cần trùng ngôn ngữ đầu ra của lá số. Chẳng hạn, lá số xuất bằng tiếng Trung vẫn nhận tên cung tiếng Anh `"soul"`.

- Thuộc tính

  Tham khảo [Horoscope](../type-definition.md#horoscope)

- Phương thức

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Mục đích

    Chuyển đối tượng vận hạn có chức năng phân tích thành đối tượng JSON thông thường. Không chứa phương thức phân tích hay tham chiếu lúc chạy đến lá số; tham chiếu vòng được bỏ qua an toàn.

  - Định nghĩa

    ```ts
    type toJSON = () => Horoscope;
    ```

  - Tham số

    Không có

  - Giá trị trả về

    [`Horoscope`](../type-definition.md#horoscope)

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.horoscope("2023-8-19").toJSON();
    ```

  ***

  ### agePalace() <Badge type="warning" text="v1.3.0" /> {#agepalace}

  - Mục đích

    Lấy cung mà `Tiểu Hạn`（小限） đang ở.

  - Định nghĩa

    ```ts
    type agePalace: () => FunctionalPalace | undefined;
    ```

  - Tham số

    Không có

  - Giá trị trả về

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - Ví dụ

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const agePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .agePalace();
    ```

  ***

  ### palace() <Badge type="warning" text="v1.3.0" /> {#palace}

  - Mục đích

    Lấy cung được yêu cầu trong vận hạn（運限） đã chọn.

  - Định nghĩa

    ```ts
    type palace = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalPalace | undefined;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Tên cung（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Tên vận hạn（運限名稱） |

  - Giá trị trả về

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - Ví dụ

    Trong `Đại Hạn`（大限）, lấy cung `Phu Thê`（夫妻）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const spousePalace = astrolabe
      .horoscope('2023-10-26', 2)
      .palace("夫妻", "decadal");
    ```

  ***

  ### surroundPalaces() <Badge type="warning" text="^1.3.0" /> {#surroundpalaces}

  - Mục đích

    Lấy các cung thuộc tam phương tứ chính（三方四正） của cung vận hạn được chỉ định.

  - Định nghĩa

    ```ts
    type surroundPalaces = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalSurpalaces | undefined;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Tên cung（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Tên vận hạn（運限名稱） |

  - Giá trị trả về

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces) | `undefined`

  - Ví dụ

    Lấy các cung thuộc tam phương tứ chính（三方四正） của `cung Phu Thê lưu niên`（流年夫妻宮）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const surpalaces = astrolabe
      .horoscope('2023-10-26', 2)
      .surroundPalaces("夫妻", "yearly");
    ```

  ***

  ### hasHoroscopeStars() <Badge type="warning" text="^1.3.0" /> {#hashoroscopestars}

  - Mục đích

    Kiểm tra lưu diệu（流曜） trong cung của vận hạn được chỉ định. Chỉ trả về true nếu **tất cả sao được chỉ định đều có mặt**.

  - Định nghĩa

    ```ts
    type hasHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscopeStar: StarName[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Tên cung（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Tên vận hạn（運限名稱） |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | Mảng lưu diệu（流曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Kiểm tra `cung Phu Thê lưu niên`（流年夫妻宮） có cả `Lưu Hỷ`（流喜） và `Lưu Khúc`（流曲） hay không.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

  ***

  ### notHaveHoroscopeStars() <Badge type="warning" text="^1.3.2" /> {#nothavehoroscopestars}

  - Mục đích

    Chỉ trả về true nếu **không có bất kỳ lưu diệu（流曜） nào được chỉ định** trong cung của vận hạn đó.

  - Định nghĩa

    ```ts
    type notHaveHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscope: StarName[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Tên cung（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Tên vận hạn（運限名稱） |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | Mảng lưu diệu（流曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Kiểm tra `cung Phu Thê lưu niên`（流年夫妻宮） không có sao nào trong hai sao `Lưu Hỷ`（流喜） và `Lưu Khúc`（流曲）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .notHaveHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasOneOfHoroscopeStars() <Badge type="warning" text="^1.3.3" /> {#hasoneofhoroscopestars}

  - Mục đích

    Kiểm tra cung của vận hạn được chỉ định; trả về true khi **có ít nhất một lưu diệu（流曜） được chỉ định**.

  - Định nghĩa

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Tên cung（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Tên vận hạn（運限名稱） |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | Mảng lưu diệu（流曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Kiểm tra `cung Phu Thê lưu niên`（流年夫妻宮） có ít nhất một trong hai sao `Lưu Hỷ`（流喜） và `Lưu Khúc`（流曲）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasOneOfHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasHoroscopeMutagen() <Badge type="warning" text="^1.3.4" /> {#hashoroscopemutagen}

  - Mục đích

    Kiểm tra tứ hóa（四化） được chỉ định của vận hạn（運限） đã chọn có trong cung yêu cầu hay không.

  - Định nghĩa

    ```ts
    type hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | Tên cung（宮位名稱） |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | Tên vận hạn（運限名稱） |
    | horoscopeMutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | tứ hóa（四化） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Kiểm tra `cung Phu Thê lưu niên`（流年夫妻宮） có `Lộc`（化祿） hay không.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeMutagen("夫妻", "yearly", "禄");
    ```

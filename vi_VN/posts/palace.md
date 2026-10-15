---
outline: deep
description: "Truy vấn mười hai cung trên lá số bằng API palace của iztro, kèm thuộc tính, phương thức và mã ví dụ."
---

# Cung（宮位）   {#宫位}

## Lời mở đầu   {#前言}

Tử Vi Đẩu Số（紫微斗數） có `mười hai` cung, gọi chung là `mười hai cung nhân sự`（十二人事宮）, biểu thị những người và các mặt của đời sống có liên quan đến một người. Theo thứ tự, đó là `Mệnh`（命宮）, `Huynh Đệ`（兄弟）, `Phu Thê`（夫妻）, `Tử Nữ`（子女）, `Tài Bạch`（財帛）, `Tật Ách`（疾厄）, `Thiên Di`（遷移）, `Nô Bộc`（僕役）, `Quan Lộc`（官祿）, `Điền Trạch`（田宅）, `Phúc Đức`（福德） và `Phụ Mẫu`（父母）. Ngoài mười hai cung hiển thị trên [lá số](./astrolabe.md), còn có ba cung ẩn là `Thân`（身宮）, `Lai Nhân`（來因） và `cung ám hợp`（暗合宮）. Mỗi cung có ý nghĩa riêng, nhưng trang API này không trình bày chi tiết. Để tìm hiểu từ cơ bản đến chuyên sâu, hãy xem [Hệ thống cung](../learn/palace.md). Địa chi được xếp theo chiều kim đồng hồ, còn tên cung được xếp ngược chiều kim đồng hồ, như ví dụ trong bảng dưới đây:

<table class="astrolabe">
    <tr>
        <td>Tỵ（巳）<code>Điền Trạch</code>（田宅）</td>
        <td>Ngọ（午）<code>Quan Lộc</code>（官祿）</td>
        <td>Mùi（未）<code>Nô Bộc</code>（僕役）</td>
        <td>Thân（申）<code>Thiên Di</code>（遷移）</td>
    </tr>
    <tr>
        <td>Thìn（辰）<code>Phúc Đức</code>（福德）</td>
        <td class="center-palace" rowspan="2" colspan="2">Trung cung</td>
        <td>Dậu（酉）<code>Tật Ách</code>（疾厄）</td>
    </tr>
    <tr>
        <td>Mão（卯）<code>Phụ Mẫu</code>（父母）</td>
        <td>Tuất（戌）<code>Tài Bạch</code>（財帛）</td>
    </tr>
    <tr>
        <td>Dần（寅）<code>Mệnh</code>（命宮）</td>
        <td>Sửu（丑）<code>Huynh Đệ</code>（兄弟）</td>
        <td>Tý（子）<code>Phu Thê</code>（夫妻）</td>
        <td>Hợi（亥）<code>Tử Nữ</code>（子女）</td>
    </tr>
</table>

> Bảng trên chỉ là ví dụ. Vị trí cung `Mệnh`（命宮） thay đổi theo `ngày sinh` và `giờ sinh`. Cung này có thể nằm ở bất kỳ vị trí nào trong mười hai vị trí trên, nhưng thứ tự tên các cung không thay đổi.

Khái niệm cung vị gồm hai phần: `cung` và `vị trí`. Phần được xác định từ `ngày sinh` và `giờ sinh` là `cung`. Vì vậy, cung `Tài Bạch`（財帛） có vị trí cố định trên lá số lúc sinh. Nếu chưa quen với khái niệm `lá số bản mệnh`（本命盤）, bạn nên đọc [Kiến thức cơ bản](/vi_VN/learn/basis.md) trước. Còn `vị trí` mang tính `tương đối`, được xác định theo cung dùng làm mốc. Chẳng hạn, lấy cung `Phu Thê`（夫妻） làm mốc thì `vị trí tài bạch`（財帛位） của cung này nằm tại cung `Thiên Di`（遷移）. Điều này có vẻ phức tạp, nhưng bạn chỉ cần hiểu sự khác biệt giữa hai khái niệm, không cần ghi nhớ mọi mối quan hệ.
## Lớp và phương thức phân tích {#功能类定义}

:::warning Đề xuất phát triển

Cung thuộc về một lá số, vì vậy thay vì tự tạo đối tượng cung bằng `new`, hãy lấy đối tượng từ lá số do phương thức lập lá số tĩnh trả về. Thuộc tính `palaces` của lá số chứa dữ liệu của mười hai cung, được xếp theo thứ tự địa chi theo chiều kim đồng hồ, bắt đầu từ `cung Dần`（寅宮）.

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
```

Bạn có thể lấy cung（宮位） mục tiêu từ biến `astrolabe` ở trên bằng nhiều cách. Vui lòng sử dụng nó theo nhu cầu thực tế của bạn:

1. Truy cập `palaces` bằng chỉ số mảng

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palaces[1];
    ```

2. Trên đối tượng `FunctionalAstrolabe`, gọi phương thức `palace()` và truyền `chỉ mục` của cung.

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palace(1);
    ```

3. Trên đối tượng `FunctionalAstrolabe`, gọi phương thức `palace()` và truyền `Tên` của cung.

    ```ts
    // 获取命宫
    const palace = astrolabe.palace("命宫");
    ```

### FunctionalPalace {#functionalpalace}

***

<Badge type="tip" text="implements" /> `IFunctionalPalace` <Badge type="tip" text="extends" /> [`Palace`](../type-definition.md#palace)

Lớp này kế thừa các thuộc tính từ [Palace](../type-definition.md#palace) và bổ sung phương thức phân tích sao trong cung.

- Định nghĩa giao diện

  ```ts
  interface IFunctionalPalace extends Palace {
    toJSON: () => Palace;
    has: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    hasOneOf: (stars: StarName[]) => boolean;
    hasMutagen: (mutagen: Mutagen): boolean;
    notHaveMutagen: (mutagen: Mutagen): boolean;
    isEmpty: (excludeStars?: StarName[]) => boolean;
    astrolabe: () => IFunctionalAstrolabe | undefined;
    fliesTo: (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;
    fliesOneOfTo: (to: number | PalaceName, withMutagens: Mutagen[]) => boolean;
    notFlyTo: (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;
    selfMutaged: (withMutagens: Mutagen | Mutagen[]) => boolean;
    selfMutagedOneOf: (withMutagens?: Mutagen[]) => boolean;
    notSelfMutaged: (withMutagens?: Mutagen | Mutagen[]) => boolean;
    mutagedPlaces: () => (IFunctionalPalace | undefined)[];
  }
  ```

- Thuộc tính

  Tham khảo [Palace](../type-definition.md#palace)

- Phương thức

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Mục đích

    Chuyển đối tượng cung có chức năng phân tích thành đối tượng JSON thông thường. Kết quả không chứa phương thức phân tích hay tham chiếu lúc chạy, chẳng hạn tham chiếu đến lá số liên quan. Tham chiếu vòng được bỏ qua an toàn.

  - Định nghĩa

    ```ts
    type toJSON = () => Palace;
    ```

  - Tham số

    Không có

  - Giá trị trả về

    [`Palace`](../type-definition.md#palace)

  - Ví dụ

    ```ts
    const data = astrolabe.palace("命宫")?.toJSON();
    ```

  ***

  #### has() <Badge type="warning" text="^1.0.0" /> {#has}

  - Mục đích

    Kiểm tra các `sao`（星曜） được chỉ định trong một cung. Chỉ khi `tất cả sao được chỉ định` `đều có mặt` trong cung đó thì phương thức mới trả về `true`.

  - Định nghĩa

    ```ts
    type has = (stars: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Tên sao; có thể gồm chính tinh（主星）, phụ tinh（輔星） và tạp diệu（雜曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Nếu bạn muốn xem `Mệnh`（命宮） có `Tử Vi`（紫微） và `Hữu Bật`（右弼） không
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.has(["紫微", "右弼"]);
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.palace("命宫").has(["紫微", "右弼"]);
    ```

  ***
  #### notHave() <Badge type="warning" text="^1.0.0" /> {#nothave}

  - Mục đích

    Kiểm tra xem cung có thiếu toàn bộ `sao`（星曜） được chỉ định hay không. Phải `không có sao nào` trong số đó hiện diện thì mới trả về `true`.

  - Định nghĩa

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Tên sao; có thể gồm chính tinh（主星）, phụ tinh（輔星） và tạp diệu（雜曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Để kiểm tra cung `Mệnh`（命宮） không có sao nào trong hai sao `Địa Không`（地空） và `Địa Kiếp`（地劫）:
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHave(["地空", "地劫"]);
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.palace("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### hasOneOf() <Badge type="warning" text="^1.0.0" /> {#hasoneof}

  - Mục đích

    Kiểm tra `sao`（星曜） đầu vào trong cung. Chỉ cần `khớp ít nhất một sao` là trả về `true`.

  - Định nghĩa

    ```ts
    type hasOneOf = (stars: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Tên sao; có thể gồm chính tinh（主星）, phụ tinh（輔星） và tạp diệu（雜曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Nếu bạn muốn xem `Mệnh`（命宮） có `Thiên Khôi`（天魁） hay `Thiên Việt`（天鉞）
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasOneOf(["天魁", "天钺"]);
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.palace("命宫").hasOneOf(["天魁", "天钺"]);
    ```

  ***
  #### hasMutagen() <Badge type="warning" text="^1.2.0" /> {#hasmutagen}

  - Mục đích

    Kiểm tra cung có loại tứ hóa năm sinh（生年四化） được chỉ định hay không.

  - Định nghĩa

    ```ts
    type hasMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Tên tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科） hoặc Kỵ（忌） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Nếu bạn muốn xem `Mệnh`（命宮） có `Lộc`（化祿） không
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasMutagen("禄");
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.palace("命宫").hasMutagen("禄");
    ```

  ***
  #### notHaveMutagen() <Badge type="warning" text="^1.2.0" /> {#nothavemutagen}

  - Mục đích

    Kiểm tra cung có thiếu loại tứ hóa năm sinh（生年四化） được chỉ định hay không.

  - Định nghĩa

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Tên tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科） hoặc Kỵ（忌） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Để kiểm tra cung `Mệnh`（命宮） không có `Kỵ`（化忌）:
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.palace("命宫").notHaveMutagen("忌");
    ```
  #### isEmpty() <Badge type="warning" text="^2.0.6" /> {#isempty}

  - Mục đích

    Kiểm tra một cung có phải cung vô chính diệu（空宮）, tức không có chính tinh（主星）, hay không. Một số trường phái không coi cung là vô chính diệu nếu có những sao nhất định khác. Tham số danh sách sao tùy chọn cho phép chỉ định các trường hợp ngoại lệ đó.

  - Định nghĩa

    ```ts
    type isEmpty = (excludeStars?: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | excludeStars | [`StarName[]`](../type-definition.md#starname) | `false` | - | Mảng tên sao |

  - Giá trị trả về

    `boolean`
  #### astrolabe() <Badge type="warning" text="^2.1.0" /> {#astrolabe}

  - Mục đích

    Trả về đối tượng lá số chứa cung hiện tại.

  - Định nghĩa

    ```ts
    type astrolabe = () => IFunctionalAstrolabe | undefined;
    ```

  - Tham số

    Không có

  - Giá trị trả về

  [`IFunctionalAstrolabe`](./astrolabe.md#functionalastrolabe) | `undefined`;
  #### fliesTo() <Badge type="warning" text="^2.1.0" /> {#fliesto}

  - Mục đích

    Kiểm tra tứ hóa phi từ cung nguồn sang cung đích. Có thể truyền một loại hoặc một mảng; tất cả tứ hóa đầu vào phải phi tới cung đích mới trả về `true`.

  - Định nghĩa

    ```ts
    type fliesTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung đích |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科）, Kỵ（忌） |

  - Giá trị trả về

    `boolean`
  #### fliesOneOfTo() <Badge type="warning" text="^2.1.0" /> {#fliesoneofto}

  - Mục đích

    Trả về `true` nếu ít nhất một tứ hóa đầu vào phi từ cung nguồn sang cung đích.

  - Định nghĩa

    ```ts
    type fliesOneOfTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung đích |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科）, Kỵ（忌） |

  - Giá trị trả về

    `boolean`
  #### notFlyTo() <Badge type="warning" text="^2.1.0" /> {#notflyto}

  - Mục đích

    Kiểm tra không có tứ hóa đầu vào nào phi từ cung nguồn sang cung đích. Nhận một loại hoặc một mảng; mọi loại được chỉ định đều không phi tới đích thì mới trả về `true`.

  - Định nghĩa

    ```ts
    type notFlyTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | Chỉ số hoặc tên cung đích |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科）, Kỵ（忌） |

  - Giá trị trả về

    `boolean`
  #### selfMutaged() <Badge type="warning" text="^2.1.0" /> {#selfmutaged}

  - Mục đích

    Kiểm tra tự hóa（自化） trong cung. Khi truyền một mảng, tất cả tứ hóa được chỉ định phải có tự hóa thì mới trả về `true`.

  - Định nghĩa

    ```ts
    type selfMutaged = (
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | Tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科）, Kỵ（忌） |

  - Giá trị trả về

    `boolean`
  #### selfMutagedOneOf() <Badge type="warning" text="^2.1.0" /> {#selfmutagedoneof}

  - Mục đích

    Kiểm tra tự hóa（自化）. Nếu không truyền tham số, xét cả bốn loại; chỉ cần một loại khớp là trả về `true`.

  - Định nghĩa

    ```ts
    type selfMutagedOneOf = (
      withMutagens?: Mutagen[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | Tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科）, Kỵ（忌） |

  - Giá trị trả về

    `boolean`
  #### notSelfMutaged() <Badge type="warning" text="^2.1.0" /> {#notselfmutaged}

  - Mục đích

    Kiểm tra trong cung không có tự hóa（自化） nào thuộc các loại được chỉ định. Nếu không truyền đối số, kiểm tra cả bốn loại tứ hóa.

  - Định nghĩa

    ```ts
    type notSelfMutaged = (
      withMutagens?: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | Tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科）, Kỵ（忌） |

  - Giá trị trả về

    `boolean`
  #### mutagedPlaces() <Badge type="warning" text="^2.1.0" /> {#mutagedplaces}

  - Mục đích

    Trả về mảng gồm bốn cung nhận tứ hóa từ cung hiện tại, theo thứ tự Lộc（化祿）, Quyền（化權）, Khoa（化科）, Kỵ（化忌）.

  - Định nghĩa

    ```ts
    type mutagedPlaces = () => (IFunctionalPalace | undefined)[];
    ```

  - Tham số

    Không có

  - Giá trị trả về

    ([`IFunctionalPalace`](#functionalpalace) | `undefined`)[]
### FunctionalSurpalaces <Badge type="warning" text="^1.2.0" /> {#functionalsurpalaces}

***

<Badge type="tip" text="implements" /> `IFunctionalSurpalaces` <Badge type="tip" text="extends" /> [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

Lớp này kế thừa các thuộc tính từ [SurroundedPalaces](../type-definition.md#surroundedpalaces) và bổ sung phương thức phân tích sao trong phạm vi tam phương tứ chính.

- Định nghĩa giao diện

  ```ts
  interface FunctionalSurpalaces extends SurroundedPalaces {
    toJSON: () => SurroundedPalaces;
    have: (stars: StarName[]) => boolean;
    notHave: (stars: StarName[]) => boolean;
    haveOneOf: (stars: StarName[]) => boolean;
    haveMutagen: (mutagen: Mutagen) => boolean;
    notHaveMutagen: (mutagen: Mutagen): boolean;
  }
  ```

- Thuộc tính

  Tham khảo [SurroundedPalaces](../type-definition.md#surroundedpalaces)

- Phương thức

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson-1}

  - Mục đích

    Chuyển đối tượng tam phương tứ chính（三方四正） có chức năng phân tích thành đối tượng JSON thông thường. Kết quả không chứa phương thức phân tích hay tham chiếu lúc chạy. Tham chiếu vòng được bỏ qua an toàn.

  - Định nghĩa

    ```ts
    type toJSON = () => SurroundedPalaces;
    ```

  - Tham số

    Không có

  - Giá trị trả về

    [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

  - Ví dụ

    ```ts
    const data = astrolabe.surroundedPalaces("命宫").toJSON();
    ```

  ***

  #### have() {#have}

  - Mục đích

    Kiểm tra các `sao`（星曜） được chỉ định trong phạm vi tam phương tứ chính（三方四正） của cung. Chỉ khi `tất cả sao được chỉ định` `đều có mặt` trong phạm vi này thì phương thức mới trả về `true`.

  - Định nghĩa

    ```ts
    type have = (stars: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Tên sao; có thể gồm chính tinh（主星）, phụ tinh（輔星） và tạp diệu（雜曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Để kiểm tra tam phương tứ chính（三方四正） của cung `Mệnh`（命宮） có cả `Tử Vi`（紫微） và `Hữu Bật`（右弼）:
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.have(["紫微", "右弼"]);
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").have(["紫微", "右弼"]);
    ```

  ***
  #### notHave() {#nothave-1}

  - Mục đích

    Kiểm tra `sao`（星曜） đầu vào trong phạm vi tam phương tứ chính（三方四正） của cung. Phải `không có sao nào` trong số đó hiện diện trong toàn bộ phạm vi này thì mới trả về `true`.

  - Định nghĩa

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Tên sao; có thể gồm chính tinh（主星）, phụ tinh（輔星） và tạp diệu（雜曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Để kiểm tra tam phương tứ chính（三方四正） của cung `Mệnh`（命宮） không có sao nào trong hai sao `Địa Không`（地空） và `Địa Kiếp`（地劫）:

    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.notHave(["地空", "地劫"]);
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### haveOneOf() {#haveoneof}

  - Mục đích

    Kiểm tra tam phương tứ chính（三方四正） của cung có bất kỳ sao nào được chỉ định hay không. Chỉ cần có một sao trong phạm vi này là trả về `true`.

  - Định nghĩa

    ```ts
    type haveOneOf = (stars: StarName[]) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | Tên sao; có thể gồm chính tinh（主星）, phụ tinh（輔星） và tạp diệu（雜曜） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Kiểm tra tam phương tứ chính（三方四正） của cung `Mệnh`（命宮） có `Thiên Khôi`（天魁） hoặc `Thiên Việt`（天鉞）:

    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveOneOf(["天魁", "天钺"]);
    ```

  ***
  #### haveMutagen() {#havemutagen}

  - Mục đích

    Kiểm tra trong tam phương tứ chính（三方四正） của cung có loại tứ hóa năm sinh（生年四化） được chỉ định hay không.

  - Định nghĩa

    ```ts
    type haveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Tên tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科） hoặc Kỵ（忌） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Để kiểm tra tam phương tứ chính（三方四正） của cung `Mệnh`（命宮） có `Lộc`（化祿）:
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.haveMutagen("禄");
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveMutagen("禄");
    ```

  ***
  #### notHaveMutagen() {#nothavemutagen-1}

  - Mục đích

    Kiểm tra toàn bộ tam phương tứ chính（三方四正） của cung đều không có loại tứ hóa năm sinh（生年四化） được chỉ định hay không.

  - Định nghĩa

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | Tên tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科） hoặc Kỵ（忌） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Để kiểm tra toàn bộ tam phương tứ chính（三方四正） của cung `Mệnh`（命宮） đều không có `Kỵ`（化忌）:
    ```ts
    const palace = astrolabe.surroundedPalaces("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    Bạn cũng có thể dùng `gọi phương thức nối tiếp` để viết mã gọn hơn.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHaveMutagen("忌");
    ```

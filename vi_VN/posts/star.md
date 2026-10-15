---
outline: deep
description: "Truy vấn các sao trên lá số bằng API star của iztro, kèm thuộc tính, phương thức và mã ví dụ."
---

# Sao（星曜）   {#星曜}

## Lời mở đầu   {#前言}

Sao（星曜） là thành phần quan trọng của Tử Vi Đẩu Số（紫微斗數）; các tổ hợp khác nhau được dùng để mô tả những nét tính cách khác nhau. Có thể tìm hiểu nền tảng ở [hệ thống sao（星曜系統）](/vi_VN/learn/star.md). Chương này tập trung vào cách dùng sao trong lập trình.

:::tip Mẹo
`iztro` xếp `chính tinh`（主星）, `phụ tinh`（輔星） và `tạp diệu`（雜曜） vào hệ thống sao, còn `48 thần sát`（48神煞） được xử lý riêng. Nếu chưa biết `48 thần sát`（48神煞）, hãy xem [48 thần sát（48神煞）](/vi_VN/learn/dec-star.md).
:::

## Lớp và phương thức phân tích {#功能类定义}

Giống [FunctionalAstrolabe](./astrolabe.md#functionalastrolabe) và [FunctionalPalace](./palace.md#functionalpalace), hãy dùng thể hiện `FunctionalStar` do đối tượng khác trả về thay vì tự tạo thủ công.

### FunctionalStar <Badge type="warning" text="^1.2.0" /> {#functionalstar}

---

<Badge type="tip" text="implements" /> `IFunctionalStar` <Badge type="tip" text="extends" /> [`Star`](/vi_VN/type-definition.md#star)

- Định nghĩa giao diện

  ```ts
  interface IFunctionalStar extends Star {
    toJSON: () => Star;
    palace: () => IFunctionalPalace | undefined;
    setPalace: (p: IFunctionalPalace) => void;
    setAstrolabe: (a: IFunctionalAstrolabe) => void;
    surroundedPalaces: () => IFunctionalSurpalaces | undefined;
    oppositePalace: () => IFunctionalPalace | undefined;
    withBrightness: (brightness: Brightness | Brightness[]) => boolean;
    withMutagen: (mutagen: Mutagen | Mutagen[]) => boolean;
  }
  ```

- Thuộc tính

  Tham khảo [Star](/vi_VN/type-definition.md#star)

- Phương thức

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - Mục đích

    Chuyển đối tượng sao có chức năng phân tích thành đối tượng JSON thông thường. Không chứa phương thức phân tích hay tham chiếu lúc chạy đến cung và lá số; tham chiếu vòng được bỏ qua an toàn.

  - Định nghĩa

    ```ts
    type toJSON = () => Star;
    ```

  - Tham số

    Không có

  - Giá trị trả về

    [`Star`](../type-definition.md#star)

  - Ví dụ

    ```ts
    const data = astrolabe.star("紫微").toJSON();
    ```

  ***

  :::danger ❗️Chú ý
  `FunctionalStar` có `setPalace()` và `setAstrolabe()` để liên kết sao với cung và lá số. Không gọi thủ công các phương thức này khi sử dụng thông thường, vì có thể làm sai dữ liệu.
  :::

  ### palace() {#palace}

  - Mục đích

    Lấy cung chứa sao.

  - Định nghĩa

    ```ts
    type palace = () => IFunctionalPalace | undefined;
    ```

  - Tham số

    `none`

  - Giá trị trả về

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - Ví dụ

    Lấy cung chứa `Tử Vi`（紫微）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").palace();
    ```

  ***

  ### surroundedPalaces() {#surroundedpalaces}

  - Mục đích

    Lấy các cung thuộc tam phương tứ chính（三方四正） của sao hiện tại.

  - Định nghĩa

    ```ts
    type surroundedPalaces = () => IFunctionalSurpalaces | undefined;
    ```

  - Tham số

    `none`

  - Giá trị trả về

    [`FunctionalSurpalaces`](palace.md#functionalsurpalaces) | `undefined`

  - Ví dụ

    Với `Tử Vi`（紫微）, lấy các cung thuộc `tam phương tứ chính`（三方四正）.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palaces = astrolabe.star("紫微").surroundedPalaces();
    ```

  ***

  ### oppositePalace() {#oppositepalace}

  - Mục đích

    Lấy cung đối diện với cung chứa sao hiện tại.

  - Định nghĩa

    ```ts
    type oppositePalace = () => IFunctionalPalace | undefined;
    ```

  - Tham số

    `none`

  - Giá trị trả về

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - Ví dụ

    Với `Tử Vi`（紫微）, lấy `đối cung`（對宮） của cung chứa sao này.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").oppositePalace();
    ```

  ***

  ### withBrightness() {#withbrightness}

  - Mục đích

    Kiểm tra sao có độ sáng được chỉ định hay không. Nếu truyền nhiều giá trị, chỉ cần khớp một giá trị là trả về `true`.

  - Định nghĩa

    ```ts
    type withBrightness = (brightness: Brightness | Brightness[]) => boolean;
    ```

  - Tham số


   | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
   | --- | --- | --- | --- | --- |
   | brightness | [`Brightness`](/vi_VN/type-definition.md#brightness)  \|  [`Brightness[]`](/vi_VN/type-definition.md#brightness) | `true` | - | Độ sáng của sao cần kiểm tra |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Xác định xem `Tử Vi`（紫微） đang ở trạng thái `Miếu`（廟） hay `Vượng`（旺）

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withBrightness(["庙", "旺"]);
    ```

  ***

  ### withMutagen() {#withmutagen}

  - Mục đích

    Kiểm tra sao có tứ hóa（四化） được chỉ định hay không. Nếu truyền nhiều tứ hóa, chỉ cần khớp một loại là trả về `true`.

  - Định nghĩa

    ```ts
    type withMutagen = (mutagen: Mutagen | Mutagen[]) => boolean;
    ```

  - Tham số


   | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
   | --- | --- | --- | --- | --- |
   | mutagen | [`Mutagen`](/vi_VN/type-definition.md#mutagen)  \|  [`Mutagen[]`](/vi_VN/type-definition.md#mutagen) | `true` | - | Tứ hóa: Lộc（祿）, Quyền（權）, Khoa（科）, Kỵ（忌） |

  - Giá trị trả về

    `boolean`

  - Ví dụ

    Xác định xem `Tử Vi`（紫微） đang ở trạng thái `Quyền`（化權） hay `Khoa`（化科）

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withMutagen(["权", "科"]);
    ```

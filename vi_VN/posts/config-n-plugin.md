---
outline: deep
description: "Tùy chỉnh cách tính của iztro và mở rộng chức năng lá số bằng trình cắm."
---

# Cấu hình và trình cắm <Badge type="warning" text="^2.3.0" />   {#配置和插件}

Phần này giới thiệu tính năng cấu hình và trình cắm của iztro. Tử Vi Đẩu Số（紫微斗數） có nhiều trường phái, với những khác biệt nhỏ về tứ hóa（四化） và độ sáng sao（星曜亮度）. Để đáp ứng các khác biệt ấy và cho phép mở rộng chức năng, iztro bổ sung cấu hình toàn cục và trình cắm của bên thứ ba từ `v2.3.0`.

:::tip Mẹo
Nếu đã phát triển một thư viện trình cắm mã nguồn mở cho iztro, hãy [liên hệ tác giả](../about.md#怎么联系我❓) để đưa trình cắm vào danh sách trong tài liệu, giúp người khác tìm và sử dụng.
:::

## Cấu hình   {#配置}

Xem [Định nghĩa cấu hình](../type-definition.md#config) để biết các tùy chọn. Để đặt cấu hình toàn cục, chỉ cần gọi `astro.config()` trước phương thức tạo lá số:

```ts
import { astro } from 'iztro';

astro.config({
  mutagens: { 庚: ['太阳', '武曲', '天同', '天相'] },
  brightness: {
    贪狼: ['旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺'],
  },
});
```

Khi tạo lá số sau khi chạy đoạn mã trên, các giá trị cấu hình mới được hợp nhất với cấu hình mặc định rồi áp dụng. Những giá trị giống mặc định không cần khai báo lại. Xem [Bảng tứ hóa theo mười thiên can（十天干四化表）](../learn/mutagen.md#十天干四化表) và [Bảng độ sáng sao（星曜亮度表）](../learn/star.md#星曜亮度表) để biết các giá trị mặc định.

Ngoài `mutagens` và `brightness`, các tùy chọn sau cho phép điều chỉnh quy tắc tính toán lá số:

| Các mục cấu hình | Các giá trị được phép | Giá trị mặc định | Mô tả |
| --- | --- | --- | --- |
| `yearDivide`   <Badge type="warning" text="^2.4.0" /> | `normal`  \|  `exact` | `normal` | Mốc phân chia can chi năm: `normal` lấy mồng một tháng Giêng âm lịch, `exact` lấy tiết Lập Xuân. |
| `horoscopeDivide`   <Badge type="warning" text="^2.4.3" /> | `normal`  \|  `exact` | `normal` | Mốc phân chia can chi năm và tháng dùng cho vận hạn |
| `ageDivide`   <Badge type="warning" text="^2.4.5" /> | `normal`  \|  `birthday` | `normal` | Mốc tính tuổi mụ cho tiểu hạn: `normal` dựa vào năm theo lịch, `birthday` lấy sinh nhật âm lịch làm mốc. |
| `dayDivide`   <Badge type="warning" text="^2.5.2" /> | `forward`  \|  `current` | `forward` | Ngày được gán cho giờ Tý muộn: `forward` tính sang ngày hôm sau, `current` tính trong ngày hiện tại. |
| `algorithm`   <Badge type="warning" text="^2.5.0" /> | `default`  \|  `zhongzhou` | `default` | Quy tắc an sao: `default` dùng cách thông dụng, `zhongzhou` dùng cách của phái Trung Châu. |

:::warning Lưu ý
Từ `v2.6.2`, `astro.config()` chỉ đặt cấu hình mặc định cho các lá số tạo sau đó. `withOptions({ config })` chỉ ghi đè cấu hình cho lá số đang được tạo, không thay đổi cấu hình mặc định toàn cục. Lá số đã có và phần phân tích vận hạn, tứ hóa giữ cấu hình và ngôn ngữ lúc tạo. Nếu mã cũ dựa vào một lần lập lá số để đổi cấu hình toàn cục, hãy gọi `astro.config()` một cách tường minh.
:::

### getConfig() <Badge type="warning" text="^2.3.0" /> {#getconfig}

- Mục đích

  Lấy cấu hình toàn cục đang có hiệu lực. `mutagens` và `brightness` được trả về sử dụng tên khóa được chuẩn hóa trong thư viện, phù hợp để gỡ lỗi hoặc xác nhận trạng thái cấu hình.

  <Badge type="warning" text="^2.6.2" /> Giá trị trả về là một bản sao sâu độc lập. Sửa đối tượng hoặc các mảng tứ hóa và độ sáng bên trong không làm thay đổi cấu hình của thư viện.

- Định nghĩa

  ```ts
  type getConfig = () => {
    mutagens: Partial<Record<HeavenlyStemKey, StarKey[]>>;
    brightness: Partial<Record<StarKey, BrightnessKey[]>>;
    yearDivide: 'normal' | 'exact';
    ageDivide: 'normal' | 'birthday';
    dayDivide: 'current' | 'forward';
    horoscopeDivide: 'normal' | 'exact';
    algorithm: 'default' | 'zhongzhou';
  };
  ```

- thông số

  Không có

- giá trị trả về

  Đối tượng cấu hình hiện có hiệu lực

- Ví dụ

  ```ts
  import { astro } from 'iztro';

  astro.config({ algorithm: 'zhongzhou', ageDivide: 'birthday' });

  const currentConfig = astro.getConfig();
  ```

### resetConfig() <Badge type="warning" text="^2.6.2" /> {#resetconfig}

Khôi phục cấu hình mặc định và xóa mọi bảng tứ hóa（四化） và độ sáng tùy chỉnh. Các lá số đã tạo không bị ảnh hưởng.

```ts
type resetConfig = () => void;
```

Các quy tắc phân chia mặc định là `yearDivide: 'normal'`, `horoscopeDivide: 'normal'`, `ageDivide: 'normal'` và `dayDivide: 'forward'`; thuật toán an sao mặc định là `algorithm: 'default'`. Phương thức này không nhận đối số và không trả về giá trị. Nó không đặt lại các trình cắm đã nạp.

```ts
const chart = astro.withOptions({
  dateStr: '2000-8-16',
  timeIndex: 3,
  gender: '男',
  config: { ageDivide: 'birthday' },
});
astro.resetConfig();
chart.horoscope('2026-3-1'); // 仍使用该星盘生成时的生日分界配置
```

## Trình cắm {#插件}

Trình cắm của iztro là một hàm bổ sung chức năng cho đối tượng lá số（星盤）. Bạn có thể mở rộng chức năng theo nhu cầu. Nếu dùng TypeScript, hãy khai báo các phương thức của trình cắm trong một giao diện kế thừa `FunctionalAstrolabe`.

Giao diện được khai báo như sau:

```ts
export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}
```

Bạn có thể định nghĩa `myNewFunc` và `majorStar` theo nhu cầu. Các phương thức của giao diện có thể được triển khai trong một hàm trình cắm duy nhất hoặc chia ra nhiều hàm trình cắm:

```ts
// 创建一个插件函数
export function myTestPlugin(this: IAstrolabe): void {
  // 实现插件应用逻辑
  this.myNewFunc = () => {
    return this.fiveElementsClass;
  };
}

// 创建二个插件函数
export function myTestPlugin2(this: IAstrolabe): void {
  // 实现插件应用逻辑
  this.majorStar = () => {
    let stars = this.palace('命宫')
      ?.majorStars.filter((item) => item.type === 'major' && !['禄存', '天马'].includes(item.name))
      .map((item) => item.name)
      .join(',');

    if (!stars) {
      stars = this.palace('迁移')
        ?.majorStars.filter((item) => item.type === 'major' && !['禄存', '天马'].includes(item.name))
        .map((item) => item.name)
        .join(',');
    }

    return stars ?? '';
  };
}
```

Để đăng ký trình cắm, hãy nhập `astro` rồi gọi `loadPlugin()` hoặc `loadPlugins()`. Trình cắm đăng ký bằng cả hai cách đều được áp dụng cho các đối tượng lá số **được tạo mới sau đó**.

```ts
import {astro} from iztro;

// 批量挂载插件
astro.loadPlugins([myTestPlugin， myTestPlugin2]);

// 逐个加载插件
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
```

Để chỉ áp dụng trình cắm cho một lá số（星盤） đã tạo cụ thể, hãy gọi phương thức `use()` của đối tượng lá số đó:

```ts
const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

astrolabe.use(myTestPlugin);
astrolabe.myNewFunc();
```

:::tip Mẹo

Khi dùng trình cắm trong TypeScript, hãy chỉ định kiểu tổng quát để trình biên dịch nhận biết các phương thức đã thêm và không báo lỗi chưa định nghĩa. Ví dụ, để dùng các phương thức trình cắm ở trên:

```ts
 const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

 // 使用插件定义的方法
 astrolabe.myNewFunc();   // 火六局

 // 使用第二个插件方法
 astrolabe.majorStar();   // 七杀
```

:::

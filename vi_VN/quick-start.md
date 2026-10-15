---
title: "Bắt đầu với iztro: cài đặt và lập lá số"
description: "Hướng dẫn cài đặt iztro và tạo dữ liệu lá số Tử Vi Đẩu Số qua các ví dụ thực tế."
---

<div align="center">

<h1 class="brand-name text-clip">IZTRO</h1>

Một thư viện JavaScript mã nguồn mở gọn nhẹ để lấy dữ liệu lá số Tử Vi Đẩu Số（紫微斗數）.

</div>

## Lời mở đầu   {#前言}

Chào mừng bạn đến với tài liệu dành cho nhà phát triển của `iztro`! Trang này hướng dẫn cách tích hợp thư viện, lấy dữ liệu và nhanh chóng truy xuất toàn bộ dữ liệu của một lá số Tử Vi Đẩu Số（紫微斗數）. Với nhu cầu sử dụng các chức năng cơ bản hằng ngày, nội dung này là đủ. Khi đã nắm vững, bạn có thể đọc các trang khác để tìm hiểu sâu hơn. Nếu quan tâm đến Tử Vi nhưng chưa có kiến thức nền, hãy bắt đầu với [Kiến thức cơ bản](/vi_VN/learn/basis.md).

::: info Bạn sẽ nhận được thông tin sau:

- Cách cài đặt và tích hợp `iztro` vào mã của bạn
- Cách lấy một lá số（星盤）
- Cách phân tích các cung（宮位） dựa trên lá số（星盤）
- Cách phân tích các sao（星曜） dựa trên dữ liệu cung（宮位）
  :::

## Sản phẩm   {#产品}

|  | Tên | Liên kết | Ngôn ngữ | Tác giả |
| --- | --- | --- | --- | --- |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" /> | iztro | [GitHub](https://github.com/sylarlong/iztro)  ｜  [Gitee](https://gitee.com/sylarlong/iztro) | Typescript | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/react-iztro.svg?style=social&label=Star" alt="react-iztro" /> | react-iztro | [GitHub](https://github.com/sylarlong/react-iztro)  ｜  [Gitee](https://gitee.com/sylarlong/react-iztro) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro-hook.svg?style=social&label=Star" alt="iztro-hook" /> | iztro-hook | [GitHub](https://github.com/sylarlong/iztro-hook)  ｜  [Gitee](https://gitee.com/sylarlong/iztro-hook) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/x-haose/py-iztro.svg?style=social&label=Star" alt="py-iztro" /> | py-iztro | [GitHub](https://github.com/x-haose/py-iztro)  ｜  [Gitee](https://gitee.com/x-haose/py-iztro) | Python | [Hạo Sắc Cư Sĩ](https://github.com/x-haose) |
| <img src="https://img.shields.io/github/stars/EdwinXiang/dart_iztro.svg?style=social&label=Star" alt="py-iztro" /> | dart_iztro | [GitHub](https://github.com/EdwinXiang/dart_iztro)  ｜  [Gitee](https://gitee.com/EdwinXiang/dart_iztro) | Dart | [EdwinXiang](https://github.com/EdwinXiang) |

## Cài đặt   {#安装}

### Cài đặt bằng trình quản lý gói {#使用包管理安装}

Bạn có thể sử dụng bất kỳ công cụ quản lý gói nào mà bạn quen thuộc để cài đặt nó.

:::tabs
== npm

```sh
npm install iztro -S
```

== yarn

```sh
yarn add iztro
```

== pnpm

```sh
pnpm add -S iztro
```

== bun

```sh
bun add -S iztro
```

:::

Sau khi cài đặt thành công, danh sách phụ thuộc trong `package.json` sẽ có `iztro`.

```json
"dependencies": {
  "iztro": "^1.1.0"
}
```

> Số phiên bản có thể thay đổi

### Sử dụng thư viện JS thuần túy <Badge type="warning" text="^2.0.4" />   {#纯js库使用}

Sau phiên bản `v2.0.4`, thư viện cung cấp bản JavaScript thuần ở định dạng `umd`. Bạn có thể tải `🗜️iztro-min-js.tar.gz` từ [các tệp đính kèm bản phát hành](https://github.com/SylarLong/iztro/releases). Gói nén chứa tệp JavaScript đã rút gọn và bản đồ mã nguồn tương ứng.

Từ `v2.6.0`, mỗi bản phát hành tạo cả tệp có số phiên bản (ví dụ `iztro-v2.6.0.min.js`) và tệp `iztro.min.js` tương thích với cách tham chiếu trước đây. Trong môi trường vận hành thực tế, nên dùng tệp có số phiên bản để tránh việc cùng một địa chỉ CDN cung cấp nội dung khác sau khi có bản phát hành mới.

Bạn cũng có thể tải thư viện trực tiếp từ `CDN` bằng một trong các URL dưới đây. URL không ghi số phiên bản sẽ cung cấp bản phát hành mới nhất.

- jsdelivr

  - https://cdn.jsdelivr.net/npm/iztro/dist/iztro.min.js
  - https://cdn.jsdelivr.net/npm/iztro@2.6.2/dist/iztro-v2.6.2.min.js

- unpkg

  - https://unpkg.com/iztro/dist/iztro.min.js
  - https://unpkg.com/iztro@2.6.2/dist/iztro-v2.6.2.min.js

Bạn cũng có thể chỉ định các phiên bản bằng các quy tắc sau:

- `iztro@2`
- `iztro@^2.6.2`
- `iztro@2.6.2`

## Bắt đầu   {#开始使用}

### Nhập thư viện {#引入代码}

Bạn có thể nhập thư viện `iztro` như sau:

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";
```

== CommonJS

```js
var iztro = require("iztro");
```

== HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>iztro-紫微斗数开源库</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/iztro@2.6.2/dist/iztro-v2.6.2.min.js"></script>
    <script>
      // 获取一张星盘数据
      var astrolabe = iztro.astro.bySolar('2000-8-16', 2, '男', true, 'zh-CN');
    </script>
  </body>
</html>
```

:::

### Lấy dữ liệu lá số {#获取星盘数据}

Bạn có thể lập lá số Tử Vi Đẩu Số（紫微斗數） từ ngày `âm lịch` hoặc `lịch Gregory`. `iztro` hỗ trợ cả hai cách, nhưng chúng tôi khuyên dùng `lịch Gregory`. Khi nhập hai ngày tương ứng với nhau, cả hai cách đều trả về cùng dữ liệu lá số.

::: info Ưu điểm khi dùng ngày `dương lịch`:

- Ngày dương lịch có thể dễ dàng đối chiếu với giấy khai sinh.
- Có thể dùng công cụ chọn ngày dạng lịch để nhập ngày sinh.
- Ngày nay, nhiều người không nhớ được ngày âm lịch.
- Dùng ngày dương lịch giúp tránh nhầm lẫn do bỏ sót thông tin tháng nhuận.
  :::

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// 通过阳历获取星盘信息
const astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 通过农历获取星盘信息
const astrolabe = astro.byLunar("2000-7-17", 2, "女");
```

== CommonJS

```js
var { astro } = require("iztro");

// 通过阳历获取星盘信息
var astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 通过农历获取星盘信息
var astrolabe = astro.byLunar("2000-7-17", 2, "女", false);
```

:::

Hai lời gọi `bySolar` và `byLunar` ở trên trả về cùng một kết quả. Khi xử lý nội bộ, `byLunar` chuyển ngày sang `lịch Gregory` rồi gọi `bySolar`. Kết quả bên dưới được thu gọn vì khá dài. Bạn có thể mở ra để đối chiếu với kết quả lời gọi của mình.

::: details Kết quả thực thi phương thức `astro.bySolar()` và `astro.byLunar()`

```ts
{
  // 阳历日期
  solarDate: '2000-8-16',
   // 农历日期
  lunarDate: '二〇〇〇年七月十七',
  // 四柱
  chineseDate: '庚辰 甲申 丙午 庚寅',
  // 时辰
  time: '寅时',
  // 时辰对应的时间段
  timeRange: '03:00~05:00',
  // 星座
  sign: '狮子座',
  // 生肖
  zodiac: '龙',
  // 命宫地支
  earthlyBranchOfSoulPalace: '午',
  // 身宫地支
  earthlyBranchOfBodyPalace: '戌',
  // 命主
  soul: '破军',
  // 身主
  body: '文昌',
  // 五行局
  fiveElementsClass: '木三局',
  // 十二宫数据
  palaces: [
    {
      // 宫名
      name: '财帛',
      // 是否身宫
      isBodyPalace: false,
      // 是否来因宫
      isOriginalPalace: false,
      // 宫位天干
      heavenlyStem: '戊',
      // 宫位地支
      earthlyBranch: '寅',
      // 主星（含天马禄存）
      majorStars: [
        { name: '武曲', type: 'major', scope: 'origin', brightness: '得' },
        { name: '天相', type: 'major', scope: 'origin', brightness: '庙' },
        { name: '天马', type: 'tianma', scope: 'origin', brightness: '' },
      ],
      // 辅星（含六吉六煞）
      minorStars: [],
      // 杂曜
      adjectiveStars: [
        { name: '月解', type: 'helper', scope: 'origin' },
        { name: '三台', type: 'adjective', scope: 'origin' },
        { name: '天寿', type: 'adjective', scope: 'origin' },
        { name: '天巫', type: 'adjective', scope: 'origin' },
        { name: '天厨', type: 'adjective', scope: 'origin' },
        { name: '阴煞', type: 'adjective', scope: 'origin' },
        { name: '天哭', type: 'adjective', scope: 'origin' },
      ],
      // 长生12神
      changsheng12: '绝',
      // 博士12神
      boshi12: '蜚廉',
      // 流年将前12神
      jiangqian12: '岁驿',
      // 流年岁前12神
      suiqian12: '吊客',
      // 大限
      stage: { range: [44, 53], heavenlyStem: '戊' },
      // 小限
      ages: [9, 21, 33, 45, 57, 69, 81],
    },
    {
      name: '子女',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '己',
      earthlyBranch: '卯',
      majorStars: [
        { name: '太阳', type: 'major', scope: 'origin', brightness: '庙' },
        { name: '天梁', type: 'major', scope: 'origin', brightness: '庙' },
      ],
      minorStars: [],
      adjectiveStars: [{ name: '天刑', type: 'adjective', scope: 'origin' }],
      changsheng12: '墓',
      boshi12: '奏书',
      jiangqian12: '息神',
      suiqian12: '病符',
      stage: { range: [34, 43], heavenlyStem: '己' },
      ages: [8, 20, 32, 44, 56, 68, 80],
    },
    {
      name: '夫妻',
      isBodyPalace: false,
      isOriginalPalace: true,
      heavenlyStem: '庚',
      earthlyBranch: '辰',
      majorStars: [{ name: '七杀', type: 'major', scope: 'origin', brightness: '庙' }],
      minorStars: [
        { name: '右弼', type: 'soft', scope: 'origin', brightness: '' },
        { name: '火星', type: 'tough', scope: 'origin', brightness: '陷' },
      ],
      adjectiveStars: [
        { name: '封诰', type: 'adjective', scope: 'origin' },
        { name: '华盖', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '死',
      boshi12: '将军',
      jiangqian12: '华盖',
      suiqian12: '岁建',
      stage: { range: [24, 33], heavenlyStem: '庚' },
      ages: [7, 19, 31, 43, 55, 67, 79],
    },
    {
      name: '兄弟',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '辛',
      earthlyBranch: '巳',
      majorStars: [{ name: '天机', type: 'major', scope: 'origin', brightness: '平' }],
      minorStars: [],
      adjectiveStars: [
        { name: '天喜', type: 'flower', scope: 'origin' },
        { name: '天空', type: 'adjective', scope: 'origin' },
        { name: '孤辰', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '病',
      boshi12: '小耗',
      jiangqian12: '劫煞',
      suiqian12: '晦气',
      stage: { range: [14, 23], heavenlyStem: '辛' },
      ages: [6, 18, 30, 42, 54, 66, 78],
    },
    {
      name: '命宫',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '壬',
      earthlyBranch: '午',
      majorStars: [{ name: '紫微', type: 'major', scope: 'origin', brightness: '庙' }],
      minorStars: [{ name: '文曲', type: 'soft', scope: 'origin', brightness: '陷' }],
      adjectiveStars: [
        { name: '年解', type: 'helper', scope: 'origin' },
        { name: '凤阁', type: 'adjective', scope: 'origin' },
        { name: '天福', type: 'adjective', scope: 'origin' },
        { name: '截路', type: 'adjective', scope: 'origin' },
        { name: '蜚廉', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '衰',
      boshi12: '青龙',
      jiangqian12: '灾煞',
      suiqian12: '丧门',
      stage: { range: [4, 13], heavenlyStem: '壬' },
      ages: [5, 17, 29, 41, 53, 65, 77],
    },
    {
      name: '父母',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '癸',
      earthlyBranch: '未',
      majorStars: [],
      minorStars: [
        { name: '天钺', type: 'soft', scope: 'origin', brightness: '' },
        { name: '陀罗', type: 'tough', scope: 'origin', brightness: '庙' },
      ],
      adjectiveStars: [
        { name: '天姚', type: 'flower', scope: 'origin' },
        { name: '空亡', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '帝旺',
      boshi12: '力士',
      jiangqian12: '天煞',
      suiqian12: '贯索',
      stage: { range: [114, 123], heavenlyStem: '癸' },
      ages: [4, 16, 28, 40, 52, 64, 76],
    },
    {
      name: '福德',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '甲',
      earthlyBranch: '申',
      majorStars: [
        { name: '破军', type: 'major', scope: 'origin', brightness: '得' },
        { name: '禄存', type: 'lucun', scope: 'origin', brightness: '' },
      ],
      minorStars: [{ name: '文昌', type: 'soft', scope: 'origin', brightness: '得' }],
      adjectiveStars: [
        { name: '龙池', type: 'adjective', scope: 'origin' },
        { name: '台辅', type: 'adjective', scope: 'origin' },
        { name: '旬空', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '临官',
      boshi12: '博士',
      jiangqian12: '指背',
      suiqian12: '官符',
      stage: { range: [104, 113], heavenlyStem: '甲' },
      ages: [3, 15, 27, 39, 51, 63, 75],
    },
    {
      name: '田宅',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '乙',
      earthlyBranch: '酉',
      majorStars: [],
      minorStars: [
        { name: '地空', type: 'tough', scope: 'origin', brightness: '' },
        { name: '擎羊', type: 'tough', scope: 'origin', brightness: '陷' },
      ],
      adjectiveStars: [
        { name: '咸池', type: 'flower', scope: 'origin' },
        { name: '天贵', type: 'adjective', scope: 'origin' },
        { name: '月德', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '冠带',
      boshi12: '官府',
      jiangqian12: '咸池',
      suiqian12: '小耗',
      stage: { range: [94, 103], heavenlyStem: '乙' },
      ages: [2, 14, 26, 38, 50, 62, 74],
    },
    {
      name: '官禄',
      isBodyPalace: true,
      isOriginalPalace: false,
      heavenlyStem: '丙',
      earthlyBranch: '戌',
      majorStars: [
        { name: '廉贞', type: 'major', scope: 'origin', brightness: '利' },
        { name: '天府', type: 'major', scope: 'origin', brightness: '庙' },
      ],
      minorStars: [{ name: '左辅', type: 'soft', scope: 'origin', brightness: '' }],
      adjectiveStars: [
        { name: '天才', type: 'adjective', scope: 'origin' },
        { name: '天虚', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '沐浴',
      boshi12: '伏兵',
      jiangqian12: '月煞',
      suiqian12: '大耗',
      stage: { range: [84, 93], heavenlyStem: '丙' },
      ages: [1, 13, 25, 37, 49, 61, 73],
    },
    {
      name: '仆役',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '丁',
      earthlyBranch: '亥',
      majorStars: [{ name: '太阴', type: 'major', scope: 'origin', brightness: '庙' }],
      minorStars: [],
      adjectiveStars: [
        { name: '红鸾', type: 'flower', scope: 'origin' },
        { name: '恩光', type: 'adjective', scope: 'origin' },
        { name: '天官', type: 'adjective', scope: 'origin' },
        { name: '天月', type: 'adjective', scope: 'origin' },
        { name: '天伤', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '长生',
      boshi12: '大耗',
      jiangqian12: '亡神',
      suiqian12: '龙德',
      stage: { range: [74, 83], heavenlyStem: '丁' },
      ages: [12, 24, 36, 48, 60, 72, 84],
    },
    {
      name: '迁移',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '戊',
      earthlyBranch: '子',
      majorStars: [{ name: '贪狼', type: 'major', scope: 'origin', brightness: '旺' }],
      minorStars: [{ name: '铃星', type: 'tough', scope: 'origin', brightness: '陷' }],
      adjectiveStars: [{ name: ' 八座', type: 'adjective', scope: 'origin' }],
      changsheng12: '养',
      boshi12: '病符',
      jiangqian12: '将星',
      suiqian12: '白虎',
      stage: { range: [64, 73], heavenlyStem: '戊' },
      ages: [11, 23, 35, 47, 59, 71, 83],
    },
    {
      name: '疾厄',
      isBodyPalace: false,
      isOriginalPalace: false,
      heavenlyStem: '己',
      earthlyBranch: '丑',
      majorStars: [
        { name: '天同', type: 'major', scope: 'origin', brightness: '不' },
        { name: '巨门', type: 'major', scope: 'origin', brightness: '不' },
      ],
      minorStars: [
        { name: '天魁', type: 'soft', scope: 'origin', brightness: '' },
        { name: '地劫', type: 'tough', scope: 'origin', brightness: '' },
      ],
      adjectiveStars: [
        { name: '天德', type: 'adjective', scope: 'origin' },
        { name: '寡宿', type: 'adjective', scope: 'origin' },
        { name: '破碎', type: 'adjective', scope: 'origin' },
        { name: '天使', type: 'adjective', scope: 'origin' },
      ],
      changsheng12: '胎',
      boshi12: '喜神',
      jiangqian12: '攀鞍',
      suiqian12: '天德',
      stage: { range: [54, 63], heavenlyStem: '己' },
      ages: [10, 22, 34, 46, 58, 70, 82],
    },
  ],
}
```

:::

### Chữ ký phương thức {#方法定义}

- Lấy dữ liệu lá số（星盤） từ ngày dương lịch

  `astro`.`bySolar(solarDateStr, timeIndex, gender, fixLeap, language)`

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | solarDateStr | `string` | `true` | - | Ngày Gregorian \[YYYY-M-D\] |
    | timeIndex | `number` | `true` | - | Chỉ số giờ sinh [0–12], từ giờ Tý sớm (0) đến giờ Tý muộn (12) |
    | gender | `string` | `true` | - | Giới tính\[Nam/Nữ\] |
    | fixLeap | `boolean` | `false` | `true` | Có điều chỉnh tháng nhuận hay không. Nếu là `true`, nửa đầu tháng nhuận được tính vào tháng trước, nửa sau vào tháng tiếp theo. |
    | language | `Language` | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

  - giá trị trả về

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

- Lấy dữ liệu lá số（星盤） từ ngày âm lịch

  `astro`.`byLunar(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language)`

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | lunarDateStr | `string` | `true` | - | Ngày âm lịch [YYYY-M-D]. Với `năm 2000 âm lịch, tháng 7, ngày 17`, truyền `2000-7-17`. |
    | timeIndex | `number` | `true` | - | Chỉ số giờ sinh [0–12], từ giờ Tý sớm (0) đến giờ Tý muộn (12) |
    | gender | `string` | `true` | - | Giới tính\[Nam/Nữ\] |
    | isLeapMonth | `boolean` | `false` | `false` | Tháng âm lịch được nhập có phải tháng nhuận hay không; tham số không có tác dụng nếu tháng đó không có tháng nhuận tương ứng. |
    | fixLeap | `boolean` | `false` | `true` | Có điều chỉnh tháng nhuận hay không. Nếu là `true`, nửa đầu tháng nhuận được tính vào tháng trước, nửa sau vào tháng tiếp theo. |
    | language | `Language` | `false` | `zh-CN` | Dữ liệu trả về sử dụng ngôn ngữ được chỉ định. Các giá trị được hỗ trợ là `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP` và `vi-VN`. |

  - giá trị trả về

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

## Lấy dữ liệu vận hạn {#获取运限}

Các chu kỳ vận hạn trong Tử Vi Đẩu Số（紫微斗數） gồm `Đại Hạn`（大限）, `Lưu Niên`（流年）, `Lưu Nguyệt`（流月）, `Lưu Nhật`（流日）, `Lưu Thì`（流時）, `vận hạn theo phút`（流分） và `vận hạn theo giây`（流秒）. Hiện chúng tôi chưa cung cấp `vận hạn theo phút`（流分） và `vận hạn theo giây`（流秒） vì ít có nhu cầu sử dụng. Các chu kỳ `Đại Hạn`（大限）, `Lưu Niên`（流年）, `Lưu Nguyệt`（流月）, `Lưu Nhật`（流日） và `Lưu Thì`（流時） đã đáp ứng phần lớn nhu cầu; bạn có thể dễ dàng lấy dữ liệu này bằng `iztro`.

:::tabs
== ES6 Module

```ts
import { astro } from "iztro";

// 通过阳历获取星盘信息
const astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 获取运限数据
astrolabe.horoscope(new Date());
```

== CommonJS

```js
var { astro } = require("iztro");

// 通过阳历获取星盘信息
var astrolabe = astro.bySolar("2000-8-16", 2, "女");

// 获取运限数据
astrolabe.horoscope(new Date());
```

:::

Sau khi gọi phương thức `astrolabe`.`horoscope()`, bạn sẽ nhận được dữ liệu sau

::: details Phương thức `horoscope()` trả về dữ liệu

```ts
{
  solarDate: "2023-8-28"
  lunarDate: "二〇二三年七月十三"
  decadal: {
    index: 2
    heavenlyStem: "庚"
    earthlyBranch: "辰"
    palaceNames: ["夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛", "子女"]
    mutagen: ["太阳", "武曲", "太阴", "天同"]
    stars: [{name: "运马", type: "tianma", scope: "decadal"}], …]
    age: {
      index: 10
      nominalAge: 23
    }
  },
  yearly: {
    index: 1
    heavenlyStem: "癸"
    earthlyBranch: "卯"
    palaceNames: ["兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛", "子女", "夫妻"]
    mutagen: ["破军", "巨门", "太阴", "贪狼"]
    stars: [[], [{name: "流魁", type: "soft", scope: "yearly"}, …], [], …]
  },
  monthly: {
  index: 3
    heavenlyStem: "庚"
    earthlyBranch: "申"
    palaceNames: ["子女", "夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛"]
    mutagen: ["太阳", "武曲", "太阴", "天同"]
  },
  daily: {
    index: 3
    heavenlyStem: "戊"
    earthlyBranch: "午"
    palaceNames: ["子女", "夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛"]
    mutagen: ["贪狼", "太阴", "右弼", "天机"]
  },
  hourly: {
    index: 3
    heavenlyStem: "壬"
    earthlyBranch: "子"
    palaceNames: ["子女", "夫妻", "兄弟", "命宫", "父母", "福德", "田宅", "官禄", "仆役", "迁移", "疾厄", "财帛"]
    mutagen: ["天梁", "紫微", "左辅", "武曲"]
  }
}
```

:::

> Lưu ý: Dữ liệu vận hạn có thể khác ví dụ trên tùy theo ngày giờ bạn truyền vào, nhưng cấu trúc dữ liệu vẫn giống nhau.

### Chữ ký phương thức {#方法定义-1}

- Lấy dữ liệu vận hạn cho lá số（星盤） hiện tại

  `astrolabe`.`horoscope(date, timeIndex)`

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | date | `string`  \|  `Date` | `false` | `new Date()` | Chuỗi ngày dương lịch hoặc đối tượng ngày. Nếu đã có thông tin về giờ, có thể bỏ qua `timeIndex`. |
    | timeIndex | `number` | `false` | `0` | Chỉ số giờ theo hệ mười hai thời thần. Nếu bỏ qua, chương trình lấy giờ từ `date` để tính chỉ số. |

  - giá trị trả về

    [`Horoscope`](./type-definition.html#horoscope)

## Lấy dữ liệu lưu diệu（流曜） {#获取流曜}

Kết quả của `horoscope()` đã bao gồm lưu diệu（流曜） của `Đại Hạn`（大限） và `Lưu Niên`（流年）, nên thường không cần truy xuất riêng. Nếu cần lấy riêng các sao này, hãy dùng phương thức sau.

:::tabs
== ES6 Module

```ts
import { star } from "iztro";

// 通过天干地支获取流曜
const horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

== CommonJS

```js
var { star } = require("iztro");

// 通过天干地支获取流曜
var horoscopeStars = star.getHoroscopeStar("庚", "辰", "decadal");
```

:::

Sau khi gọi phương thức `star`.`getHoroscopeStar()`, bạn sẽ nhận được dữ liệu sau

::: details Phương thức `getHoroscopeStar()` trả về dữ liệu

```ts
[
  [{ name: "运马", type: "tianma", scope: "decadal" }],
  [{ name: "运曲", type: "soft", scope: "decadal" }],
  [],
  [{ name: "运喜", type: "flower", scope: "decadal" }],
  [],
  [
    { name: "运钺", type: "soft", scope: "decadal" },
    { name: "运陀", type: "tough", scope: "decadal" },
  ],
  [{ name: "运禄", type: "lucun", scope: "decadal" }],
  [{ name: "运羊", type: "tough", scope: "decadal" }],
  [],
  [
    { name: "运昌", type: "soft", scope: "decadal" },
    { name: "运鸾", type: "flower", scope: "decadal" },
  ],
  [],
  [{ name: "运魁", type: "soft", scope: "decadal" }],
];
```

:::

### Chữ ký phương thức {#方法定义-2}

- Lấy lưu diệu（流曜） từ `thiên can`（天干） và `địa chi`（地支）

  `star`.`getHoroscopeStar(heavenlyStem, earthlyBranch, scope)`

  - Tham số

    | Tham số | Kiểu | Bắt buộc? | Giá trị mặc định | Mô tả |
    | --- | --- | --- | --- | --- |
    | heavenlyStem | `HeavenlyStemName` | `true` | - | thiên can（天干） |
    | earthlyBranch | `EarthlyBranchName` | `true` | - | địa chi（地支） |
    | scope | `'decadal'`  \|  `'yearly'` | `true` | - | Chọn lưu diệu（流曜） của đại hạn hoặc lưu niên. Sao đại hạn mang `tiền tố đại hạn`, sao lưu niên mang `tiền tố lưu niên`. `Niên Giải`（年解） chỉ có trong lưu diệu của lưu niên. |

  - giá trị trả về

    [`Star[][]`](./type-definition.html#star)

## ☕ Tóm tắt   {#☕-总结}

Nếu chương trình này hữu ích với bạn, bạn có thể ủng hộ tôi một ly cà phê không? 👍 [PayPal Me](https://PayPal.Me/sylarlong)

Dữ liệu trên có thể dùng để tạo lá số（星盤） bên dưới. Dữ liệu `palaces` được điền vào cả 12 cung（宮位）, còn các dữ liệu khác được điền vào phần trung tâm của lá số. Hình minh họa được tạo bằng một phiên bản cũ nên cách hiển thị lưu diệu（流曜） khác với kết quả hiện tại. Hãy lấy dữ liệu thực tế trả về làm căn cứ.

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## 📜 Bản quyền   {#📜-版权}

MIT License

Copyright &copy; 2023 Sylar Long

Vui lòng sử dụng mã nguồn mở này một cách hợp lý và nghiêm cấm sử dụng nó cho các mục đích bất hợp pháp.

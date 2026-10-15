---
title: "iztro 공식 문서"
description: "iztro 설치부터 자미두수 명반 데이터 생성까지 코드 예제로 안내합니다."
---

<div align="center">

<h1 class="brand-name text-clip">IZTRO</h1>

자미두수（紫微斗數） 명반 데이터를 얻기 위한 가벼운 JavaScript 오픈 소스 라이브러리입니다.

</div>

## 서문   {#前言}

`iztro` 개발 문서에 오신 것을 환영합니다! 이 페이지에서는 라이브러리 연동 방법, 데이터 조회 방법, 자미두수（紫微斗數） 명반（星盤）의 모든 데이터를 빠르게 얻는 방법을 설명합니다. 기본적인 기능을 일상적으로 사용하려면 이 문서의 내용으로 충분합니다. 내용을 익힌 뒤에는 다른 페이지에서 더 자세히 살펴보세요. 자미두수에 관심은 있지만 기초 지식이 없다면 [기초 지식](/ko_KR/learn/basis.md)부터 읽어 보세요.

::: info 다음 정보를 얻게 됩니다:

- `iztro`를 코드에 설치하고 통합하는 방법
- 명반（星盤）을 얻는 방법
- 명반（星盤）을 바탕으로 궁위（宮位）를 분석하는 방법
- 궁위（宮位） 데이터를 바탕으로 성요（星曜）를 분석하는 방법
  :::

## 제품   {#产品}

|  | 이름 | 링크 | 언어 | 작성자 |
| --- | --- | --- | --- | --- |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" /> | iztro | [GitHub](https://github.com/sylarlong/iztro)  ｜  [Gitee](https://gitee.com/sylarlong/iztro) | Typescript | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/react-iztro.svg?style=social&label=Star" alt="react-iztro" /> | react-iztro | [GitHub](https://github.com/sylarlong/react-iztro)  ｜  [Gitee](https://gitee.com/sylarlong/react-iztro) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/sylarlong/iztro-hook.svg?style=social&label=Star" alt="iztro-hook" /> | iztro-hook | [GitHub](https://github.com/sylarlong/iztro-hook)  ｜  [Gitee](https://gitee.com/sylarlong/iztro-hook) | React | [SylarLong](https://github.com/SylarLong) |
| <img src="https://img.shields.io/github/stars/x-haose/py-iztro.svg?style=social&label=Star" alt="py-iztro" /> | py-iztro | [GitHub](https://github.com/x-haose/py-iztro)  ｜  [Gitee](https://gitee.com/x-haose/py-iztro) | Python | [하오세 평신도](https://github.com/x-haose) |
| <img src="https://img.shields.io/github/stars/EdwinXiang/dart_iztro.svg?style=social&label=Star" alt="py-iztro" /> | dart_iztro | [GitHub](https://github.com/EdwinXiang/dart_iztro)  ｜  [Gitee](https://gitee.com/EdwinXiang/dart_iztro) | Dart | [EdwinXiang](https://github.com/EdwinXiang) |

## 설치   {#安装}

### 패키지 관리자로 설치하기 {#使用包管理安装}

익숙한 패키지 관리 도구를 사용하여 설치할 수 있습니다.

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

설치가 완료되면 `package.json`의 의존성 목록에서 `iztro`를 확인할 수 있습니다.

```json
"dependencies": {
  "iztro": "^1.1.0"
}
```

> 버전 번호는 다를 수 있습니다.

### 순수 JS 라이브러리 사용 <Badge type="warning" text="^2.0.4" />   {#纯js库使用}

`v2.0.4` 버전 이후에는 `umd` 형식의 순수 JavaScript 라이브러리가 제공됩니다. [릴리스 첨부 파일](https://github.com/SylarLong/iztro/releases)에서 `🗜️iztro-min-js.tar.gz`를 다운로드하세요. 이 압축 파일에는 압축된 JavaScript 파일과 해당 소스 맵이 들어 있습니다.

`v2.6.0`부터 각 릴리스는 버전 번호가 포함된 파일(예: `iztro-v2.6.0.min.js`)과 기존 참조 방식에 호환되는 `iztro.min.js`를 함께 생성합니다. 새 버전이 출시된 뒤 같은 CDN 주소가 다른 내용을 제공하는 일을 피하려면, 운영 환경에서는 버전 번호가 포함된 파일을 사용하는 것이 좋습니다.

아래 주소를 사용하면 `CDN`에서 라이브러리를 직접 불러올 수 있습니다. 버전 번호를 지정하지 않은 주소는 최신 버전을 제공합니다.

- jsdelivr

  - https://cdn.jsdelivr.net/npm/iztro/dist/iztro.min.js
  - https://cdn.jsdelivr.net/npm/iztro@2.6.2/dist/iztro-v2.6.2.min.js

- unpkg

  - https://unpkg.com/iztro/dist/iztro.min.js
  - https://unpkg.com/iztro@2.6.2/dist/iztro-v2.6.2.min.js

다음 규칙을 사용하여 버전을 지정할 수도 있습니다.

- `iztro@2`
- `iztro@^2.6.2`
- `iztro@2.6.2`

## 시작하기   {#开始使用}

### 라이브러리 가져오기 {#引入代码}

다음과 같이 코드에 `iztro`를 도입할 수 있습니다.

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

### 명반 데이터 가져오기 {#获取星盘数据}

자미두수（紫微斗數） 명반（星盤）은 `음력` 또는 `그레고리력` 날짜로 만들 수 있습니다. `iztro`는 두 방식을 모두 지원하지만, `그레고리력` 방식을 권장합니다. 같은 날짜를 입력하면 두 방식 모두 같은 명반 데이터를 반환합니다.

::: info `양력` 날짜를 사용하면 다음과 같은 장점이 있습니다.

- 출생증명서를 통해 쉽게 확인할 수 있습니다.
- 달력에서 날짜를 고르는 입력 도구를 사용할 수 있습니다.
- 요즘은 음력 날짜를 기억하기 어려워하는 사람이 많습니다.
- 윤달을 무시함으로써 발생하는 일련의 문제를 피할 수 있습니다.
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

위의 `bySolar`와 `byLunar` 호출은 같은 결과를 반환합니다. `byLunar`는 내부적으로 날짜를 `그레고리력`으로 변환한 뒤 `bySolar`를 호출하기 때문입니다. 아래의 실행 결과는 길어서 접어 두었습니다. 펼쳐서 자신의 호출 결과와 비교할 수 있습니다.

::: details `astro.bySolar()` 및 `astro.byLunar()` 메소드 실행 결과

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

### 메서드 정의 {#方法定义}

- 양력 날짜로 명반（星盤） 정보 얻기

  `astro`.`bySolar(solarDateStr, timeIndex, gender, fixLeap, language)`

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | solarDateStr | `string` | `true` | - | 그레고리력 날짜【YYYY-M-D】 |
    | timeIndex | `number` | `true` | - | 출생 시진 인덱스 [0–12]. 조자시(0)부터 만자시(12)까지에 대응합니다. |
    | gender | `string` | `true` | - | 성별【남성/여성】 |
    | fixLeap | `boolean` | `false` | `true` | 윤달 조정 여부. `true`이면 윤달의 전반부는 이전 달, 후반부는 다음 달로 계산합니다. |
    | language | `Language` | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

  - 반환 값

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

- 음력 날짜로 명반（星盤） 정보 얻기

  `astro`.`byLunar(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language)`

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | lunarDateStr | `string` | `true` | - | 음력 날짜 [YYYY-M-D]. 예를 들어 `2000년 7월 17일`이면 `2000-7-17`을 전달합니다. |
    | timeIndex | `number` | `true` | - | 출생 시진 인덱스 [0–12]. 조자시(0)부터 만자시(12)까지에 대응합니다. |
    | gender | `string` | `true` | - | 성별【남성/여성】 |
    | isLeapMonth | `boolean` | `false` | `false` | 입력한 음력 월이 윤달인지 여부. 해당 월에 윤달이 없으면 이 매개변수는 적용되지 않습니다. |
    | fixLeap | `boolean` | `false` | `true` | 윤달 조정 여부. `true`이면 윤달의 전반부는 이전 달, 후반부는 다음 달로 계산합니다. |
    | language | `Language` | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

  - 반환 값

    [`FunctionalAstrolabe`](./posts/astrolabe.md#functionalastrolabe)

## 운한 데이터 가져오기 {#获取运限}

자미두수（紫微斗數）의 운한은 `대한`（大限）, `유년`（流年）, `유월`（流月）, `유일`（流日）, `유시`（流時）, `분 단위 운한`（流分）, `초 단위 운한`（流秒）으로 나뉩니다. `분 단위 운한`（流分）과 `초 단위 운한`（流秒）은 사용되는 경우가 적어 현재는 제공하지 않습니다. `대한`（大限）, `유년`（流年）, `유월`（流月）, `유일`（流日）, `유시`（流時）로 대부분의 요구 사항을 충족할 수 있으며, `iztro`를 사용하면 이러한 데이터를 쉽게 얻을 수 있습니다.

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

`astrolabe`.`horoscope()` 메서드를 호출하면 다음 데이터를 얻게 됩니다.

::: details `horoscope()` 메소드가 데이터를 반환합니다.

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

> 참고: 입력한 날짜와 시간에 따라 운한 데이터는 위의 예시와 달라질 수 있지만, 데이터 구조는 같습니다.

### 메서드 정의 {#方法定义-1}

- 현재 명반（星盤）의 운한 정보 얻기

  `astrolabe`.`horoscope(date, timeIndex)`

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | date | `string`  \|  `Date` | `false` | `new Date()` | 양력 날짜 문자열 또는 날짜 객체. 시각 정보가 포함되어 있으면 `timeIndex`를 생략할 수 있습니다. |
    | timeIndex | `number` | `false` | `0` | 시진 인덱스. 생략하면 `date`에서 시각을 읽어 시진 인덱스로 변환합니다. |

  - 반환 값

    [`Horoscope`](./type-definition.html#horoscope)

## 유요（流曜） 데이터 가져오기 {#获取流曜}

`horoscope()`의 결과에는 `대한`（大限）과 `유년`（流年）의 유요（流曜）가 이미 포함됩니다. 보통은 별도로 조회할 필요가 없습니다. 따로 조회해야 하는 경우에는 다음 메서드를 사용하세요.

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

`star`.`getHoroscopeStar()` 메서드를 호출하면 다음 데이터를 얻게 됩니다.

::: details `getHoroscopeStar()` 메소드가 데이터를 반환합니다.

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

### 메서드 정의 {#方法定义-2}

- `천간`（天干）과 `지지`（地支）로 유요（流曜） 얻기

  `star`.`getHoroscopeStar(heavenlyStem, earthlyBranch, scope)`

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | heavenlyStem | `HeavenlyStemName` | `true` | - | 천간（天干） |
    | earthlyBranch | `EarthlyBranchName` | `true` | - | 지지（地支） |
    | scope | `'decadal'`  \|  `'yearly'` | `true` | - | 대한 또는 유년의 유요（流曜）를 선택합니다. 대한의 별에는 `대한 표지`, 유년의 별에는 `유년 표지`를 붙입니다. `해신(년)`（年解）은 유년의 유요에만 나타납니다. |

  - 반환 값

    [`Star[][]`](./type-definition.html#star)

## ☕ 요약 {#☕-总结}

이 프로그램이 도움이 되었다면 커피 한 잔 값으로 후원해 주시겠어요? 👍 [PayPal Me](https://PayPal.Me/sylarlong)

위의 데이터로 아래와 같은 명반（星盤）을 만들 수 있습니다. `palaces` 데이터는 12개 궁위（宮位）를 채우고, 나머지 데이터는 명반의 중앙 영역을 채웁니다. 이 이미지는 오래된 버전으로 만든 것이므로, 표시된 유요（流曜）가 현재 결과와 다를 수 있습니다. 실제 반환 데이터를 기준으로 확인하세요.

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## 📜 저작권   {#📜-版权}

MIT License

Copyright &copy; 2023 Sylar Long

본 오픈소스 코드를 합리적으로 사용하시기 바라며, 불법적인 목적으로의 사용을 금지합니다.

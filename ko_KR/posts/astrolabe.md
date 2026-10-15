---
title: "iztro astro API: 명반 생성과 분석"
outline: deep
description: "iztro의 astro API로 명반을 생성하고 조회하는 방법과 명반의 속성·메서드를 코드 예제로 설명합니다."
---

# 명반（星盤）   {#星盘}

## 서문   {#前言}

자미두수（紫微斗數） 명반은 `열두 궁`과 `중궁`으로 구성됩니다. 각 궁의 `지지`（地支）는 고정되어 있고, 순서는 `인`（寅）에서 시작하며 `자`（子）에서 시작하지 않습니다. 음력 정월이 인（寅）월이기 때문이며, 이를 `음력 정월은 인에 대응한다`（正月建寅）라고 합니다. `iztro`에서는 `인궁`（寅宮）의 인덱스가 `0`, `묘궁`（卯宮）의 인덱스가 `1`이고, 이후 시계방향으로 이어집니다. 아래 표를 참고하세요:

<table class="astrolabe">
    <tr>
        <td>사（巳）<code>3</code></td>
        <td>오（午）<code>4</code></td>
        <td>미（未）<code>5</code></td>
        <td>신（申）<code>6</code></td>
    </tr>
    <tr>
        <td>진（辰）<code>2</code></td>
        <td class="center-palace" rowspan="2" colspan="2">중궁</td>
        <td>유（酉）<code>7</code></td>
    </tr>
    <tr>
        <td>묘（卯）<code>1</code></td>
        <td>술（戌）<code>8</code></td>
    </tr>
    <tr>
        <td>인（寅）<code>0</code></td>
        <td>축（丑）<code>11</code></td>
        <td>자（子）<code>10</code></td>
        <td>해（亥）<code>9</code></td>
    </tr>
</table>

`중궁`에는 원하는 정보를 표시할 수 있으며, 보통 명반 전체의 해석에는 영향을 주지 않습니다. 주변의 `십이궁`（十二宮）에는 성요（星曜）, 사화（四化）, 운한（運限）, 궁 이름 등의 정보가 들어갑니다. `궁`（宮位）의 자세한 내용은 [궁 설명](./palace.md)을 참고하세요. 이 페이지는 명반 전체의 정보를 다룹니다. 명반은 궁과 별로 구성되므로, 개념이 낯설다면 [기초 지식](/ko_KR/learn/basis.md)부터 공부해 보세요.

`iztro`를 설치한 다음 아래 코드로 `명반 (astro)` 객체를 가져올 수 있습니다. `iztro` 설치 방법은 [설치 안내](/ko_KR/quick-start.md#安装)를 참고하세요.

## `astro`의 정적 메서드 {#astro-的静态方法}

객체의 정적 메서드를 사용하려면 먼저 `import`로 코드에 가져오세요.

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

### 명반 설정과 입력값 검증 <Badge type="warning" text="^2.6.2" /> {#排盘配置与输入校验}

`bySolar`, `byLunar`, `withOptions`가 반환하는 명반은 생성 당시의 설정과 언어를 저장합니다. 전역 기본 설정을 바꾸거나 다른 언어의 명반을 만들어도 기존 명반의 운한（運限）과 사화（四化） 분석은 바뀌지 않습니다.

`withOptions`의 `type`은 생략할 수 있으며 기본값은 양력입니다. `config`는 해당 명반의 설정만 덮어씁니다. 명반 생성과 날짜 보조 메서드에서 `language`를 생략하면 `zh-CN`을 사용하고, 특정 언어를 지정해도 다른 호출의 언어에는 영향을 주지 않습니다. 지원 값은 `zh-CN`, `zh-TW`, `en-US`, `ja-JP`, `ko-KR`, `vi-VN`입니다.

연도는 1~9999여야 하며 양력이나 음력에 실제로 존재하는 날짜여야 합니다. 날짜 문자열은 하이픈, 슬래시, 마침표로 구분할 수 있고 ` HH:mm` 또는 ` HH:mm:ss`를 덧붙일 수 있습니다. 과거 양력 날짜는 기반 달력의 율리우스력·그레고리력 전환 규칙을 따릅니다. 시각 인덱스는 0~12의 정수여야 합니다. 알 수 없는 성별·언어·날짜 유형·명반 유형이나 불리언이 아닌 윤달 옵션은 오류를 발생시킵니다. 음력 날짜는 실제 월별 일수로 검증하고, 윤달이 없는 달에는 `isLeapMonth: true`를 무시합니다.

설정의 적용 범위, `getConfig()`가 반환하는 독립 복사본, `resetConfig()`에 대해서는 [설정과 플러그인](./config-n-plugin.md)을 참고하세요.

### astrolabeBySolarDate <Badge type="danger" text="deprecated" /> {#astrolabebysolardate}

이 메서드는 `v2.0.5`에서 사용 중단 권고되었습니다. 매개변수와 반환 값은 같으므로 [`bySolar`](#bysolar)를 사용하세요.

### bySolar <Badge type="warning" text="^2.0.5" /> {#bysolar}

- 목적

  양력 날짜로 명반을 생성합니다.

- 정의

  ```ts
  export type bySolar = (
    solarDateStr: string,
    timeIndex: number,
    gender: GenderName,
    fixLeap: boolean = true,
    language: Language = "zh-CN"
  ) => FunctionalAstrolabe;
  ```

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | 그레고리력 날짜【YYYY-M-D】 |
  | timeIndex | `number` | `true` | - | 출생 시진 인덱스 [0–12]. 조자시(0)부터 만자시(12)까지에 대응합니다. |
  | gender | [`GenderName`](/ko_KR/type-definition.md#gendername) | `true` | - | 성별【남성/여성】 |
  | fixLeap | `boolean` | `false` | `true` | 윤달 조정 여부. `true`이면 윤달의 전반부는 이전 달, 후반부는 다음 달로 계산합니다. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 반환 값

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 예제

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
  ```

---

### astrolabeByLunarDate <Badge type="danger" text="deprecated" /> {#astrolabebylunardate}

이 메서드는 `v2.0.5`에서 사용 중단 권고되었습니다. 매개변수와 반환 값은 같으므로 [`byLunar`](#bylunar)를 사용하세요.

### byLunar <Badge type="warning" text="^2.0.5" /> {#bylunar}

- 목적

  음력 날짜로 명반을 생성합니다. 필자는 `bySolar`를 직접 사용하는 편을 권장합니다. 이 메서드도 음력을 양력으로 바꾼 뒤 `bySolar`를 호출해 결과를 구하기 때문입니다.

- 정의

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

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | 음력 날짜 [YYYY-M-D]. 예를 들어 `2000년 7월 17일`이면 `2000-7-17`을 전달합니다. |
  | timeIndex | `number` | `true` | - | 출생 시진 인덱스 [0–12]. 조자시(0)부터 만자시(12)까지에 대응합니다. |
  | gender | [`GenderName`](/ko_KR/type-definition.md#gendername) | `true` | - | 성별【남성/여성】 |
  | isLeapMonth | `boolean` | `false` | `false` | 입력한 음력 월이 윤달인지 여부. 해당 월에 윤달이 없으면 이 매개변수는 적용되지 않습니다. |
  | fixLeap | `boolean` | `false` | `true` | 윤달 조정 여부. `true`이면 윤달의 전반부는 이전 달, 후반부는 다음 달로 계산합니다. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 반환 값

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 예제

  ```ts
  import { astro } from "iztro";

  const astrolabe = astro.byLunar("2000-8-16", 2, "女", false, true, "zh-CN");
  ```

---

### withOptions <Badge type="warning" text="^2.4.1" /> {#withoptions}

- 목적

  `bySolar`와 `byLunar`를 편리하게 호출하도록 감싼 메서드로 명반을 생성합니다.

- 정의

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

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | type | `solar`  \|  `lunar` | `false` | `solar` | 날짜 유형 |
  | dateStr | `string` | `true` | - | YYYY-M-D 형식의 생년월일 |
  | timeIndex | `number` | `true` | - | 출생 시진 인덱스 [0–12]. 조자시(0)부터 만자시(12)까지에 대응합니다. |
  | gender | [`GenderName`](/ko_KR/type-definition.md#gendername) | `true` | - | 성별【남성/여성】 |
  | isLeapMonth | `boolean` | `false` | `false` | 입력한 음력 월이 윤달인지 여부. 해당 월에 윤달이 없으면 이 매개변수는 적용되지 않습니다. |
  | fixLeap | `boolean` | `false` | `true` | 윤달 조정 여부. `true`이면 윤달의 전반부는 이전 달, 후반부는 다음 달로 계산합니다. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |
  | config | [`Config`](../type-definition.md#config) | `false` | - | 이번에 생성하는 명반에만 밝기, 사화, 시간 경계 설정을 덮어씁니다 (^2.6.2). |
  | astroType  <Badge type="warning" text="^2.5.0" /> | [`AstroType`](../type-definition.md#astrotype) | `false` | `heaven` | 명반의 종류. `config.algorithm`이 `zhongzhou`일 때만 천반·지반·인반을 선택하는 데 사용합니다. |

- 반환 값

  [`FunctionalAstrolabe`](./astrolabe.md#functionalastrolabe)

- 예제

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

  :::tip 팁
  `astroType`에는 `heaven`, `earth`, `human`을 지정할 수 있습니다. 기본값 `heaven`은 천반（天盤）입니다. `earth`는 신궁（身宮）을 명궁（命宮）으로, `human`은 복덕궁（福德宮）을 명궁으로 삼습니다. 자세한 내용은 [`AstroType`](../type-definition.md#astrotype)을 참고하세요.
  :::

---

### getMajorStarBySolarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbysolardate}

- 목적

  양력 날짜로 명궁（命宮）의 주성（主星）을 가져옵니다.

- 정의

  ```ts
  type getMajorStarBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    fixLeap: boolean = true,
    language?: Language,
  ) => string;
  ```

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | 그레고리력 날짜【YYYY-M-D】 |
  | timeIndex | `number` | `true` | - | 출생 시진 인덱스 [0–12]. 조자시(0)부터 만자시(12)까지에 대응합니다. |
  | fixLeap | `boolean` | `false` | `true` | 윤달 조정 여부. `true`이면 윤달의 전반부는 이전 달, 후반부는 다음 달로 계산합니다. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 예제

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarBySolarDate('2023-4-7', 0);
  ```

---

### getMajorStarByLunarDate <Badge type="warning" text="^1.2.1" /> {#getmajorstarbylunardate}

- 목적

  음력 날짜로 명궁（命宮）의 주성（主星）을 가져옵니다.

- 정의

  ```ts
  type getMajorStarByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language?: Language,
  ) =>
  ```

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | 음력 날짜 [YYYY-M-D]. 예를 들어 `2000년 7월 17일`이면 `2000-7-17`을 전달합니다. |
  | timeIndex | `number` | `true` | - | 출생 시진 인덱스 [0–12]. 조자시(0)부터 만자시(12)까지에 대응합니다. |
  | isLeapMonth | `boolean` | `false` | `false` | 입력한 음력 월이 윤달인지 여부. 해당 월에 윤달이 없으면 이 매개변수는 적용되지 않습니다. |
  | fixLeap | `boolean` | `false` | `true` | 윤달 조정 여부. `true`이면 윤달의 전반부는 이전 달, 후반부는 다음 달로 계산합니다. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 예제

  ```ts
  import { astro } from 'isztro';

  const result = getMajorStarByLunarDate('2023-2-17', 0, true, false);
  ```

---

### getSignBySolarDate <Badge type="warning" text="^1.2.1" /> {#getsignbysolardate}

- 목적

  양력 날짜로 별자리를 구합니다.

- 정의

  ```ts
  type getSignBySolarDate = (
    solarDateStr: string,
    language?: Language
  ) => string;
  ```

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | 그레고리력 날짜【YYYY-M-D】 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 예제

  ```ts
  import { astro } from 'isztro';

  const result = getSignBySolarDate('2023-9-5');
  ```

---

### getSignByLunarDate <Badge type="warning" text="^1.2.1" /> {#getsignbylunardate}

- 목적

  음력 날짜로 별자리를 구합니다.

- 정의

  ```ts
  type getSignByLunarDate = (
    lunarDateStr: string,
    isLeapMonth?: boolean,
    language?: Language
  ) => string;
  ```

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | lunarDateStr | `string` | `true` | - | 음력 날짜 [YYYY-M-D]. 예를 들어 `2000년 7월 17일`이면 `2000-7-17`을 전달합니다. |
  | isLeapMonth | `boolean` | `false` | `false` | 입력한 음력 월이 윤달인지 여부. 해당 월에 윤달이 없으면 이 매개변수는 적용되지 않습니다. |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 예제

  ```ts
  import { astro } from 'isztro';

  const result = getSignByLunarDate('2023-7-21');
  ```


---

### getZodiacBySolarDate <Badge type="warning" text="^1.2.1" /> {#getzodiacbysolardate}

- 목적

  양력 날짜로 띠를 구합니다.

- 정의

  ```ts
  type getZodiacBySolarDate = (solarDateStr: string, language?: Language) => string;
  ```

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | solarDateStr | `string` | `true` | - | 그레고리력 날짜【YYYY-M-D】 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 예제

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacBySolarDate('2023-2-20');
  ```

---

### getZodiacByLunarYear <Badge type="warning" text="^1.2.1" /> {#getzodiacbylunaryear}

- 목적

  음력 연도로 띠를 구합니다.

- 정의

  ```ts
  type getZodiacByLunarYear = (year: number, language?: Language) => string;
  ```

- 매개변수

  | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
  | --- | --- | --- | --- | --- |
  | year | `number` | `true` | - | 음력 연도 |
  | language | [`Language`](../type-definition.md#language) | `false` | `zh-CN` | 반환 데이터에 사용할 언어입니다. `zh-CN`, `zh-TW`, `en-US`, `ko-KR`, `ja-JP`, `vi-VN`을 지원합니다. |

- 예제

  ```ts
  import { astro } from 'isztro';

  const result = getZodiacByLunarYear(2023);
  ```

---

## 클래스와 분석 메서드 {#功能类定义}

::: warning 개발 제안
`FunctionalAstrolabe`를 직접 생성하기보다 [astro의 정적 메서드](./astrolabe.md#astro-的静态方法)를 호출해 데이터를 가져오는 편을 권장합니다.
:::

### FunctionalAstrolabe {#functionalastrolabe}

---

<Badge type="tip" text="implements" /> `IFunctionalAstrolabe` <Badge type="tip" text="extends" /> [`Astrolabe`](../type-definition.md#astrolabe)

이 클래스는 [Astrolabe](../type-definition.md#astrolabe)의 속성을 상속하고 명반 분석 메서드를 추가합니다. [`bySolar()`](./astrolabe.md#bysolar)와 [`byLunar()`](./astrolabe.md#bylunar)는 이 클래스의 인스턴스를 반환합니다.

- 인터페이스 정의

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

- 속성

  참조 [Astrolabe](../type-definition.md#astrolabe)

- 메서드

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 목적

    분석 기능이 있는 명반을 일반 JSON 객체로 변환합니다. 분석 메서드, 플러그인 함수, 실행 시점의 참조는 포함하지 않으며, 순환 참조도 안전하게 제외합니다.

  - 정의

    ```ts
    type toJSON = () => Astrolabe;
    ```

  - 매개변수

    없음

  - 반환 값

    [`Astrolabe`](../type-definition.md#astrolabe)

  - 예제

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.toJSON();
    ```

  ***

  ### use() <Badge type="warning" text="^2.3.0" /> {#use}

  - 목적

    현재 명반 인스턴스에 플러그인을 적용합니다. [`astro.loadPlugin()`](./config-n-plugin.md#插件)과 달리 `use()`는 이 인스턴스에만 영향을 줍니다.

  - 정의

    ```ts
    type use = (plugin: Plugin) => void;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | plugin | [`Plugin`](../type-definition.md#plugin) | `true` | - | 현재 명반에 적용할 플러그인 함수 |

  - 반환 값

    `void`

  - 예제

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

  - 목적

    운한（運限） 데이터를 가져옵니다. 호출 시점의 데이터를 구하려면 인수를 모두 생략할 수 있으며, 메서드는 현재 시스템 시간으로 계산합니다.

    :::warning 참고

    - `date`가 `YYYY-M-D` 형식의 날짜만 있는 문자열이고 `timeIndex`를 생략하면, `date` 날짜의 `조자시`를 `유시`（流時）의 시각으로 사용합니다.
    - `date`가 `YYYY-M-D HH` 형식의 시각을 포함하거나 `Date` 인스턴스이고 `timeIndex`를 생략하면, `date`의 시간을 전통 시각 구간으로 바꾸어 `유시`（流時）에 사용합니다.
    - `timeIndex`를 지정하면 날짜에서 구한 시각보다 우선합니다.
      :::

  - 정의

    ```ts
    type horoscope = (date?: string | Date, timeIndex?: number) => FunctionalHoroscope;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | date | `string`  \|  `Date` | `false` | `new Date()` | 그레고리력 날짜【YYYY-M-D】 |
    | timeIndex | `number` | `false` | `0` | 시진 인덱스 [0–12] |

  - 반환 값

    [`FunctionalHoroscope`](./horoscope.md#functionalhoroscope)

    :::danger 참고
    `v1.3.4`에서 반환 유형이 `Horoscope`에서 `FunctionalHoroscope`로 바뀌었지만, 기존 사용 방식과 호환됩니다.
    :::

  - 예제

    :::tabs
    == 매개변수가 전달되지 않았습니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope();
    ```

    == 날짜 문자열 전달

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

    == 날짜 객체 전달

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392));
    ```

    == 날짜 및 시간Index를 전달합니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const horoscope = astrolabe.horoscope(new Date(1693494208392), 3);
    ```

    :::

  ***

  ### decadalList() <Badge type="warning" text="^2.6.0" /> {#decadallist}

  - 목적

    대한（大限）을 시작 순서대로 나열한 목록을 가져옵니다. 배열 인덱스 `0`은 첫 번째 대한입니다. 각 항목에는 해당 궁, 시작·종료 시점의 세는나이（虛歲）와 연도, 간지, 사화（四化）, 유요（流曜）, 대한의 십이궁（十二宮）이 들어 있습니다.

  - 정의

    ```ts
    type decadalList = () => DecadalHoroscope[];
    ```

  - 반환 값

    [`DecadalHoroscope[]`](../type-definition.md#decadalhoroscope)

  - 예제

    ```ts
    const decadals = astrolabe.decadalList();
    const firstDecadal = decadals[0];
    ```

  ***

  ### yearlyList() <Badge type="warning" text="^2.6.0" /> {#yearlylist}

  - 목적

    대한（大限） 번호나 본명 궁의 이름으로 해당 대한의 유년（流年） 목록을 가져옵니다. 각 항목에는 세는나이（虛歲）, 연도, 유년의 간지, 사화（四化）, 유요（流曜）, 유년의 십이궁（十二宮）이 들어 있습니다.

  - 정의

    ```ts
    type yearlyList = (
      indexOrName: number | PalaceName
    ) => YearlyHoroscope[];
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 대한 인덱스(`0`은 첫 번째 대한) 또는 본명반의 궁 이름 |

  - 반환 값

    [`YearlyHoroscope[]`](../type-definition.md#yearlyhoroscope)

  - 예제

    ```ts
    const firstDecadalYearlies = astrolabe.yearlyList(0);
    const soulPalaceYearlies = astrolabe.yearlyList("命宫");
    ```

  ***

  ### monthlyList() <Badge type="warning" text="^2.6.0" /> {#monthlylist}

  - 목적

    지정한 연도의 유월（流月） 목록을 가져옵니다. 각 항목에는 세는나이（虛歲）, 연도, 월, 유월의 간지, 사화（四化）, 유요（流曜）, 유월의 십이궁（十二宮）이 들어 있습니다.

    윤달 규칙: 윤달이 없으면 12개 항목을 반환합니다. 윤달이 있고 `fixLeap=false`이면 13개를, `fixLeap=true`이면 윤달을 1~15일과 16일~월말로 나누어 14개를 반환합니다.

  - 정의

    ```ts
    type monthlyList = (
      year: number,
      fixLeap?: boolean
    ) => MonthlyHoroscope[];
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | year | `number` | `true` | - | 유년의 연도. `yearlyList()`가 반환한 항목의 `year` 값을 그대로 사용할 수 있습니다. |
    | fixLeap | `boolean` | `false` | `true` | 윤달의 전반부와 후반부를 나누어 계산할지 여부 |

  - 반환 값

    [`MonthlyHoroscope[]`](../type-definition.md#monthlyhoroscope)

  - 예제

    ```ts
    const year = astrolabe.yearlyList(0)[0].year;
    const adjusted = astrolabe.monthlyList(year);
    const unadjusted = astrolabe.monthlyList(year, false);
    ```

  ***

  ### star() <Badge type="warning" text="^1.2.0" /> {#star}

  - 목적

    별 이름으로 해당 별의 객체 인스턴스를 가져옵니다.

  - 정의

    ```ts
    type star = (starName: StarName) => IFunctionalStar;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | starName | [`StarName`](../type-definition.md#starname) | `true` | - | 별 이름 |

  - 반환 값

    [`FunctionalStar`](./star.md#functionalstar)

  - 예제

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 获取 `紫微星` 所在宫位
    const star = astrolabe.star("紫微");
    ```

  ***
  ### palace() <Badge type="warning" text="^1.0.0" /> {#palace}

  - 목적

    명반에서 지정한 `궁`（宮位）을 가져옵니다.

  - 정의

    ```ts
    type palace = (
      indexOrName: number | PalaceName
    ) => IFunctionalPalace | undefined;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁의 인덱스 또는 이름 |

  - 반환 값

    [`FunctionalPalace`](./palace.md#functionalpalace)

  - 예제

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

  - 목적

    `삼방사정`（三方四正）에 해당하는 궁들을 가져옵니다. 입력한 `대상 궁`, 그 `대궁`（對宮）, 상대적인 `재백 위치`（財帛位）와 `관록 위치`（官祿位）까지 총 네 궁입니다. `궁`과 `위치`는 다른 개념입니다. 궁과 삼방사정의 개념은 [궁 설명](./palace.md)을 참고하세요.

  - 정의

    ```ts
    type surroundedPalaces = (
      indexOrName: number | PalaceName
    ) => IFunctionalSurpalaces;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁의 인덱스 또는 이름 |

  - 반환 값

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces)

  - 예제

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

  :::danger 참고
  이 메서드는 `v1.2.0`에서 사용 중단 권고되었습니다. [FunctionalSurpalaces](palace.md#functionalsurpalaces)의 [have()](palace.md#have) 메서드를 사용하세요.
  :::

  - 목적

    지정한 궁의 `삼방사정`（三方四正）에 대상 `성요`（星曜）가 **모두** 있는 경우에만 `true`를 반환합니다.

  - 정의

    ```ts
    type isSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁의 인덱스 또는 이름 |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 별 이름 배열 |

  - 반환 값

    `boolean`

  - 예제

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

  :::danger 참고
  이 메서드는 `v1.2.0`에서 사용 중단 권고되었습니다. [FunctionalSurpalaces](palace.md#functionalsurpalaces)의 [haveOneOf()](palace.md#haveoneof) 메서드를 사용하세요.
  :::

  - 목적

    지정한 궁의 `삼방사정`（三方四正）에 입력한 별 중 `어느 하나`가 있는지 확인합니다. `하나`라도 있으면 `true`를 반환합니다.

  - 정의

    ```ts
    type isSurroundedOneOf = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁의 인덱스 또는 이름 |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 별 이름 배열 |

  - 반환 값

    `boolean`

  - 예제

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

  :::danger 참고
  이 메서드는 `v1.2.0`에서 사용 중단 권고되었습니다. [FunctionalSurpalaces](palace.md#functionalsurpalaces)의 [notHave()](palace.md#nothave-1) 메서드를 사용하세요.
  :::

  - 목적

    지정한 궁의 `삼방사정`（三方四正）에 대상 별을 `포함하지 않는지` 확인합니다. 모든 대상 별이 `없는` 경우에만 `true`를 반환합니다.

  - 정의

    ```ts
    type notSurrounded = (
      indexOrName: number | PalaceName,
      stars: StarName[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | indexOrName | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁의 인덱스 또는 이름 |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 별 이름 배열 |

  - 반환 값

    `boolean`

  - 예제

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    // 判断 `寅宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const palace = astrolabe.notSurrounded(0, ["天府", "红鸾", "禄存"]);

    // 判断 `命宫` 三方四正是否不含有 `天府` 星、`红鸾` 星和 `禄存` 星
    const soulPalace = astrolabe.notSurrounded("命宫", ["天府", "红鸾", "禄存"]);
    ```

---
title: "iztro horoscope API: 운한 조회와 분석"
outline: deep
description: "iztro의 horoscope API로 명반의 운한을 조회하는 방법과 관련 속성·메서드를 코드 예제로 설명합니다."
---

# 운한（運限）   {#运限}

<Badge type="warning" text="^2.6.2" /> 운한（運限） 조회는 명반을 생성할 때 저장된 설정과 언어를 사용합니다. 전역 기본값을 바꾸거나 다른 명반을 만들어도 기존 명반의 조회 결과는 바뀌지 않습니다. `horoscope()`는 유효한 `Date` 객체나 날짜 문자열을 받으며, 날짜를 생략하면 호출 시점의 현재 시간을 사용합니다. 시각 인덱스를 직접 지정할 때는 0~12의 정수여야 합니다. 유효하지 않은 날짜나 시각 인덱스는 오류를 발생시킵니다.

## 서문   {#前言}

자미두수（紫微斗數）의 운한（運限）에는 `대한`（大限）, `소한`（小限）, `유년`（流年）, `유월`（流月）, `유일`（流日）, `유시`（流時）, `분 단위 운한`（流分）, `초 단위 운한`（流秒） 등이 있습니다. 개념과 활용은 [운한 설명](/ko_KR/learn/horoscope.md)을 읽어 보세요. `iztro`는 `대한`（大限）, `소한`（小限）, `유년`（流年）, `유월`（流月）, `유일`（流日）, `유시`（流時）를 지원합니다. 이 중 `대한`（大限）, `유년`（流年）, `유월`（流月）, `유일`（流日）, `유시`（流時）는 `유요`（流曜）와 `사화`（四化）를 제공합니다. `유월`（流月）, `유일`（流日）, `유시`（流時）의 유요는 `v2.4.4`부터 제공됩니다. `소한`（小限）에는 독립적인 유요가 없고, `소한`（小限）의 사화는 해당 궁의 `궁간`（宮干）으로 계산합니다.

:::tip 팁
운한（運限）의 연·월 간지 경계는 명반에 저장된 [`horoscopeDivide`](./config-n-plugin.md#配置) 설정을 따릅니다. `ageDivide`는 세는나이（虛歲） 계산을 제어하며 대한（大限）과 소한（小限） 모두에 영향을 줍니다.
:::

### 세는나이와 궁 인덱스 {#虚岁与宫位索引}

기본값인 `ageDivide: 'normal'`은 전통적인 세는나이（虛歲）를 사용합니다. 태어날 때 한 살로 세고, 음력 설마다 한 살을 더합니다. 계산식은 “조회일의 음력 연도 − 출생일의 음력 연도 + 1”이며 양력 기준 만 나이와 다릅니다. `horoscopeDivide`는 이 나이 계산식을 바꾸지 않습니다.

`ageDivide: 'birthday'`는 다른 경계를 사용합니다. 음력 월일을 비교하여 음력 생일 당일까지는 음력 연도의 차이를 반환하고, 생일이 지난 뒤에만 1을 더합니다. 이 방식도 양력 기준 만 나이와 다릅니다.

예를 들어 양력 `1980-02-14` 출생일은 음력 `1979-12-28`이고, 조회일인 양력 `1990-02-14`는 음력 `1990-01-19`입니다. 따라서 전통적인 세는나이는 `1990 - 1979 + 1 = 12`입니다.

```ts
import { astro } from 'iztro';

astro.resetConfig();
astro.config({
  yearDivide: 'normal',
  horoscopeDivide: 'normal',
  ageDivide: 'normal',
  language: 'en-US',
});

const chart = astro.bySolar('1980-02-14', 0, 'male', true);
const horoscope = chart.horoscope('1990-02-14', 0);
console.log(horoscope.age.nominalAge); // 12
console.log(horoscope.decadal.index); // 10
console.log(horoscope.decadal.palaceNames[0]); // 'spirit'
```

이 명반은 수이국（水二局）으로 첫 대한（大限）은 세는나이 2–11세, 두 번째 대한은 12–21세입니다. 따라서 이미 두 번째 대한에 들어섰습니다. `decadal.index`는 현재 대한이 위치한 본명 궁의 인덱스입니다. 반면 `decadal.palaceNames[i]`는 고정 인덱스 `i`에 배치된 운한의 궁 이름이므로, `palaceNames[0]`을 현재 대한이 위치한 본명 궁의 이름으로 해석하면 안 됩니다. 이 예에서 두 번째 대한은 본명의 형제궁（兄弟）에 위치하며, 인덱스 0의 운한 궁 이름은 `spirit`（福德）입니다. 새 버전의 결과가 전통적인 세는나이 규칙에 맞습니다.

`v2.4.3`은 이 예에서 나이를 11로 계산하여 `parents`를 반환했습니다. 현재 버전에서도 `ageDivide: 'birthday'`를 선택하면 이 예에서는 나이 11과 `parents`가 나옵니다. 이 옵션에도 이후의 나이 계산 수정 사항이 적용되므로, 모든 결과를 `v2.4.3`과 같게 만드는 호환 설정은 아닙니다.


## 클래스와 분석 메서드 {#功能类定义}

:::warning 개발 제안

운한（運限）은 명반을 바탕으로 하므로, `new`로 직접 객체를 만들기보다 명반 인스턴스에서 가져오세요. 명반의 [`horoscope()`](./astrolabe.md#horoscope) 메서드가 운한 객체를 반환합니다.

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
const horoscope = astrolabe.horoscope('2023-10-26', 2);
```

위 코드가 실행되면 `FunctionalHoroscope` 인스턴스가 반환됩니다.

### FunctionalHoroscope {#functionalhoroscope}

***

<Badge type="tip" text="implements" /> `IFunctionalHoroscope` <Badge type="tip" text="extends" /> [`Horoscope`](../type-definition.md#horoscope)

이 클래스의 모든 속성은 [Horoscope](../type-definition.md#horoscope)에서 상속되며, 인터페이스에는 운한의 별을 분석하는 메서드가 추가됩니다.

- 인터페이스 정의

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

  <Badge type="warning" text="^2.6.1" /> `palaceName`에는 명반의 출력 언어와 상관없이 설정된 어느 언어의 궁 이름이든 전달할 수 있습니다. 예를 들어 중국어로 출력된 명반에도 영어 궁 이름 `"soul"`을 사용할 수 있습니다.

- 속성

  참조 [Horoscope](../type-definition.md#horoscope)

- 메서드

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 목적

    분석 기능이 있는 운한 객체를 일반 JSON 객체로 변환합니다. 분석 메서드와 소속 명반에 대한 실행 시점의 참조는 포함하지 않으며, 순환 참조도 안전하게 제외합니다.

  - 정의

    ```ts
    type toJSON = () => Horoscope;
    ```

  - 매개변수

    없음

  - 반환 값

    [`Horoscope`](../type-definition.md#horoscope)

  - 예제

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.bySolar("2000-8-16", 2, "女");
    const data = astrolabe.horoscope("2023-8-19").toJSON();
    ```

  ***

  ### agePalace() <Badge type="warning" text="v1.3.0" /> {#agepalace}

  - 목적

    `소한`（小限）이 위치한 궁을 가져옵니다.

  - 정의

    ```ts
    type agePalace: () => FunctionalPalace | undefined;
    ```

  - 매개변수

    없음

  - 반환 값

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - 예제

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

  - 목적

    지정한 운한（運限）의 궁을 가져옵니다.

  - 정의

    ```ts
    type palace = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalPalace | undefined;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁 이름 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 운한 이름 |

  - 반환 값

    [`FunctionalPalace`](./palace.md#functionalpalace) | `undefined`

  - 예제

    `대한`（大限）의 `부처`（夫妻）궁을 가져옵니다.

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

  - 목적

    지정한 운한 궁의 삼방사정（三方四正）에 해당하는 궁들을 가져옵니다.

  - 정의

    ```ts
    type surroundPalaces = (
      palaceName: PalaceName,
      scope: Scope
    ) => FunctionalSurpalaces | undefined;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁 이름 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 운한 이름 |

  - 반환 값

    [`FunctionalSurpalaces`](./palace.md#functionalsurpalaces) | `undefined`

  - 예제

    `유년 부처궁`（流年夫妻宮）의 삼방사정（三方四正）에 해당하는 궁들을 가져옵니다.

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

  - 목적

    지정한 운한의 궁에 있는 유요（流曜）를 확인합니다. **지정한 모든 별이 존재해야** 참을 반환합니다.

  - 정의

    ```ts
    type hasHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscopeStar: StarName[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁 이름 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 운한 이름 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | 유요 배열 |

  - 반환 값

    `boolean`

  - 예제

    `유년 부처궁`（流年夫妻宮）에 `천희(년)`（流喜）와 `문곡(년)`（流曲）이 모두 있는지 확인합니다.

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

  - 목적

    지정한 운한의 궁에 **지정한 유요（流曜）가 하나도 없어야** 참을 반환합니다.

  - 정의

    ```ts
    type notHaveHoroscopeStars = (
      palaceName: PalaceName,
      scope: Scope,
      horoscope: StarName[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁 이름 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 운한 이름 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | 유요 배열 |

  - 반환 값

    `boolean`

  - 예제

    `유년 부처궁`（流年夫妻宮）에 `천희(년)`（流喜）와 `문곡(년)`（流曲）이 모두 없는지 확인합니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .notHaveHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasOneOfHoroscopeStars() <Badge type="warning" text="^1.3.3" /> {#hasoneofhoroscopestars}

  - 목적

    지정한 운한의 궁에 **지정한 유요（流曜）가 하나라도 있으면** 참을 반환합니다.

  - 정의

    ```ts
    type hasOneOfHoroscopeStars= (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁 이름 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 운한 이름 |
    | horoscopeStar | [`StarName[]`](../type-definition.md#starname) | `true` | - | 유요 배열 |

  - 반환 값

    `boolean`

  - 예제

    `유년 부처궁`（流年夫妻宮）에 `천희(년)`（流喜）나 `문곡(년)`（流曲） 중 하나라도 있는지 확인합니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasOneOfHoroscopeStars("夫妻", "yearly", ["流喜", "流曲"]);
    ```

### hasHoroscopeMutagen() <Badge type="warning" text="^1.3.4" /> {#hashoroscopemutagen}

  - 목적

    지정한 운한（運限）의 사화（四化）가 해당 궁에 있는지 확인합니다.

  - 정의

    ```ts
    type hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | palaceName | [`PalaceName`](../type-definition.md#palacename) | `true` | - | 궁 이름 |
    | scope | [`Scope`](../type-definition.md#scope) | `true` | - | 운한 이름 |
    | horoscopeMutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 사화（四化） |

  - 반환 값

    `boolean`

  - 예제

    `유년 부처궁`（流年夫妻宮）에 `록`（化祿）이 있는지 확인합니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro
      .astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
    const flag = astrolabe
      .horoscope('2023-10-26', 2)
      .hasHoroscopeMutagen("夫妻", "yearly", "禄");
    ```

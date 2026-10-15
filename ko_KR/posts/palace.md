---
title: "iztro palace API: 궁 조회와 분석"
outline: deep
description: "iztro의 palace API로 명반의 십이궁을 조회하는 방법과 관련 속성·메서드를 코드 예제로 설명합니다."
---

# 궁（宮位）   {#宫位}

## 서문   {#前言}

자미두수（紫微斗數）에는 `열두` 개의 궁이 있으며, 이를 통틀어 `십이 인사궁`（十二人事宮）이라고 합니다. 한 사람과 관련된 사람들과 삶의 여러 영역을 나타냅니다. 순서대로 `명궁`（命宮）, `형제`（兄弟）, `부처`（夫妻）, `자녀`（子女）, `재백`（財帛）, `질액`（疾厄）, `천이`（遷移）, `노복`（僕役）, `관록`（官祿）, `전택`（田宅）, `복덕`（福德）, `부모`（父母）입니다. [명반](./astrolabe.md)에 표시되는 이 열두 궁 외에 `신궁`（身宮）, `래인`（來因）, `암합궁`（暗合宮）이라는 세 개의 숨은 궁도 있습니다. 각 궁의 의미는 이 API 페이지에서 자세히 다루지 않습니다. 기본 개념이나 더 자세한 설명은 [궁 체계](../learn/palace.md)를 참고하세요. 지지는 시계 방향으로 배치되지만 궁의 이름은 반시계 방향으로 배치됩니다. 아래 표는 그 예입니다:

<table class="astrolabe">
    <tr>
        <td>사（巳）<code>전택</code>（田宅）</td>
        <td>오（午）<code>관록</code>（官祿）</td>
        <td>미（未）<code>노복</code>（僕役）</td>
        <td>신（申）<code>천이</code>（遷移）</td>
    </tr>
    <tr>
        <td>진（辰）<code>복덕</code>（福德）</td>
        <td class="center-palace" rowspan="2" colspan="2">중궁</td>
        <td>유（酉）<code>질액</code>（疾厄）</td>
    </tr>
    <tr>
        <td>묘（卯）<code>부모</code>（父母）</td>
        <td>술（戌）<code>재백</code>（財帛）</td>
    </tr>
    <tr>
        <td>인（寅）<code>명궁</code>（命宮）</td>
        <td>축（丑）<code>형제</code>（兄弟）</td>
        <td>자（子）<code>부처</code>（夫妻）</td>
        <td>해（亥）<code>자녀</code>（子女）</td>
    </tr>
</table>

> 위 표는 하나의 예입니다. `명궁`（命宮）의 위치는 `생년월일`과 `출생 시간`에 따라 달라지며, 위의 열두 자리 중 어디에나 놓일 수 있습니다. 다만 궁 이름의 순서는 바뀌지 않습니다.

궁위라는 말은 `궁`과 `위치`라는 두 개념을 합친 것입니다. `생년월일`과 `출생 시간`으로 계산하여 정해지는 것이 `궁`입니다. 따라서 출생 명반에서 `재백`（財帛）궁의 자리는 고정됩니다. `본명반`（本命盤）이라는 개념이 낯설다면 먼저 [기초 지식](/ko_KR/learn/basis.md)을 읽어 보세요. 반면 `위치`는 기준 궁에 따라 정해지는 `상대적인` 위치입니다. 예를 들어 `부처`（夫妻）궁을 기준으로 잡으면 그 `재백 위치`（財帛位）에 해당하는 궁은 `천이`（遷移）궁입니다. 복잡하게 느껴질 수 있지만, 모든 관계를 외울 필요 없이 두 개념의 차이만 이해하면 됩니다.
## 클래스와 분석 메서드 {#功能类定义}

:::warning 개발 제안

궁은 명반에 속하므로 `new`로 궁 객체를 직접 생성하기보다는 정적 명반 생성 메서드가 반환한 명반의 궁 객체를 사용하세요. 명반의 `palaces` 속성에는 열두 궁의 데이터가 들어 있습니다. 지지 순서에 맞춰 `인궁`（寅宮）부터 시계 방향으로 배열됩니다.

:::

```ts
import { astro } from "iztro";

const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");
```

위의 `astrolabe` 변수에서 여러 가지 방법으로 대상 궁을 얻을 수 있습니다. 실제 필요에 따라 사용하십시오.

1. `palaces` 배열의 인덱스로 가져오기

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palaces[1];
    ```

2. `FunctionalAstrolabe` 인스턴스의 `palace()` 메서드에 궁의 `색인`을 전달하여 가져옵니다.

    ```ts
    // 获取卯宫宫位
    const palace = astrolabe.palace(1);
    ```

3. `FunctionalAstrolabe` 인스턴스의 `palace()` 메서드에 궁의 `이름`을 전달하여 가져옵니다.

    ```ts
    // 获取命宫
    const palace = astrolabe.palace("命宫");
    ```

### FunctionalPalace {#functionalpalace}

***

<Badge type="tip" text="implements" /> `IFunctionalPalace` <Badge type="tip" text="extends" /> [`Palace`](../type-definition.md#palace)

이 클래스는 [Palace](../type-definition.md#palace)의 속성을 상속하고, 궁 안의 성요를 분석하는 메서드를 추가합니다.

- 인터페이스 정의

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

- 속성

  참조 [Palace](../type-definition.md#palace)

- 메서드

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 목적

    분석 기능이 있는 궁 객체를 일반 JSON 객체로 변환합니다. 반환 결과에는 분석 메서드나 연결된 명반 등의 실행 시 참조가 포함되지 않습니다. 순환 참조는 안전하게 제외합니다.

  - 정의

    ```ts
    type toJSON = () => Palace;
    ```

  - 매개변수

    없음

  - 반환 값

    [`Palace`](../type-definition.md#palace)

  - 예

    ```ts
    const data = astrolabe.palace("命宫")?.toJSON();
    ```

  ***

  #### has() <Badge type="warning" text="^1.0.0" /> {#has}

  - 목적

    궁에 지정한 `성요`（星曜）가 있는지 확인합니다. `지정한 모든 별`이 궁 안에 `모두 있어야` `true`를 반환합니다.

  - 정의

    ```ts
    type has = (stars: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 성요 이름. 주성（主星）, 보조성（輔星）, 잡요（雜曜）를 지정할 수 있습니다. |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）에 `자미`（紫微） 및 `우필`（右弼）이 있는지 확인하려면
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.has(["紫微", "右弼"]);
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.palace("命宫").has(["紫微", "右弼"]);
    ```

  ***
  #### notHave() <Badge type="warning" text="^1.0.0" /> {#nothave}

  - 목적

    궁에 지정한 `성요`（星曜）가 없는지 확인합니다. 지정한 별이 `하나도 없어야` `true`를 반환합니다.

  - 정의

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 성요 이름. 주성（主星）, 보조성（輔星）, 잡요（雜曜）를 지정할 수 있습니다. |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）에 `지공`（地空）과 `지겁`（地劫）이 모두 없는지 확인하려면:
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHave(["地空", "地劫"]);
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.palace("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### hasOneOf() <Badge type="warning" text="^1.0.0" /> {#hasoneof}

  - 목적

    궁에 지정한 `성요`（星曜）가 있는지 확인합니다. 지정한 별이 `하나라도 있으면` `true`를 반환합니다.

  - 정의

    ```ts
    type hasOneOf = (stars: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 성요 이름. 주성（主星）, 보조성（輔星）, 잡요（雜曜）를 지정할 수 있습니다. |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）에 `천괴`（天魁） 또는 `천월`（天鉞）이 있는지 확인하려면
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasOneOf(["天魁", "天钺"]);
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.palace("命宫").hasOneOf(["天魁", "天钺"]);
    ```

  ***
  #### hasMutagen() <Badge type="warning" text="^1.2.0" /> {#hasmutagen}

  - 목적

    궁에 지정한 생년 사화（生年四化）가 있는지 확인합니다.

  - 정의

    ```ts
    type hasMutagen = (mutagen: Mutagen) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 사화의 이름: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）에 `록`（化祿）이 있는지 확인하고 싶다면
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.hasMutagen("禄");
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.palace("命宫").hasMutagen("禄");
    ```

  ***
  #### notHaveMutagen() <Badge type="warning" text="^1.2.0" /> {#nothavemutagen}

  - 목적

    궁에 지정한 생년 사화（生年四化）가 없는지 확인합니다.

  - 정의

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 사화의 이름: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）에 `기`（化忌）가 없는지 확인하려면:
    ```ts
    const palace = astrolabe.palace("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.palace("命宫").notHaveMutagen("忌");
    ```
  #### isEmpty() <Badge type="warning" text="^2.0.6" /> {#isempty}

  - 목적

    궁이 공궁（空宮）, 즉 주성（主星）이 없는 궁인지 확인합니다. 일부 유파에서는 특정한 다른 성요가 있으면 공궁으로 보지 않습니다. 선택 매개변수에 이러한 예외 성요의 목록을 전달할 수 있습니다.

  - 정의

    ```ts
    type isEmpty = (excludeStars?: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | excludeStars | [`StarName[]`](../type-definition.md#starname) | `false` | - | 별 이름 배열 |

  - 반환 값

    `boolean`
  #### astrolabe() <Badge type="warning" text="^2.1.0" /> {#astrolabe}

  - 목적

    현재 궁이 속한 명반 객체를 반환합니다.

  - 정의

    ```ts
    type astrolabe = () => IFunctionalAstrolabe | undefined;
    ```

  - 매개변수

    없음

  - 반환 값

  [`IFunctionalAstrolabe`](./astrolabe.md#functionalastrolabe) | `undefined`;
  #### fliesTo() <Badge type="warning" text="^2.1.0" /> {#fliesto}

  - 목적

    원천 궁에서 대상 궁으로 지정한 사화가 날아가는지 확인합니다. 사화 하나 또는 배열을 받으며, 지정한 사화가 모두 대상 궁에 도달해야 `true`를 반환합니다.

  - 정의

    ```ts
    type fliesTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 대상 궁의 인덱스 또는 이름 |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 사화: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`
  #### fliesOneOfTo() <Badge type="warning" text="^2.1.0" /> {#fliesoneofto}

  - 목적

    지정한 사화 중 하나라도 원천 궁에서 대상 궁으로 날아가면 `true`를 반환합니다.

  - 정의

    ```ts
    type fliesOneOfTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 대상 궁의 인덱스 또는 이름 |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 사화: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`
  #### notFlyTo() <Badge type="warning" text="^2.1.0" /> {#notflyto}

  - 목적

    지정한 사화가 원천 궁에서 대상 궁으로 날아가지 않는지 확인합니다. 사화 하나 또는 배열을 받으며, 지정한 사화가 모두 대상 궁에 도달하지 않아야 `true`를 반환합니다.

  - 정의

    ```ts
    type notFlyTo = (
      to: number | PalaceName,
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | to | `number`  \|  [`PalaceName`](../type-definition.md#palacename) | `true` | - | 대상 궁의 인덱스 또는 이름 |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 사화: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`
  #### selfMutaged() <Badge type="warning" text="^2.1.0" /> {#selfmutaged}

  - 목적

    궁에 자화（自化）가 있는지 확인합니다. 배열을 전달하면 지정한 사화가 모두 있어야 `true`를 반환합니다.

  - 정의

    ```ts
    type selfMutaged = (
      withMutagens: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `true` | - | 사화: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`
  #### selfMutagedOneOf() <Badge type="warning" text="^2.1.0" /> {#selfmutagedoneof}

  - 목적

    자화（自化）를 확인합니다. 인수를 생략하면 네 종류를 모두 대상으로 하며, 하나라도 일치하면 `true`를 반환합니다.

  - 정의

    ```ts
    type selfMutagedOneOf = (
      withMutagens?: Mutagen[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | 사화: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`
  #### notSelfMutaged() <Badge type="warning" text="^2.1.0" /> {#notselfmutaged}

  - 목적

    궁에 지정한 사화의 자화（自化）가 하나도 없는지 확인합니다. 인수를 생략하면 네 종류의 사화를 모두 확인합니다.

  - 정의

    ```ts
    type notSelfMutaged = (
      withMutagens?: Mutagen | Mutagen[]
    ) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | withMutagens | [`Mutagen`](../type-definition.md#mutagen)  \| [`Mutagen[]`](../type-definition.md#mutagen) | `false` | - | 사화: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`
  #### mutagedPlaces() <Badge type="warning" text="^2.1.0" /> {#mutagedplaces}

  - 목적

    현재 궁에서 발생한 사화가 들어가는 네 궁의 배열을 반환합니다. 배열의 순서는 록（化祿）, 권（化權）, 과（化科）, 기（化忌）입니다.

  - 정의

    ```ts
    type mutagedPlaces = () => (IFunctionalPalace | undefined)[];
    ```

  - 매개변수

    없음

  - 반환 값

    ([`IFunctionalPalace`](#functionalpalace) | `undefined`)[]
### FunctionalSurpalaces <Badge type="warning" text="^1.2.0" /> {#functionalsurpalaces}

***

<Badge type="tip" text="implements" /> `IFunctionalSurpalaces` <Badge type="tip" text="extends" /> [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

이 클래스는 [SurroundedPalaces](../type-definition.md#surroundedpalaces)의 속성을 상속하고, 삼방사정의 성요를 분석하는 메서드를 추가합니다.

- 인터페이스 정의

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

- 속성

  참조 [SurroundedPalaces](../type-definition.md#surroundedpalaces)

- 메서드

  #### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson-1}

  - 목적

    분석 기능이 있는 삼방사정（三方四正） 객체를 일반 JSON 객체로 변환합니다. 반환 결과에는 분석 메서드와 실행 시 참조가 포함되지 않습니다. 순환 참조는 안전하게 제외합니다.

  - 정의

    ```ts
    type toJSON = () => SurroundedPalaces;
    ```

  - 매개변수

    없음

  - 반환 값

    [`SurroundedPalaces`](../type-definition.md#surroundedpalaces)

  - 예

    ```ts
    const data = astrolabe.surroundedPalaces("命宫").toJSON();
    ```

  ***

  #### have() {#have}

  - 목적

    궁의 삼방사정（三方四正） 안에 지정한 `성요`（星曜）가 있는지 확인합니다. `지정한 모든 별`이 이 범위에 `모두 있어야` `true`를 반환합니다.

  - 정의

    ```ts
    type have = (stars: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 성요 이름. 주성（主星）, 보조성（輔星）, 잡요（雜曜）를 지정할 수 있습니다. |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）의 삼방사정（三方四正） 안에 `자미`（紫微）와 `우필`（右弼）이 모두 있는지 확인하려면:
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.have(["紫微", "右弼"]);
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").have(["紫微", "右弼"]);
    ```

  ***
  #### notHave() {#nothave-1}

  - 목적

    궁의 삼방사정（三方四正） 안에 지정한 `성요`（星曜）가 없는지 확인합니다. 이 범위에서 지정한 별이 `하나도 없어야` `true`를 반환합니다.

  - 정의

    ```ts
    type notHave = (stars: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 성요 이름. 주성（主星）, 보조성（輔星）, 잡요（雜曜）를 지정할 수 있습니다. |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）의 삼방사정（三方四正） 안에 `지공`（地空）과 `지겁`（地劫）이 모두 없는지 확인하려면:

    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.notHave(["地空", "地劫"]);
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHave(["地空", "地劫"]);
    ```

  ***
  #### haveOneOf() {#haveoneof}

  - 목적

    궁의 삼방사정（三方四正） 안에 지정한 성요가 하나라도 있는지 확인합니다. 이 범위에서 하나라도 발견되면 `true`를 반환합니다.

  - 정의

    ```ts
    type haveOneOf = (stars: StarName[]) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | stars | [`StarName[]`](../type-definition.md#starname) | `true` | - | 성요 이름. 주성（主星）, 보조성（輔星）, 잡요（雜曜）를 지정할 수 있습니다. |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）의 삼방사정（三方四正） 안에 `천괴`（天魁） 또는 `천월`（天鉞）이 있는지 확인합니다:

    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveOneOf(["天魁", "天钺"]);
    ```

  ***
  #### haveMutagen() {#havemutagen}

  - 목적

    궁의 삼방사정（三方四正） 안에 지정한 생년 사화（生年四化）가 있는지 확인합니다.

  - 정의

    ```ts
    type haveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 사화의 이름: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）의 삼방사정（三方四正） 안에 `록`（化祿）이 있는지 확인하려면:
    ```ts
    const palaces = astrolabe.surroundedPalaces("命宫");
    const result = palaces.haveMutagen("禄");
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").haveMutagen("禄");
    ```

  ***
  #### notHaveMutagen() {#nothavemutagen-1}

  - 목적

    궁의 삼방사정（三方四正） 전체에 지정한 생년 사화（生年四化）가 없는지 확인합니다.

  - 정의

    ```ts
    type notHaveMutagen = (mutagen: Mutagen) => boolean;
    ```

  - 매개변수

    | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
    | --- | --- | --- | --- | --- |
    | mutagen | [`Mutagen`](../type-definition.md#mutagen) | `true` | - | 사화의 이름: 록（祿）, 권（權）, 과（科）, 기（忌） |

  - 반환 값

    `boolean`

  - 예

    `명궁`（命宮）의 삼방사정（三方四正） 안에 `기`（化忌）가 없는지 확인하려면:
    ```ts
    const palace = astrolabe.surroundedPalaces("命宫");
    const result = palace.notHaveMutagen("忌");
    ```

    `메서드 체이닝`을 사용하면 코드를 더 간결하게 작성할 수 있습니다.
    ```ts
    const result = astrolabe.surroundedPalaces("命宫").notHaveMutagen("忌");
    ```

---
outline: deep
description: "iztro의 star API로 명반의 성요를 조회하는 방법과 관련 속성·메서드를 코드 예제로 설명합니다."
---

# 성요（星曜）   {#星曜}

## 서문   {#前言}

성요（星曜）는 자미두수（紫微斗數）의 중요한 구성 요소이며, 서로 다른 조합으로 성격의 차이를 설명합니다. 관련 지식은 [성요 체계（星曜系統）](/ko_KR/learn/star.md)에서 배울 수 있습니다. 이 장은 개발에서 별을 다루는 방법에 집중합니다.

:::tip 팁
`iztro`에서는 `주성`（主星）, `보조성`（輔星）, `잡요`（雜曜）를 성요 체계로 묶고 `48 신살`（48神煞）은 별도로 다룹니다. `48 신살`（48神煞）이 무엇인지 알고 싶다면 [48 신살（48神煞）](/ko_KR/learn/dec-star.md)을 읽어 보세요.
:::

## 클래스와 분석 메서드 {#功能类定义}

[FunctionalAstrolabe](./astrolabe.md#functionalastrolabe), [FunctionalPalace](./palace.md#functionalpalace)와 마찬가지로, `FunctionalStar`를 직접 만들기보다 다른 객체가 반환한 인스턴스를 사용하세요.

### FunctionalStar <Badge type="warning" text="^1.2.0" /> {#functionalstar}

---

<Badge type="tip" text="implements" /> `IFunctionalStar` <Badge type="tip" text="extends" /> [`Star`](/ko_KR/type-definition.md#star)

- 인터페이스 정의

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

- 속성

  참조 [Star](/ko_KR/type-definition.md#star)

- 메서드

  ### toJSON() <Badge type="warning" text="^2.6.0" /> {#tojson}

  - 목적

    분석 기능이 있는 별 객체를 일반 JSON 객체로 변환합니다. 분석 메서드와 관련 궁·명반에 대한 실행 시점의 참조는 포함하지 않으며, 순환 참조도 안전하게 제외합니다.

  - 정의

    ```ts
    type toJSON = () => Star;
    ```

  - 매개변수

    없음

  - 반환 값

    [`Star`](../type-definition.md#star)

  - 예제

    ```ts
    const data = astrolabe.star("紫微").toJSON();
    ```

  ***

  :::danger ❗️주의
  `FunctionalStar`에는 별을 소속 궁과 명반에 연결하는 `setPalace()`, `setAstrolabe()` 메서드가 있습니다. 데이터를 잘못 연결할 수 있으므로 일반 사용 시 직접 호출하지 마세요.
  :::

  ### palace() {#palace}

  - 목적

    별이 속한 궁을 가져옵니다.

  - 정의

    ```ts
    type palace = () => IFunctionalPalace | undefined;
    ```

  - 매개변수

    `none`

  - 반환 값

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - 예제

    `자미`（紫微）가 속한 궁을 가져옵니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").palace();
    ```

  ***

  ### surroundedPalaces() {#surroundedpalaces}

  - 목적

    현재 별의 삼방사정（三方四正）에 해당하는 궁들을 가져옵니다.

  - 정의

    ```ts
    type surroundedPalaces = () => IFunctionalSurpalaces | undefined;
    ```

  - 매개변수

    `none`

  - 반환 값

    [`FunctionalSurpalaces`](palace.md#functionalsurpalaces) | `undefined`

  - 예제

    `자미`（紫微）가 속한 궁의 `삼방사정`（三方四正）에 해당하는 궁들을 가져옵니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palaces = astrolabe.star("紫微").surroundedPalaces();
    ```

  ***

  ### oppositePalace() {#oppositepalace}

  - 목적

    현재 별이 속한 궁의 맞은편 궁을 가져옵니다.

  - 정의

    ```ts
    type oppositePalace = () => IFunctionalPalace | undefined;
    ```

  - 매개변수

    `none`

  - 반환 값

    [`FunctionalPalace`](palace.md#functionalpalace) | `undefined`

  - 예제

    `자미`（紫微）가 속한 궁의 `대궁`（對宮）을 가져옵니다.

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const palace = astrolabe.star("紫微").oppositePalace();
    ```

  ***

  ### withBrightness() {#withbrightness}

  - 목적

    성요가 지정한 밝기에 해당하는지 확인합니다. 밝기를 여러 개 지정하면 하나라도 일치할 때 `true`를 반환합니다.

  - 정의

    ```ts
    type withBrightness = (brightness: Brightness | Brightness[]) => boolean;
    ```

  - 매개변수


   | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
   | --- | --- | --- | --- | --- |
   | brightness | [`Brightness`](/ko_KR/type-definition.md#brightness)  \|  [`Brightness[]`](/ko_KR/type-definition.md#brightness) | `true` | - | 확인할 성요의 밝기 |

  - 반환 값

    `boolean`

  - 예제

    `자미`（紫微）가 `[+3]`（廟） 또는 `[+2]`（旺） 상태인지 확인

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withBrightness(["庙", "旺"]);
    ```

  ***

  ### withMutagen() {#withmutagen}

  - 목적

    성요에 지정한 사화（四化）가 있는지 확인합니다. 여러 사화를 지정하면 하나라도 일치할 때 `true`를 반환합니다.

  - 정의

    ```ts
    type withMutagen = (mutagen: Mutagen | Mutagen[]) => boolean;
    ```

  - 매개변수


   | 매개변수 | 타입 | 필수 여부 | 기본값 | 설명 |
   | --- | --- | --- | --- | --- |
   | mutagen | [`Mutagen`](/ko_KR/type-definition.md#mutagen)  \|  [`Mutagen[]`](/ko_KR/type-definition.md#mutagen) | `true` | - | 사화: 록, 권, 과, 기 |

  - 반환 값

    `boolean`

  - 예제

    `자미`（紫微）가 `권`（化權） 또는 `과`（化科） 상태인지 확인

    ```ts
    import { astro } from "iztro";

    const astrolabe = astro.astrolabeBySolarDate("2000-8-16", 2, "女", true, "zh-CN");

    const result = astrolabe.star("紫微").withMutagen(["权", "科"]);
    ```

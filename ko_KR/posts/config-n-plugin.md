---
title: "iztro 설정과 플러그인"
outline: deep
description: "iztro의 계산 설정을 변경하고 플러그인으로 명반 기능을 확장하는 방법을 설명합니다."
---

# 설정과 플러그인 <Badge type="warning" text="^2.3.0" /> {#配置和插件}

iztro의 설정 및 플러그인 기능을 소개합니다. 자미두수（紫微斗數）에는 여러 유파가 있으며, 유파마다 사화（四化）와 성요 밝기（星曜亮度）가 조금씩 다릅니다. 이러한 차이에 대응하고 기능을 확장할 수 있도록 iztro는 `v2.3.0`에서 전역 설정과 외부 플러그인 기능을 도입했습니다.

:::tip 팁
iztro를 기반으로 오픈 소스 플러그인 라이브러리를 개발했다면 [작성자에게 연락해 주세요](../about.md#怎么联系我❓). 다른 사람이 찾아 사용할 수 있도록 문서 목록에 추가할 수 있습니다.
:::

## 설정 {#配置}

설정 항목은 [설정 정의](../type-definition.md#config)를 참고하세요. 전역 기본값은 명반 생성 메서드를 호출하기 전에 `astro.config()`를 호출하여 설정합니다:

```ts
import { astro } from 'iztro';

astro.config({
  language: 'en-US',
  mutagens: { 庚: ['太阳', '武曲', '天同', '天相'] },
  brightness: {
    贪狼: ['旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺'],
  },
});
```

위 코드를 실행한 뒤 명반을 생성하면, 지정한 설정이 기본 설정과 병합되어 적용됩니다. 기본값과 같은 항목은 다시 지정할 필요가 없습니다. 기본 사화 값은 [십천간 사화표（十天干四化表）](../learn/mutagen.md#十天干四化表)를, 기본 성요 밝기는 [성요 밝기표（星曜亮度表）](../learn/star.md#星曜亮度表)를 참고하세요.

`mutagens`와 `brightness` 외에도 다음 옵션으로 명반 계산 규칙을 조정할 수 있습니다:

| 설정 항목 | 허용되는 값 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `language` <Badge type="warning" text="^2.6.5" /> | [`Language`](../type-definition.md#language) | `zh-CN` | 기본 출력 언어. 명시적으로 전달한 `language` 인수가 우선 |
| `yearDivide`   <Badge type="warning" text="^2.4.0" /> | `normal`  \|  `exact` | `normal` | 연도 간지의 경계. `normal`은 음력 정월 초하루, `exact`는 절기인 입춘을 기준으로 합니다. |
| `horoscopeDivide`   <Badge type="warning" text="^2.4.3" /> | `normal`  \|  `exact` | `normal` | 운한 계산에 사용하는 연·월 간지의 경계 |
| `ageDivide`   <Badge type="warning" text="^2.4.5" /> | `normal`  \|  `birthday` | `normal` | 대한과 소한에 사용하는 세는나이의 경계. `normal`은 음력 설을 기준으로 하며, `birthday`는 음력 생일과 비교합니다. |
| `dayDivide`   <Badge type="warning" text="^2.5.2" /> | `forward`  \|  `current` | `forward` | 만자시를 어느 날짜에 포함할지 정합니다. `forward`는 다음 날, `current`는 당일로 계산합니다. |
| `algorithm`   <Badge type="warning" text="^2.5.0" /> | `default`  \|  `zhongzhou` | `default` | 안성 규칙（安星規則）; `default`는 일반적인 배치법이고, `zhongzhou`는 중주파（中州派）의 배치법입니다 |

나이 계산식, 음력 생일 경계, 대한의 궁 인덱스 예시는 [세는나이와 궁 인덱스](./horoscope.md#虚岁与宫位索引)를 참고하세요.

`v2.6.4`부터 만자시（晚子時）의 날짜 전환을 일관되게 처리합니다. `dayDivide: 'forward'`이면 명반（星盤） 전체와 이후 운한（運限）을 다음 날 조자시（早子時）로 계산하며 음력 월, 연도, 윤달 여부도 함께 갱신합니다. `current`이면 당일 조자시（早子時）로 계산합니다.

`solarDate`, `time`, `timeRange`, `sign`은 입력한 그레고리력 생년월일, 출생 시간대, 별자리를 유지합니다. `lunarDate`, `chineseDate`, `rawDates`에는 명반（星盤） 계산에 사용한 날짜가 반영됩니다. 운한（運限） 결과의 `solarDate`도 조회한 날짜를 유지합니다.

```ts
astro.config({ dayDivide: 'forward' });
const late = astro.bySolar('1996-8-13', 12, 'female');
const early = astro.bySolar('1996-8-14', 0, 'female');
console.log(late.lunarDate === early.lunarDate); // true
console.log(late.fiveElementsClass === early.fiveElementsClass); // true
```

:::warning 참고
`v2.6.2`부터 `astro.config()`는 이후 새로 생성하는 명반의 기본값만 설정합니다. `withOptions({ config })`는 이번에 생성하는 명반의 설정만 덮어쓰며 전역 기본값을 바꾸지 않습니다. 이미 생성한 명반과 그 운한·사화 분석은 생성 당시의 설정과 언어를 유지합니다. 기존 코드가 명반 생성 호출로 전역 설정을 바꾸는 방식에 의존했다면 `astro.config()`를 명시적으로 호출하세요.
:::

### setLanguage() <Badge type="warning" text="^2.6.5" /> {#setlanguage}

`astro.config({ language: 'en-US' })`로 이후 생성하는 명반, 날짜 보조 메서드, 독립적으로 호출하는 유틸리티 함수의 기본 출력 언어를 설정합니다. 초기값은 `zh-CN`입니다. `withOptions({ config: { language } })`는 해당 명반의 언어만 덮어쓰며, 명시적으로 전달한 `language` 인수가 우선합니다. 개별 호출은 전역 기본값을 바꾸지 않고, 이미 생성된 명반은 생성 당시의 언어를 유지합니다.

`astro.setLanguage(language)`와 `astro.config({ language })`는 동일한 전역 언어를 설정합니다. 기존 호출과의 호환성을 위해 이 메서드도 계속 사용할 수 있습니다. `zh-CN`, `zh-TW`, `en-US`, `ja-JP`, `ko-KR`, `vi-VN`을 지원합니다. 잘못된 언어를 지정하면 오류가 발생하며 기존 설정은 유지됩니다.

```ts
type setLanguage = (language: Language) => void;
```

`astro.getConfig().language`는 현재 설정의 언어를 반환합니다. `astro.resetConfig()`는 전역 언어를 `zh-CN`으로 복원하며, 이미 생성된 명반과 이후 조회에는 영향을 주지 않습니다.

```ts
import { astro, util } from 'iztro';

astro.config({ language: 'en-US' });
console.log(astro.getConfig().language); // en-US
console.log(astro.getLanguage()); // en-US
console.log(util.getMutagensByHeavenlyStem('geng'));
// ['sun', 'warrior', 'moon', 'fortunate']
astro.resetConfig();
```

### getLanguage() <Badge type="warning" text="^2.6.5" /> {#getlanguage}

현재 적용되는 언어를 가져옵니다. 명반 메서드나 플러그인 내부에서는 해당 명반을 생성할 때 사용한 언어를 반환하고, 계산 컨텍스트 밖에서는 전역 언어를 반환합니다.

```ts
type getLanguage = () => Language;
```

### getConfig() <Badge type="warning" text="^2.3.0" /> {#getconfig}

- 목적

  현재 적용 중인 전역 설정을 가져옵니다. 반환된 `mutagens`와 `brightness`는 라이브러리 내부에서 통일한 키 이름을 사용하므로, 디버깅하거나 설정 내용을 확인할 때 참고할 수 있습니다.

  <Badge type="warning" text="^2.6.2" /> 반환 값은 독립적인 깊은 복사본입니다. 객체나 그 안의 사화 및 밝기 배열을 수정해도 라이브러리의 설정은 바뀌지 않습니다.

- 정의

  ```ts
  type getConfig = () => {
    language: Language;
    mutagens: Partial<Record<HeavenlyStemKey, StarKey[]>>;
    brightness: Partial<Record<StarKey, BrightnessKey[]>>;
    yearDivide: 'normal' | 'exact';
    ageDivide: 'normal' | 'birthday';
    dayDivide: 'current' | 'forward';
    horoscopeDivide: 'normal' | 'exact';
    algorithm: 'default' | 'zhongzhou';
  };
  ```

- 매개변수

  없음

- 반환 값

  현재 적용 중인 설정 객체

- 예

  ```ts
  import { astro } from 'iztro';

  astro.config({ algorithm: 'zhongzhou', ageDivide: 'birthday' });

  const currentConfig = astro.getConfig();
  ```

### resetConfig() <Badge type="warning" text="^2.6.2" /> {#resetconfig}

기본 설정을 복원하고, 사용자 지정 사화（四化）표와 밝기표를 모두 지웁니다. 이미 생성된 명반에는 영향을 주지 않습니다.

`astro.getConfig().language`는 현재 설정의 언어를 반환합니다. `astro.resetConfig()`는 전역 언어를 `zh-CN`으로 복원하며, 이미 생성된 명반과 이후 조회에는 영향을 주지 않습니다.

```ts
type resetConfig = () => void;
```

기본 경계 규칙은 `yearDivide: 'normal'`, `horoscopeDivide: 'normal'`, `ageDivide: 'normal'`, `dayDivide: 'forward'`이며, 기본 성요 배치 알고리즘은 `algorithm: 'default'`입니다. 이 메서드는 인수를 받지 않고 반환 값도 없습니다. 불러온 플러그인은 초기화하지 않습니다.

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

## 플러그인   {#插件}

iztro 플러그인은 명반（星盤） 객체에 기능을 추가하는 함수입니다. 필요에 따라 기능을 확장할 수 있습니다. TypeScript에서는 `FunctionalAstrolabe`를 확장하는 인터페이스에 플러그인의 메서드를 선언해야 합니다.

인터페이스는 다음과 같이 선언됩니다.

```ts
export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}
```

`myNewFunc`와 `majorStar`는 필요에 맞게 정의할 수 있습니다. 인터페이스의 메서드들을 하나의 플러그인 함수에서 구현해도 되고, 여러 플러그인 함수에 나누어 구현해도 됩니다:

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

플러그인을 등록하려면 `astro`를 가져온 뒤 `loadPlugin()` 또는 `loadPlugins()`를 호출하면 됩니다. 어느 방식으로 등록하든 플러그인은 **이후 새로 생성하는** 명반 인스턴스에 적용됩니다.

```ts
import {astro} from iztro;

// 批量挂载插件
astro.loadPlugins([myTestPlugin， myTestPlugin2]);

// 逐个加载插件
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
```

이미 생성된 특정 명반（星盤）에만 플러그인을 적용하려면, 해당 명반 인스턴스의 `use()` 메서드를 호출하세요:

```ts
const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

astrolabe.use(myTestPlugin);
astrolabe.myNewFunc();
```

:::tip 팁

TypeScript에서 플러그인을 사용할 때는 추가한 메서드를 컴파일러가 인식하도록 제네릭 타입을 지정해야 합니다. 위의 플러그인 메서드를 사용하려면 다음과 같이 작성합니다:

```ts
 const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

 // 使用插件定义的方法
 astrolabe.myNewFunc();   // 火六局

 // 使用第二个插件方法
 astrolabe.majorStar();   // 七杀
```

:::

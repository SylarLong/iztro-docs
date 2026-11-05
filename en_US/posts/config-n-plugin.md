---
title: "iztro configuration and plugins"
outline: deep
description: "Customize iztro calculation settings and extend chart functionality with plugins."
---

# Configuration and plugins <Badge type="warning" text="^2.3.0" />   {#配置和插件}

Welcome to iztro’s configuration and plugin features. Zi Wei Dou Shu（紫微斗數） has many schools, with slight differences in four transformations（四化） and star brightness（星曜亮度）. To accommodate these differences and support extensions, iztro introduced global configuration and third-party plugins in `v2.3.0`.

:::tip Tips
If you have developed an open-source plugin library for iztro, please [contact the author](../about.md#怎么联系我❓) so it can be listed in the documentation for others to use.
:::

## Configuration   {#配置}

See the [configuration definition](../type-definition.md#config) for the available settings. To set global defaults, call `astro.config()` before calling a chart-generation method:

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

When you generate a chart after running the code above, the supplied settings are merged with the defaults and applied. You only need to specify values that differ from the defaults. See the [four-transformations table for the ten Heavenly Stems（十天干四化表）](../learn/mutagen.md#十天干四化表) and the [star brightness table（星曜亮度表）](../learn/star.md#星曜亮度表) for the default values.

Besides `mutagens` and `brightness`, the following options let you adjust chart-calculation rules:

| Configuration items | Allowed values | Default value | Description |
| --- | --- | --- | --- |
| `language` <Badge type="warning" text="^2.6.5" /> | [`Language`](../type-definition.md#language) | `zh-CN` | Default output language; an explicit `language` parameter takes precedence |
| `yearDivide`   <Badge type="warning" text="^2.4.0" /> | `normal`  \|  `exact` | `normal` | Year stem-and-branch boundary: `normal` uses the first day of the first lunar month; `exact` uses the Start of Spring solar term. |
| `horoscopeDivide`   <Badge type="warning" text="^2.4.3" /> | `normal`  \|  `exact` | `normal` | Year and month stem-and-branch boundaries used for horoscope periods |
| `ageDivide`   <Badge type="warning" text="^2.4.5" /> | `normal`  \|  `birthday` | `normal` | Nominal-age boundary, affecting decadal and annual age periods: `normal` uses Lunar New Year; `birthday` compares the lunar birthday. |
| `dayDivide`   <Badge type="warning" text="^2.5.2" /> | `forward`  \|  `current` | `forward` | Date assignment for the late Zi hour: `forward` assigns it to the following day; `current` to the same day. |
| `algorithm`   <Badge type="warning" text="^2.5.0" /> | `default`  \|  `zhongzhou` | `default` | Star-placement rules: `default` uses the standard version; `zhongzhou` uses the Zhongzhou school version. |

For the age formula, lunar-birthday boundary and a decadal palace-index example, see [nominal age and palace indices](./horoscope.md#虚岁与宫位索引).

From `v2.6.4`, `dayDivide: 'forward'` calculates the entire chart and subsequent time-cycle data using the following day's early Zi hour（早子時）, updating the lunar month, year and leap-month status together. `current` uses the current day's early Zi hour（早子時）.

`solarDate`, `time`, `timeRange` and `sign` retain the original Gregorian birth date, birth time range and zodiac sign. `lunarDate`, `chineseDate` and `rawDates` reflect the date used to calculate the chart. In time-cycle results, `solarDate` also retains the requested date.

```ts
astro.config({ dayDivide: 'forward' });
const late = astro.bySolar('1996-8-13', 12, 'female');
const early = astro.bySolar('1996-8-14', 0, 'female');
console.log(late.lunarDate === early.lunarDate); // true
console.log(late.fiveElementsClass === early.fiveElementsClass); // true
```

:::warning Note
From `v2.6.2`, `astro.config()` sets defaults only for charts created afterward. `withOptions({ config })` overrides settings only for the chart being created and does not alter the global defaults. Existing charts and their horoscope periods and transformation analyses retain the settings and language used when they were created. If older code relied on one charting call changing global settings, call `astro.config()` explicitly instead.
:::

### setLanguage() <Badge type="warning" text="^2.6.5" /> {#setlanguage}

Use `astro.config({ language: 'en-US' })` to set the default output language for future charts, date helpers and standalone utilities. The initial value is `zh-CN`. `withOptions({ config: { language } })` overrides the language for that chart only; an explicit `language` parameter takes precedence. Individual calls do not change global defaults, and existing charts retain the language used to create them.

`astro.setLanguage(language)` and `astro.config({ language })` update the same global language. This entry point remains available for existing callers. Supported values are `zh-CN`, `zh-TW`, `en-US`, `ja-JP`, `ko-KR`, and `vi-VN`. An invalid language throws an error and leaves the previous setting unchanged.

```ts
type setLanguage = (language: Language) => void;
```

`astro.getConfig().language` returns the currently configured language. `astro.resetConfig()` restores the global language to `zh-CN` without changing existing charts or their subsequent queries.

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

Get the currently effective language. Inside chart methods or plugins, this returns the language used to create that chart. Outside a calculation context, it returns the global language.

```ts
type getLanguage = () => Language;
```

### getConfig() <Badge type="warning" text="^2.3.0" /> {#getconfig}

- Purpose

  Get the currently effective global configuration. The returned `mutagens` and `brightness` use normalized key names within the library, suitable for debugging or confirming configuration status.

  <Badge type="warning" text="^2.6.2" /> The returned value is an independent deep copy. Modifying it or its transformation and brightness arrays does not change the library’s configuration.

- Definition

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

- parameters

  None

- return value

  The currently effective configuration object

- Example

  ```ts
  import { astro } from 'iztro';

  astro.config({ algorithm: 'zhongzhou', ageDivide: 'birthday' });

  const currentConfig = astro.getConfig();
  ```

### resetConfig() <Badge type="warning" text="^2.6.2" /> {#resetconfig}

Restores the default settings and clears all custom four-transformation（四化） and brightness tables. Existing charts are unaffected.

`astro.getConfig().language` returns the currently configured language. `astro.resetConfig()` restores the global language to `zh-CN` without changing existing charts or their subsequent queries.

```ts
type resetConfig = () => void;
```

The default boundary rules are `yearDivide: 'normal'`, `horoscopeDivide: 'normal'`, `ageDivide: 'normal'`, and `dayDivide: 'forward'`; the default star-placement algorithm is `algorithm: 'default'`. This method takes no arguments and returns no value. It does not reset loaded plugins.

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

## Plugins   {#插件}

An iztro plugin is a function that attaches functionality to a chart（星盤） object. You can extend the chart to suit your needs. When developing in TypeScript, declare the plugin’s methods in an interface extending `FunctionalAstrolabe`.

The interface is declared as follows:

```ts
export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}
```

Define `myNewFunc` and `majorStar` to suit your needs. The interface’s methods can be implemented in a single plugin function or across several plugin functions:

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

To register plugins, import `astro` and call `loadPlugin()` or `loadPlugins()`. Plugins registered by either method apply to chart instances **created afterward**.

```ts
import {astro} from iztro;

// 批量挂载插件
astro.loadPlugins([myTestPlugin， myTestPlugin2]);

// 逐个加载插件
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
```

To apply a plugin only to a particular existing chart（星盤）, call that chart instance’s `use()` method:

```ts
const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

astrolabe.use(myTestPlugin);
astrolabe.myNewFunc();
```

:::tip Tips

When using plugins in TypeScript, specify the generic type so the compiler recognizes the added methods. To use the plugin methods above, for example:

```ts
 const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

 // 使用插件定义的方法
 astrolabe.myNewFunc();   // 火六局

 // 使用第二个插件方法
 astrolabe.majorStar();   // 七杀
```

:::

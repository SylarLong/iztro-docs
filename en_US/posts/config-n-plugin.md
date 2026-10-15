---
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
| `yearDivide`   <Badge type="warning" text="^2.4.0" /> | `normal`  \|  `exact` | `normal` | Year stem-and-branch boundary: `normal` uses the first day of the first lunar month; `exact` uses the Start of Spring solar term. |
| `horoscopeDivide`   <Badge type="warning" text="^2.4.3" /> | `normal`  \|  `exact` | `normal` | Year and month stem-and-branch boundaries used for horoscope periods |
| `ageDivide`   <Badge type="warning" text="^2.4.5" /> | `normal`  \|  `birthday` | `normal` | Annual age-period nominal-age boundary: `normal` uses the calendar year; `birthday` uses the lunar birthday. |
| `dayDivide`   <Badge type="warning" text="^2.5.2" /> | `forward`  \|  `current` | `forward` | Date assignment for the late Zi hour: `forward` assigns it to the following day; `current` to the same day. |
| `algorithm`   <Badge type="warning" text="^2.5.0" /> | `default`  \|  `zhongzhou` | `default` | Star-placement rules: `default` uses the standard version; `zhongzhou` uses the Zhongzhou school version. |

:::warning Note
From `v2.6.2`, `astro.config()` sets defaults only for charts created afterward. `withOptions({ config })` overrides settings only for the chart being created and does not alter the global defaults. Existing charts and their horoscope periods and transformation analyses retain the settings and language used when they were created. If older code relied on one charting call changing global settings, call `astro.config()` explicitly instead.
:::

### getConfig() <Badge type="warning" text="^2.3.0" /> {#getconfig}

- Purpose

  Get the currently effective global configuration. The returned `mutagens` and `brightness` use normalized key names within the library, suitable for debugging or confirming configuration status.

  <Badge type="warning" text="^2.6.2" /> The returned value is an independent deep copy. Modifying it or its transformation and brightness arrays does not change the library’s configuration.

- Definition

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

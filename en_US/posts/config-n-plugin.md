---
outline: deep
description: "Zi Wei Academy, iztro official documentation, iztro development documentation, configuration and plugin usage."
---

# Configuration and Plugins <Badge type="warning" text="^2.3.0" />

Welcome to iztro's configuration and plugin features. Zi Wei Dou Shu (紫微斗數) has many lineages, whose Four Transformations (四化) and star brightness may differ slightly. To support those lineages and make the library extensible, iztro introduced global configuration and third-party plugins in `v2.3.0`.

:::tip
If you publish an open-source third-party plugin based on iztro, please [contact the author](../about.md#how-to-contact-me) so it can be added to this documentation.
:::

## Configuration

For the configuration definition, see [Configuration Definition](../type-definition.md#config). Global configuration is straightforward: call `astro.config()` before calling a chart-calculation method.

```ts
import { astro } from 'iztro';

astro.config({
  mutagens: { 庚: ['太陽', '武曲', '天同', '天相'] },
  brightness: {
    貪狼: ['旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺'],
  },
});
```

After the preceding code runs, subsequent chart calculations merge the new settings with the defaults. In other words, you do not need to repeat values that are the same as the defaults. For the default Four Transformations table, see [the Ten Heavenly Stems Four Transformations table](../learn/mutagen.md#the-four-transformations-of-the-ten-heavenly-stems). For default star brightness, see [the Star Brightness table](../learn/star.md#star-brightness-table).

Besides `mutagens` and `brightness`, the following options adjust calculation rules:

| Option | Values | Default | Description |
| --- | --- | --- | --- |
| `yearDivide` <Badge type="warning" text="^2.4.0" /> | `normal` \| `exact` | `normal` | Birth-year stem-branch boundary: `normal` uses Lunar New Year; `exact` uses Beginning of Spring (立春). |
| `horoscopeDivide` <Badge type="warning" text="^2.4.3" /> | `normal` \| `exact` | `normal` | Year and month stem-branch boundary used for horoscope calculations. |
| `ageDivide` <Badge type="warning" text="^2.4.5" /> | `normal` \| `birthday` | `normal` | Minor Cycle (小限) nominal-age boundary: `normal` considers the calendar year only; `birthday` uses the lunar birthday. |
| `dayDivide` <Badge type="warning" text="^2.5.2" /> | `forward` \| `current` | `forward` | Late Rat hour (晚子時) date assignment: `forward` assigns the following day; `current` assigns the current day. |
| `algorithm` <Badge type="warning" text="^2.5.0" /> | `default` \| `zhongzhou` | `default` | Star-placement lineage: `default` is the common approach; `zhongzhou` is the Zhongzhou school (中州派). |

:::warning
`config()` is global. It affects all chart and horoscope calculations made afterwards; configuration passed through `withOptions({ config })` also updates the global configuration.
:::

### getConfig() <Badge type="warning" text="^2.3.0" />

- Purpose

  Gets the currently active global configuration. The returned `mutagens` and `brightness` use normalized internal keys, so this method is useful for debugging or confirming configuration state.

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

- Parameters

  None

- Return value

  The currently active configuration object

- Example

  ```ts
  import { astro } from 'iztro';

  astro.config({ algorithm: 'zhongzhou', ageDivide: 'birthday' });

  const currentConfig = astro.getConfig();
  ```

## Plugins

An iztro plugin is a function that is attached to an astrolabe object. You can extend it for your own needs. In a TypeScript environment, declare plugin methods in an interface that extends `FunctionalAstrolabe`.

The interface declaration is as follows:

```ts
export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}
```

You may define `myNewFunc` and `majorStar` as needed. The methods declared in this interface can be implemented in one plugin function or in several plugin functions, as shown below:

```ts
// Create the first plugin function
export function myTestPlugin(this: IAstrolabe): void {
  // Implement plugin logic
  this.myNewFunc = () => {
    return this.fiveElementsClass;
  };
}

// Create the second plugin function
export function myTestPlugin2(this: IAstrolabe): void {
  // Implement plugin logic
  this.majorStar = () => {
    let stars = this.palace('命宮')
      ?.majorStars.filter((item) => item.type === 'major' && !['祿存', '天馬'].includes(item.name))
      .map((item) => item.name)
      .join(',');

    if (!stars) {
      stars = this.palace('遷移')
        ?.majorStars.filter((item) => item.type === 'major' && !['祿存', '天馬'].includes(item.name))
        .map((item) => item.name)
        .join(',');
    }

    return stars ?? '';
  };
}
```

Attaching a plugin is equally simple: after importing `astro`, call `loadPlugin()` or `loadPlugins()`. Plugins registered by either method are applied to **new astrolabe instances created afterwards**.

```ts
import { astro } from 'iztro';

// Attach several plugins at once
astro.loadPlugins([myTestPlugin, myTestPlugin2]);

// Load plugins one at a time
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
```

To apply a plugin only to an astrolabe that has already been created, call that astrolabe instance's `use()` method:

```ts
const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

astrolabe.use(myTestPlugin);
astrolabe.myNewFunc();
```

:::tip
When using plugins in TypeScript, specify the generic type so the compiler recognizes the added methods. To use the plugins above:

```ts
const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

// Use the method declared by the plugin
astrolabe.myNewFunc(); // Fire Six Bureau (火六局)

// Use the method declared by the second plugin
astrolabe.majorStar(); // Seven Killings (七殺)
```

:::

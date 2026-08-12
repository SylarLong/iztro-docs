---
outline: deep
description: "紫微研习社，iztro官方文档，iztro开发文档，iztro紫微斗数星曜介绍，iztro的star对象使用方法以及示例代码。"
---

# 配置和插件 <Badge type="warning" text="^2.3.0" />

欢迎使用iztro配置和插件功能。紫微斗数流派众多，不同的流派的四化以及星曜亮度都会有些许差异，为了满足不同流派的需求和功能的扩展，iztro在 `v2.3.0` 版本加入了全局配置和第三方插件功能。

:::tip 提示
如果有读者基于iztro开发了第三方插件开源库，请 [联系作者](../about.md#怎么联系我❓) 将插件加入到文档列表以便使用。
:::

## 配置

关于配置的定义请参考 [配置定义](../type-definition.md#config)。全局配置十分简单，只需要在调用排盘方法之前调用 `astro.config()` 方法即可，具体代码如下：

```ts
import { astro } from 'iztro';

astro.config({
  mutagens: { 庚: ['太阳', '武曲', '天同', '天相'] },
  brightness: {
    贪狼: ['旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺'],
  },
});
```

上述代码执行之后调用排盘方法时，将会把新的配置合并到默认配置中进行应用。换言之，在数据与默认配置相同的情况下，你并不需要重复在配置文件中设置。关于默认的四化表，请参考 [十天干四化表](../learn/mutagen.md#十天干四化表)。关于默认星曜亮度，请参考 [星曜亮度表](../learn/star.md#星曜亮度表)。

除 `mutagens` 和 `brightness` 外，还可以通过以下选项调整排盘规则：

| 配置项 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `yearDivide` <Badge type="warning" text="^2.4.0" /> | `normal` \| `exact` | `normal` | 年干支分界；`normal` 以农历正月初一为界，`exact` 以立春为界 |
| `horoscopeDivide` <Badge type="warning" text="^2.4.3" /> | `normal` \| `exact` | `normal` | 运限使用的年、月干支分界 |
| `ageDivide` <Badge type="warning" text="^2.4.5" /> | `normal` \| `birthday` | `normal` | 小限虚岁分界；`normal` 只看自然年，`birthday` 以农历生日为界 |
| `dayDivide` <Badge type="warning" text="^2.5.2" /> | `forward` \| `current` | `forward` | 晚子时归属；`forward` 归入次日，`current` 归入当日 |
| `algorithm` <Badge type="warning" text="^2.5.0" /> | `default` \| `zhongzhou` | `default` | 安星规则；`default` 为通行版本，`zhongzhou` 为中州派版本 |

:::warning 注意
`config()` 是全局配置。它会影响之后所有排盘与运限计算；使用 `withOptions({ config })` 传入的配置同样会写入全局配置。
:::

### getConfig() <Badge type="warning" text="^2.3.0" />

- 用途

  获取当前已生效的全局配置。返回的 `mutagens` 和 `brightness` 使用库内部的规范化键名，适合用于调试或确认配置状态。

- 定义

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

- 参数

  无

- 返回值

  当前生效的配置对象

- 示例

  ```ts
  import { astro } from 'iztro';

  astro.config({ algorithm: 'zhongzhou', ageDivide: 'birthday' });

  const currentConfig = astro.getConfig();
  ```

## 插件

iztro的插件就是一个函数，这个函数会挂载到星盘对象上。你可以根据自己的需求扩展功能。假如你是在typescript环境下开发，你需要将插件方法申明到接口中，而该接口需要继承自 `FunctionalAstrolabe`。

接口声明如下：

```ts
export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}
```

上述 `myNewFunc` 和 `majorStar` 方法可以根据你自己的需求进行定义。上述接口内的方法你可以在一个插件方法内实现，也可以在多个插件方法内实现。实现方法如下：

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

挂载插件的方法也非常简单，只需要在引入 `astro` 以后执行 `loadPlugin()` 或者`loadPlugins()` 方法即可。两种方式注册的插件会应用到**后续新创建**的星盘实例。

```ts
import {astro} from iztro;

// 批量挂载插件
astro.loadPlugins([myTestPlugin， myTestPlugin2]);

// 逐个加载插件
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
```

如果只想为一个已经创建的星盘应用插件，可以调用该星盘实例的 `use()` 方法：

```ts
const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

astrolabe.use(myTestPlugin);
astrolabe.myNewFunc();
```

:::tip 提示

如果在typescript环境下使用插件时，需要将指定范型类型，如此才会在编译的时候不会出现方法未定义的错误。比如我们要使用上述插件方法，需要：

```ts
 const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

 // 使用插件定义的方法
 astrolabe.myNewFunc();   // 火六局

 // 使用第二个插件方法
 astrolabe.majorStar();   // 七杀
```

:::

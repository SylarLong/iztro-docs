---
outline: deep
description: "紫微研习社，iztro官方文档，iztro开发文档，iztro紫微斗数星耀介绍，iztro的star对象使用方法以及示例代码。"
---

# 配置和插件 <Badge type="warning" text="^2.3.0" />

欢迎使用iztro配置和插件功能。紫微斗数流派众多，不同的流派的四化以及星耀亮度都会有些许差异，为了满足不同流派的需求和功能的扩展，iztro在 `v2.3.0` 版本加入了全局配置和第三方插件功能。

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

上述代码执行之后调用排盘方法时，将会把新的配置合并到默认配置中进行应用。换言之，在数据与默认配置相同的情况下，你并不需要重复在配置文件中设置。关于默认的四化表，请参考 [十天干四化表](../learn/mutagen.md#十天干四化表)。关于默认星耀亮度，请参考 [星耀亮度表](../learn/star.md#星耀亮度表)。

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

挂载插件的方法也非常简单，只需要在引入 `astro` 以后执行 `loadPlugin()` 或者`loadPlugins()` 方法即可。

```ts
import {astro} from iztro;

// 批量挂载插件
astro.loadPlugins([myTestPlugin， myTestPlugin2]);

// 逐个加载插件
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
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
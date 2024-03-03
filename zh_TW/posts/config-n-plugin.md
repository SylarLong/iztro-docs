---
outline: deep
description: "紫微研習社，iztro官方文檔，iztro開發文檔，iztro紫微鬥數星耀介紹，iztro的star對象使用方法以及示例代碼。"
---

# 配置和插件 <Badge type="warning" text="^2.3.0" />

歡迎使用iztro配置和插件功能。紫微鬥數流派眾多，不同的流派的四化以及星耀亮度都會有些許差異，為了滿足不同流派的需求和功能的擴展，iztro在 `v2.3.0` 版本加入了全局配置和第三方插件功能。

:::tip 提示
如果有讀者基於iztro開發了第三方插件開源庫，請 [聯系作者](../about.md#怎麽聯系我❓) 將插件加入到文檔列表以便使用。
:::

## 配置

關於配置的定義請參考 [配置定義](../type-definition.md#config)。全局配置十分簡單，只需要在調用排盤方法之前調用 `astro.config()` 方法即可，具體代碼如下：

```ts
import { astro } from 'iztro';

astro.config({
  mutagens: { 庚: ['太陽', '武曲', '天同', '天相'] },
  brightness: {
    貪狼: ['旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺'],
  },
});
```

上述代碼執行之後調用排盤方法時，將會把新的配置合並到默認配置中進行應用。換言之，在數據與默認配置相同的情況下，你並不需要重復在配置文件中設置。關於默認的四化表，請參考 [十天干四化表](../learn/mutagen.md#十天干四化表)。關於默認星耀亮度，請參考 [星耀亮度表](../learn/star.md#星耀亮度表)。

## 插件

iztro的插件就是一個函數，這個函數會掛載到星盤對象上。你可以根據自己的需求擴展功能。假如你是在typescript環境下開發，你需要將插件方法申明到接口中，而該接口需要繼承自 `FunctionalAstrolabe`。

接口聲明如下：

```ts
export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}
```

上述 `myNewFunc` 和 `majorStar` 方法可以根據你自己的需求進行定義。上述接口內的方法你可以在一個插件方法內實現，也可以在多個插件方法內實現。實現方法如下：

```ts
// 創建一個插件函數
export function myTestPlugin(this: IAstrolabe): void {
  // 實現插件應用邏輯
  this.myNewFunc = () => {
    return this.fiveElementsClass;
  };
}

// 創建二個插件函數
export function myTestPlugin2(this: IAstrolabe): void {
  // 實現插件應用邏輯
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

掛載插件的方法也非常簡單，只需要在引入 `astro` 以後執行 `loadPlugin()` 或者`loadPlugins()` 方法即可。

```ts
import {astro} from iztro;

// 批量掛載插件
astro.loadPlugins([myTestPlugin， myTestPlugin2]);

// 逐個加載插件
astro.loadPlugin(myTestPlugin);
astro.loadPlugin(myTestPlugin2);
```

:::tip 提示

如果在typescript環境下使用插件時，需要將指定範型類型，如此才會在編譯的時候不會出現方法未定義的錯誤。比如我們要使用上述插件方法，需要：

```ts
 const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

 // 使用插件定義的方法
 astrolabe.myNewFunc();   // 火六局

 // 使用第二個插件方法
 astrolabe.majorStar();   // 七殺
```

:::
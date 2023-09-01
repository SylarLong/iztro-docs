import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

const version = "v1.1.1";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "iztro Docs",
  description: "iztro is a lightweight Open-Source Javascript library of getting The Purple Star Astrology(Zi Wei Dou Shu) astrolabe information.",
  outDir: "../astro/docs/",

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  
  themeConfig: {
    search: {
      provider: "local",
    },
  },

  locales: {
    root: {
      label: "简体中文",
      lang: "zh_CN",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: "主页", link: "/" },
          { text: "文档", link: "/quick-start.md" },
          { text: "示例", link: "https://a.14star.cn" },
          {
            text: "讨论",
            link: "https://github.com/SylarLong/astro/discussions",
          },
          { text: "关于作者", link: "/about.md" },
          {
            text: '<img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" />',
            link: 'https://github.com/SylarLong/astro'
          },
          {
            text: version,
            items: [
              {
                text: "更改日志",
                link: "https://github.com/SylarLong/astro/blob/main/CHANGELOG.md",
              },
              { text: "NPM地址", link: "https://www.npmjs.com/package/iztro" },
            ],
          }
        ],

        sidebar: [
          {
            text: "iztro",
            items: [
              { text: "快速开始", link: "/quick-start.md" },
              { text: "类型定义", link: "/type-definition.md" },
              { text: "星盘", link: "/posts/astrolabe.md" },
              { text: "宫位", link: "/posts/palace.md" },
              { text: "星耀", link: "/posts/star.md" },
            ],
          },
          {
            text: "紫微斗数",
            items: [
              { text: "基础扫盲", link: "/learn/basis.md" },
              { text: "宫位知识", link: "/learn/palace.md" },
              {
                text: "星耀知识",
                link: "/learn/star.md",
                items: [
                  { text: "14主星", link: "/learn/major-star.md" },
                  { text: "14辅星", link: "/learn/minor-star.md" },
                  { text: "37杂耀", link: "/learn/adj-star.md" },
                ],
              },
              { text: "四化", link: "/learn/mutagen.md" },
              { text: "运限", link: "/learn/horoscope.md" },
              { text: "安星诀", link: "/learn/setup.md" },
            ],
          },
        ],

        socialLinks: [
          { icon: "github", link: "https://github.com/SylarLong/astro" },
        ],

        outlineTitle: "页内导航",
      },
    },
    en_US: {
      label: "English",
      lang: "en_US",
      link: "/en_US",

      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: "Home", link: "/" },
          { text: "Docs", link: "/markdown-examples" },
          { text: "Demo", link: "https://a.14star.cn" },
          {
            text: "Discussions",
            link: "https://github.com/SylarLong/astro/discussions",
          },
          {
            text: '<img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" />',
            link: 'https://github.com/SylarLong/astro'
          },
          {
            text: version,
            items: [
              {
                text: "Changlog",
                link: "https://github.com/SylarLong/astro/blob/main/CHANGELOG.md",
              },
              {
                text: "NPM Package",
                link: "https://www.npmjs.com/package/iztro",
              },
            ],
          }
        ],

        sidebar: [
          {
            text: "iztro",
            items: [{ text: "Quick Start", link: "/en_US/quick-start.md" }],
          },
        ],

        socialLinks: [
          { icon: "github", link: "https://github.com/SylarLong/astro" },
        ],

        outlineTitle: "Jump to",
      },
    },
  },
});

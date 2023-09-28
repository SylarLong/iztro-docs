import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

const version = "v1.2.6";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "紫微研习社 ziwei.pro",
  description:
    "iztro is a lightweight Open-Source Javascript library of getting The Purple Star Astrology(Zi Wei Dou Shu) astrolabe information.",
  outDir: "../astro/docs/",
  ignoreDeadLinks: true,
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
          { text: "学习", link: "/learn/basis.md" },
          { text: "排盘", link: "https://ziwei.pub" },
          {
            text: "讨论",
            link: "https://github.com/SylarLong/iztro/discussions",
          },
          { text: "关于作者", link: "/about.md" },
          {
            text: '<img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" />',
            link: "https://github.com/SylarLong/iztro",
          },
          {
            text: version,
            items: [
              {
                text: "更改日志",
                link: "https://github.com/SylarLong/iztro/blob/main/CHANGELOG.md",
              },
              { text: "NPM地址", link: "https://www.npmjs.com/package/iztro" },
            ],
          },
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
              { text: "星盘介绍", link: "/learn/astrolabe.md" },
              { text: "宫位知识", link: "/learn/palace.md" },
              {
                text: "星耀知识",
                link: "/learn/star.md",
                items: [
                  { text: "14主星", link: "/learn/major-star.md" },
                  { text: "14辅星", link: "/learn/minor-star.md" },
                  { text: "37杂耀", link: "/learn/adj-star.md" },
                  { text: "48神煞", link: "/learn/dec-star.md" },
                ],
              },
              { text: "四化", link: "/learn/mutagen.md" },
              { text: "运限", link: "/learn/horoscope.md" },
              { text: "安星诀", link: "/learn/setup.md" },
            ],
          },
        ],

        socialLinks: [
          { icon: "github", link: "https://github.com/SylarLong/iztro" },
        ],

        outlineTitle: "页内导航",
      },
    },
    zh_TW: {
      label: "繁體中文",
      lang: "zh_TW",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: "主頁", link: "/zh_TW/" },
          { text: "文檔", link: "/zh_TW/quick-start.md" },
          { text: "排盤", link: "https://ziwei.pub" },
          {
            text: "討論",
            link: "https://github.com/SylarLong/iztro/discussions",
          },
          { text: "關於作者", link: "/zh_TW/about.md" },
          {
            text: '<img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" />',
            link: "https://github.com/SylarLong/iztro",
          },
          {
            text: version,
            items: [
              {
                text: "更改日誌",
                link: "https://github.com/SylarLong/iztro/blob/main/CHANGELOG.md",
              },
              { text: "NPM地址", link: "https://www.npmjs.com/package/iztro" },
            ],
          },
        ],

        sidebar: [
          {
            text: "iztro",
            items: [
              { text: "快速開始", link: "/zh_TW/quick-start.md" },
              { text: "類型定義", link: "/zh_TW/type-definition.md" },
              { text: "星盤", link: "/zh_TW/posts/astrolabe.md" },
              { text: "宮位", link: "/zh_TW/posts/palace.md" },
              { text: "星耀", link: "/zh_TW/posts/star.md" },
            ],
          },
          {
            text: "紫微鬥數",
            items: [
              { text: "基礎掃盲", link: "/zh_TW/learn/basis.md" },
              { text: "星盤介紹", link: "/zh_TW/learn/astrolabe.md" },
              { text: "宮位知識", link: "/zh_TW/learn/palace.md" },
              {
                text: "星耀知識",
                link: "/zh_TW/learn/star.md",
                items: [
                  { text: "14主星", link: "/zh_TW/learn/major-star.md" },
                  { text: "14輔星", link: "/zh_TW/learn/minor-star.md" },
                  { text: "37雜耀", link: "/zh_TW/learn/adj-star.md" },
                  { text: "48神煞", link: "/zh_TW/learn/dec-star.md" },
                ],
              },
              { text: "四化", link: "/zh_TW/learn/mutagen.md" },
              { text: "運限", link: "/zh_TW/learn/horoscope.md" },
              { text: "安星訣", link: "/zh_TW/learn/setup.md" },
            ],
          },
        ],

        socialLinks: [
          { icon: "github", link: "https://github.com/SylarLong/iztro" },
        ],

        outlineTitle: "頁內導航",
      },
    },
    en_US: {
      label: "English",
      lang: "en_US",

      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: "Home", link: "/en_US/" },
          { text: "Docs", link: "/en_US/quick-start.md" },
          { text: "Astrolabe", link: "https://ziwei.pub" },
          {
            text: "Discussions",
            link: "https://github.com/SylarLong/iztro/discussions",
          },
          {
            text: '<img src="https://img.shields.io/github/stars/sylarlong/iztro.svg?style=social&label=Star" alt="iztro" />',
            link: "https://github.com/SylarLong/iztro",
          },
          {
            text: version,
            items: [
              {
                text: "Changlog",
                link: "https://github.com/SylarLong/iztro/blob/main/CHANGELOG.md",
              },
              {
                text: "NPM Package",
                link: "https://www.npmjs.com/package/iztro",
              },
            ],
          },
        ],

        sidebar: [
          {
            text: "iztro",
            items: [{ text: "Quick Start", link: "/en_US/quick-start.md" }],
          },
        ],

        socialLinks: [
          { icon: "github", link: "https://github.com/SylarLong/iztro" },
        ],

        outlineTitle: "Jump to",
      },
    },
  },

  head: [
    [
      "meta",
      {
        keyword:
          "紫微研习社,紫微斗数,ziweidoushu,iztro,紫微斗数排盘,紫微斗数学习,紫微斗数入门",
      },
    ],
    [
      "meta",
      {
        author: "SylarLong",
      },
    ],
    [
      "script",
      {
        async: "true",
        src: "https://www.googletagmanager.com/gtag/js?id=G-WR6P6S20P2",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-WR6P6S20P2');",
    ],
    [
      "script",
      {},
      "var _hmt = _hmt || [];(function() {var hm = document.createElement('script');hm.src = 'https://hm.baidu.com/hm.js?e6306139059dd0191562066be8272318';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s);})();",
    ],
    [
      "meta",
      {
        name: "baidu-site-verification",
        content: "codeva-f4WginZgsF"
      }
    ],
    [
      "meta",
      {
        name: "msvalidate.01",
        content: "12373B57E08DD59CE573232894C0822B"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/static/apple-touch-icon.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
        href: "/static/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
        href: "/static/favicon-16x16.png"
      }
    ],
    [
      "link",
      {
        rel: "manifest",
        href: "/static/site.webmanifest"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/static/favicon.ico"
      }
    ]
  ],
  sitemap: {
    hostname: "https://ziwei.pro",
  },
});

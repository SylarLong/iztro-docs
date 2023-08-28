import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

const version = 'v1.0.0';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Astro Docs",
  description: "document of @sylarlong/astro",
  outDir: "../astro/docs/",
  
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh_CN',
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: '主页', link: '/' },
          { text: '文档', link: '/quick-start.md' },
          { text: '示例', link: 'https://a.14star.cn' },
          { text: '讨论', link: 'https://github.com/SylarLong/astro/discussions' },
          { 
            text: version,
            items: [
              { text: '更改日志', link: 'https://github.com/SylarLong/astro/blob/main/CHANGELOG.md' },
              { text: 'NPM地址', link: 'https://www.npmjs.com/package/@sylarlong/astro' },
            ]
          }
        ],
    
        sidebar: [
          {
            text: '@sylarlong/astro',
            items: [
              { text: '快速开始', link: '/quick-start.md' },
            ]
          }
        ],
    
        socialLinks: [
          { icon: 'github', link: 'https://github.com/SylarLong/astro' }
        ],

        outlineTitle: '页内导航'
      },
    },
    en_US: {
      label: 'English',
      lang: 'en_US',
      link: '/en_US',

      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Docs', link: '/markdown-examples' },
          { text: 'Demo', link: 'https://a.14star.cn' },
          { text: 'Discussions', link: 'https://github.com/SylarLong/astro/discussions'},
          { 
            text: version,
            items: [
              { text: 'Changlog', link: 'https://github.com/SylarLong/astro/blob/main/CHANGELOG.md' },
              { text: 'NPM Package', link: 'https://www.npmjs.com/package/@sylarlong/astro' },
            ]
          }
        ],
    
        sidebar: [
          {
            text: '@sylarlong/astro',
            items: [
              { text: 'Quick Start', link: '/en_US/quick-start.md' },
            ]
          }
        ],
    
        socialLinks: [
          { icon: 'github', link: 'https://github.com/SylarLong/astro' }
        ],

        outlineTitle: 'Jump to'
      },
    }
  }
})

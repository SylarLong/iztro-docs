import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
  }
}
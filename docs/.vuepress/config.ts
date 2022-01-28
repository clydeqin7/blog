import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'fe4fun',
  description: 'blog',
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
  base: '/',
  themeConfig: {
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '前端技术',
        children: [
          {
            text: 'JavaScript', link: '/FE/JS/'
          },
          {
            text: 'HTML', link: '/FE/HTML/'
          },
          {
            text: 'CSS', link: '/FE/CSS/'
          },
          {
            text: 'Vue', link: '/FE/Vue/'
          },
        ]
      },
    ],
    sidebar: 'auto',
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/clydeqin7/blog',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'main',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: 'Edit this page on GitHub',
    contributors: false,
    lastUpdated: true,
  },
})
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "fe4fun",
  description: "A digital garden",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      { text: 'Code', link: '/code/' }
    ],

    sidebar: {
      // 当用户位于 `code` 目录时，会显示此侧边栏
      '/code/': [
        {
          text: 'Code',
          items: [
            { text: 'Index', link: '/code/' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    base: '/blog/' // 替换为你的仓库名称
  }
})

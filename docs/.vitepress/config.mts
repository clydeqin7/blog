import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Code', link: '/code/' }
    ],

    sidebar: {
      // 当用户位于 `code` 目录时，会显示此侧边栏
      '/code/': [
        {
          text: 'Code',
          items: [
            { text: 'Index', link: '/code/' },
            { text: '前端', link: '/code/frontend/' },
            { text: '后端', link: '/code/backend/' },

          ]
        }
      ],
      // 当用户位于 `code/frontend` 目录时，会显示此侧边栏
      '/code/frontend/': [
        {
          text: '前端',
          items: [
            { text: 'Index', link: '/code/frontend/' },
          ]
        }
      ],
      // 当用户位于 `code/backend` 目录时，会显示此侧边栏
      '/code/backend/': [
        {
          text: '后端',
          items: [
            { text: 'Index', link: '/code/backend/' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

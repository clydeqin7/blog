module.exports = {
  title: "clydeqin7",
  description: 'Just playing around',
  theme: 'antdocs',
  head: [
    [ 'link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        items: [
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
      { text: 'github', link: 'https://github.com/clydeqin7/blog' },
    ],
    sidebar: 'auto',
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/clydeqin7/blog',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我改善此页面！',
    lastUpdated: '上次更新：', // string | boolean
  },
}

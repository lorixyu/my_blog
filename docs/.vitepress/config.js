export default {
  title: 'My Blog',
  description: 'A personal blog powered by VitePress',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/note' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Home', link: '/' },
          { text: 'My Note', link: '/note' }
        ]
      }
    ]
  }
}
export default {
  title: 'lorixyu's blog', // 这里设置你想要的固定标题
  titleTemplate: false, // 关键：设置为 false 可以禁用标题模板
  // 其他配置...
}

export default {
  title: 'lorixyu\'s blog',
  titleTemplate: false,
  description: 'A personal blog powered by VitePress',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/note' }
    ],
    outline: {
      level: [1, 3],
      label: 'On this page'
    },  // ← 加上这个逗号！！！

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

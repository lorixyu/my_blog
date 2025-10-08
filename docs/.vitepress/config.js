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
      level: [1, 3], // 显示 h1 到 h3，默认是 [2, 3]
      label: 'On this page' // 大纲标题
    },	
     
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

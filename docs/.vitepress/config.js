export default {
  title: "LorixYu's Blog",
  description: "A personal blog powered by VitePress",

  themeConfig: {
    outline: {
      level: [1, 4],
      label: 'On this page'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/note' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Home', link: '/' },
          {
            text: 'C++',  // 父级标题
            collapsible: true,   // 允许折叠
            collapsed: true,    // 折叠
            items: [
              { text: 'My Note', link: '/note' },
              { text: '实现myfunction', link: '/function' },
	      { text: '实现mybind1st‘, link: '/bind1st' },
            ]
          }
        ]
      }
    ]
  }
}


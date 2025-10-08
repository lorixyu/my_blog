export default {
  title: 'My Blog',
  titleTemplate: false,
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

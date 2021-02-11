module.exports = {
  plugins: [
    'typescript',
    // A very simple plugin
    'vuepress-plugin-reading-time',
    [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'post',
            dirname: '_posts',
            path: '/',
            pagination: {
              perPagePosts: 2,
            },
          },
        ],
        frontmatters: [
          {
            id: 'tag',
            keys: ['tag', 'tags'],
            path: '/tag/',
            layout: 'Tag',
            frontmatter: { title: 'Tag' },
            itemlayout: 'Tag',
            pagination: {
              perPagePosts: 3,
            },
          },
        ],
      },
    ],
  ],
  markdown: {
    extendMarkdown: (md) => {
      // eslint-disable-next-line global-require
      md.use(require('markdown-it-footnote'));
    },
  },
};

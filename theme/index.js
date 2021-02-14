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
            id: 'tags',
            keys: ['tags', 'tags'],
            path: '/tags/',
            layout: 'Tags',
            frontmatter: { title: 'Tags' },
            itemlayout: 'Tags',
            pagination: {
              perPagePosts: 3,
            },
          },
        ],
      },
    ],
  ],
};

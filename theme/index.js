const mediumZoon = [
  // Official plugins is buggy. It works only for the first page loaded
  // When we follow an internal link (trigger SPA navigatione)
  // it does not appear.
  // '@vuepress/medium-zoom',
  'vuepress-plugin-medium-zoom',
  {
    selector: '#articlepage img',
  },
];

const search = [
  '@vuepress/search',
  {
    searchMaxSuggestions: 10,
  },
];

const vuePressBlog = [
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
];

module.exports = {
  plugins: [
    'typescript',
    // A very simple plugin
    'vuepress-plugin-reading-time',

    // '@vuepress/plugin-nprogress',

    mediumZoon,
    search,

    '@vuepress/back-to-top',

    vuePressBlog,
    'smooth-scroll',
  ],
};

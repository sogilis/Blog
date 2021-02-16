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
          lengthPerPage: 9,
        },
      },
    ],
    frontmatters: [
      {
        id: 'tags',
        keys: ['tags'],
        path: '/tags/',
        layout: 'Tags',
      },
      {
        id: 'category',
        keys: ['category'],
        path: '/category/',
        layout: 'Categories',
      },
    ],
  },
];

module.exports = {
  plugins: [
    'typescript',
    // A very simple plugin
    'vuepress-plugin-reading-time',
    // A very simple plugin easy customizable
    'reading-progress',

    // '@vuepress/plugin-nprogress',

    mediumZoon,
    search,

    '@vuepress/back-to-top',

    vuePressBlog,
    'smooth-scroll',
  ],
};

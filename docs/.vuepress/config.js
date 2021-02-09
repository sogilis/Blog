const path = require('path');

module.exports = {
  title: '70 lines of vuepress blog theme',
  theme: path.join(__dirname, '/../../theme/'),
  plugins: [
    'typescript',
    // A very simple plugin
    'vuepress-plugin-reading-time',
  ],
  markdown: {
    extendMarkdown: (md) => {
      // eslint-disable-next-line global-require
      md.use(require('markdown-it-footnote'));
    },
  },
};

const path = require('path');

module.exports = {
  title: "Sogilis's blog",
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  theme: path.join(__dirname, '/../../theme/'),
  // Configuration of Markdown should not be in ../../theme/index
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      // eslint-disable-next-line global-require
      md.use(require('markdown-it-footnote'));
    },
  },
};

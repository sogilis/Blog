const path = require('path');

module.exports = {
  title: '70 lines of vuepress blog theme',
  theme: path.join(__dirname, '/../../theme/'),
  plugins: [['vuepress-plugin-typescript']],
};

/**
 * See also
 * https://github.com/vuepress/vuepress-next/blob/961228234e3983f1f84f992a1317316d09f8cb98/.eslintrc.js#L1
 * https://github.com/vuejs/eslint-config-airbnb/blob/master/index.js
 */
module.exports = {
  root: true,
  extends: ['vuepress', 'airbnb-base'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
  },
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: [
    //       'state', // for vuex state
    //       'acc', // for reduce accumulators
    //       'e', // for e.returnvalue
    //     ],
    //   },
    // ],

    /**
     * Our rules
     */
    'no-console': 'error',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',

    // Set by Prettier
    'max-len': 'off',
  },
};

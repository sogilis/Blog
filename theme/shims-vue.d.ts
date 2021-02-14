// See https://stackoverflow.com/questions/64213461/vuejs-typescript-cannot-find-module-components-navigation-or-its-correspon
declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

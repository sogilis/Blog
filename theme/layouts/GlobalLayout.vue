<template>
  <div id="global-layout">
    <Header />
    <main class="maincolumn">
      <div style="background-color: #ddd">
        <RouterLink to="/">{{ $site.title }}</RouterLink
        >· <RouterLink to="/tags/">Tags</RouterLink>·
        <RouterLink to="/category/">Categories</RouterLink>
      </div>
      <br />
      <br />
      <DefaultGlobalLayout />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GlobalLayout from '@vuepress/core/lib/client/components/GlobalLayout.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    DefaultGlobalLayout: GlobalLayout,
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import '../styles/index.scss';

main {
  padding-top: 7em;
}

@media (min-width: 768px) {
  main {
    padding-top: 12em;
  }
}
</style>

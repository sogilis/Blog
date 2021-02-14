<template>
  <div id="global-layout">
    <Header />
    <div style="background-color: #ddd">
      <RouterLink to="/">{{ $site.title }}</RouterLink
      >· <RouterLink to="/tag/">Tag</RouterLink>
    </div>
    <br />
    <DefaultGlobalLayout /><br />
    <Footer />
  </div>
</template>

<script>
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
</style>

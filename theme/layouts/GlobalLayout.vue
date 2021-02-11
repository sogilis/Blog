<template>
  <div id="global-layout">
    <header style="background-color: #ddd">
      <RouterLink to="/">{{ $site.title }}</RouterLink
      >· <RouterLink to="/tag/">Tag</RouterLink>
    </header>
    <br />
    <DefaultGlobalLayout /><br />
    <Footer> </Footer>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GlobalLayout from '@vuepress/core/lib/client/components/GlobalLayout.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    DefaultGlobalLayout: GlobalLayout,
    Footer,
  },
};
</script>

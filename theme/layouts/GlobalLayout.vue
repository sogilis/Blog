<template>
  <div id="global-layout">
    <header style="background-color: #ddd">
      <RouterLink to="/">{{ $site.title }}</RouterLink
      >· <RouterLink to="/tag/">Tag</RouterLink>
    </header>
    <br />
    <DefaultGlobalLayout /><br />
    <footer style="background-color: #ddd">
      <a href="https://github.com/ulivz/70-lines-of-vuepress-blog-theme"
        >Github</a
      >
      · Powered by VuePress
    </footer>
  </div>
</template>

<script>
import GlobalLayout from '@vuepress/core/lib/client/components/GlobalLayout.vue';

export default {
  components: { DefaultGlobalLayout: GlobalLayout },
};
</script>

<template>
  <div id="global-layout">
    <header style="background-color: #ddd">
      <router-link to="/">{{ $site.title }}</router-link
      >· <router-link to="/tag/">Tag</router-link>
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
import GlobalLayout from '@app/components/GlobalLayout.vue';

export default {
  components: { DefaultGlobalLayout: GlobalLayout },
};
</script>

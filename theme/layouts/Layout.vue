<template>
  <div id="layout">
    <div class="articles-list">
      <CardArticle
        v-for="aPage in $pagination.pages"
        :key="aPage.path"
        :page="aPage"
      />
    </div>
    <Pagination :pagination="$pagination" />
  </div>
</template>

<script lang="ts">
import Pagination from '../components/Pagination.vue';
import CardArticle from '../components/CardArticle.vue';

export default {
  name: 'Layout',

  components: {
    CardArticle,
    Pagination,
  },
};
</script>

<style lang="css" scoped>
/* List of articles */
/* ========================================================================== */

.articles-list {
  display: grid;
  grid-gap: 2em;
  grid-auto-rows: 24em;
  padding-bottom: 6em;
}

@media (min-width: 768px) {
  .articles-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .articles-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

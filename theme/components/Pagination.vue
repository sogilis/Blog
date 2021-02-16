<template>
  <div class="pagination">
    <RouterLink
      v-if="pagination.hasPrev"
      class="pagination__prev"
      :to="pagination.prevLink"
      >Prev</RouterLink
    >
    <span
      v-for="pageIndex in pagination._paginationPages.length"
      :key="pageIndex"
      class="pagination__allpages"
    >
      <RouterLink
        v-if="pageIndex !== 1"
        class="page-link"
        :to="'/page/' + pageIndex"
      >
        {{ pageIndex }}
      </RouterLink>
      <RouterLink v-else :to="'/'"> 1 </RouterLink>
    </span>
    <RouterLink
      v-if="pagination.hasNext"
      class="pagination__next"
      :to="pagination.nextLink"
      >Next</RouterLink
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  data(): { currentPage: number } {
    return {
      currentPage: 1,
    };
  },
  mounted(): void {
    // Is undefined when HTML is rendered
    if (this.pagination._currentPage) {
      this.currentPage = this.getCurrentPage(this.pagination._currentPage.path);
    }
  },
  updated(): void {
    // Is undefined when HTML is rendered
    if (this.pagination._currentPage) {
      this.currentPage = this.getCurrentPage(this.pagination._currentPage.path);
    }
  },
  methods: {
    getCurrentPage(currentPagePath: string): number {
      if (currentPagePath !== '/') {
        return Number(currentPagePath.substring(6, currentPagePath.length - 1));
      }
      return 1;
    },
  },
};
</script>

<style lang="css" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.pagination__allpages .router-link-exact-active {
  color: orange;
}

.pagination__allpages {
  padding: 1rem;
  display: inline-block;
}
</style>

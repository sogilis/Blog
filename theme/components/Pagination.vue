<template>
  <div id="pagination">
    <RouterLink v-if="pagination.hasPrev" :to="pagination.prevLink"
      >Prev</RouterLink
    >
    <RouterLink v-if="pagination.hasNext" :to="pagination.nextLink"
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
};
</script>

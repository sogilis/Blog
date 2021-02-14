<template>
  <main>
    <ol id="default-layout">
      <li v-for="aPage in $pagination.pages" :key="aPage.path">
        <RouterLink class="page-link" :to="aPage.path">{{
          aPage.title
        }}</RouterLink>
        <br />
        Read time {{ aPage.readingTime.minutes }} minutes
        <br />
        {{ aPage.frontmatter.description }}
        {{ getDate(aPage.frontmatter.date) }}
        {{ aPage.frontmatter.readingTime }}
        <img :src="aPage.frontmatter.image" />
      </li>
    </ol>
    <div id="pagination">
      <RouterLink v-if="$pagination.hasPrev" :to="$pagination.prevLink"
        >Prev</RouterLink
      >
      <RouterLink v-if="$pagination.hasNext" :to="$pagination.nextLink"
        >Next</RouterLink
      >
    </div>
  </main>
</template>

<script>
import { getDateInEnglish } from '../utils/date';

export default {
  methods: {
    getDate(date) {
      return getDateInEnglish(date);
    },
  },
};
</script>

<style>
main {
  margin-left: 2rem;
}
</style>

<template>
  <div>
    <ul id="default-layout">
      <li v-for="aPage in $pagination.pages" :key="aPage.path">
        <RouterLink class="page-link" :to="aPage.path">{{
          aPage.title
        }}</RouterLink>
      </li>
    </ul>
    <div id="pagination">
      <RouterLink v-if="$pagination.hasPrev" :to="$pagination.prevLink"
        >Prev</RouterLink
      >
      <RouterLink v-if="$pagination.hasNext" :to="$pagination.nextLink"
        >Next</RouterLink
      >
    </div>
  </div>
</template>

<template>
  <div>
    <ul id="default-layout">
      <li v-for="page in $pagination.pages">
        <RouterLink class="page-link" :to="page.path">{{
          page.title
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

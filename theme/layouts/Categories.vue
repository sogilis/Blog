<template>
  <ul id="default-layout">
    toto
    <li v-for="category in $category.list" :key="category.name">
      <RouterLink class="page-link" :to="category.path">{{
        category.name
      }}</RouterLink>
    </li>
  </ul>
</template>

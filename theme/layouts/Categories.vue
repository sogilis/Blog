<template>
  <ul id="default-layout">
    <li v-for="category in $categories.list" :key="category.name">
      <RouterLink class="page-link" :to="category.path">{{
        category.name
      }}</RouterLink>
    </li>
  </ul>
</template>

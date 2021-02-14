<template>
  <ul id="default-layout">
    <li v-for="tag in $tags.list" :key="tag.name">
      <RouterLink class="page-link" :to="tag.path">{{ tag.name }}</RouterLink>
    </li>
  </ul>
</template>

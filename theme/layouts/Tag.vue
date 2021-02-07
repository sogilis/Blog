<template>
  <ul id="default-layout">
    <li v-for="tag in $tag.list">
      <RouterLink class="page-link" :to="tag.path">{{ tag.name }}</RouterLink>
    </li>
  </ul>
</template>

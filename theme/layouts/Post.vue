<template>
  <div>
    {{ $frontmatter.author }}
    <img :src="$frontmatter.image" />
    {{ getDate($frontmatter.date) }}
    <Content />
  </div>
</template>

<script lang="ts">
import { getDateInEnglish } from '../utils/date';

export default {
  methods: {
    getDate(date: string): string {
      return getDateInEnglish(date);
    },
  },
};
</script>

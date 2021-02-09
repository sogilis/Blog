<template>
  <div>
    {{ $frontmatter.author }}
    <img :src="$frontmatter.image" />
    {{ getDate($frontmatter.date) }}
    <br />
    Read time {{ $page.readingTime.minutes }} minutes
    <br />
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

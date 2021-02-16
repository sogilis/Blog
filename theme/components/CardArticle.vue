<template>
  <article class="articles-list-item">
    <RouterLink :to="page.path">
      <!-- Should be nested in a tag -->
      <!-- Otherwise "CSS Grid, grid item “height: 100%” not working in Chrome" -->
      <!-- (like in Safari) -->
      <!-- See https://stackoverflow.com/questions/50691765/css-grid-grid-item-height-100-not-working-in-chrome -->
      <img
        class="articles-list-item-img"
        :src="
          page.frontmatter.image
            ? page.frontmatter.image
            : '/img/blog_preview_default.jpg'
        "
        :alt="
          page.frontmatter.imgTextAlt
            ? page.frontmatter.imgTextAlt
            : 'Cover Image of Article'
        "
      />
    </RouterLink>
    <RouterLink
      class="title-1 articles-list-item-title articles-list-item-text"
      :to="page.path"
    >
      {{ shrinkTitleBlogIndex(page) }}
    </RouterLink>
    <p class="articles-list-item-tags articles-list-item-text">
      <span v-for="tag in page.frontmatter.tags" :key="tag" class="tag">
        <RouterLink :to="'/tags/' + tag">{{ tag }}</RouterLink>
      </span>
    </p>
    <RouterLink
      class="articles-list-item-readmore articles-list-item-text"
      :to="page.path"
    >
      <!-- TODO i18n -->
      Lire la suite…
    </RouterLink>
  </article>
</template>

<script>
export default {
  name: 'CardArticle',
  props: {
    page: {
      type: Object,
      required: true,
    },
  },

  methods: {
    // eslint-disable-next-line
    shrinkTitleBlogIndex(aPage) {
      const titleMaxLength = 50;
      let text = `${aPage.title}`;
      if (text.length > titleMaxLength) {
        text = `${text.substring(0, titleMaxLength)}…`;
      }
      return text;
    },
  },
};
</script>

<style lang="scss" scoped>
$card-border-radius: 10px;

/* Each article in a list */
/* ========================================================================== */

.articles-list-item {
  display: grid;
  grid-template-rows: 11.7em 6.3em 1.5rem 2em;
  grid-gap: 0.5em;
  box-shadow: 0 0 1em 0.2em rgba(0, 0, 0, 0.15);
  text-decoration: none;
  border-radius: $card-border-radius;
}
.articles-list-item:hover {
  text-decoration: none;
}

@media (max-width: 767px) {
  .articles-list-item {
    grid-template-rows: 11.7em 4.3em 1.5rem 2em;
  }
}

/* Image */
/* ========================================================================== */

.articles-list-item-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: all 0.8s;
  border-radius: $card-border-radius;
}

/* The title and 'Lire la suite */
/* ========================================================================== */

.articles-list-item-text {
  margin: 0 2.2rem;
  transition: color 0.5s;
}

/* The title */
/* ========================================================================== */

.articles-list-item-title {
  color: var(--dark-grey);
}

.articles-list-item-title:hover {
  text-decoration: none;
}

/* Tag */
/* ========================================================================== */

.articles-list-item-tags {
  overflow: hidden;
}

.articles-list-item .tag {
  font-size: 14px;
}

/* p is "Lire la suite" in French */
/* ========================================================================== */

.articles-list-item-readmore {
  font-weight: 500;
  color: var(--wolf-blue);
  text-align: right;
}

.articles-list-item-readmore:hover {
  color: var(--light-electric-blue);
  text-decoration: underline;
}
</style>

<template>
  <div id="layout">
    <div class="articles-list">
      <article
        v-for="aPage in $pagination.pages"
        :key="aPage.path"
        class="articles-list-item"
      >
        <RouterLink :to="aPage.path">
          <!-- Should be nested in a tag -->
          <!-- Otherwise "CSS Grid, grid item “height: 100%” not working in Chrome" -->
          <!-- (like in Safari) -->
          <!-- See https://stackoverflow.com/questions/50691765/css-grid-grid-item-height-100-not-working-in-chrome -->
          <img
            class="articles-list-item-img"
            :src="
              aPage.frontmatter.image
                ? aPage.frontmatter.image
                : '/img/blog_preview_default.jpg'
            "
            :alt="
              aPage.frontmatter.imgTextAlt
                ? aPage.frontmatter.imgTextAlt
                : 'Cover Image of Article'
            "
          />
        </RouterLink>
        <RouterLink
          class="title-1 articles-list-item-title articles-list-item-text"
          :to="aPage.path"
        >
          Read time {{ aPage.readingTime.minutes }} minutes
          {{ aPage.title }}
          {{ aPage.frontmatter.description }}
        </RouterLink>
        <p class="articles-list-item-tags articles-list-item-text">
          <span v-for="tag in aPage.frontmatter.tags" :key="tag" class="tag">
            <RouterLink :to="'/tags/' + tag">{{ tag }}</RouterLink>
          </span>
        </p>
        <RouterLink
          class="articles-list-item-readmore articles-list-item-text"
          :to="aPage.path"
        >
          <!-- TODO i18n -->
          Lire la suite…
        </RouterLink>
      </article>
    </div>

    <div id="pagination">
      <RouterLink v-if="$pagination.hasPrev" :to="$pagination.prevLink"
        >Prev</RouterLink
      >
      <RouterLink v-if="$pagination.hasNext" :to="$pagination.nextLink"
        >Next</RouterLink
      >
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',

  mounted(): void {
    shrinkTitleBlogIndex();
  },
};

const shrinkTitleBlogIndex = (): void => {
  const titleMaxLength = 50;
  // `blogIndexArticleTitleAll' is never null, but could be empty.
  const blogIndexArticleTitleAll: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
    '.articles-list-item-title'
  ) as NodeListOf<HTMLAnchorElement>;
  blogIndexArticleTitleAll.forEach((blogIndexArticleTitle) => {
    // `text' is never null, but could be empty string.
    const text = blogIndexArticleTitle.innerText;
    if (text.length > titleMaxLength) {
      blogIndexArticleTitle.title = text;
      const textTruncate = text.substring(0, titleMaxLength);
      blogIndexArticleTitle.innerHTML = `${textTruncate}…`;
    }
  });
};
</script>

<style lang="css" scoped>
/* List of articles */
/* ========================================================================== */

.articles-list {
  display: grid;
  grid-gap: 2em;
  grid-auto-rows: 24em;
  padding-bottom: 6em;
}

@media (min-width: 768px) {
  .articles-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .articles-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Each article in a list */
/* ========================================================================== */

.articles-list-item {
  display: grid;
  grid-template-rows: 11.7em 6.3em 1.5rem 2em;
  grid-gap: 0.5em;
  box-shadow: 0 0 1em 0.2em rgba(0, 0, 0, 0.15);
  text-decoration: none;
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

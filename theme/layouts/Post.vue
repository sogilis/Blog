<template>
  <article id="articlepage">
    <section id="articlepage-header">
      <!-- Illustration -->
      <span id="articlepage-header-img-container">
        <img
          id="articlepage-header-img"
          class="articlepage-img"
          :src="
            $frontmatter.image
              ? $frontmatter.image
              : '/img/blog_preview_default.jpg'
          "
          :alt="
            $frontmatter.imgTestAlt
              ? $frontmatter.imgTestAlt
              : 'Illustration de l\'article'
          "
        />
      </span>

      <div id="articlepage-header-title">
        <h1 class="title article-title">{{ $frontmatter.title }}</h1>
        <div class="articlepage-header-title-details">
          <ul class="tags-list" v-for="tag in $frontmatter.tag" :key="tag">
            <li class="tag">
              <RouterLink :to="'/tag/' + tag">{{ tag }}</RouterLink>
            </li>
          </ul>
          <div>
            Écrit par
            <template v-if="$frontmatter.author">
              {{ $frontmatter.author }}
            </template>
            <template v-else> Sogilis </template>
            <br />
            Publié le
            {{ getDate($frontmatter.date) }}
            <br />
            Read time {{ $page.readingTime.minutes }} minutes
          </div>
        </div>
      </div>
    </section>

    <section id="articlepage-content">
      <Content />
    </section>

    <img
      id="articlepage-img-bottom"
      class="articlepage-img"
      :src="
        $frontmatter.image
          ? $frontmatter.image
          : '/img/blog_preview_default.jpg'
      "
      :alt="
        $frontmatter.imgTestAlt
          ? $frontmatter.imgTestAlt
          : 'Illustration de l\'article'
      "
    />

    <section id="articlepage-comments">
      <i>Pas de commentaire pour l'instant</i>
    </section>
    <br />
    <br />
    <br />
    &nbsp;
  </article>
</template>

<script lang="ts">
import { getDateInEnglish } from '../utils/date.vue';

export default {
  methods: {
    getDate(date: string): string {
      return getDateInEnglish(date);
    },
  },
};
</script>

<style lang="css" scoped>
#articlepage {
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  max-width: inherit;
  color: var(--color-black-mine-shaft);
  font-size: 16px;
  line-height: 1.5;
}

/* Folliwng copied from Bootstrap 4.4.1 */
/* following is not into reboot.css */
/* ========================================================================== */

code {
  /* Line 503 into bootstrap.css 4.4.1 */
  font-size: 87.5%;
  color: #e83e8c;
  word-wrap: break-word;
}

a > code {
  color: inherit;
}

kbd {
  padding: 0.2rem 0.4rem;
  font-size: 87.5%;
  color: #fff;
  background-color: #212529;
  border-radius: 0.2rem;
}

kbd kbd {
  padding: 0;
  font-size: 100%;
  font-weight: 700;
}

pre {
  display: block;
  /* Redefined by use bellow */
  /* color: #212529; */
}

pre code {
  color: inherit;
  word-break: normal;
}

/* Definitions for elements in the page article */
/* ========================================================================== */

pre,
code,
kbd,
samp {
  max-width: 100%;
  font-family: var(--font-jetbrains-mono);
  font-size: 1em;
}

h2,
h3,
h4,
h5,
h6 {
  margin: 1.5em 0;
}

blockquote,
pre,
.articlepage-img {
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.15);
  width: 100%;
}

blockquote,
pre {
  margin: 2rem 0;
  padding: 0.4rem 1.25rem;
  border: solid 5px transparent;
}

@media (max-width: 991px) {
  blockquote,
  pre {
    width: inherit;
    margin: 1.9rem 0 1.9rem 1.5rem;
  }
}
@media (max-width: 768px) {
  blockquote,
  pre {
    margin-left: 0;
  }
}

blockquote {
  font-style: italic;
  border-left-color: var(--dark-blue);
  background-color: white;
}

pre {
  border-left-color: var(--medium-blue);
}

/* Reduce caption margin in a <figure> (instead of default h4 margin) */
/* Generated with {{< figure …>}} in .md files */
figcaption h4 {
  margin-top: 0.5rem;
}

#articlepage {
  max-width: 42.5rem;
  margin: 0 auto;
}

#articlepage-content a {
  color: var(--wolf-blue);
  transition: color 0.3s;
}

#articlepage-content a:hover {
  color: var(--dark-grey);
}

#articlepage p {
  margin-bottom: 1.5em;
  hyphens: auto;
}

/* Section header */
/* ========================================================================== */
#articlepage-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  word-wrap: break-word;
}

#articlepage-header-img-container {
  width: 100%;
  margin-bottom: 1em;
}

@media (min-width: 992px) {
  #articlepage-header {
    flex-direction: row;
  }

  #articlepage-header-img-container {
    width: 70%;
    margin-bottom: 0;
  }
}

.articlepage-header-title-details {
  margin-left: 1.6rem;
}

/* Section content */
/* ========================================================================== */
#articlepage-content {
  margin-bottom: 1em;
}
/* ========================================================================== */
#articlepage-content img {
  display: block;
  max-width: 100%;
  margin: 0 auto;
}
#articlepage-content figure img {
  max-width: auto;
  margin: 0;
}

/* Image on the bottom */
/* ========================================================================== */
@media (min-width: 768px) {
  #articlepage-img-bottom {
    max-width: 50%;
    margin: 0 auto;
  }
}

/* Section comment */
/* ========================================================================== */

#articlepage-comments {
  margin-top: 3rem;
}

/* Code font */
/* ========================================================================== */

--font-jetbrains-mono: 'JetBrainsMono';

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-Bold-Italic.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-Bold-Italic.woff')
      format('woff');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-Bold.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-ExtraBold-Italic.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-ExtraBold-Italic.woff')
      format('woff');
  font-weight: 800;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-ExtraBold.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-ExtraBold.woff') format('woff');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-Italic.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-Italic.woff') format('woff');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-Medium-Italic.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-Medium-Italic.woff')
      format('woff');
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-Medium.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: var(--font-jetbrains-mono);
  src: url('/fonts/JetBrainsMono/woff2/JetBrainsMono-Regular.woff2')
      format('woff2'),
    url('/fonts/JetBrainsMono/woff/JetBrainsMono-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
</style>

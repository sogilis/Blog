<template>
  <header>
    <HeaderDesktop />
    <HeaderMobile />
  </header>
</template>

<script lang="ts">
import HeaderDesktop from './HeaderDesktop.vue';
import HeaderMobile from './HeaderMobile.vue';

export default {
  name: 'Header',

  components: {
    HeaderDesktop,
    HeaderMobile,
  },
};
</script>

<style lang="scss">
header {
  position: fixed;
  z-index: 2;
  height: 5rem;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
}

#header-desktop,
#header-mobile {
  justify-content: space-between;
  height: 100%;
}

/* When we scroll */
.header--scrollstate {
  margin-top: 0;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.15);
  transition: margin-top 0.5s, box-shadow 0.5s;
}

/* Search */
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1em;
  height: 2em;
  line-height: 1;
}

.search-bar__label {
  display: flex;
  align-items: center;
  margin: 0;
  height: 100%;
}

.search-bar__icon {
  cursor: pointer;
  width: 1.3em;
  margin: 0;
  vertical-align: bottom;
}

.search-bar__icon path {
  fill: #0056b3;
}

.search-bar__input {
  outline: none;
  border: 0;
  background: transparent;
}

.search-bar__results {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  cursor: auto;
  background-color: white;
}

#search-result {
  padding: 0;
}

.search-bar__results-item:last-child {
  margin-bottom: 5em;
}

.search-bar__results-item-link {
  display: block;
  padding: 0 0 1em;
}
</style>

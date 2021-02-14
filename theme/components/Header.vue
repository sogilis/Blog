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
  mounted(): void {
    displayScrolledHeader();
    switchHeaderDesktopHeaderMobile();
  },
};

/*
 * eslint rule max-statements with option ignoreTopLevelFunctions does not work
 * actually with IIFE https://github.com/eslint/eslint/issues/12950
 *
 * max-line-per-function has actually no option ignoreTopLevelFunctions
 * https://github.com/eslint/eslint/issues/11459
 */

/**
 * Throw an error
 * @param {string} message the message of the error
 */
const throwError = (message: string): void => {
  // eslint-disable-next-line no-alert
  alert(message);
  throw new Error(message);
};

/**
 * ============================================================================
 * Navigation menu
 * ============================================================================
 */

/**
 * Script to display the menu when we scroll of `scrollMenuOffset'
 */
// See above why we disale this eslint rules
// eslint-disable-next-line max-lines-per-function, max-statements
const displayScrolledHeader = (): void => {
  const [header] = document.getElementsByTagName('header');
  if (!header) {
    const message = 'No tag element "header"';
    throwError(message);
  }

  const baseFontSize = 16;

  /*
   * Set value of scrollMenuOffset
   */
  const setScrollMenuOffset = (): number => {
    const paddingTopMainTag = 12;
    const scrollMenuOffsetDesktop = paddingTopMainTag * baseFontSize;
    const scrollMenuOffsetMobile = 100;
    return window.innerWidth >= 768
      ? scrollMenuOffsetDesktop
      : scrollMenuOffsetMobile;
  };
  // At initialisation
  let scrollMenuOffset = setScrollMenuOffset();
  // On resize
  window.addEventListener('resize', () => {
    scrollMenuOffset = setScrollMenuOffset();
  });

  /*
   * Set Add or remove css class 'header--scrollstate' to header tag
   * if window.scrollY > scrollMenuOffset
   */
  const testDisplayScrollMenu = (scrollMenuOffsetVar: number): void => {
    if (window.scrollY > scrollMenuOffsetVar) {
      header.classList.add('header--scrollstate');
    } else {
      header.classList.remove('header--scrollstate');
    }
  };
  // At initialisation
  testDisplayScrollMenu(scrollMenuOffset);
  // On scroll
  window.addEventListener('scroll', () => {
    testDisplayScrollMenu(scrollMenuOffset);
  });
};

/**
 * Script to display menu mobile when we click on the button with three
 * horizontals lines
 */
const switchHeaderDesktopHeaderMobile = (): void => {
  const menuBtn = document.getElementById('header-mobile-threebarbutton');
  const menuMobile = document.getElementById('header-mobile-navmenu');
  const [body] = document.getElementsByTagName('body');
  if (menuBtn && menuMobile && body) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('menuMobileIsDisplayed');
      menuMobile.classList.toggle('menuMobileIsDisplayed');
      body.classList.toggle('menuMobileIsDisplayed');
    });
  } else {
    const message =
      'No element with id "header-mobile-threebarbutton" ' +
      ' and / or "header-mobile-navmenu"';
    throwError(message);
  }
};
</script>

<style lang="css">
/* can't be scopped currently */

header {
  position: fixed;
  z-index: var(--z-index-max);
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

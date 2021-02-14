<template>
  <span></span>
</template>
<script lang="ts">
export default {
  name: 'HeaderScript',

  mounted: (): void => {
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

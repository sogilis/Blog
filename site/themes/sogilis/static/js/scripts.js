'use strict';

/* eslint no-magic-numbers: off */

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
const throwError = (message) => {
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
(() => {

  const [header] = document.getElementsByTagName('header');
  if (!header) {
    const message = 'No tag element "header"';
    throwError(message);
  }

  const baseFontSize = 16;

  /*
   * Set value of scrollMenuOffset
   */
  const setScrollMenuOffset = () => {
    const paddingTopMainTag = 12;
    const scrollMenuOffsetDesktop = paddingTopMainTag * baseFontSize;
    const scrollMenuOffsetMobile = 100;
    return window.width >= 768
      ? scrollMenuOffsetDesktop
      : scrollMenuOffsetMobile;
  };
  // At initialisation
  let scrollMenuOffset = setScrollMenuOffset();
  // On resize
  window.addEventListener(
    'resize',
    () => {
      scrollMenuOffset = setScrollMenuOffset();
    }
  );

  /*
   * Set Add or remove css class 'content_header_scroll' to header tag
   * if window.scrollY > scrollMenuOffset
   */
  const testDisplayScrollMenu = (scrollMenuOffsetVar) => {
    if (window.scrollY > scrollMenuOffsetVar) {
      header.classList.add('content_header_scroll');
    } else {
      header.classList.remove('content_header_scroll');
    }
  };
  // At initialisation
  testDisplayScrollMenu(scrollMenuOffset);
  // On scroll
  window.addEventListener(
    'scroll',
    () => {
      testDisplayScrollMenu(scrollMenuOffset);
    }
  );

})();

/**
 * Script to display menu mobile when we click on the button with three
 * horizontals lines
 */
(() => {
  const menuBtn = document.getElementById('headerMenuButtonMobile');
  const menuMobile = document.getElementById('headerMainMenuMobile');
  const [body] = document.getElementsByTagName('body');
  if (menuBtn && menuMobile && body) {
    menuBtn.addEventListener(
      'click',
      () => {
        menuBtn.classList.toggle('menuMobileIsDisplayed');
        menuMobile.classList.toggle('menuMobileIsDisplayed');
        body.classList.toggle('menuMobileIsDisplayed');
      }
    );
  } else {
    const message = 'No element with id "headerMenuButtonMobile" ' +
      ' and / or "headerMainMenuMobile"';
    throwError(message);
  }
})();

/**
 * ============================================================================
 * Index page
 * ============================================================================
 */

(() => {
  const titleMaxLength = 60;
  // `blogIndexArticleTitleAll' is never null, but could be empty.
  const blogIndexArticleTitleAll =
    document.querySelectorAll('.blog_index_article__title');
  blogIndexArticleTitleAll.forEach((blogIndexArticleTitle) => {
    // `text' is never null, but could be empty string.
    const text = blogIndexArticleTitle.innerText;
    if (text.length > titleMaxLength) {
      blogIndexArticleTitle.title = text;
      const textTruncate = text.
        substring(
          0,
          titleMaxLength
        );
      blogIndexArticleTitle.innerHTML = `${textTruncate}…`;
    }
  });
})();

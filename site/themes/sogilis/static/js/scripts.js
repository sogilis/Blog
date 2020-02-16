'use strict';

/* eslint no-magic-numbers: off */

// eslint-disable-next-line max-lines-per-function
(() => {

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
   * Script to display menu mobile
   */
  const displayMenuMobile = () => {
    const menuBtn = document.getElementById('headerMenuButtonMobile');
    const menuMobile = document.getElementById('headerMainMenuMobile');
    if (menuBtn && menuMobile) {
      menuBtn.addEventListener(
        'click',
        () => {
          menuBtn.classList.toggle('act');
          menuMobile.classList.toggle('act');
        }
      );
    } else {
      const message = 'No element with id "headerMenuButtonMobile" ' +
        ' and / or "headerMainMenuMobile"';
      throwError(message);
    }
  };

  /**
   * Script to display the menu when we scroll of `scrollMenuOffset'
   */
  const displayScrollMenu = () => {
    // It's es6 array destructuring
    const [header] = document.getElementsByTagName('header');

    const testDisplayScrollMenu = (scrollMenuOffset) => {
      if (window.scrollY > scrollMenuOffset) {
        header.classList.add('content_header_scroll');
      } else {
        header.classList.remove('content_header_scroll');
      }
    };

    if (!header) {
      const message = 'No tag element "header"';
      throwError(message);
    }

    const scrollMenuOffsetDesktop = 300;

    const scrollMenuOffsetMobile = 100;

    let scrollMenuOffset = window.width >= 768
      ? scrollMenuOffsetDesktop
      : scrollMenuOffsetMobile;

    testDisplayScrollMenu(scrollMenuOffset);
    window.addEventListener(
      'resize',
      () => {
        if (window.width >= 768) {
          scrollMenuOffset = scrollMenuOffsetDesktop;
        } else {
          scrollMenuOffset = scrollMenuOffsetMobile;
        }
      }
    );

    window.addEventListener(
      'scroll',
      () => {
        testDisplayScrollMenu(scrollMenuOffset);
      }
    );
  };

  displayMenuMobile();
  displayScrollMenu();
})();

/* eslint-disable */

// TODO will me remove in future (only displayScrollMenu should be used)
// Change class header Mobile  when user is scrolling
$(function() {
  //caches a jQuery object containing the header element
  var header = $(".content-menu-mobile");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 300) {
      header.removeClass('content-menu-mobile').addClass("content-menu-mobile_scroll");
    } else {
      header.removeClass("content-menu-mobile_scroll").addClass('content-menu-mobile');
    }
  });
});

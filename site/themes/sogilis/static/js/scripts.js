// TODO add a .eslintrc file. Simple quotes should be simple quoted.

// Script Display Menu Mobile
const displayMenuMobile = () => {
  const menuBtn = document.getElementById("headerMenuButtonMobile");
  const menuMobile = document.getElementById("headerMainMenuMobile");
  if (menuBtn && menuMobile) {
    menuBtn.addEventListener("click",
      () => {
        menuBtn.classList.toggle("act");
        menuMobile.classList.toggle("act");
      }
    );
  } else {
    const message = "No element with id 'headerMenuButtonMobile' " +
      " and / or 'headerMainMenuMobile";
    alert(message);
    throw new Error(message);
  }
};
displayMenuMobile();

/* eslint-disable */
// JQuery should be removed, and we should use es6, with corrects import.

// Change class header Tablet and Desktop when user is scrolling
$(function() {
  //caches a jQuery object containing the header element
  var header = $("header");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      header.addClass("content_header_scroll");
    } else {
      header.removeClass("content_header_scroll");
    }
  });
});

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

// AOS.init();

// vim: sw=2 ts=2 et:

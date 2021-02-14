<template>
  <!-- ======================================================================= -->
  <!-- Menu Mobile (dispaly < 576 px) -->
  <!-- ======================================================================= -->

  <div id="header-mobile" class="maincolumn">
    <!--
    In this screen size, we have three tags child
    On the top left, the icon of Sogilis
    On the top right, a button with three bar. When we click on it
         this button is transormed to a cross and the nav button appears.
    When we click on the top right button, the tag <nav> appears smoothy.
    -->
    <a class="header-mobile-link" href="/index.html">
      <img
        id="header-mobile-logo"
        alt="Logo Sogilis"
        src="/img/logo_sogilis.svg"
      />
    </a>

    <!-- <search&#45;bar class="search&#45;bar&#45;wrapper"></search&#45;bar> -->

    <a id="header-mobile-threebarbutton" class="header-mobile-link" href="#">
      <div id="header-mobile-threebarbutton-centralbar">&nbsp;</div>
    </a>

    <!-- header is displayed when we click on `header-mobile-threebarbutton -->
    <nav id="header-mobile-navmenu">
      <div id="header-mobile-navmenu-coloredline">
        <!--
          In this `div`, there is the colored line
          (it's the pseudo-element `::before`)
          This pseudo-element have `margin-top: 50%`
        -->
      </div>
      <ul id="header-mobile-navmenu-list">
        <li class="header-mobile-navmenu-li">
          <a
            class="header-mobile-navmenu-link"
            href="https://sogilis.fr/services-applications-cloud-native.html"
          >
            <!-- TODO i18n -->
            Applications Cloud Natives
          </a>
        </li>
        <li class="header-mobile-navmenu-li">
          <a
            class="header-mobile-navmenu-link"
            href="https://sogilis.fr/services-embarques-et-iot.html"
          >
            <!-- TODO i18n -->
            Logiciels Embarqués & IoT
          </a>
        </li>
        <li class="header-mobile-navmenu-li">
          <a
            class="header-mobile-navmenu-link"
            href="https://sogilis.fr/services-logiciels-critiques.html"
          >
            <!-- TODO i18n -->
            Logiciels Critiques
          </a>
        </li>
        <li class="header-mobile-navmenu-li">
          <a
            class="header-mobile-navmenu-link"
            href="https://sogilis.fr/vision.html"
          >
            <!-- TODO i18n -->
            Notre vision
          </a>
        </li>
        <li class="header-mobile-navmenu-li">
          <a
            class="header-mobile-navmenu-link"
            href="https://sogilis.fr/approche.html"
          >
            <!-- TODO i18n -->
            Notre approche
          </a>
        </li>
        <li class="header-mobile-navmenu-li">
          <a
            class="header-mobile-navmenu-link"
            href="https://sogilis.fr/emplois.html"
          >
            <!-- TODO i18n -->
            Nous rejoindre
          </a>
        </li>
        <li class="header-mobile-navmenu-li">
          <a href="/" class="header-mobile-navmenu-link">
            <!-- TODO i18n -->
            Blog
          </a>
        </li>
        <li>
          <a
            class="header-mobile-navmenu-link"
            href="https://sogilis.fr/contact.html"
          >
            <!-- TODO i18n -->
            Contact
          </a>
        </li>
      </ul>
      <div id="header-mobile-navmenu-emptydiv">
        <!--
          The goal of this div is simply to center the `ul` element above
          between two `div`.
          (Into the first `div`, there is the colored line).
        -->
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderMobile',
};
</script>

<style lang="css">
/* can't be scopped currently */

@media (max-width: 767px) {
  /*
  * In this screen size, we have three tags child
  * On the top left, the icon of Sogilis
  * On the top right, a button with three bar. When we click on it
  *      this button is transormed to a cross and the nav button appears.
  * When we click on the top right button, the tag <nav> appears smoothy..
  */

  #header-desktop {
    display: none;
  }

  #header-mobile {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .header-mobile-link {
    height: 3em;
  }

  /* When we scroll */
  .header--scrollstate {
    /* Others declarations into header.html */
    padding: 0;
  }

  /* ========================================================================== */
  /* =========================================================================== */
  /* Logo on the top left of the screen */
  /* =========================================================================== */

  #header-mobile-logo {
    height: 100%;
  }

  /* ========================================================================== */
  /* ========= Button on the top right of the screen ========================== */
  /* Describe the three bars icon */
  /* ========================================================================== */

  #header-mobile-threebarbutton {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 1.5em;
    height: 40%;
  }

  #header-mobile-threebarbutton::before,
  #header-mobile-threebarbutton-centralbar,
  #header-mobile-threebarbutton::after {
    background-color: var(--dark-grey);
    border-radius: 1px;
    height: 0.1875rem;
    width: 2rem;
    /*
      * Animation when we click on the button: transform three bars to cross and
      * vice versa
      */
    transition: transform 0.3s;
  }

  #header-mobile-threebarbutton::before,
  #header-mobile-threebarbutton::after {
    content: ' ';
  }
  /* ========================================================================== */
  /* ========= Nav tag (not displayed when the page is loaded) ================ */
  /* ========================================================================== */

  #header-mobile-navmenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;

    background-color: white;

    /* Animated when `.menuMobileIsDisplayed` class is appended or removed. */
    opacity: 0;
    transform: scale(0);
    transition-property: transform, opacity;
    transition-duration: 0.5s;
    transition-delay: 0;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* Center `ul` element in the page */
  /* ========================================================================== */

  /* The goal of this two `div` is to center the `ul` */
  /* between two `div`. */
  #header-mobile-navmenu-coloredline,
  #header-mobile-navmenu-emptydiv {
    flex: 1 1 auto;
  }

  #header-mobile-navmenu-list {
    flex: 0 1 auto;
    /* Because of reboot.css */
    padding-left: 0;
  }

  /* The small line in the first `div` */
  /* ========================================================================== */

  /* In this `div`, there is the line */
  /* (it's the pseudo-element `::before`) */
  /* This pseudo-element have `margin-top: 50%` */
  #header-mobile-navmenu-coloredline {
    display: flex;
    align-items: center;
  }
  #header-mobile-navmenu-coloredline::before {
    content: '';
    margin-top: 50%;
    width: 50vw;
    height: 0.125rem;
    background-color: var(--light-electric-blue);
  }

  /* Styles for `ul` element, with anchors */
  /* ========================================================================== */

  .header-mobile-navmenu-link {
    color: var(--wolf-blue);
    font-weight: 600;
  }
  @media (max-width: 575px) {
    .header-mobile-navmenu-link {
      font-size: 1.1rem;
    }
  }
  @media (min-width: 576px) {
    .header-mobile-navmenu-link {
      font-size: 1.8rem;
    }
  }
  .header-mobile-navmenu-link:active {
    font-weight: 500;
  }
  .header-mobile-navmenu-link:hover {
    text-decoration: underline;
  }

  .header-mobile-navmenu-li {
    padding: 0.5rem 0;
    /* Needed for animation, of `li` elements */
    transition: transform 400ms 510ms;
  }

  /*
  * Following declarations are needed for animation of `li` when
  * `menuMobileIsDisplayed` css class is append
  * =====================
  */
  .header-mobile-navmenu-li:nth-child(odd) {
    transform: translateX(30%);
  }
  .header-mobile-navmenu-li:nth-child(even) {
    transform: translateX(-30%);
  }

  /* The last `li` tag is not animated */
  /* ===================== */
  .header-mobile-navmenu-li:last-child {
    transform: none;
  }

  /* ========================================================================== */
  /* ========================================================================== */
  /* ========================================================================== */
  /* ======================= With class .menuMobileIsDisplayed ================ */
  /* ========================================================================== */
  /* ========================================================================== */

  /*
  * Some following declarations are animated like `transition` css attribute
  * defined above
  */

  /* ========================================================================== */
  /* ========= Button on the top right of the screen ========================== */
  /* Three lines icons are transformed to cross when menuMobileIsDisplayed */
  /* ========================================================================== */

  #header-mobile-threebarbutton.menuMobileIsDisplayed {
    /* Should be on top of all elements, even the `nav` element.. */
    z-index: 2;
  }

  #header-mobile-threebarbutton.menuMobileIsDisplayed::before {
    /* Following declaration is animated thanks `transition:` attribute */
    transform: rotate(45deg) translate(0.45rem, 0.4rem);
  }

  #header-mobile-threebarbutton.menuMobileIsDisplayed::after {
    /* Following declaration is animated thanks `transition:` attribute */
    transform: rotate(-45deg) translate(0.5rem, -0.5rem);
  }

  #header-mobile-threebarbutton.menuMobileIsDisplayed
    > #header-mobile-threebarbutton-centralbar {
    /* Following declaration is animated thanks `transition:` attribute */
    background-color: transparent;
  }

  /* ========================================================================== */
  /* ========= Main screen (nav tag) (displayed) =========================== */
  /* ========================================================================== */

  body.menuMobileIsDisplayed {
    overflow: hidden;
  }

  #header-mobile-navmenu.menuMobileIsDisplayed {
    /* Should be above all other elements, except the cross button. */
    z-index: 1;
    /* Following declaration is animated thanks `transition:` attribute */
    opacity: 1;
    /* Following declaration is animated thanks `transition:` attribute */
    transform: scale(1);
  }

  #header-mobile-navmenu.menuMobileIsDisplayed li:nth-child(odd),
  #header-mobile-navmenu.menuMobileIsDisplayed li:nth-child(even) {
    /* Following declaration is animated thanks `transition:` attribute */
    transform: translateX(0);
  }

  /* Search */
  .search-bar-wrapper {
    margin-left: auto;
  }

  .search-bar__input {
    display: none;
  }

  .search-bar__input--active {
    display: block;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0px 4px 5px -3px rgba(0, 0, 0, 0.75);
    margin-left: 0;
    width: 100%;
    padding: 1em;
    border: initial;
  }

  .search-bar__results {
    top: 132px;
    z-index: 1;
    padding: 1em 1em 0 1em;
  }

  .search-bar__icon path {
    fill: #000;
  }
}
</style>

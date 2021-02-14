<template>
  <!-- ======================================================================= -->
  <!-- Menu Desktop (display >= 576 px) -->
  <!-- ======================================================================= -->
  <nav id="header-desktop" class="maincolumn">
    <a id="header-desktop-left" href="/index.html">
      <img
        id="header-desktop-left-logo"
        alt="Logo Sogilis"
        src="/img/logo_sogilis.svg"
      />
    </a>
    <div id="header-desktop-right">
      <div id="header-desktop-right-dropdown">
        <div
          id="header-desktop-right-dropdown-title"
          class="bar-deco bar-deco-hover header-desktop-right-category header-desktop-right-text"
        >
          Services
        </div>
        <div id="header-desktop-right-dropdown-content">
          <a
            class="bar-deco bar-deco-hover header-desktop-right-dropdown-content-link header-desktop-right-text"
            href="https://sogilis.fr/services-applications-cloud-native.html"
          >
            <!-- TODO i18n -->
            Applications Cloud Natives
          </a>
          <a
            class="bar-deco bar-deco-hover header-desktop-right-dropdown-content-link header-desktop-right-text"
            href="https://sogilis.fr/services-embarques-et-iot.html"
          >
            <!-- TODO i18n -->
            Logiciels Embarqués & IoT
          </a>
          <a
            class="bar-deco bar-deco-hover header-desktop-right-dropdown-content-link header-desktop-right-text"
            href="https://sogilis.fr/services-logiciels-critiques.html"
          >
            <!-- TODO i18n -->
            Logiciels Critiques
          </a>
        </div>
      </div>
      <div id="header-desktop-right-dropdown">
        <div
          id="header-desktop-right-dropdown-title"
          class="bar-deco bar-deco-hover header-desktop-right-category header-desktop-right-text"
        >
          <!-- TODO i18n -->
          L'entreprise
        </div>
        <div
          id="header-desktop-right-dropdown-content"
          class="dropdown-content-company"
        >
          <a
            class="bar-deco bar-deco-hover header-desktop-right-dropdown-content-link header-desktop-right-text"
            href="https://sogilis.fr/vision.html"
          >
            <!-- TODO i18n -->
            Notre vision
          </a>
          <a
            class="bar-deco bar-deco-hover header-desktop-right-dropdown-content-link header-desktop-right-text"
            href="https://sogilis.fr/approche.html"
          >
            <!-- TODO i18n -->
            Notre approche
          </a>
          <a
            class="bar-deco bar-deco-hover header-desktop-right-dropdown-content-link header-desktop-right-text"
            href="https://sogilis.fr/emplois.html"
          >
            <!-- TODO i18n -->
            Nous rejoindre
          </a>
        </div>
      </div>
      <a
        class="bar-deco bar-deco-hover header-desktop-right-category header-desktop-right-text"
        href="/"
      >
        <!-- TODO i18n -->
        Blog
      </a>
      <a
        class="bar-deco bar-deco-hover header-desktop-right-category header-desktop-right-text"
        href="https://sogilis.fr/contact.html"
      >
        <!-- TODO i18n -->
        Contact
      </a>
      <a
        class="header-desktop-right-category header-desktop-right-text"
        href="#"
      >
        <SearchBox />
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
// eslint-disable-next-line import/no-unresolved
import SearchBox from '@SearchBox';

export default {
  name: 'HeaderDesktop',

  components: {
    SearchBox,
  },
};
</script>

<style lang="css">
/* can't be scopped currently */

@media (min-width: 768px) {
  header {
    height: 5rem;
    margin-top: 2rem;
  }
  #header-mobile {
    display: none;
  }

  /* ========================================================================== */
  /* Logo sogilis on the left */
  /* ========================================================================== */
  #header-desktop {
    display: flex;
    height: 100%;
  }

  #header-desktop-left {
    width: 15%;
    padding: 1rem 0 1rem 0;
  }

  #header-desktop-left-logo {
    height: 100%;
  }

  /* ========================================================================== */
  /* Navigation links, on the right */
  /* ========================================================================== */

  #header-desktop-right {
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    /* Needed, for alignment. As it, the last child is aligned */
    /* See above, we have `padding-right: 1.5rem' */
    margin-right: -1.5rem;
  }

  .header-desktop-right-text {
    position: relative;

    /* As it, on hoover, the small bar appears */
    padding-right: 1.5rem;

    background-color: transparent;
    font-weight: 600;
    cursor: pointer;
  }

  .header-desktop-right-category {
    margin-left: 4rem;
    color: var(--wolf-blue);
  }

  /* Dropdown links (hidden by default) */
  /* ================================== */

  #header-desktop-right-dropdown {
    height: 100%;
    display: flex;
  }

  #header-desktop-right-dropdown-title {
    align-self: center;
  }

  #header-desktop-right-dropdown-content {
    display: none;
    flex-direction: column;
    align-items: center;

    position: absolute;
    margin-top: 5rem;
    padding: 1rem 3rem;
    background-color: var(--super-light-grey);
    text-align: center;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
    white-space: nowrap;

    transform: translateX(-25%);
    max-height: 15rem;
    overflow-y: hidden;
    transition: visibility 0s, opacity 0.3s linear, max-height 0.5s linear;
    visibility: visible;
    opacity: 0;
  }

  /* Show the dropdown menu on hover */
  #header-desktop-right-dropdown:hover
    > #header-desktop-right-dropdown-content {
    display: flex;
    visibility: visible;
    opacity: 1;
    max-height: 15rem;
  }

  .header-desktop-right-dropdown-content-link {
    margin: 1rem auto;
  }

  /* Links inside the dropdown */
  .header-desktop-right-dropdown-content-link,
  .header-desktop-right-dropdown-content-link:hover {
    color: black;
  }
}
</style>

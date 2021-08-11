/* eslint no-magic-numbers: off */
/* eslint max-classes-per-file: off */
/* eslint max-lines: off */
/* eslint strict: off */

'use strict';
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
  window.addEventListener('resize', () => {
    scrollMenuOffset = setScrollMenuOffset();
  });

  /*
   * Set Add or remove css class 'header--scrollstate' to header tag
   * if window.scrollY > scrollMenuOffset
   */
  const testDisplayScrollMenu = (scrollMenuOffsetVar) => {
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
})();

/**
 * Script to display menu mobile when we click on the button with three
 * horizontals lines
 */
(() => {
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
})();

/**
 * ============================================================================
 * Index page
 * ============================================================================
 */

(() => {
  const titleMaxLength = 50;
  // `blogIndexArticleTitleAll' is never null, but could be empty.
  const blogIndexArticleTitleAll = document.querySelectorAll(
    '.articles-list-item-title'
  );
  blogIndexArticleTitleAll.forEach((blogIndexArticleTitle) => {
    // `text' is never null, but could be empty string.
    const text = blogIndexArticleTitle.innerText;
    if (text.length > titleMaxLength) {
      blogIndexArticleTitle.title = text;
      const textTruncate = text.substring(0, titleMaxLength);
      blogIndexArticleTitle.innerHTML = `${textTruncate}…`;
    }
  });
})();

/**
 * ============================================================================
 * Search
 * ============================================================================
 */

/**
 * Fetch all the posts
 */
const fetchPosts = async () => {
  const response = await fetch('/posts/index.json', { method: 'GET' });
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }

  return [];
};

/**
 * @property {HTMLLIElement} getElementsByTagName
 */
class SearchBarResultItem {
  /**
   * @param {string} postTitle
   * @param {string} postUrl
   * @param {RegExp} regexp
   */
  constructor(postTitle, postUrl, regexp) {
    const li = document.createElement('li');
    li.classList.add('search-bar__results-item');

    const link = document.createElement('a');
    link.classList.add('search-bar__results-item-link');
    link.href = postUrl;
    link.innerHTML = postTitle;

    li.append(link);

    this.element = li;
    this.element.firstElementChild.innerHTML = this.element.firstElementChild.innerHTML.replace(
      regexp,
      (match) => `<mark>${match}</mark>`
    );
  }
}

/**
 * @property {HTMLFormElement}  form
 * @property {HTMLLabelElement}      label
 * @property {HTMLInputElement} input
 * @property {HTMLUListElement} searchResults
 */
class SearchBar extends HTMLElement {
  constructor() {
    super();

    this.shortcutHandler = this.shortcutHandler.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
      <form id="search" class="search-bar" role="search">
        <label for="search-input" class="search-bar__label" id="search-bar-label">
          <?xml version="1.0" encoding="iso-8859-1"?>
          <svg class="search-bar__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve">
          <g>
            <g>
              <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
                S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
                c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
                M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
            </g>
          </g>
          <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
          </svg>
        </label>
        <input type="search" id="search-input" class="search-bar__input" placeholder="Rechercher…">
      </form>
      <div class="search-bar__results" hidden><ul id="search-result"></ul></div>
    `;

    this.form = this.querySelector('#search');
    this.label = this.querySelector('#search-bar-label');
    this.input = this.querySelector('#search-input');
    this.searchResults = this.querySelector('#search-result');

    this.noResultElement = document.createElement('h1');
    this.noResultElement.innerHTML = 'Aucun résultat trouvé.';

    this.form.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();

        const term = this.input.value.trim();
        if (!term) {
          return;
        }

        this.search(new RegExp(term, 'giu'));
      },
      false
    );

    this.label.addEventListener('click', this.toggleInput);
    window.addEventListener('keydown', this.shortcutHandler);
  }

  disconnectedCallback() {
    this.label.removeEventListener('click', this.toggleInput);
    window.removeEventListener('keydown', this.shortcutHandler);
  }

  /**
   * @param {Event} event
   */
  shortcutHandler(event) {
    if (event.key === 'Escape') {
      this.closeSearchBarResults();
    }
  }

  /**
   * @param {Event} event
   */
  toggleInput(event) {
    event.stopImmediatePropagation();
    this.input.classList.toggle('search-bar__input--active');
    setTimeout(() => {
      this.input.focus();
    }, 1);
    this.closeSearchBarResults();
  }

  /**
   * Search a term through a regexp into posts
   * @param {RegExp} regexp
   */
  async search(regexp) {
    const posts = await fetchPosts();
    const resultItems = posts
      .filter((post) => post.title.match(regexp) !== null)
      .map((post) => new SearchBarResultItem(post.title, post.url, regexp));

    this.displayResults(resultItems);
  }

  /**
   * Display the results
   * @param {SearchBarResultItem[]} resultItems
   */
  displayResults(resultItems) {
    this.openSearchBarResults();

    this.searchResults.innerHTML = '';

    if (this.searchResults.parentNode.contains(this.noResultElement)) {
      this.searchResults.parentNode.removeChild(this.noResultElement);
    }

    resultItems.forEach((item) => {
      const searchBarResultItem = item.element;

      if (searchBarResultItem !== null) {
        this.searchResults.append(searchBarResultItem);
      }
    });

    if (this.searchResults.childNodes.length === 0) {
      this.searchResults.parentNode.append(this.noResultElement);
    }

    document.body.style.overflow = 'hidden';
  }

  /**
   * Show the results
   */
  openSearchBarResults() {
    this.searchResults.parentNode.removeAttribute('hidden');
  }

  /**
   * Hide the results
   */
  closeSearchBarResults() {
    this.searchResults.parentNode.setAttribute('hidden', '');
    document.body.style.overflow = 'auto';
    this.input.blur();
    this.input.value = '';
  }
}

customElements.define('search-bar', SearchBar);

/**
 * ============================================================================
 * Tarteaucitron
 * ============================================================================
 */

const googleIdentifier = 'UA-38249160-1';

/**
 * Inspired from https://github.com/AmauriC/tarteaucitron.js/blob/bdff0c5dcf435a5654380be38a1bb0736d6b8cd1/tarteaucitron.services.js#L1727
 * See example into https://github.com/AmauriC/tarteaucitron.js/wiki/Custom-service-init-EN
 * google analytics
 */
// eslint-disable-next-line no-undef
tarteaucitron.services.gtagCustom = {
  key: 'gtagCustom',
  type: 'analytic',
  name: 'Google Analytics (gtag.js)',
  uri: 'https://policies.google.com/privacy',
  needConsent: true,
  // eslint-disable-next-line func-names
  cookies: (function () {
    // eslint-disable-next-line no-undef
    let tagUaCookie = `_gat_gtag_${googleIdentifier}`,
      tagGCookie = `_ga_${googleIdentifier}`;

    // eslint-disable-next-line require-unicode-regexp
    tagUaCookie = tagUaCookie.replace(/-/g, '_');
    // eslint-disable-next-line require-unicode-regexp
    tagGCookie = tagGCookie.replace(/G-/g, '');

    return [
      '_ga',
      '_gat',
      '_gid',
      '__utma',
      '__utmb',
      '__utmc',
      '__utmt',
      '__utmz',
      tagUaCookie,
      tagGCookie,
    ];
  })(),
  js() {
    'use strict';
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line no-undef
    tarteaucitron.addScript(
      `https://www.googletagmanager.com/gtag/js?id=${googleIdentifier}`,
      '',
      // eslint-disable-next-line func-names
      function () {
        window.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params,no-undef
          dataLayer.push(arguments);
        };
        // eslint-disable-next-line no-undef
        gtag('js', new Date());
        // eslint-disable-next-line no-undef
        gtag(
          'config',
          googleIdentifier,
          // eslint-disable-next-line camelcase
          { anonymize_ip: true },
          {
            /**
             * https://support.google.com/analytics/answer/7476333?hl=en
             * https:// developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
             */
            linker: {
              domains: ['blog.sogilis.com', 'sogilis.fr', 'sogilis.com'],
            },
          }
        );
      }
    );
  },
  fallback() {
    // eslint-disable-next-line no-console
    console.error('Google Analytics is not loaded.');
  },
};

/**
 * See https://github.com/AmauriC/tarteaucitron.js/
 */
// eslint-disable-next-line no-undef
tarteaucitron.init({
  /* Privacy policy url */
  privacyUrl: '',

  /* Open the panel with this hashtag */
  hashtag: '#tarteaucitron',
  /* Cookie name */
  cookieName: 'tarteaucitron',

  /* Banner position (top - bottom - middle - popup) */
  orientation: 'bottom',

  /* Group services by category */
  groupServices: false,

  /* Show the small banner on bottom right */
  showAlertSmall: false,
  /* Show the cookie list */
  cookieslist: true,

  /* Show cookie icon to manage cookies */
  showIcon: false,

  /* Optionnal: URL or base64 encoded image */
  // "iconSrc": "",

  /*
   * Position of the icon between BottomRight, BottomLeft, TopRight and TopLeft
   */
  iconPosition: 'BottomRight',

  /* Show a Warning if an adblocker is detected */
  adblocker: true,

  /* Show the deny all button */
  DenyAllCta: true,
  /* Show the accept all button when highPrivacy on */
  AcceptAllCta: true,
  /* HIGHLY RECOMMANDED Disable auto consent */
  highPrivacy: true,

  /* If Do Not Track == 1, disallow all */
  handleBrowserDNTRequest: false,

  /* Remove credit link */
  removeCredit: true,
  /* Show more info link */
  moreInfoLink: true,
  /* If false, the tarteaucitron.css file will be loaded */
  useExternalCss: false,

  /* Shared cookie for subdomain website */
  // "cookieDomain": ".my-multisite-domaine.fr",

  /* Change the default readmore link pointing to tarteaucitron.io */
  readmoreLink: '',

  /* Show a message about mandatory cookies */
  mandatory: true,
});

/**
 * If we use Google Analytics (and not Google Manager) with
 * tarteaucitron.user.analyticsAnonymizeIp` set to true, it is not blocked by
 * uBlock
 */
// eslint-disable-next-line no-undef
(tarteaucitron.job = tarteaucitron.job || []).push('gtagCustom');

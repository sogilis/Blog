/* eslint no-magic-numbers: off */
/* eslint max-classes-per-file: off */

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
  const titleMaxLength = 60;
  // `blogIndexArticleTitleAll' is never null, but could be empty.
  const blogIndexArticleTitleAll = document.querySelectorAll(
    '.blogindex-article-title'
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
const getFilteredPosts = async (term) => {
  const response = await fetch('posts/index.json', { method: 'GET' });
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then((data) => {
      const filteredPosts = data.filter((post) => {
        return post.title.toLowerCase().includes(term);
      });

      return filteredPosts;
    });
  }

  return [];
};

class SearchBarResultItem {
  /**
   * @param {string} value
   * @param {string} href
   */
  constructor(value, href) {
    const li = document.createElement('li');
    li.classList.add('search-bar__results-item');

    const link = document.createElement('a');
    link.classList.add('search-bar__results-item-link');
    link.href = href;
    link.innerHTML = value;

    li.append(link);

    this.element = li;
  }
}

class SearchBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="search" class="search-bar" role="search">
        <label for="search-input" class="search-bar__label">
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
        <input type="search" id="search-input" class="search-bar__input" placeholder="Search...">
      </form>

      <ul id="search-result" class="search-bar__results" hidden>
      </ul>
    `;

    this.form = document.getElementById('search');
    this.input = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-result');

    this.form.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();

        const term = this.input.value.trim();
        if (!term) {
          return;
        }

        this.search(term);
      },
      false
    );

    window.addEventListener('keydown', this.shortcutHandler.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.shortcutHandler);
  }

  shortcutHandler(event) {
    if (event.key === 'Escape') {
      this.closeSearchBarResults();
    }
  }

  search(term) {
    getFilteredPosts(term).then((posts) => {
      this.openSearchBarResults();

      this.searchResults.innerHTML = '';

      for (const post of posts) {
        const searchBarResultItem = new SearchBarResultItem(
          post.title,
          post.url
        );
        this.searchResults.append(searchBarResultItem.element);
      }

      document.body.style.overflow = 'hidden';
    });
  }

  openSearchBarResults() {
    this.searchResults.removeAttribute('hidden');
  }

  closeSearchBarResults() {
    this.searchResults.setAttribute('hidden', '');
    document.body.style.overflow = 'auto';
    this.input.blur();
  }
}

customElements.define('search-bar', SearchBar);

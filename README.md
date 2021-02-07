# 70-lines-of-vuepress-blog-theme

A VuePress Blog Theme implemented in around 70 lines.

## Quick start

**_Do not use `npm`_**

- Linter:

  ```bash
  yarn test
  ```

- Dev:

  ```bash
  yarn dev
  ```

  - Then http://localhost:8080

- Build:

  ```bash
  yarn build
  ```

* Serve build website as if it were deployed on GitHub Pages

  ```bash
  yarn serve
  ```

## Motivation

In fact, this project is a classic use case for the [official vuepress blog plugin](https://github.com/ulivz/vuepress-plugin-blog). This project aims to minimize the cost of developing a vuepress blog theme, so that developers only care about the implementation of the theme style, without paying attention to the underlying details of the complex implementation.

## Features

All of following features are out-of-box:

- Blogging Convention
- Blog-Styled Permalinks
- Pagination
- Frontmatter-Based Tag Classification

## License

MIT · ULIVZ

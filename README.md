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

## Develop to develop TypeScript

***Do not create `*.ts` files*** (let only ./theme/keep.ts empty).

Otherwise we have error described at https://github.com/vuepress/vuepress-community/issues/51

> When using vuepress-plugin-typescript v0.3.0 I get strange problems for plain
> typescript file in my project. The content of the typescript file does not seem
> to matter. The page appears to work but in the console I get errors like below:

This bug is not produced when we trigger `yarn serve`. It is produced when
we trigger `yarn dev` . The main consequence of this problem is that
in this case there is no Hot Reload (in fact in console we have message
`[WDS] Errors while compiling. Reload prevented.`).

Not that when there was `date.ts` file, when we edit this file the bug
disappear for the current `yarn dev` instance. When we restart a new
`yarn dev`, it fail again.

***You could create vue file with only TypeScript elements***, like into
./theme/utils/date.vue

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

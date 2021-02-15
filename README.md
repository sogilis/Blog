# Sogilis VuePress Typescrit POC

A VuePress Blog Theme implemented in some lines

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

## Develop in TypeScript

**_Do not create `_.ts` files\***

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

**_You could create vue file with only TypeScript elements_**, like into
./theme/utils/date.vue

## scss

:warning:

Do not upgrade sass-loader to version > 11 because VuePress 1.x use WebPack 4.x
and sass-loader 11+ needs WebPack 5.x
https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function

## TODO

- Header : correct scope of CSS
- Header : remove access to DOM API

## License

- For css files and design and somme articles : all right reserved to Sogilis.
  See https://github.com/sogilis/Blog and https://sogilis.com/

- For SquareScale articles, all right reserved to SquareScale.
  See https://github.com/squarescale/ and https://github.com/squarescale/

- All other files are under MIT license. Written by JulioJu during his free time.

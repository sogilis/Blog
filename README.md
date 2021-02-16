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

## scss

:warning:

Do not upgrade sass-loader to version > 11 because VuePress 1.x use WebPack 4.x
and sass-loader 11+ needs WebPack 5.x
https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function

## Note about migration from Hugo to VuePress

I've used following bash commands

````bash
sed -i 's/{{< ref "posts\//.\//' *
sed -i -E 's/\{\{< highlight >\}\}/```/' *
sed -i -E 's/\{\{< highlight ([a-z]+) >\}\}/```\1/' *
sed -i -E 's/\{\{< \/highlight >\}\}/```/' *
sed -i 's/" >}})/)/' *
sed -i 's/{{< relref "posts\//.\//' *
````

## Iframe video (Youtube, Vimeo, etc)

### YouTube

1. Start watching a video on youtube.com.
2. Under the video, click Share .
3. A panel will appear, presenting different sharing options:
4. Embed: Click the Embed button to generate a code you can use to embed the video in a website.
5. In your Markdown file copy the content
6. Surround the contend copied by tag `<VideoIframe> </VideoIframe>`

The result is something like:

```md
<VideoIframe>
  <iframe
    src="https://www.youtube.com/embed/kPmyROdRBpk"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</VideoIframe>
```

## TODO

- Header : correct scope of CSS
- Header : remove access to DOM API

## License

- For css files and design and somme articles : all right reserved to Sogilis.
  See https://github.com/sogilis/Blog and https://sogilis.com/

- For SquareScale articles, all right reserved to SquareScale.
  See https://github.com/squarescale/ and https://github.com/squarescale/

- All other files are under MIT license. Written by JulioJu during his free time.

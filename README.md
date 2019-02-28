# Backlog until live
 - [ ] Validate this architecture with non dev writers
 - [ ] Configure github pages to /docs/ from master (blog_sogilis/public should be moved to /docs)
 - [ ] Update design according new Sogilis website
 - [ ] Complete configuration like `Disqus` account (see `blog_sogilis/config.toml`)
 - [ ] Migrate old articles (ex: [End-to-end testing with chrome headless at Squarescale]https://github.com/sogilis/articles_blog))?

#  Backlog
 - [ ] Automate site generation (`make run-generation`)

# How to write a new article?

1. Install prerequisites:

  - [Docker](https://www.docker.com)
  - [Git](https://git-scm.com)

2. Download sources:

  ```
  git clone --recursive git@github.com:sogilis/Blog.git
  ```

  If it's already too late and you cloned your repo just run this command:

  ```
  git submodule update --init
  ```

3. Start blog locally:

  ```
  make build-image
  make start-image
  make run-debug-server
  ```

4. Write your article:

   Create a new text file in `blog_sogilis/content/posts`.
   Following formats are supported:
      - [Asciidoc](https://asciidoctor.org) with `.adoc` files
      - [Markdown](https://en.wikipedia.org/wiki/Markdown) with `.md` files

5. See the result:

  [http://localhost:1313](http://localhost:1313)

6. Finalize your article, and see the output in real time.

7. When finished, create a new Pull Request to get feedbacks.

8. When Pull Request is ready to be merged, generate static site:

  ```
  make run-generation
  ```

9. Push generated static site

10. Merge the Pull Request

# How to stop blog locally?

```
make stop-image
make remove-image
```

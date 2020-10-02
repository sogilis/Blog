[![Netlify Status](https://api.netlify.com/api/v1/badges/be2fba7f-a8a8-44de-b957-efc6901dba61/deploy-status)](https://app.netlify.com/sites/wizardly-roentgen-e7f07e/deploys)

* [Sogilis Blog](#sogilis-blog)
* [How to write a new article?](#how-to-write-a-new-article)
    * [Online](#online)
    * [Offline](#offline)
        * [Prerequisites](#prerequisites)
        * [Download blog](#download-blog)
        * [Start the blog](#start-the-blog)
            * [Without Docker](#without-docker)
            * [With Docker](#with-docker)
        * [Write a new article](#write-a-new-article)
        * [Publish your article](#publish-your-article)
* [Notes for developers (not for writers of articles)](docs/dev.md)
* [Credits](#credits)

# Sogilis Blog

Welcome to the open source Blog of Sogilis !
It is alive with following urls:

- [https://blog.sogilis.com](https://blog.sogilis.com)
- [https://blog.sogilis.fr](https://blog.sogilis.fr)

:information_source: For the moment, all is in french.
:information_source: All articles regardless their languages are visible in all languages.

The backlog is available in [Github project](https://github.com/sogilis/Blog/projects/2).

# How to write a new article?

***Do not hesitate to ask help.*** . We answer with enjoy :-) !

## Online

1. Go to [https://blog.sogilis.fr/admin](https://blog.sogilis.fr/admin), and sign in with your Google account.
:information_source: All members of Sogilis team have access to this admin interface.

2. That's it. You can now create/modify/review/delete/publish articles.

## Offline

These instructions will get you a copy of the project up and running on your
local machine.

So you will be able to write a new article offline.

### Prerequisites

You will need to install the following software:

* [GNU Make](docs/prerequisites.md#gnu-make)

* [Git](https://git-scm.com)

* Alternative 1 (without docker)
    1. [NodeJS](https://nodejs.org) >= 12
    2. [Yarn](https://yarnpkg.com/lang/en/docs/install/)

* Alternative 2 : [docker](https://docs.docker.com/install/) (more details [here](docs/prerequisites.md#docker)).

### Download blog

```bash
git clone git@github.com:sogilis/Blog.git
cd Blog
```

### Start the blog

With the both methods, each time you save a change on an article, the local
website is updated (**live reload**).

#### Without Docker

1. Start the blog:

```bash
make start
```

Wait a few seconds then, go to [http://localhost:1313](http://localhost:1313).

#### With Docker

1. Create the docker image (only once. see [docker considerations](docs/docker.md)):

```bash
make docker-build
```

2. Start the blog and the watcher:

```bash
make docker-start
```
Wait a few seconds then, go to [http://localhost:1313](http://localhost:1313).

3. Eventually, see logs (especially if there is a problem):

```bash
make docker-logs
```

4. Stop the container with:

```bash
make docker-stop
```


### Write a new article

:warning: __The branch `master` is automatically pushed on the production server, you need to work on a new branch and use the Pull Request mechanism.__ :warning:

1. Create a new branch

2. Write your article:

   Create a new text file in `site/content/posts`.
   Following formats are supported:
      - [Asciidoc](https://asciidoctor.org) with `.adoc` files
      - [Markdown](https://en.wikipedia.org/wiki/Markdown) with `.md` files

   Here is a basic markdown template to start with:

   ```markdown
   ---
   title: My article title
   author: Author (author@sogilis.com)
   date: 2020-08-20
   image: /img/image-name.jpeg
   categories:
     - cat1
     - cat2
     - ...
   tags:
     - tag1
     - tag2
     - ...
   ---

   ## A first subtitle
   Start writing your content here.
   ```

   Note that:
   - the date should not be later than the current date, otherwise the article will not be published (and therefore not visible from the home page in the article list)
   - you can set any values to categories and tags. Look at values that have been used in previous articles to avoid duplicates
   - put your images under the `site/static/img/` directory

3. See the result at [http://localhost:1313](http://localhost:1313)

4. Finalize your article, and see the output in real time.

### Publish your article

1. Create a new Pull Request to get feedbacks from other team members.

   :information_source: Netlify provides a preview environment.

   So when you open your Pull Request Netlify builds the new website and you can check the result of your Pull Request in [Netlifly](https://app.netlify.com/sites/wizardly-roentgen-e7f07e/deploys). See `deploy-preview` jobs triggered by your Pull Request to get the corresponding url.


2. If you're satisfied with the result in the preview you can merge the Pull Request into `master` branch.

6. It's done, the deployment is automated.


# Credits

Articles are created by Sogilis collaborators

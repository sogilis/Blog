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
* [Notes for developers (not for writers of articles)](#notes-for-developers-not-for-writers-of-articles)
    * [Upgrade the CMS](#upgrade-the-cms)
    * [Test netlify-cms locally](#test-netlify-cms-locally)
    * [API limit reach](#api-limit-reach)
    * [TODO](#todo)
    * [Troubleshooting](#troubleshooting)
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

* Install GNU Make. It is needed for build process with Docker or without
    Docker.
    * For Linux, use your distro specific instructions
    * For Windows, see https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows
        * Actually (at 2020-03-01) GNUWin32 is very outdated (2006), I advise
          you to use Chocolaty (it has built GNU Make from recent sources, as
          we can see in their "Package Source")
    * For mac users, use Homebrew

* To download and push changes install: [Git](https://git-scm.com)

* To start the blog and see your changes on live, at each save:
    * Without the Docker method:
        1. Node:
            * [for Linux](https://nodejs.org/en/download/package-manager/)
            * [for Windows / Mac](https://nodejs.org/en/download/)
            * Note: actually (01/26/2020), you
                must have node >= 12 (some versions of node 10.x seems to work,
                but not all)
        2. Yarn: [instructions](https://yarnpkg.com/lang/en/docs/install/)
            * Note: not compatible with `npm`.
        3. [ruby](https://www.ruby-lang.org/fr/) 2.6.2 and [Bundler](https://bundler.io)
    * With the Docker method see [instructions](https://docs.docker.com/install/)
        * Disclaimer:
            * On Windows or Mac, installation of Docker could be
                complicated.
            * Use more disc space. It's not a fake affirmation.
                I've taken fill my free 50Go of disk space simply when I've tested
                several times to adapt the configuration of the current ./Dockerfile
                (you could run `docker system prune`).
            * Takes more resources
            * Build the website is incredibly more long especially if you want
                simply update `node_modules` when package.json is changed.
                With the method without docker, the upgrade with simply
                `yarn install` is very quick.
        * But if you won't install node and yarn in your environment because you
            hate this web tools, and if you have already Docker, it could be a
            solution interesting.
        * During the build, some files are created
            ( ./site/data/webpack.json , ./site/resources/_gen/ ).
            There owner are root. Could cause some problems when you use
            commands as not root user (rm, git, yarn).
            You must delete this file before with `sudo`. It's not cool.
            * Note: with the add of a dockerignore file, this issue should be
                solved.

### Download blog
```bash
git clone git@github.com:sogilis/Blog.git
cd Blog
```

### Start the blog

With the both methods, each time you save a change on an article, the local
website is updated (live reload).

#### Without Docker

1. Start the blog and the watcher:

```bash
yarn start
```

Wait a few seconds then, go to [http://localhost:1313](http://localhost:1313).

Note: each time you trigger this command, `yarn install` is called. As yarn
is a powerful Package Manager, when there are no update of dependencies,
it should takes only some seconds.
Note 2: you could call directly `make start` instead of `yarn start`

#### With Docker

1. Do not forget to start the Docker service (see documentation online)

2. Create the docker image
    * Not needed at each start, but at each **update** of
        1. Dockerfile
        2. package.json:
        * Each time you run `git pull` to update the website, if you don't
            know if this files are changed, you could run this command.
            This command is always very long, even for an upgrade.
        * Don't forget to run `docker system prune` if you don't want
            fill your disk.
    * Run:
        ```bash
        make --file MakefileDocker build
        ```
    * Note: with Docker, **contrary to the old doc said** no need
        to trigger ~~`yarn install`~~.

3. Start the blog and the watcher:
```bash
make --file MakefileDocker start
```
Wait a few seconds then, go to [http://localhost:1313](http://localhost:1313).

4. Eventually, see logs (especially if there is a problem):
```bash
make --file MakefileDocker logs
```

5. Stop the container with:
```
make --file MakefileDocker stop
```

6. Eventually, free disc space with
    (docker could easy eat several tens of Go of disc space)
```
docker system prune
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

# Notes for developers (not for writers of articles)

## Upgrade the CMS

Run the following command:
```sh
$ yarn upgrade --latest
```

## Test netlify-cms locally

```sh
$ yarn start:netlify
```

It seems you can't publish an article or save a draft. But for debugging purpose
of netlify it's so cool.

See also https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository and https://github.com/netlify/netlify-cms/issues/2335

## API limit reach

Due to GitHub limitations, you could reach the API limit when you access to
https://blog.sogilis.fr/admin/*, especially when you `git push` many times
in a short time.

We should considerate to migrate to a self-hosted GitLab solution for this reason.

See also
* « Github Backend - API Rate Limiting » https://github.com/netlify/netlify-cms/issues/68
* « Slow search » https://github.com/netlify/netlify-cms/issues/2350
* « Paginate published posts in overview » https://github.com/netlify/netlify-cms/issues/50
* « Netlify CMS Alternative » https://buttercms.com/netlifycms-alternative/
    than explains that a main problem with Netlify is this problem.

## TODO

* Actually, at the link https://blog.sogilis.fr/admin/#/collections/post
    the grid view with image is very slow. There are several solutions.

* Stylish with our style the preview of https://blog.sogilis.fr/admin/#/collections/post/new

* In package.json remove Linux shell syntax and use only node modules to
    have compatibility with PowerShell or MS Batch. Use also https://www.npmjs.com/package/yarn-or-npm

* For netlify-cms.js, use https://webpack.js.org/guides/caching/
    (actually reboot.min.css is cached).

## Troubleshooting

```
$ yarn start
yarn run v1.22.0
$ hugo server -s site -v
events.js:298
      throw er; // Unhandled 'error' event
      ^

Error: spawn /home/julioprayer/Blog/node_modules/hugo-bin/vendor/hugo ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:267:19)
    at onErrorNT (internal/child_process.js:467:16)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
Emitted 'error' event on ChildProcess instance at:
    at Process.ChildProcess._handle.onexit (internal/child_process.js:273:12)
    at onErrorNT (internal/child_process.js:467:16)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'spawn /home/julioprayer/Blog/node_modules/hugo-bin/vendor/hugo',
  path: '/home/julioprayer/Blog/node_modules/hugo-bin/vendor/hugo',
  spawnargs: [ 'server', '-s', 'site', '-v' ]
}
```

=> `$ rm -Rf ./node_modules && yarn install`

# Credits

* Articles are created by Sogilis collaborators

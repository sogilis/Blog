[![Netlify Status](https://api.netlify.com/api/v1/badges/be2fba7f-a8a8-44de-b957-efc6901dba61/deploy-status)](https://app.netlify.com/sites/wizardly-roentgen-e7f07e/deploys)

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

* To download and push changes: [Git](https://git-scm.com)
* To start the blog and see your changes on live, at each save:
    * Without the Docker method:
        1. Node:
            * [for Linux](https://nodejs.org/en/download/package-manager/)
            * [for Windows / Mac](https://nodejs.org/en/download/)
            * Note: actually (01/26/2020), you
                must have node >= 12 (some versions of node 10.x seems to work,
                but not all)
        2. Yarn: [instructions](https://yarnpkg.com/lang/en/docs/install/)
        * Note: npm is not needed in dev environment.
            It's advise to not use it.
            But should work, if you don't want use yarn.
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

1. Installation
    * Not needed at each start, but at each **update** of package.json
    * Run:
        ```bash
        yarn install
        ```
    * Each time you run `git pull` to update the website, if you don't
        know if this files are changed, you could run this command.
        For an upgrade, this command is very quick.

2. Start the blog and the watcher:

```bash
yarn start
```

Wait a few seconds then, go to [http://localhost:1313](http://localhost:1313).

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
        make build
        ```
    * Note: with Docker, **contrary to the old doc said** no need
        to trigger ~~`yarn install`~~.

3. Start the blog and the watcher:
```bash
make start
```
Wait a few seconds then, go to [http://localhost:1313](http://localhost:1313).

4. Eventually, see logs (especially if there is a problem):
```bash
make logs
```

5. Stop the container with:
```
make stop
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

3. See the result at [http://localhost:1313](http://localhost:1313)

4. Finalize your article, and see the output in real time.

### Publish your article

1. Create a new Pull Request to get feedbacks from other team members.

   :information_source: Netlify provides a preview environment.

   So when you open your Pull Request Netlify builds the new website and you can check the result of your Pull Request in [Netlifly](https://app.netlify.com/sites/wizardly-roentgen-e7f07e/deploys). See `deploy-preview` jobs triggered by your Pull Request to get the corresponding url.


2. If you're satisfied with the result in the preview you can merge the Pull Request into `master` branch.

6. It's done, the deployment is automated.

# Upgrade the CMS (only for Developers)

Run the following command:
```sh
bash ./scripts/update-cms.sh
```
After the installation, you could remove the created folder /tmp/one-click-hugo-cms/

## Note about this template

Note that this template seems not te be very updated.

Updated mainly by renovate-bot .

https://github.com/netlify-templates/one-click-hugo-cms
is based on
https://github.com/netlify-templates/victor-hugo

Actually, this templates seems to be a little bit abandoned
* All issues not correctly answered
* PR no answered
* Dependencies not upgraded

# TODO

Remove some non useful declarations on package.json .
It seems there are several no useful declarations.

# Credits

* This blog uses https://github.com/netlify-templates/one-click-hugo-cms
    (see also https://www.netlifycms.org/docs/start-with-a-template/ Hugo Site Starter)

* Articles are created by Sogilis collaborators

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

## Online

1. Go to [https://blog.sogilis.fr/admin](https://blog.sogilis.fr/admin), and sign in with your Google account.
:information_source: All members of Sogilis team have access to this admin interface.

2. That's it. You can now create/modify/review/delete/publish articles.

## Offline

These instructions will get you a copy of the project up and running on your local machine.
So you will be able to write a new article offline.

### Prerequisites

* Should work with `npm`, but no tested. It seems that in package.json there is
    a feature natively only supported by yarn.

`yarn install`


### Installation

1. Get sources:
```bash
git clone git@github.com:sogilis/Blog.git
cd Blog
```

### Start the blog

`yarn start`

Wait a few seconds then, go to [http://localhost:3000](http://localhost:3000).

### Write a new article

:warning: __The branch `master` is automatically pushed on the production server, you need to work on a new branch and use the Pull Request mechanism.__ :warning:

1. Create a new branch

2. Write your article:

   Create a new text file in `site/content/posts`.
   Following formats are supported:
      - [Asciidoc](https://asciidoctor.org) with `.adoc` files
      - [Markdown](https://en.wikipedia.org/wiki/Markdown) with `.md` files

3. See the result at [http://localhost:3000](http://localhost:3000)

4. Finalize your article, and see the output in real time.

### Publish your article

1. Create a new Pull Request to get feedbacks from other team members.

   :information_source: Netlify provides a preview environment.

   So when you open your Pull Request Netlify builds the new website and you can check the result of your Pull Request in [Netlifly](https://app.netlify.com/sites/wizardly-roentgen-e7f07e/deploys). See `deploy-preview` jobs triggered by your Pull Request to get the corresponding url.


2. If you're satisfied with the result in the preview you can merge the Pull Request into `master` branch.

6. It's done, the deployment is automated.

# Upgrade


**Assume you are in the working directory**
You could copy and past following script in zsh.
```sh

set -k
# Above: allow comments in zsh interactive shell

set -e

# we can check for unstaged changes with:
git diff --exit-code 1> /dev/null

# not committed changes with:
git diff --cached --exit-code 1> /dev/null

git clone https://github.com/netlify-templates/one-click-hugo-cms /tmp/one-click-hugo-cms

# I) Do not upgrade all from the sample
# II) Do not upgrade .git folder
# III)Do not delete folders created by us
rsync -rv --delete --exclude={\
".github/",\
"bin/",\
"site/",\
".gitignore",\
".nvmrc",\
"CODE_OF_CONDUCT.md",\
"CONTRIBUTING.md",\
"LICENSE",\
"README.md",\
"src/fonts/",\
\
".git/",\
\
"node_modules/",\
"dist/",\
"scripts/"\
} \
/tmp/one-click-hugo-cms/ "$(pwd)"

yarn install
```

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



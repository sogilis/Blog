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

You will need to install the following software:

* [Docker](https://docs.docker.com/install/)
* [Git](https://git-scm.com)
* `make`

### Installation

1. Get sources:
```bash
git clone --recursive git@github.com:sogilis/Blog.git
cd Blog
```

2. Create the docker image.
```bash
make build
```

### Start the blog

```bash
make start
```

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

### How to stop blog locally?

```Bash
make stop
make remove
```


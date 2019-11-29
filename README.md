[![Netlify Status](https://api.netlify.com/api/v1/badges/be2fba7f-a8a8-44de-b957-efc6901dba61/deploy-status)](https://app.netlify.com/sites/wizardly-roentgen-e7f07e/deploys)

# Sogilis Blog

Welcome to the open source Blog of Sogilis !
It is alive with following urls:

- [https://blog.sogilis.com](https://blog.sogilis.com)
- [https://blog.sogilis.com](https://blog.sogilis.fr)

:information_source: For the moment, all is in french.
:information_source: All articles regardless their languages are visible in all languages.

The backlog is available in [Github project](https://github.com/sogilis/Blog/projects/2).
Additional information can be found in [Wiki](https://github.com/sogilis/Blog/wiki).

# How to write a new article?

## Online

1. Go to [https://blog.sogilis.fr/admin](https://blog.sogilis.fr/admin), and sign in with your Google account.
:information_source: All members of Sogilis team have access to this admin interface.

2. That's it. You now can now create/modify/review/delete/publish articles.

## Offline

These instructions will get you a copy of the project up and running on your local machine.
So you will be able to write a new article off line.

### Prerequisites

You will need to install the following software:

* [Docker](https://www.docker.com)
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

```Bash
make start
```

Wait a view seconds then, go to [http://localhost:3000](http://localhost:3000).

### Write a new article

1. Write your article:

   Create a new text file in `site/content/posts`.
   Following formats are supported:
      - [Asciidoc](https://asciidoctor.org) with `.adoc` files
      - [Markdown](https://en.wikipedia.org/wiki/Markdown) with `.md` files

2. See the result at [http://localhost:3000](http://localhost:3000)

3. Finalize your article, and see the output in real time.

### Publish your article

1. Create a new Pull Request to get feedbacks from other team members.
:information_source: Netlify provides a preview environment. See `deploy-preview` jobs triggered by your Pull Request to get the corresponding url.

5. Merge the Pull Request into `master` branch.

6. It's done, the deployment is automated.

### How to stop blog locally?

```Bash
make stop
make remove
```

# Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

# Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/sogilis/Blog/tags).

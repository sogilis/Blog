
# Sogilis Blog

Welcome to the open source Blog of Sogilis !
For now, this blog is not live.
Follow [Github project](https://github.com/orgs/sogilis/projects/3) to see what's remains to be done before live.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to install the following software:

* Docker >= 1.38 (18.06.1-ce)
* [Git](https://git-scm.com)
* make

### Install

A step by step procedure that indicates how to get a development env running
First fork this project

```bash
git clone --recursive git@github.com:sogilis/Blog.git
cd Blog
make build
```

### How run blog locally?

```Bash
make start
```

Wait a view seconds then, go to:
    - [http://localhost:3000](http://localhost:3000) for english version
    - [http://localhost:3001](http://localhost:3001) for french version

### How to write a new article?

1. Run blog locally (see above).

2. Write your article:

   Create a new text file in `site/content/posts`.
   Following formats are supported:
      - [Asciidoc](https://asciidoctor.org) with `.adoc` files
      - [Markdown](https://en.wikipedia.org/wiki/Markdown) with `.md` files

3. See the result at [http://localhost:3000](http://localhost:3000)

4. Finalize your article, and see the output in real time.

5. When finished, create a new Pull Request to get feedbacks from other team members.

6. See the deployemet done in your PR to assess generated static site

7. Ask a maintener to Merge the Pull Request

### How to stop blog locally?

```Bash
make stop
make remove
```

## Built With

* [Hugo](https://gohugo.io/) - The content site generator used
* [Hugo-boiler-plate victor](https://github.com/netlify-templates/victor-hugo) - the netflify hugo site structure chosen
* [netlify](https://www.netlify.com/) - Used to generate static site and hosting it

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## Additional ressources

Some additional ressources are available in [Google Drive](https://drive.google.com/drive/u/0/folders/1_R28VjeHrld1SloP-40tBQyde9G0Z-sR):
    - UI Design (static pages)
    - Articles exported with old blog (Wordpress)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/sogilis/Blog/tags).

## Authors

* **Antoine** - *Initial work* - [Agervail](https://github.com/agervail)
* **Jean-Baptiste** - *Contributors* - [Jidibus](https://github.com/jibidus)
* **Nasser** - *Initial work* - [Nas84](https://github.com/Nas84)
* **Nicolas** - *UI Design*

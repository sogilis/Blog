## Prerequisites

## GNU Make.

- For Linux, use your distro specific instructions
- For Windows, see https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows
  - Actually (at 2020-03-01) GNUWin32 is very outdated (2006), I advise
    you to use Chocolaty (it has built GNU Make from recent sources, as
    we can see in their "Package Source")
- For mac users, it is installed by default

## Docker

See Docker [installation instruction](https://docs.docker.com/install/)

- Disclaimer:
  - On Windows or Mac, installation of Docker could be
    complicated.
  - Use more disc space. It's not a fake affirmation.
    I've taken fill my free 50Go of disk space simply when I've tested
    several times to adapt the configuration of the current ./Dockerfile
    (you could run `docker system prune`).
  - Takes more resources
  - Build the website is incredibly more long especially if you want
    simply update `node_modules` when package.json is changed.
    With the method without docker, the upgrade with simply
    `yarn install` is very quick.
- But if you won't install node and yarn in your environment because you
  hate this web tools, and if you have already Docker, it could be a
  solution interesting.
- During the build, some files are created
  ( ./site/data/webpack.json , ./site/resources/\_gen/ ).
  There owner are root. Could cause some problems when you use
  commands as not root user (rm, git, yarn).
  You must delete this file before with `sudo`. It's not cool.
  - Note: with the add of a dockerignore file, this issue should be
    solved.

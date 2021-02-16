---
title: 'Building files: redo, the simple branch'
author: Shanti
date: 2014-03-06T09:04:00+00:00
image: /img/2016-04-2.La-vie-a-Sogilis.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - code
  - développement
  - redo
---

## Make and Redo

For a long time, developers have been using `make` as their build system. However, this very simple program have many issues. To help with these, many front-ends have been written and used, such as automake and cmake. Some tried to replace it completely like scons.

Let’s build a list of things we are dissatisfied with make:

- Recursive make is broken
- Make language is implemented differently on different platforms
- Make uses shell that is also incompatible between platforms
- Targets with multiple outputs are broken
- Make is a template language for shell: it doesn’t know shell syntax and things like filenames with spaces or special characters are plain impossible to get right.
- Dependencies must be specified manually for every target
- Make is not as powerful as it should be
- Make is not as simple as it should be
- Make is yet another language
- Make do not guarantee atomic operations when building files

There are alternatives, right? They are good, but not completely satisfying. Many are just layers on top of make and do not solve all its problems. They feature support for many languages, compilers, but are not as simple as a `Makefile` when it come to a simple build job. Some are built on top of a programming language while others create another language for the occasion.

To introduce redo, I’d like to quote both the [README of the project](https://github.com/mildred/redo/blob/master/README.md):

> Although I wrote redo and I would love to take credit for it, the magical simplicity and flexibility comes because I copied verbatim a design by Daniel J. Bernstein (creator of qmail and djbdns, among many other useful things). He posted some very terse notes on his web site at one point (there is no date) with the unassuming title, “[Rebuilding target files when source files have changed.](http://cr.yp.to/redo.html)” Those notes are enough information to understand how the system is supposed to work; unfortunately there’s no code to go with it. I get the impression that the hypothetical “djb redo” is incomplete and Bernstein doesn’t yet consider it ready for the real world.
>
> After I found out about djb redo, I searched the Internet for any sign that other people had discovered what I had: a hidden, unimplemented gem of brilliant code design. I found only one interesting link: Alan Grosskurth, whose Master’s thesis at the University of Waterloo was about top-down software rebuilding, that is, djb redo. He wrote his own (admittedly slow) implementation in about 250 lines of shell script.
>
> If you’ve ever thought about rewriting GNU make from scratch, the idea of doing it in 250 lines of shell script probably didn’t occur to you. redo is so simple that it’s actually possible. For testing, I actually wrote an even more minimal version, which always rebuilds everything instead of checking dependencies, in 150 lines of shell (about 3 kbytes).
>
> The design is simply that good.

Have you found yet the [home of this redo implementation](https://github.com/apenwarr/redo)?

## Redo in five minutes

Redo is a top down build system. You must know what you want to build and how to build it. Then, building the files you asked, and then the dependencies if they are not up to date, it builds everything you might want to have.

Each target have a recipe. The recipe is a `.do` files that have the same name of the target (or `default*.do` acts as a wildcard). This recipe is simply a script (generally shell) that gets executed. It gets 3 parameters. The first is the target we want to build, the second is the basename of the target (file extension removed). The third is a temporary file the script has to write to. When the build for that file is finished, that third file will be atomically renamed to the target file by redo.

Declaring dependencies is done by executing `redo-ifchange` with the files necessary for the build. `redo-ifchange` won’t exit until all files passed as argument are up to date.

State of files must be kept persistently on the filesystem, in a `.redo` directory.

If that triggers your interest, you can look at the [project’s README](https://github.com/mildred/redo/blob/master/README.md).

## Simple examples

### Build documentation

Let’s say you want to build `README.md` in `README.html`. Have a file called `default.html.do`:

```bash
redo-ifchange "$2.md"
Markdown.pl <"$2.md" >"\$3"
```

Then, you simply run `redo README.html`. It will execute the script with three parameters: `README.html`, `README` and a temporary file.

- `redo-ifchange` will declare a dependency to `README.html` (and build it if not up to date)
- and `Markdown.pl` will build the markdown in the temporary file.
- Redo will then rename atomically the temporary file to `README.html`.

### Find dependencies from C / C++

Redo doesn’t feature any automatic `#include` detection for C source files. Then, how to record that information, manually?

Hopefully, no. You’ll need to come with your own parser though. Don’t worry, one is included by default in gcc. There are two flags `-MD` and `-MF` that write a a defined file the dependencies of the file being built in a make compatible format, that can be easily parsed in shell.

This solution is very elegant because the source is only parsed once. The file is built first, and the dependencies are recorded afterwards using output from the compilation.

Let’s see how a `default.o.do` would look like:

```bash
redo-ifchange "$2.c"
gcc -MD -MF "$2.d" -c -o "$3" "$2.c"
read DEPS <"$2.d"
redo-ifchange ${DEPS#\*:}
```

- First, the source file itself is declared as a dependency.
- Then, the file is built
- When the file is built, all dependencies parsed by gcc are recorded as well

If none of the dependencies first recorded have been modified, none of this is executed. Is is made possible because redo keeps a persistent store of dependencies.

### Using hash instead of timestamp

By default, redo uses file timestamps to deterine if a file is up to date. Sometimes, a file may be rebuilt identically (let’s say `config.h`) and you don’t want to rebuild everything just because a file was rewritten with the exact same content.

When building a target, you can use redo-stamp to record a hash instead of a timestamp. It could be a hash of everything, although it is generally a hash of the output file. But if the output file contains a comment containing the current date, you can use any other data for input as redo-stamp.

Let’s look then at `config.h.do`:

```bash
detect-config-h >"$3"
redo-stamp <"$3"
```

## What’s the simple branch?

This version of redo was built with python and SQLite. This was seen as quite complex and a big refactoring was started in the simple branch, but was never really completed. I completed it, mostly to add new features.

The simple branch features a drastic change of implementation. It’s still python (I hop there will be a C version one day) but there is no more SQLite. It only feature simple well organized files for the datastore.

### File format

For each file recorded in redo, there is a corresponding file in the `.redo` directory with the same name, but ending with `.deps`. For example, you’d have for `src/main.c` a file `src/.redo/main.c.deps`. It would look like:

```bash
redo.0
41 2848026
1386591363.1-1386591363.1-818-41-1796582 default.c.do
1386591363.1-1386591363.1-37-41-1796583 lib.h
7bc09e7900651e7b8682eadc926105a868cf74cc .
1387535039.05-1387535039.03-96-41-2848029+1387535038
0
```

- `redo.0` is a constant tag containing the version of the format

- `41 2848026` is the device id and inode of the `.deps` file to detect if the file has been copied or shared using a virtual device. In that case, the file is considered missing.

- The list of dependencies:

  ```bash
  1386591363.1-1386591363.1-818-41-1796582 default.c.do
  1386591363.1-1386591363.1-37-41-1796583 lib.h
  ```

  The beginning of the line is the stamp for the dependency. On the right, there is the file name.

- The stamp hash generated by `redo-stamp` (optional, line may be missing):

  ```bash
  7bc09e7900651e7b8682eadc926105a868cf74cc .
  ```

- The stamp based on file metadata of the last generated file:

  ```bash
  1387535039.05-1387535039.03-96-41-2848029+1387535038
  ```

- The exit code of the last build of the file: `0` for success.

File stamps are generally some fields returned by the `stat()` system call separated by dashes:

- the created unix time
- the modified unix time
- the file size
- the device id
- the file inode

It can also be a special value:

- `` if the file is non existent
- `dir` if the file is a directory
- `old` if the .deps file is outdated (from old redo version, or with wrong inode / device id)

Also, it is possible the dependencies will refer to the `//ALWAYS` file, which is considered invalid. This is generated by `redo-always` which always triggers a rebuild.

## How does redo manages multiple outputs

This is only a recently implemented feature for the simple branch. It works by having a master recipe building more than one file, and declaring the extra files it built. For completeness, slave recipes can delegate the build to a master recipe that is known to build the file.

Let’s say you have a program called `run-template` that generates a `testing.c` file and a `testing.h` file from `testing.tmpl`. You declare the master recipe (`testing.c.do`) this way:

```bash
redo-ifchange "$2.tmpl"
run-template --c-file="$3" --h-file="${3%.c}.h" <"$2.tmpl"
```

What it does is depending on the `testing.tmpl` file and then telling `run-template` to put the master file (the `testing.c` file) in `$3` (the temporary file in the .redo directory). It also tells `run-template` to place the `testing.h` file in the same directory as the `testing.c` file. Placing a file here is enough as redo will scan this directory for extra targets.

The slave recipe (`testing.h.do`) is just delegating build to `testing.c`:

```bash
redo-delegate "testing.c"
```

An outline of the files involved:

- `testing.tmpl`: the template
- `testing.c.do`: the recipe for `testing.c` (and `testing.h` as a secondary target)
- `testing.h.do`: the slave recipe for `testing.h`
- `.redo/testing.c.out/testing.c`: the temporary file (`$3`) during build
- `.redo/testing.c.out/testing.h`: the secondary target (`${3%.c}.h`) during build
- `testing.c`: the generated `.c` file after the build
- `testing.h`: the generated `.h` file after the build

The key is that all files placed in the same directory as `$3` (the temporary file) will be treated as secondary targets and will override files already in the project.

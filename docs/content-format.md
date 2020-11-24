# Content format

Only supported format is `Markdown`, more precisely [CommonMark](https://commonmark.org) compliant and [GitHub flavored](https://github.github.com/gfm/):

- [CommonMark syntax](https://commonmark.org/help/)
- [GitHub flavored syntax](https://guides.github.com/features/mastering-markdown/) (except SHA and issue references and username @mentions)

A [sum up of all feature](https://www.markdownguide.org/tools/hugo/) is available in Markdown Guide.

In addition, Hugo provides many [built in shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes), but let's try as much as possible to use "standard" Markdown, since shortcodes make portability harder.

:warning: prefer `{linenos=inline}` (instead of `true` or `table`) if you need line number on code block (the stylesheet does not handle these values correctly).

If necessary, `Asciidoc` could be added quite easily. There are many things which prevent use to use this format today:
- add `asciidoctor` and mandatory dependency
- make sure `NetlifyCMS` can handle this format
- makre sure `Asciidoc` support is as expected

## Useful details

- Spaces and tabs can be used for code block indentations (1 tab = 4 spaces). Keep in mind that too little spaces can harm lisibility with small indentation.

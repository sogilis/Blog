# Notes for developers

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

- « Github Backend - API Rate Limiting » https://github.com/netlify/netlify-cms/issues/68
- « Slow search » https://github.com/netlify/netlify-cms/issues/2350
- « Paginate published posts in overview » https://github.com/netlify/netlify-cms/issues/50
- « Netlify CMS Alternative » https://buttercms.com/netlifycms-alternative/
  than explains that a main problem with Netlify is this problem.

## TODO

- Actually, at the link https://blog.sogilis.fr/admin/#/collections/post
  the grid view with image is very slow. There are several solutions.

- Stylish with our style the preview of https://blog.sogilis.fr/admin/#/collections/post/new

- In package.json remove Linux shell syntax and use only node modules to
  have compatibility with PowerShell or MS Batch. Use also https://www.npmjs.com/package/yarn-or-npm

- For netlify-cms.js, use https://webpack.js.org/guides/caching/
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

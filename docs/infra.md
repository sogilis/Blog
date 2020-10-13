# Infrastructure

## Github Actions

### [Check dead links job](../.github/workflows/scheduled.yml)

Periodically, we check for broken links in deployed blog.
Finding the right tools was not easy (see #44 and linked Pull request for more details) because of the following reasons:
- LinkedIn respond with http code 999, which is considered as a broken link by many tools
- Some tool checks markdown links, which is great to check links before Pull request Merge. But some of them does not handle local link (like `img/…`) properly

When a broken link is found, a Slack notification is sent to `@jibidus`. Once a test period has passed (2020 novembre the 15th), `#sites-web-dev` will be used. Thus, we avoid potential spam sent to public channel in case of unexpected behavior.
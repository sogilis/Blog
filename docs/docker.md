# Docker considerations

You have to build the docker image only once, except when one of these file is modified:

* `Dockerfile`
* `package.json`:

Note: Each time you run `git pull` to update the website, if you don't know if this files are changed, you may rebuild the docker image.
This command is may be very long, even for an upgrade.

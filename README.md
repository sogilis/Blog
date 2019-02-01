# First thing to do

You need to take care of the theme submodule

To do it when you clone the repo do this
```
git clone --recursive git@github.com:agervail/agervail.github.io.git
```
If it's already too late and you cloned your repo just run this command :
```
git submodule update --init
```

# Usage

Then you can run the following commands:

```
make build-image
make start-image
make run-debug-server
```

Once you have done that you can modify your articles in ***content/posts*** and it'll automaticaly be updated on the local server :
http://localhost:1313

And then if you're satisfied with your beautiful article you can generate the static site with that command :
```
make run-generate
```

If you want to exit the docker you can run
```
make stop-image
make remove-image
```

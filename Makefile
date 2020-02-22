.DEFAULT_GOAL := start

copy_rebootcss:
	cp ./node_modules/bootstrap-reboot/dist/reboot.min.css* ./site/themes/sogilis/assets/css/

copy_netlify-cms:
	cp ./node_modules/netlify-cms/dist/netlify-cms.js* ./site/static/admin/

start:
	yarn install
	make copy_rebootcss
	# -s, --source string          filesystem path to read files relative from
	# -v, --verbose                verbose output
	yarn hugo server -s site -v

start_netlify:
	yarn install
	make copy_rebootcss
	make copy_netlify-cms
	netlify-cms-proxy-server &
	sleep 3
	yarn start

build_common:
	# During build process, css dependencies should be copied into the
	# appropriate file thanks it we could use cache
	# https://webpack.js.org/guides/caching/
	make copy_rebootcss
	# Actually this file is not cached.
	make copy_netlify-cms
	rm -Rf dist

# Target used by Netlify to build the prod version.
build:
	make build_common
	# -s, --source string          filesystem path to read files relative from
	# -d, --destination string     filesystem path to write files to
	# -v, --verbose                verbose output
	yarn hugo -s site -d ../dist -v

# Target used by Netlify to build his preview
build_preview:
	make build_common
	# -s, --source string          filesystem path to read files relative from
	# -d, --destination string     filesystem path to write files to
	# -D, --buildDrafts            include content marked as draft
	# -F, --buildFuture            include content with publishdate in the future
	# -v, --verbose                verbose output
	yarn hugo -s site -d ../dist -D -F -v

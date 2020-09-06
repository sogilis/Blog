.DEFAULT_GOAL := start

.PHONY: start start_netlify build build_preview clean _common _build_common

# ==============================================================================
# Run Netlify in watch mode
# ==============================================================================

start:
	make _common
	# -s, --source string          filesystem path to read files relative from
	# -v, --verbose                verbose output
	yarn hugo server -s site -v

start_netlify:
	make _common
	netlify-cms-proxy-server &
	sleep 3
	yarn start

# ==============================================================================
# Target used by Netlify
# ==============================================================================

# Target used by Netlify to build the prod version.
build:
	make _build_common
	# -s, --source string          filesystem path to read files relative from
	# -d, --destination string     filesystem path to write files to
	# -v, --verbose                verbose output
	yarn hugo -s site -d ../dist -v

# Target used by Netlify to build his preview
build_preview:
	make _build_common
	# -s, --source string          filesystem path to read files relative from
	# -d, --destination string     filesystem path to write files to
	# -D, --buildDrafts            include content marked as draft
	# -F, --buildFuture            include content with publishdate in the future
	# -v, --verbose                verbose output
	yarn hugo -s site -d ../dist -D -F -v

clean:
	# We should clean the repo, because Netlify does not clean the repo
	# Options `-f -f` is not an error. See https://github.com/sogilis/Blog/pull/160#discussion_r422919097
	# Following is advised by GitLab CI https://docs.gitlab.com/ee/ci/yaml/#git-clean-flags
	git clean -f -f -d -x -e node_modules


# ==============================================================================
# Private target (used by other targets above, but no sens to use outside)
# ==============================================================================

_common:
	make clean
	yarn install --network-timeout 3000 --prefer-offline
	yarn lint
	yarn prettier:check
	# reboot.css
	cp ./node_modules/bootstrap-reboot/dist/reboot.min.css* ./site/themes/sogilis/assets/css/
	# netlifh-cms
	cp ./node_modules/netlify-cms/dist/netlify-cms.js* ./site/static/admin/
	## fonts
	cp -R ./node_modules/typeface-montserrat ./site/themes/sogilis/static/css/typeface-montserrat
	cp -R ./node_modules/typeface-eb-garamond ./site/themes/sogilis/static/css/typeface-eb-garamond

_build_common:
	make _common

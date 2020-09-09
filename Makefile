.DEFAULT_GOAL := start

.PHONY: start start-netlify netlify-build netlify-build-preview clean _common _netlify-build-common

# ==============================================================================
# Run Netlify in watch mode
# ==============================================================================

start:
	make _common
	# -s, --source string          filesystem path to read files relative from
	# -v, --verbose                verbose output
	yarn hugo server -s site -v

# Target to test netlify-cms locally
start-netlify:
	make _common
	netlify-cms-proxy-server &
	sleep 3
	yarn start

# ==============================================================================
# Target used by Netlify
# ==============================================================================

# Target used by Netlify to build the prod version.
netlify-build:
	make _netlify-build-common
	# -s, --source string          filesystem path to read files relative from
	# -d, --destination string     filesystem path to write files to
	# -v, --verbose                verbose output
	yarn hugo -s site -d ../dist -v

# Target used by Netlify to build his preview
netlify-build-preview:
	make _netlify-build-common
	# -s, --source string          filesystem path to read files relative from
	# -d, --destination string     filesystem path to write files to
	# -D, --buildDrafts            include content marked as draft
	# -F, --buildFuture            include content with publishdate in the future
	# -v, --verbose                verbose output
	yarn hugo -s site -d ../dist -D -F -v

clean:
	# Remove untracked files (files referenced into `.gitignore` include),
	# but we exclude `node_modules`.
	# Following command is advised by GitLab CI, read:
	# https://docs.gitlab.com/ee/ci/yaml/#git-clean-flags
	git clean -f -f -d -x -e node_modules

# ==============================================================================
# Private target (used by other targets above, but no sens to use outside)
# ==============================================================================

_common:
	yarn install --network-timeout 3000 --prefer-offline
	# reboot.css
	rm -f ./site/themes/sogilis/assets/css/reboot.min.css
	cp ./node_modules/bootstrap-reboot/dist/reboot.min.css* ./site/themes/sogilis/assets/css/
	# fonts
	rm -rf ./site/themes/sogilis/static/css/typeface-montserrat
	cp -R ./node_modules/typeface-montserrat ./site/themes/sogilis/static/css/typeface-montserrat
	rm -rf ./site/themes/sogilis/static/css/typeface-eb-garamond
	cp -R ./node_modules/typeface-eb-garamond ./site/themes/sogilis/static/css/typeface-eb-garamond
	# COPY netlify-cms
	rm -f ./site/static/admin/netlify-cms.js*
	cp ./node_modules/netlify-cms/dist/netlify-cms.js* ./site/static/admin/
	# Remove Hugo temp files
	rm -rf site/resources/

_netlify-build-common:
	# TESTS to know if repo is clean for build
	# =========================================
# Test if we have unstaged changes is not a necessity
# (`git clean` does not checkout them) but it's a good practice.
	@if ! git diff --quiet --exit-code ; \
	then \
	  >&2 echo -e "\n\n\\033[4;31mERROR:" \
	    "You have changes not staged for commit" \
	    "(see them thanks \`git status')." \
	    "Use \`git add' to add changes into the git stagging area," \
	    "or remove this changes.\\033[0m\n\n" ; \
	  exit 10 ; \
	else \
	  echo -e '\nCool, you have no unstaged changes\n' ; \
	fi
# Following test is needed otherwise `git clean` remove also untracked files not
# added into (.gitignore).
	@if [[ "$$(git ls-files --others --exclude-standard | wc -l)" -gt 0 ]] ; \
	then \
	  >&2 echo -e "\n\n\\033[4;31mERROR:" \
	    "You have untracked files" \
	    "not added into '.gitignore' (see them thanks \`git status')." \
	    "Use \`git add' to add files into the git stagging area," \
	    "or remove this files.\\033[0m\n\n" ; \
	  exit 11 ; \
	else \
	  echo -e "\nCool, you have no untracked files not included" \
	    "into '.gitignore'\n" ; \
	fi
# We dont check if we have staged and not commited changes.
	make clean
	make _common
	yarn lint
	yarn prettier:check

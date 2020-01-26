#!/bin/bash
# -*- coding: UTF8 -*-

trap 'kill' HUP
trap 'kill' INT
trap 'kill' QUIT
trap 'finishError "$LINENO"' ERR
trap 'finish' EXIT
# Cannot be trapped
# trap 'kill' KILL
trap 'kill' TERM

set -euET

# shellcheck disable=SC2154
export PS4='
${debian_chroot:+($debian_chroot)}'\
'\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\] [\D{%T}] \$ '

declare -g -r URED="\\033[4;31m"
declare -g -r NC="\\033[0m"

declare -g DIR_TMP_CLONE_GIT="/tmp/one-click-hugo-cms/"

declare -g DIR_WORKING
DIR_WORKING="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P)/../"

close() {
    # "_" is the throwaway variable
    # sleep 2
    if [[ -e "${DIR_TMP_CLONE_GIT}" ]]
    then
        echo -e "\n\n ${URED} Info: ${NC}" \
            "The fat folder '${DIR_TMP_CLONE_GIT}' could be deleted." \
            "\n\n"
    fi
    read -r -t 1 -n 10000 _ || echo ""
    read -r -p "Press 'ENTER' to close"
}

finishError() {
    set +x
    1>&2 echo "In the script, error on line: '$1'"
    exit 2
    # Otherwise, all script it's executed
}

finish() {
    returnCode=$?

    set +x
    if [[ "${returnCode}" -gt 0 ]] ; then
        1>&2 echo -e "\\n\\n\\n${URED}ERROR" \
            "with code '${returnCode}'${NC}\\n\\n"
        close
    else
        echo -e "\\n\\n\\n""${URED}""SUCCESS""${NC}""\\n\\n"
        close
    fi
    echo -e "\n\n\n"
}

main () {
set -x

cd "${DIR_WORKING}"

# we can check for unstaged changes with:
git diff --exit-code 1> /dev/null

# not committed changes with:
git diff --cached --exit-code 1> /dev/null

git clone https://github.com/netlify-templates/one-click-hugo-cms "${DIR_TMP_CLONE_GIT}"

# I) do not upgrade all from the sample.
#   Lot of files from sample are not needed, or we have changed their content.
# II) site folder (warning, do not erase our work!)
# III) do not upgrade .git folder
# IV) do not delete folders created by us
rsync -rv --delete --exclude={\
".dependabot/",\
".github/",\
"bin/",\
".gitignore",\
".nvmrc",\
"CODE_OF_CONDUCT.md",\
"CONTRIBUTING.md",\
"LICENSE",\
"README.md",\
"config.toml",\
"netlify.toml",\
"renovate.json",\
"src/fonts/",\
\
"site/content/",\
"site/data/",\
"site/layouts/",\
"site/static/img/",\
"site/themes/",\
"site/config.toml",\
\
".git/",\
\
"node_modules/",\
"dist/",\
"scripts/",\
".dockerignore",\
".npmrc",\
"Dockerfile",\
"Makefile",\
} \
"${DIR_TMP_CLONE_GIT}" "${DIR_WORKING}"

yarn install

set +x
}

main

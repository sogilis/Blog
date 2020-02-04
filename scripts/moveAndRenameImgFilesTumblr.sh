#!/bin/bash
# -*- coding: UTF8 -*-

set -ex

cd "$( dirname "${BASH_SOURCE[0]}" )"/../
cd ./site/static/img/

while IFS= read -d '' -r file
do
    fileName="${file:9}"
    mv "${file}" "./"
    pushd ../../content/posts > /dev/null
    sed -i "s/img\/tumblr\/${fileName}/img\/${fileName}/g" ./*
    popd > /dev/null
done < <(find ./tumblr -type f -print0)

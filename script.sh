#!/bin/bash
# -*- coding: UTF8 -*-

set -ex

cd ./site/static/img/
while IFS= read -d '' -r file
do
    folderYear="${file:2:4}"
    folderMonth="${file:7:2}"
    fileName="${file:10}"
    newFileName="${folderYear}-${folderMonth}-${fileName}"
    mv "${file}" "./${newFileName}"
    pushd ../../content/posts > /dev/null
    sed -i "s/img\/${folderYear}\/${folderMonth}\/${fileName}/img\/${newFileName}/g" ./*
    popd > /dev/null
done < <(find ./ -mindepth 3 -maxdepth 4 -path "./tumblr/*" -prune -o -type f -print0)

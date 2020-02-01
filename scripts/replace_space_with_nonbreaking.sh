#!/bin/bash

function show_help()
{
	echo ""
	echo "USAGE : `basename $0` posts_path"
	echo "Replace all spaces that should be non-breaking spaces by them"
	echo "Example : `basename $0` ../site/content/posts"
}

if [ $# -ne 1 ]; then
	show_help
	exit 1;
else
	POSTS_PATH=$1
fi


for filename in "$POSTS_PATH"/*; do
	file -b $filename | grep "UTF-8" > /dev/null
	if [ $? -ne 0 ]; then
		echo "$filename is not UTF-8 encoded"
	else
		sed -i -E "s/ (\!|\?|:|;|«|»)($|[[:space:]]|"$'\xC2\xA0'")/"$'\xC2\xA0'"\1\2/g" $filename
	fi
done

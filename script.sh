#!/bin/bash
MD_FOLDER=/home/yann/Documents/Sogilis/Blog/site/content/posts
IMG_FOLDER=/home/yann/Documents/Sogilis/Blog/site/static/img

#### CLEANUP IMAGES

# ALL_IMAGES=$(find $IMG_FOLDER -type f)
# for IMAGE in $ALL_IMAGES
# do
#     echo "Image check : $IMAGE"
#     REGEXP_SED="s#.*/\(.*\..*\)#\1#"
#     IMAGE_NAME=$(echo $IMAGE | sed $REGEXP_SED)
#     RES=$(grep -R "$IMAGE_NAME" $MD_FOLDER)
#     if [[ -z $RES ]]
#     then
#         echo "Image not used : $IMAGE_NAME"
#         rm $IMAGE
#     fi   
# done

#### VERIFY THAT EVERYTHING IS STILL AVAILABLE

EXTENSIONS=$(find $IMG_FOLDER -type f | grep '\.[a-zA-Z]\+' | rev | cut -d '.' -f 1 | rev | sort | uniq)

echo $EXTENSIONS

for EXT in $EXTENSIONS
do
    REGEXP_SED="s#.*/\([^:]*\.$EXT\).*#\1#"
    FILES=$(grep -R ".$EXT" $MD_FOLDER | grep -v http | sed $REGEXP_SED)
    for FILE in $FILES
    do
        if [[ -z $(find $IMG_FOLDER -type f -name "$FILE") ]]
        then
            echo "File not found : $FILE"
        fi    
    done
done

#### USED ONCE TO CORRECT MD FILES
# replace (blabla)[blabla] by [blabla](blabla) : sed -i "s/(\([^)]*\))\[\([^]]*\)\]/\[\1\](\2)/" => run it several times cause it 
# will replace only one occurence per line (if a line gets 5 occurences, need to run it 5 times ...)
# change img URL : sed -i "s#http://sogilis.com/wp-content/uploads#/img#"
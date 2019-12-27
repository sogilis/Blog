# This script needs to be run inside this directory with
# python3 fix_internal_deadlinks.py

import fileinput
import os
import re

postsPath = '../site/content/posts'
posts = os.listdir(postsPath)

for p in posts:
    with fileinput.input(files=(os.path.join(postsPath, p)), inplace=True) as postFile:
        for line in postFile:
            substitution = False
            for potentialLink in posts:
                if 'blog/' + potentialLink[11:-3] + '/' in line: 
                    before = 'http://sogilis.com/blog/' + potentialLink[11:-3]
                    after = 'https://blog.sogilis.com/posts/' + potentialLink[:-3]
                    print(re.sub(before, after, line))
                    substitution = True
                    break
            if not substitution:
                print(line, end="")

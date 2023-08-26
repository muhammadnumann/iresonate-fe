#!/bin/sh
RED="\033[1;31m"
NOCOLOR="\033[0m"
path=$(pwd)
dire=$(grep -l -r "ngrok" $path --exclude='*.sh' --exclude-dir=node_modules)
echo "${RED}$dire${NOCOLOR}"
num=$(grep -l -r "ngrok" $path --exclude='*.sh' --exclude-dir=node_modules | wc -l)
if [ $num -gt 0  ]
then
        echo "${RED}You have NgRock link in your system pls check${NOCOLOR} "
        exit 1
fi
direc=$(grep -l -r "<<<<<<< HEAD" $path --exclude='*.sh' --exclude-dir=node_modules)
echo "${RED}$direc${NOCOLOR}"
num1=$(grep -l -r "<<<<<<< HEAD" $path --exclude='*.sh' --exclude-dir=node_modules | wc -l)
if [ $num1 -gt 0  ]
then
        echo "${RED}You have Conflicts${NOCOLOR} "
        exit 1
fi

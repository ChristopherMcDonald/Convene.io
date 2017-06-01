#!/bin/bash

NAME=$1
JS=".js"
SCSS=".scss"
TEST=".test.js"

mkdir ./../src/components/$NAME
touch ./../src/components/$NAME/$NAME$JS
touch ./../src/components/$NAME/$NAME$SCSS
touch ./../src/components/$NAME/$NAME$TEST


#!/bin/bash

NAME=$1
JS=".js"
SCSS=".scss"
TEST=".test.js"
CSS=".css"

mkdir ./../src/components/$NAME
touch ./../src/components/$NAME/$NAME$JS
touch ./../src/components/$NAME/$NAME$SCSS
touch ./../src/components/$NAME/$NAME$CSS
touch ./../src/components/$NAME/$NAME$TEST


(
echo "import React, { Component } from 'react';"
echo "import './"$NAME".css';"
echo
echo "class "$NAME" extends Component {"
echo "    render() {"
echo "        return <div className='"$NAME"'></div>;"
echo "    }"
echo "}"
echo
echo "export default "$NAME";"
)>./../src/components/$NAME/$NAME$JS

echo "@import \"../../styles/base\";" > ./../src/components/$NAME/$NAME$SCSS

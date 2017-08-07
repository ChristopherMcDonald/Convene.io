# Convene.io
A Meeting Application to streamline processes and increase productivity

## How To Get Around
- app/ contains all the code used to make this application
- doc/ contains all the documentation for this application

## Dependencies
- Mongo Server, with a `convene` database
- Gulp CLI, run `npm install -g gulp`

## How to run Convene.io
Follow these instructions:  
- `git clone https://github.com/ChristopherMcDonald/Convene.io.git`
- `cd Convene.io/app/`
- *For active deploys*: `git checkout develop`
- *For last release*: `git checkout master`
- `npm install`
- Grab coffee...
- `mongod`
- `gulp styles && npm run server && npm start`

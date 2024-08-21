#! /bin/sh

if [ ! -d "./node_modules" ]; then
    npm install
fi

modernizr -c modernizr-config.json -d public/modernizr.js

npm run dev

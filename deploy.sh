#! /bin/bash
git pull origin master
webpack --config webpack.config.js
pm2 restart 0

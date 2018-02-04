#! /bin/bash
git pull origin master
yarn build
pm2 restart 0

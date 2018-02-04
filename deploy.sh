#! /bin/bash
pm2 stop 0
git pull origin master
cd app && yarn && yarn build && cd -
cd server && yarn 
pm2 start 0

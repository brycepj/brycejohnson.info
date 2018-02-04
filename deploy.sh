#! /bin/bash
echo "Stopping pm2..."
pm2 stop 0
echo "Pulling latest from master..."
git pull origin master
echo "Installing frontend dependencies and building for production"
cd app && yarn && yarn build && cd -
echo "Updating server-side dependencies..."
cd server && yarn
echo "Restarting pm2"
pm2 start 0

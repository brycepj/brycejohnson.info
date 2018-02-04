#! /bin/bash
echo "Pulling latest from master..."
git pull origin master
echo "Installing frontend dependencies and building for production"
cd app && yarn && yarn build && cd -
echo "Updating server-side dependencies..."
cd server && yarn
echo "Restarting pm2"
pm2 restart 0

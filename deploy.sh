#! /bin/bash

echo "Pulling latest from master..."
git pull origin master

echo "Installing frontend dependencies and building for production"

echo "Building static blog files..."
cd blog && bundle && bundle exec jekyll build

echo "Preparing to restart server"
cd ../server && yarn install --force

echo "Restart server..."
pm2 start server.js --name 'brycejohnson.info'


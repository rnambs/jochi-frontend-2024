#!/bin/bash

echo ' Taking latest pull'
git pull

echo 'creating new build'
npm run build

echo 'Restarting server'
pm2 restart JochiFrontEnd

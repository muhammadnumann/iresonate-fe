#!/bin/bash
set -e
cd /var/www/gify.dev.webelight.co.in
source /home/webelight/.nvm/nvm.sh
sudo rm -rf node_modules
sudo rm -rf yarn.lock
unzip out.zip
yarn install

echo "Building yarn next"
yarn next build
echo "yarn next build-Finished"
pm2 describe gify > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start ecosystem.dev.config.js
else
  pm2 delete gify
  pm2 start ecosystem.dev.config.js
fi;
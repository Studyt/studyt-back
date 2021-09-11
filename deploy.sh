#!/bin/sh
cd ~/studyt-back
sudo systemctl restart nginx
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
npm i -g forever
forever stopall
forever start dist/main.js
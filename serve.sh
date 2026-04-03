#!/bin/bash
export PATH="/Users/sinseungju/.nvm/versions/node/v18.20.5/bin:$PATH"
cd "$(dirname "$0")"
npx serve . -l 3000 --no-clipboard

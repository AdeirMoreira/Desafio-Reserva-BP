#!/bin/bash

export TERM=xterm-256color

echo "CONTAINER DA API ESTA DE PÉ"

npm i
npm run typeorm:run
npm run dev

# tail -f /dev/null
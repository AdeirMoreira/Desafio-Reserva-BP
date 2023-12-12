#!/bin/bash

export TERM=xterm-256color

echo "CONTAINER DO VUE ESTA DE PÉ"

# Instala as dependências
npm install

# Build do projeto
npm run build

# Iniciar o servidor de desenvolvimento (npm run dev)
npm run dev 
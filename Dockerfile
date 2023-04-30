FROM node:20-alpine

RUN apk update && apk add git autoconf make automake pkgconfig libtool g++ libjpeg-turbo-dev libpng-dev nasm build-base

RUN npm install -g npm@9.6.5

WORKDIR /app

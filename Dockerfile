FROM node:20-alpine

RUN apk update && apk add git autoconf make automake pkgconfig libtool g++ libjpeg-turbo-dev libpng-dev nasm build-base

RUN npm install -g npm@9.8.1

WORKDIR /app

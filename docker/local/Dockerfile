FROM node:22-alpine

RUN apk update && apk add git autoconf make automake pkgconfig libtool g++ libjpeg-turbo-dev libpng-dev nasm build-base python3

RUN npm install -g \
    npm-check-updates \
    modernizr \
    npm@10

WORKDIR /app

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

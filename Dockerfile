FROM node:10.6-alpine

ENV HUGO_VERSION='0.59.1'   # Warning: should match netlify.oml
ENV HUGO_NAME="hugo_extended_${HUGO_VERSION}_Linux-64bit"
ENV HUGO_BASE_URL="https://github.com/gohugoio/hugo/releases/download"
ENV HUGO_URL="${HUGO_BASE_URL}/v${HUGO_VERSION}/${HUGO_NAME}.tar.gz"

WORKDIR /blog

# libxxx are required by extended edition of Hugo
RUN apk add --no-cache \
    asciidoctor \
    wget \
    libc6-compat \
    libstdc++

RUN mkdir ./bin/ && \
    wget -qO- "${HUGO_URL}" | tar xvz -C ./bin/ && \
    mv ./bin/hugo bin/hugo.linux && \
    chmod a+x ./bin/hugo.linux && \
    ln /blog/bin/hugo.linux /usr/local/bin/hugo

COPY site site
COPY src src
COPY .*rc ./
COPY netlify.toml netlify.toml
COPY renovate.json renovate.json
COPY package*.json  ./
COPY gulpfile.babel.js gulpfile.babel.js
COPY webpack.conf.js webpack.conf.js
COPY yarn.lock yarn.lock

RUN yarn install

EXPOSE 3000
CMD yarn start

FROM node:10.6-alpine

WORKDIR /blog

RUN apk add --no-cache asciidoctor wget

COPY ./bin/hugo.linux /bin/hugo
COPY site site
COPY src src
COPY .*rc ./
COPY netlify.toml netlify.toml
COPY renovate.json renovate.json
COPY package*.json  ./
COPY gulpfile.babel.js gulpfile.babel.js
COPY webpack.conf.js webpack.conf.js
COPY yarn.lock yarn.lock

RUN npm install

EXPOSE 3000
CMD npm start
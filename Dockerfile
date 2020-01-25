FROM node:12-alpine

WORKDIR /blog

# libxxx are required by extended edition of Hugo
RUN apk add --no-cache \
    libc6-compat \
    libstdc++

# Some file are ignored
# See ./.dockerignore
COPY . ./

RUN yarn install

EXPOSE 3000

# We should add `--host 0.0.0.0` cause of the webpack sever
# See https://github.com/webpack/webpack-dev-server/issues/547
CMD yarn run-p "start:webpack --host 0.0.0.0" "start:hugo"

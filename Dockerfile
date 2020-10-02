FROM node:12-alpine

WORKDIR /blog

# libxxx are required by extended edition of Hugo
RUN apk add --no-cache \
    libc6-compat \
    libstdc++ \
    make \
    git

# Some file are ignored
# See ./.dockerignore
COPY . ./

RUN yarn install

EXPOSE 1313

CMD make start

FROM alpine
RUN mkdir /home/hugo
RUN apk add --no-cache asciidoctor wget

RUN wget -nv https://github.com/gohugoio/hugo/releases/download/v0.54.0/hugo_0.54.0_Linux-64bit.tar.gz -P /home/hugo
RUN tar -xf /home/hugo/hugo_0.54.0_Linux-64bit.tar.gz -C /home/hugo
RUN mv /home/hugo/hugo /bin
RUN mkdir /blog
WORKDIR /blog
EXPOSE 1313

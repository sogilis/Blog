IMAGE_NAME:=blog/hugoasciidoc
CONTAINER_NAME:=sogilis_blog

build:
	docker build -t $(IMAGE_NAME) .

start:
	docker run -d -t -p 3000:3000 \
		-v $(CURDIR)/site:/blog/site \
		-v $(CURDIR)/src:/blog/src \
		--rm --name $(CONTAINER_NAME) $(IMAGE_NAME)

run-generation:
	docker exec -it $(CONTAINER_NAME) npm run build

stop:
	docker stop $(CONTAINER_NAME)

remove:
	docker rm $(IMAGE_NAME)

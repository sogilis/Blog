IMAGE_NAME:=blog/hugoasciidoc
CONTAINER_NAME:=sogilis_blog

build-image:
	docker build -t $(IMAGE_NAME) .

start-image:
	docker run -d -t -p 3000:3000 --rm --name $(CONTAINER_NAME) $(IMAGE_NAME)

start-debug-image:
	docker run -d -t -p 3000:3000 -v $(CURDIR)/:/blog --rm --name $(CONTAINER_NAME) $(IMAGE_NAME)

run-debug-server:
	docker exec -it $(CONTAINER_NAME) npm start

run-generation:
	docker exec -it $(CONTAINER_NAME) npm run build

stop-image:
	docker stop $(CONTAINER_NAME)

remove-image:
	docker rm $(IMAGE_NAME)

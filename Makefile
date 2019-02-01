IMAGE_NAME:=blog/hugoasciidoc
CONTAINER_NAME:=sogilis_blog

build-image:
	docker build -t $(IMAGE_NAME) .

start-image:
	docker run -d -t -p 1313:1313 -v $(CURDIR)/blog_sogilis:/blog --rm --name $(CONTAINER_NAME) $(IMAGE_NAME)

run-debug-server:
	docker exec -it $(CONTAINER_NAME) hugo server -D -b http://localhost:1313 --bind=0.0.0.0

run-generation:
	docker exec -it $(CONTAINER_NAME) hugo

stop-image:
	docker stop $(CONTAINER_NAME)

remove-image:
	docker rm $(IMAGE_NAME)

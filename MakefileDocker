IMAGE_NAME:=blog/hugoasciidoc
CONTAINER_NAME:=sogilis_blog

build:
	docker build -t $(IMAGE_NAME) .

start:
	docker run -d -t -p 1313:1313 \
		--mount type=bind,src=$(CURDIR)/site,dst=/blog/site,consistency=cached \
		--rm --name $(CONTAINER_NAME) $(IMAGE_NAME)
	@echo "Blog will be available at http://localhost:1313 in a few seconds..."
	@echo "(run 'make logs' to show logs)"

logs:
	docker logs -f $(CONTAINER_NAME)

run-generation:
	docker exec -it $(CONTAINER_NAME) yarn run build

stop:
	docker stop $(CONTAINER_NAME)

remove:
	docker rm $(IMAGE_NAME)

IMAGE_NAME:=blog/hugoasciidoc
CONTAINER_NAME:=sogilis_blog

build:
	docker build -t $(IMAGE_NAME) .

start:
	docker run -d -t -p 3000:3000 \
		--mount type=bind,src=$(CURDIR)/site,dst=/blog/site,consistency=cached \
		--mount type=bind,src=$(CURDIR)/src,dst=/blog/src,consistency=cached \
		--rm --name $(CONTAINER_NAME) $(IMAGE_NAME)
	@echo "Blog will be available at http://localhot:3000 in a view seconds..."
	@echo "(run 'make logs' to show logs)"

logs:
	docker logs -f $(CONTAINER_NAME)

run-generation:
	docker exec -it $(CONTAINER_NAME) yarn run build

stop:
	docker stop $(CONTAINER_NAME)

remove:
	docker rm $(IMAGE_NAME)

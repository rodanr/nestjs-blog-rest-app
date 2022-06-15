## A simple blog rest api made using nestjs

### Operations supported

* GET: `/`
* GET: `/:id`
* POST: `/`
* PATCH: `/:id`
* DELETE: `/:id`
#### Send the json body for post and patch as:
```json
{
	"title":"title-string",
	"description": "description-string",
	"author": "author-name-string"
}
```

### Schema
`id:number`
`title:string` 
`description:string` 
`author:string` 
`createdOn:Date` 
`lastUpdatedOn:Date`
> Schema for the app is specified in the `./src/model/blog.model.ts` file

#### Self Notes
* This app uses the root module for service and controller implementation for rest operations without creating separate module
* For database typeorm is used with postgres being setup using docker which specification is provided by `docker-compose.yml`
* use the below command to fire up docker
	```bash 
	docker compose up -d 
	```
* If docker throws an error of *port already being used* then follow these steps
	1. List the docker containers currently active
	```bash
	docker container ls 
	```
	2. Remove the docker container currently running to free the ports
	```bash
	docker rm -f <CONTAINER ID>
	```
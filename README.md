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
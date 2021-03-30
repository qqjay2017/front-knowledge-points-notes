


[dotenv](https://www.npmjs.com/package/dotenv)


[cross-env](https://www.npmjs.com/package/cross-env)


```
npm i @koa/router
```

[cross-env](https://www.npmjs.com/package/koa-router)


[body-parser](https://www.npmjs.com/package/koa-bodyparser)


[mysql2](https://www.npmjs.com/package/mysql2)



####  控制器方法

```
Method	Path	Route Name	Controller.Action

GET	/posts	posts	app.controllers.posts.index
GET	/posts/new	new_post	app.controllers.posts.new
GET	/posts/:id	post	app.controllers.posts.show
GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
POST	/posts	posts	app.controllers.posts.create
PUT	/posts/:id	post	app.controllers.posts.update
DELETE	/posts/:id	post	app.controllers.posts.destroy

```


## sql语句

1. 创建用户表

```sql
CREATE TABLE IF NOT EXISTS `users` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(30) NOT NULL UNIQUE,
	`password` VARCHAR(50) NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```



[dotenv](https://www.npmjs.com/package/dotenv)


[cross-env](https://www.npmjs.com/package/cross-env)


```
npm i @koa/router
```

[cross-env](https://www.npmjs.com/package/koa-router)


[body-parser](https://www.npmjs.com/package/koa-bodyparser)


[mysql2](https://www.npmjs.com/package/mysql2)

[http-errors](https://github.com/jshttp/http-errors)



####  控制器方法

```
Method	Path	Route Name	Controller.Action

GET	/posts	posts	app.controllers.posts.index
GET	/posts/new	new_post	new
GET	/posts/:id	post	show
GET	/posts/:id/edit	edit_post	edit
POST	/posts	posts	create
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


## http 错误状态

```
400	BadRequest
401	Unauthorized
402	PaymentRequired
403	Forbidden
404	NotFound
405	MethodNotAllowed
406	NotAcceptable
407	ProxyAuthenticationRequired
408	RequestTimeout
409	Conflict
410	Gone
411	LengthRequired
412	PreconditionFailed
413	PayloadTooLarge
414	URITooLong
415	UnsupportedMediaType
416	RangeNotSatisfiable
417	ExpectationFailed
418	ImATeapot
421	MisdirectedRequest
422	UnprocessableEntity
423	Locked
424	FailedDependency
425	UnorderedCollection
426	UpgradeRequired
428	PreconditionRequired
429	TooManyRequests
431	RequestHeaderFieldsTooLarge
451	UnavailableForLegalReasons
500	InternalServerError
501	NotImplemented
502	BadGateway
503	ServiceUnavailable
504	GatewayTimeout
505	HTTPVersionNotSupported
506	VariantAlsoNegotiates
507	InsufficientStorage
508	LoopDetected
509	BandwidthLimitExceeded
510	NotExtended
511	NetworkAuthenticationRequired
```

## 用户密码


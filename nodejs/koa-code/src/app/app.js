require('./config')
require('./database')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const httpErrorHandle = require('./http-error-handle')



const app = new Koa()

const userRouter = require('../router/users.router');
const ErrorType = require('../constants/error-type');

app.use(bodyParser())


app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


app.on(ErrorType.HTTP_ERROR, httpErrorHandle)


module.exports = app






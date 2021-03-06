require('./config')
require('./database')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const httpErrorHandle = require('./http-error-handle')



const app = new Koa()

const userRouter = require('../router/users.router');
const authRouter = require('../router/auth.router')
const ErrorType = require('../constants/error-type');

app.use(bodyParser())

const useRoutes = require('../router/index')
useRoutes(app)

app.on(ErrorType.HTTP_ERROR, httpErrorHandle)


module.exports = app






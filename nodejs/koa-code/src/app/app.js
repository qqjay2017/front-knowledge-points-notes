require('./config')
require('./database')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
 

const app = new Koa()

const userRouter = require('../router/users.router')

app.use(bodyParser())


app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


module.exports = app






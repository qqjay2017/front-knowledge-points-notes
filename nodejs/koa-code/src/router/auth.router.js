const Router = require('koa-router');

const { login } = require('../controller/auth.controller')
const { verifyUserBody } = require('../middleware/auth.middleware');
const { handlePassword } = require('../middleware/user.middleware');




const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/login', verifyUserBody, handlePassword,login)



module.exports = authRouter;
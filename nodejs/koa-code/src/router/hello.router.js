const Router = require('koa-router');


const router = new Router({ prefix: '/' })


router.post('/', async (ctx, next) => {

    ctx.body = 'hello'

})



module.exports = router;
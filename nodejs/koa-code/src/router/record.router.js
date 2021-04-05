const Router = require('koa-router');


const router = new Router({ prefix: '/record' })


router.post('/', async (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = 'hello'

})


module.exports = router;
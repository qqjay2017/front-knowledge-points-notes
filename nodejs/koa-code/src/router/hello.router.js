const Router = require('koa-router');


const router = new Router({ prefix: '/' })

const sleep = (timeOut, data) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(data)
        }, timeOut)
    })
}

router.get('/', async (ctx, next) => {
    ctx.body = 'hello'

})



module.exports = router;
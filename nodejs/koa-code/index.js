const koa = require('koa')
const app = new koa()

app.use(async (ctx, next) => {
    const start = new Date;
    console.log(1)
    await next();
    const ms = new Date - start;
    console.log(6, ms)
    ctx.set('X-Response-Time', ms)
    console.log(ms, 'ms')
})

app.use(async (ctx, next) => {
    console.log(2)
    await next();
    console.log(5)
    if (!ctx.body) {
        return
    }
    ctx.set('X-Content-Length', ctx.body.length)
})


app.use(async (ctx, next) => {
    console.log(3)
    await next()
    console.log(4)
    ctx.body = 'Hello World'
})

app.use(async(ctx,next)=>{
    console.log('4ctx')
})

app.listen(3000)
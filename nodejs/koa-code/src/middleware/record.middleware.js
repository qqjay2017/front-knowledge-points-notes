const ErrorType = require("../constants/error-type");

const formatData = async (ctx,next)=>{
    let body = ctx.request.body
    if(!body.title){
        body.title = ''
    }
    if(!body.record){
        body.record = ''
    }
    if(!body.address){
        ctx.app.emit(ErrorType.HTTP_ERROR,{
            status:500,
            message:'定位不能为空'
        },ctx)
    }

    if(!body.userId){
        ctx.app.emit(ErrorType.HTTP_ERROR,{
            status:500,
            message:'用户不能为空'
        },ctx)
    }
    await  next()
}

const recordMiddleware = {
    formatData
}

module.exports = recordMiddleware
const verifyValueNotNull = require("../utils/verifyValueNotNull")


const verifyUserBody =async (ctx,next)=>{
    const { name , password} = ctx.request.body
    verifyValueNotNull(ctx,{
        name,
        password
    })
    
    await next()

}

const verifyUserHeader = async (ctx, next)=>{
  const userId =   ctx.headers['user-id'];
  if(!userId){
      return  ctx.app.emit(ErrorType.HTTP_ERROR,{
          status:403,
          message:'未登录'
      },ctx)
  }
  await  next()
}

module.exports = {
    verifyUserBody,
    verifyUserHeader
}
const verifyValueNotNull = require("../utils/verifyValueNotNull")


const verifyUserBody =async (ctx,next)=>{
    const { name , password} = ctx.request.body
    verifyValueNotNull(ctx,{
        name,
        password
    })
    
    await next()

}

module.exports = {
    verifyUserBody
}
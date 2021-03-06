
const jwt = require('jsonwebtoken');
const ErrorType = require('../constants/error-type');
const UserService = require('../service/user.service')

const { PUBLIC_KEY  } = require('../app/config')

class UserController {
    async create(ctx, next) {
        const authorization = ctx.headers.authorization;
        const token = authorization.replace('Bearer ', '')

        try{
            const decoded =  jwt.verify(token, PUBLIC_KEY,{
                algorithms:["RS256"]
            })
            console.log(decoded)
        }catch(error){
            ctx.app.emit(ErrorType.HTTP_ERROR,{
                status:403,
                message:'用户token过期'
            },ctx)
        }
     
        console.log(ctx.user)
        const result = await UserService.create(ctx.request.body)
        ctx.body = result
    }
}

module.exports = new UserController()
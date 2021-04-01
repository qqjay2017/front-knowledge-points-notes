const { HttpStatus } = require('@nestjs/common');
const jwt = require('jsonwebtoken');
const ErrorType = require('../constants/error-type');
const UserService = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        const authorization = ctx.headers.authorization;
        const token = authorization.replace('Bearer ', '')

        try{
            const decoded =  jwt.verify(token, 'hhhhh')
            console.log(decoded)
        }catch(error){
            ctx.app.emit(ErrorType.HTTP_ERROR,{
                status:HttpStatus.FORBIDDEN,
                message:'用户token过期'
            },ctx)
        }
     

        const result = await UserService.create(ctx.request.body)
        ctx.body = result
    }
}

module.exports = new UserController()
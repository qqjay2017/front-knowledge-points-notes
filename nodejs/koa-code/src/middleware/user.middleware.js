const { HttpStatus } = require('@nestjs/common');
const ErrorType = require('../constants/error-type')
const UserService = require('../service/user.service')

const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body;

    if (!name || !password || !name.length || !password.length) {

        return ctx.app.emit(ErrorType.HTTP_ERROR,
            {
                status: HttpStatus.PAYMENT_REQUIRED,
                message: '用户名或者密码不能为空~'
            },
            ctx)
    }
    const [hasUser] =   await UserService.show({
        name
    },1)

    if(hasUser && hasUser.length){
        return ctx.app.emit(ErrorType.HTTP_ERROR,
            {
                status: HttpStatus.CONFLICT,
                message: '用户已存在~'
            },
            ctx)
    }
    

    await next()
}


module.exports = {
    verifyUser
}
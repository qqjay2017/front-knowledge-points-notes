const { HttpStatus } = require('@nestjs/common');
const ErrorType = require('../constants/error-type')
const UserService = require('../service/user.service');
const { md5PasswordSign } = require('../utils/password-handle');
const verifyValueNotNull = require('../utils/verifyValueNotNull')

const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body;

    verifyValueNotNull(ctx,{name, password})
    const [hasUser] = await UserService.show({
        name
    }, 1)

    if (hasUser && hasUser.length) {
        return ctx.app.emit(ErrorType.HTTP_ERROR,
            {
                status: HttpStatus.CONFLICT,
                message: '用户已存在~'
            },
            ctx)
    }


    await next()
}

const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const md5Password = md5PasswordSign(password)
    ctx.request.body.password = md5Password;

    await next()
}


module.exports = {
    verifyUser,
    handlePassword
}
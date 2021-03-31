const { HttpStatus } = require("@nestjs/common");
const ErrorType = require("../constants/error-type");
const userService = require("../service/user.service");


class AuthController {
    async login(ctx, next) {
        const { name, password } = ctx.request.body;
        const [hasUser] = await userService.show({
            name, password
        }, 1)

        if (!hasUser || !hasUser.length) {
            return ctx.app.emit(ErrorType.HTTP_ERROR, {
                status: HttpStatus.UNAUTHORIZED,
                message: `用户名称或者密码错误~`
            }, ctx)

        }


        ctx.body = '登录成功'

        await next()
    }
}

module.exports = new AuthController()
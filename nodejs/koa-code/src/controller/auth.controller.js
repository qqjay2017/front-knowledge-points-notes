const { HttpStatus } = require("@nestjs/common");
const ErrorType = require("../constants/error-type");
const userService = require("../service/user.service");
const jwt = require('jsonwebtoken');

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

        const token  = jwt.sign({ name , password }, 'hhhhh',{
            expiresIn: 60 // s
        });
        

        ctx.body = {
            code:200,
            token:'Bearer '+token
        }

        await next()
    }
}

module.exports = new AuthController()
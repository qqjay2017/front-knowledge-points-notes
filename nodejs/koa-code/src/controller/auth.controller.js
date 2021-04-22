
const ErrorType = require("../constants/error-type");
const userService = require("../service/user.service");
const jwt = require('jsonwebtoken');

const { PRIVATE_KEY} = require('../app/config')

class AuthController {
    async login(ctx, next) {
        const { name, password } = ctx.request.body;
        const [hasUser] = await userService.show({
            name, password
        }, 1)

        

        if (!hasUser || !hasUser.length) {
            return ctx.app.emit(ErrorType.HTTP_ERROR, {
                status: 401,
                message: `用户名称或者密码错误~`
            }, ctx)

        }

        const token  = jwt.sign({ name , password }, PRIVATE_KEY,{
            expiresIn: 60 * 60 ,// s
            algorithm:'RS256' // 非对称算法
        });
        ctx.user = {
            name,
            id:hasUser[0].id
        }

        ctx.body = {
            code:200,
            token:'Bearer '+token,
            name,
            id:hasUser[0].id
        }

        await next()
    }
}

module.exports = new AuthController()
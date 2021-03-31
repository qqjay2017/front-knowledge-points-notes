const   UserService = require('../service/user.service')

class UserController {
    async create(ctx, next) {
            console.log('进控制器')
        const result = await UserService.create(ctx.request.body)
        ctx.body = result
    }
}

module.exports = new UserController()
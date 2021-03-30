const   UserService = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        const result = await UserService.create(ctx.request.body)
        ctx.body = result
    }
}

module.exports = new UserController()
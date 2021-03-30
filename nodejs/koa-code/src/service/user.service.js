class UserService {
    async create(user) {
        console.log(user,'创建用户')
    }
}

module.exports =new UserService()
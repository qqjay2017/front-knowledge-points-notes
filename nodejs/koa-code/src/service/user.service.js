const connection = require('../app/database')
class UserService {
    async create(user) {
        const statement = `
            INSERT INTO users (name,password) VALUES (? , ? );
        `
        const results = await connection.execute(statement, [user.name, user.password])

        return results

    }
}

module.exports = new UserService()
const connection = require('../app/database')
class UserService {
    async create(user) {
        const statement = `
            INSERT INTO users (name,password) VALUES (? , ? );
        `
        const results = await connection.execute(statement, [user.name, user.password])

        return results

    }

    async show({ name, id ,password},limit) {
        let baseSql = `select id , name  FROM users WHERE 1=1 `
        let values = []

        if (name && name != null) {
            baseSql += `AND name = ? `;
            values.push(name)
        }
        if (id && id != null) {
            baseSql += `AND id = ? `
            values.push(id)
        }
        if (password && password != null) {
            baseSql += `AND password = ? `
            values.push(password)
        }

        if(limit){
            baseSql += `LIMIT ? `;
            values.push(limit+'')
        }
        const results = await connection.execute(baseSql+';', values)
        return results

    }
}

module.exports = new UserService()
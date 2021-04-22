const connection = require("../app/database");

class RecordService {

    async index(userId){
        const statement = `
        select  id,title,record,userId,address,createTime from Records where userId = ? order by createTime desc
        `

        const result = await connection.execute(statement,[
            userId
        ])


        return result[0]
    }

    async create (body) {
        const  {    title ,  record , userId , address} =body
        const statement = `
        INSERT INTO Records (title,record,userId,address) VALUES (? , ? , ? , ? );
        `
        const result = await connection.execute(statement,[
            title ,  record , userId , address
        ])
        return result[0]
    }
    async update(body){
        const  {    title ,  record , userId , address , recordId} =body
        const statement = `
        UPDATE  \`Records\` SET title= ? ,record= ? ,userId= ? ,address= ?  WHERE id = ?;
        `
        const result = await connection.execute(statement,[
            title ,  record , userId , address , recordId
        ])
        return result[0]

    }

   async destroy(recordId){
        const statement = `
            DELETE FROM Records WHERE id = ?
        `
        const result = await connection.execute(statement,[recordId])
       return result[0]
    }
}

const recordService = new RecordService()

module.exports = recordService
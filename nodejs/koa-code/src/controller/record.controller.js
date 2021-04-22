const recordService = require("../service/record.service");

class RecordController {

    async index(ctx){
        const userId = ctx.request.query.userId
     const result =    await recordService.index(  userId)
        ctx.body =  result
    }

    async create(ctx){
        const result =  await recordService.create(  ctx.request.body)
        ctx.body = result
    }

    async update(ctx){
        const recordId = ctx.params.recordId
        const result = await recordService.update({
            ...ctx.request.body,
            recordId
        })
        ctx.body = result
    }

    async destroy(ctx){
        const recordId = ctx.params.recordId
        const result = await recordService.destroy(recordId)
        ctx.body = result;
    }


}
const recordController = new  RecordController()
module.exports = recordController
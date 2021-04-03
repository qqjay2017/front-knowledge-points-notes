import {FastifyInstance} from "fastify";
import {FastifySchemaValidationError} from "fastify/types/schema";

function  setErrorHandler(app:FastifyInstance){
    app.setErrorHandler((error, request, reply)=>{
        console.log(error.message,'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        reply.status(409).send({
            message:error.message
        })
    })

}

export default  setErrorHandler
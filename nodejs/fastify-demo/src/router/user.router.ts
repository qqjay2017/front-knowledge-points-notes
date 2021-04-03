import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import userService from "../service/user.service";


class UserRouter {
    async index(request: FastifyRequest, reply: FastifyReply) {
        console.log(request.query,'request.query')
        const users = await userService.index()

        reply.send(users)
    }
}

const userRouter = new UserRouter()

export default (app: FastifyInstance) => {
    app.get('/', {
        schema:{
            querystring:{
                type: "object",
                properties:{
                    name:{
                        type:'number',

                    },
                    size:{
                        type:'number',
                        default:10
                    }
                },
                required:['name']
            }
        }
    },userRouter.index)
}
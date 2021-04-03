import {FastifyInstance} from "fastify";
import userRouter from "./user.router";

function registerRouter(app: FastifyInstance){
    userRouter(app)
}

export default registerRouter
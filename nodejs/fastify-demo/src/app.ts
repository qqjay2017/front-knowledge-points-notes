import fastify from 'fastify'
import {strict} from "assert";
import userRouter from "./router/user.router";
import registerRouter from "./router";
import errorHandler from "./utils/errorHandler";

const app = fastify({
    logger: {
        level: 'info',

    }
})

errorHandler(app)
registerRouter(app)




export default app;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
class UserRouter {
    async index(request, reply) {
        console.log(request.query, 'request.query');
        const users = await user_service_1.default.index();
        reply.send(users);
    }
}
const userRouter = new UserRouter();
exports.default = (app) => {
    app.get('/', {
        schema: {
            querystring: {
                type: "object",
                properties: {
                    name: {
                        type: 'number',
                    },
                    size: {
                        type: 'number',
                        default: 10
                    }
                },
                required: ['name']
            }
        }
    }, userRouter.index);
};
//# sourceMappingURL=user.router.js.map
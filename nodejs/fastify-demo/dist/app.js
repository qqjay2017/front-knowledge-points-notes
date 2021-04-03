"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const router_1 = __importDefault(require("./router"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const app = fastify_1.default({
    logger: {
        level: 'info',
    }
});
errorHandler_1.default(app);
router_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map
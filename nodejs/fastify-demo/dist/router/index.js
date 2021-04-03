"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = __importDefault(require("./user.router"));
function registerRouter(app) {
    user_router_1.default(app);
}
exports.default = registerRouter;
//# sourceMappingURL=index.js.map
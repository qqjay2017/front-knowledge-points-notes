"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { APP_PORT, NODE_ENV: APP_ENV } = process.env;
exports.default = {
    APP_PORT,
    APP_ENV,
};
//# sourceMappingURL=index.js.map
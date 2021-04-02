"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const APP_PORT = index_1.default.APP_PORT || 7001;
app_1.default.listen(index_1.default.APP_PORT || 7001, () => {
    console.log("  App is running at http://localhost:%d in %s mode", APP_PORT, index_1.default.APP_ENV);
    console.log("  Press CTRL-C to stop\n");
});
//# sourceMappingURL=server.js.map
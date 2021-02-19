"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
let win;
electron_1.app.on('ready', () => {
    win = new electron_1.BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true //允许使用node相关的
        }
    });
    if (electron_is_dev_1.default) {
        win.loadURL('http://localhost:3000'); //加载网址页面
    }
    else {
        //    发布版本加载文件页面,根据实际情况
    }
});
//# sourceMappingURL=main.js.map
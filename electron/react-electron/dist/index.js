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
    });
    console.log(electron_is_dev_1.default);
    if (electron_is_dev_1.default) {
        win.loadURL('http://localhost:8080');
    }
    else {
        // 线上模式, 用react打包的
        // win.loadFile('...')
    }
});

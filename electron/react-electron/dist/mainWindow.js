"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.create = void 0;
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const path_1 = require("path");
let win;
function create() {
    win = new electron_1.BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });
    if (electron_is_dev_1.default) {
        win.webContents.openDevTools(); //打开控制台
        win.loadURL('http://localhost:8080');
    }
    else {
        // 线上模式, 用react打包的
        win.loadFile(path_1.resolve(__dirname, '../render/dist-main/index.html'));
    }
    return win;
}
exports.create = create;
/**
 * 主线程推送 webContents.send
 * @param channel
 * @param args
 */
function send(channel, ...args) {
    win.webContents.send(channel, ...args);
}
exports.send = send;

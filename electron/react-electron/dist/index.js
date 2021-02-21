"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipc_1 = require("./ipc");
const mainWindow_1 = require("./mainWindow");
electron_1.app.on('ready', () => {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; // 关闭web安全警告
    ipc_1.ipcHandle();
    mainWindow_1.create();
});

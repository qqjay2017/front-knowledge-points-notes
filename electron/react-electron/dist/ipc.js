"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcHandle = void 0;
const electron_1 = require("electron");
const mainWindow_1 = require("./mainWindow");
const controlWindow_1 = require("./controlWindow");
function ipcHandle() {
    // ipcMain.handle 主线程响应渲染线程
    electron_1.ipcMain.handle('login', () => {
        let code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        console.log(code, '主线程生成的code');
        return code;
    });
    electron_1.ipcMain.on('control', (e, remoteCode) => {
        console.log('主线程收到请求');
        // 主线程开始推送状态
        mainWindow_1.send('control-state-change', remoteCode, 1);
        controlWindow_1.createControlWindow();
    });
}
exports.ipcHandle = ipcHandle;

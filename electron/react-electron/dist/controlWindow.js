"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createControlWindow = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
let win;
function createControlWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile(path_1.resolve(__dirname, '../render/control/index.html'));
}
exports.createControlWindow = createControlWindow;

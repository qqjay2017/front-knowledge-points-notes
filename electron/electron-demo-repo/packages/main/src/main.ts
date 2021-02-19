import { app, BrowserWindow } from 'electron'

import isDev from 'electron-is-dev'

let win;
app.on('ready', () => {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true//允许使用node相关的
        }
    })

    
    if (isDev) {
        win.loadURL('http://localhost:3000')//加载网址页面
    } else {
        //    发布版本加载文件页面,根据实际情况
    }
})
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
let win;

function create(){
    win = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; //消除控制台上报警文字

    if (isDev) {
        win.loadURL('http://localhost:3000') // 本地开发环境,加载vite的开发服务器
    } else {
        // 线上环境根据实际情况配置
    }
}


function send(channel,...args){
    win.webContents.send(channel,...args)
}
module.exports = {
    create,send
}
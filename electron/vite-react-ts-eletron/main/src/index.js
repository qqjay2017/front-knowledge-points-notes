// const { app } = require('electron')
// const {create:createMainWindow}=require('./windows/main')//创建一个主窗口
// const handleIPC=require('./ipc')//处理主进程的事务放在同一个文件
// app.on('ready',()=>{
//     handleIPC()
//     createMainWindow() //主窗口出现APP.js的页面
// })


const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
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

app.on('ready',()=>{
    create()
})
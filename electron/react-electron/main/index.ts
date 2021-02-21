import { app,BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
let win;
app.on('ready',()=>{
    win = new BrowserWindow({
        width:600,
        height:600,

    })
    console.log(isDev)
    if(isDev){
        win.loadURL('http://localhost:8080')
    }else {
        // 线上模式, 用react打包的
        // win.loadFile('...')
    }

})
import {app, BrowserWindow} from 'electron'
import isDev from 'electron-is-dev'
import {ipcHandle} from './ipc'
import {create} from './mainWindow'

app.on('ready', () => {


    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; // 关闭web安全警告
    ipcHandle()
    create()



})
import { ipcMain } from 'electron'
import {create, send} from './mainWindow'
import { createControlWindow } from './controlWindow'
export  function ipcHandle() {
    // ipcMain.handle 主线程响应渲染线程
    ipcMain.handle('login',()=>{
        let code=Math.floor(Math.random()*(999999-100000))+100000;
        console.log(code,'主线程生成的code')
        return code
    })

    ipcMain.on('control',(e,remoteCode)=>{
        console.log('主线程收到请求')
        // 主线程开始推送状态
        send('control-state-change',remoteCode,1)
        createControlWindow()
    })

}
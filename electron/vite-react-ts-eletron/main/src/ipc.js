const {ipcMain}=require('electron');//主进程
const {send:sendMainWindow}=require('./windows/main')//向主窗口发送信息
const {create:createControlWindow} =require('./windows/control')//创建新的窗口


module.exports=function(){
    ipcMain.handle('login',async ()=>{//主进程响应login
        //先mock，返回一个code
        let code=Math.floor(Math.random()*(999999-100000))+100000;
        console.log("login--data",code)
        return code;
    })
    ipcMain.on('control',async(e,remoteCode)=>{
        //这里跟服务端交互，但是mock返回
        sendMainWindow('control-state-change',remoteCode,1);
        createControlWindow()
    })
}
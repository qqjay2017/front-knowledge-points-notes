/**
 * 主线程文件
 */

 const { app ,BrowserWindow } = require('electron')
 const isDev = require('electron-is-dev')
 const path = require('path')
 const resolve =(p)=>path.resolve(__dirname,p)
 let win;
 app.on('ready',()=>{
     win = new BrowserWindow({
         width:600,
         height:600,
         webPreferences:{
             nodeIntegration:true
         }
     })
     if(isDev){
        win.loadURL('http://localhost:3000')
     }else{
        win.loadFile(resolve('../renderer/pages/control/index.html'))
     }
 })
### 渲染进程
react-electron/app/renderer/src/mian/src/App.js文件
```javascript
import React,{useState,useEffect} from 'react';//使用hooks
const {ipcRenderer}=window.require('electron')//引入渲染进程

function App() {
  const [remoteCode,setRemoteCode]=useState('');//控制的控制码
  const [localCode,setLocalCode]=useState('');//本身的控制码
  const [controlText,setControlText]=useState('');//控制码的文案
  const login = async()=>{
    //登录状态是在主进程维护，通过主进程来处理ipc事件
    console.log("111")
    let code=await ipcRenderer.invoke('login')
    console.log(setLocalCode(code))
    if(!code) {return  setLocalCode(code)}//本身控制码重新赋值
  };
  useEffect(()=>{
    login()
    ipcRenderer.on('control-state-change',handleControlState)//监听ipc事件，从主进程传过来的，说明现在的控制状态是否发生了改变
    return ()=>{
      //监听函数之后，最好清理掉这个函数(退出时)
      ipcRenderer.removeListener('control-state-change',handleControlState)
    }
  },[])
  const startControl=(remoteCode)=>{//发起一个请求，想去控制控制码对应的用户
    ipcRenderer.send('control',remoteCode)
  }
  const handleControlState=(e,name,type)=>{//状态文案的改变
    let text='';
    if(type === 1){
      //控制别人
      text=`正在远程控制${name}`
    }else if(type === 2){
      //被别人控制
      text=`被${name}控制`
    }
    setControlText(text)//当前页面的文本
  }
  return (
    <div className="App">
      {
        controlText === ''?<>
            <div>你的控制码{localCode}</div>
            <input type="text" value={remoteCode} onChange={e=>setRemoteCode(e.target.value)}/>
            <button onClick={()=>startControl(remoteCode)}>确认</button>
          </>:<div>{controlText}</div>
      }
    </div>
  );
}

export default App;
```
### 主进程
react-electron/app/main/index.js文件
```javascript
const {app}=require('electron');
const {create:createMainWindow}=require('./windows/main')//创建一个主窗口
const handleIPC=require('./ipc')//处理主进程的事务放在同一个文件
app.on('ready',()=>{
    handleIPC()
    createMainWindow()//主窗口出现APP.js的页面
})
```
新建react-electron/app/main/ipc.js文件
```javascript
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
```
新建react-electron/app/main/windows/main.js文件
```javascript
const {BrowserWindow}=require('electron');
const isDev=require('electron-is-dev');//判断是生产环境还是开发环境
const path=require('path')
let win;
function create(){
    win=new BrowserWindow({//创建一个窗口
        width:600,
        height:600,
        webPreferences:{//可以使用node相关的
            nodeIntegration:true
        }
    })

    if(isDev){
        win.loadURL('http://localhost:3000')
    }else{
        win.loadFile(path.resolve(__dirname,"../../renderer/pages/main/index.html"))
    }
}
function send(channel,...args){//接收信息
    win.webContents.send(channel,...args)
}
module.exports={create,send};
```
新建react-electron/app/main/windows/control.js文件
```javascript
//子窗口
const {BrowserWindow}=require('electron');
const path=require('path')
let win;
function create(){
    win=new BrowserWindow({
        width:800,
        height:800,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile(path.resolve(__dirname,"../../renderer/pages/control/index.html"))
}

module.exports={create};
```
react-electron/app/renderer/pages/control/index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>pages页面</h3>
</body>
</html>
```
### 进程回顾

- 渲染进程请求+主进程响应(获取自己的控制码)  ipcRenderer.invoke  ipcMain.handle
- 主进程推送(告知状态)    webContents.send  ipcRenderer.on
- 渲染进程发起请求(申请控制) ipcRenderer.send  ipcMain.on
### 如图所示：
[electron_1.mp4](https://img.zhufengpeixun.com/electron_1.mp4)



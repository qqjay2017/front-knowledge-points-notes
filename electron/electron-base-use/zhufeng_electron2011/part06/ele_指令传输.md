## 传输方式
- 通过信令服务
- 基于WebRTC的RTCDataChannel
1. 无服务端依赖，p2p传输
1. 基于SCTP(传输层，有TCP、UDP的优点)
- 这一节主要是控制指令传达到被控制端并且能够控制住
## 代码环节
react-electron/app/renderer/pages/control/controled.js文件
```javascript
//...
const pc=new window.RTCPeerConnection({});
const dc=pc.createDataChannel('robotchannel',{reliable:false});//允许一定数据的丢失
dc.onopen=function(){
  peer.on('robot',function(type,data){//监听robot事件发送数据
    dc.send(JSON.stringify({type,data}))
  })
}
dc.onmessage=function(e){//接收到控制端的消息
  console.log('message',e)
}
dc.onerror=function(e){//防止收到报错的消息
  console.log('error',e)
}

//....
```
react-electron/app/renderer/src/mian.src/controll.js文件
```javascript
//被控制端方面进行的回应，媒体流的监听
//...

const pc=new window.RTCPeerConnection({});
pc.ondatachannel=(e)=>{//监听datachannel事件跟上文代码相呼应
  // console.log("datachannel",e)
  e.channel.onmessage=(e)=>{
    const {type,data}=JSON.parse(e.data);//获取控制端robotjs数据
      if(type === 'mouse'){
        data.screen={
          width:window.screen.width,
          height:window.screen.height
        }
      }
      ipcRenderer.send('robot',type,data)
  }
}
//...
```
signal文件开启 `nodemon .\index.js` 开启服务后，三个控制台分别输入 `yarn start:render` 成功后开启 `yarn start:main`  `yarn start:main` 

控制码和被控制码输入后，出现视频如视频所示：

[electron_9.mp4](https://img.zhufengpeixun.com/electron_9.mp4)

视频中点击和键盘发挥作用。


在本地电脑开启的话，还是会出现画中画中画中画的作用。建议是有两个电脑开启成功后一个电脑当作控制端，另一个当被控制端。这样的话还是需要signal文件中index.js中需要修改下网址，不是本地开启的服务。
## 相关的代码补充

- 禁止多开：当用户点击启动应用时，如果已经有以前的应用就会会唤起以前的实例

- 窗口假关闭：用户点击关闭按钮的时候，应用只是隐藏，点击 `退出应用` 时才会真正关闭窗口

react-electron/app/main/index.js文件
```javascript
const {app}=require('electron');
const {create:createMainWindow,show:showMainWindow,close:closeMainWindow}=require('./windows/main')
const handleIPC=require('./ipc')
const robot=require('./robot')
const gotTheLock=app.requestSingleInstanceLock();//是否有别的进展
if(!gotTheLock){
    app.quit()
}else{
    app.on('second-instance',()=>{//当运行第二个实例的时候，就会开始主要窗口
        showMainWindow()
    })
}
app.allowRendererProcessReuse=false;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.on('ready',()=>{
    handleIPC()
    createMainWindow()
    robot()    
})
app.on('before-quit',()=>{//所有窗口触发close之后，才会触发before-quit并关闭所有窗口。
    closeMainWindow()
})
```
react-electron/app/main/windows/main.js文件
```javascript
const {BrowserWindow}=require('electron');
const isDev=require('electron-is-dev');//判断是生产环境还是开发环境
const path=require('path')
let win,winAll=false;
function create(){
    win=new BrowserWindow({
        width:600,
        height:600,
        // frame:false,//没有窗口
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.on('close',(e)=>{
        if(winAll){//是否是真正退出
            win=null
        }else{
            e.preventDefault()//禁止窗口的关闭
            win.hide()//窗口隐藏
        }
    });
    if(isDev){
        win.loadURL('http://localhost:3000')
    }else{
        win.loadFile(path.resolve(__dirname,"../../renderer/pages/main/index.html"))
    }
}
function send(channel,...args){
    win.webContents.send(channel,...args)
}
function show(){
    win.show()
}
function close(){
    winAll=true;//应用真正关闭
    win.close()
}
module.exports={create,send,close,show};
```
## 打包配置
electron打包生成exe文件，有两种方式：cmd窗口命令打包和package.json设置打包

- cmd窗口命令打包
```git
npm install electron-packager -g  //全局安装electron-packager安装包
在项目文件夹里继续执行命令:

electron-packager . zfele --platform=win32 --arch=x64 --icon=computer.ico --out=./out --asar --app-version=0.0.1 --overwrite --ignore=node_modules --electron-version 10.1.1

```
相关信息补充
```
zfele：你将要生成的exe文件的名称
--platform=win32：确定了你要构建哪个平台的应用,可取的值有 darwin, linux, mas, win32
--arch=x64：决定了使用 x86 还是 x64 还是两个架构都用
--icon=computer.ico：自定义设置应用图标
--out=./out：指定打包文件输出的文件夹位置,当前指定的为项目目录下的out文件夹
--asar：该参数可以不加，如果加上，打包之后应用的源码会以.asar格式存在,否则会以文件夹形式存在
--app-version=0.0.1：生成应用的版本号
--overwrite：覆盖原有的build,让新生成的包覆盖原来的包
--ignore=node_modules：如果加上该参数，项目里node_modules模块不会被打包进去
--electron-version 10.1.1：指定当前要构建的electron的版本,需要和当前的版本一致,具体可以在package.json文件中查看,可以不加该参数
```

- package.json设置打包

把打包的命令放在package.json文件里script中
```json
 "scripts": {"package":"electron-packager . zfele --platform=win32 --arch=x64 --icon=computer.ico --out=./out --asar --app-version=0.0.1 --overwrite --ignore=node_modules"
  }
```
在控制台上打印: `npm run package` 即可

- 打包后完成的效果

在out文件夹里有![image.png](https://img.zhufengpeixun.com/image_1.png)

即可安装成功。

electron实战只是展示了react和electron之间的使用，用上部分electron原生能力，更多的应用和实战在未来继续研究。。。

## 如何获取媒体流？
- navigation.mediaDevices.getUserMedia(MediaStreamConstraints) 返回的是Promise，成功后resolve回调一个 `MediaStream` 实例对象
- `MediaStreamConstraints` 是来描述获取什么样的媒体流，如音频、视频
## 如何捕获桌面/窗口流
1.desktopCapturer.getSources({types:['window','screen']})获取chromeMediaSourceld

- electron版本小于5.0是callback调用
- electron版本大于5.0是promise，返回的是chromeMediaSources列表，包含id、name、display_id等

2.通过navigation.mediaDevices.getUserMedia({
audio:false,
video:{
mandatory:{
chromMediaSource:'desktop',
width,
height,
...
}
}
}) 

## 获取桌面信息
为了方便直接出现控制页面的渲染，所以在主进程文件上进行修改
react-electron/app/main/index.js文件
```javascript
const {app}=require('electron');
// const {create:createMainWindow}=require('./windows/main')//创建一个主窗口
const handleIPC=require('./ipc')//处理主进程的事务放在同一个文件
const {create:createControlWindow}=require('./windows/control')//控制窗口渲染页面

app.on('ready',()=>{
    handleIPC()
    // createMainWindow()//主窗口出现APP.js的页面
    createControlWindow()
})
```
react-electron/app/renderer/pages/control/index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>control</title>
    <style>
        *{margin:0;padding:0}
        #screen-video{
            height: 100%;
            width: 100%;
            object-fit: fill;
        }

    </style>
</head>
<body>
    <h2><video id="screen-video"></video>控制台</h2>
    <script src="./peer-control.js"></script>
</body>
</html>
```
react-electron/app/renderer/pages/control/controled.js文件
```javascript
const { desktopCapturer} = require('electron');//获取桌面流的信息

const video = document.getElementById('screen-video');
function play(stream){
  video.srcObject=stream;
  video.onloadedmetadata=()=>video.play()
}
function getScreenStream(){//获取屏幕的信息
    return new Promise((_resolve,_reject)=>{//对视频音频进行约束条件
        desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
            console.log(sources)//获取的对象如图所示在下面
            for (const source of sources) {
                try {
                  const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                      mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: source.id,
                        maxWidth: window.screen.width,
                        maxHeight: window.screen.height,
                      }
                    }
                  })
                  play(stream)
                }catch(reject){
                    console.error(reject)
                }
            }
        })
    })
}
getScreenStream()//调用
```
桌面流的相关资料：[https://www.electronjs.org/docs/api/desktop-capturer](https://www.electronjs.org/docs/api/desktop-capturer)
效果如图所示：[electron_2.mp4](https://img.zhufengpeixun.com/electron_2.mp4)

获取对象的图片：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1600251953269-ae2782e2-cba1-4ab0-88df-15b1356751e9.png#align=left&display=inline&height=309&margin=%5Bobject%20Object%5D&name=image.png&originHeight=309&originWidth=402&size=15166&status=done&style=none&width=402)

## 接收指令&响应指令
#### robotjs介绍

- 用于控制鼠标、键盘
- 基于c++实现的Node.js的add-on库
- 支持Mac、Windows、Linux

相关的资料：[https://github.com/octalmage/robotjs](https://github.com/octalmage/robotjs)(github资料)
详细文档地址：[https://robotjs.io/docs/](https://robotjs.io/docs/)

- 安装： `npm install robotjs` 
- 鼠标移动：robot.moveMouse(x,y)
- 鼠标点击：mouseClick([button],[double])
- 按键：robot.keyTap(key,[modifier])
#### robotjs安装和使用
`window平台` 需要提前在windows  PowerShell中以管理员的身份运行npm install --global --production windows-build-tools
详细的信息请看这个链接：[https://github.com/octalmage/robotjs](https://github.com/octalmage/robotjs)
下载的时间比较长请等候，网络情况不好的话容易下载失败
```
npm install robotjs --save
OR
yarn add robotjs --save
```
下载成功后运行 `yarn  start` ，在electron页面中的控制台上打印 `require('robotjs')` 
报错情况如图所示：

![robotjs报错](https://images.gitee.com/uploads/images/2020/1118/184434_910985cf_1720749.png "robotjs报错.png")

报这个错误的 `原因` :robotjs是基于c++编写的，在不同的平台，不同的node版本环境需要重新编译。所以有两种编译方式：

- 手动编译
```
npm rebuild --runtime=electron --target=<electron版本> --disturl=https://atom.io/download/atom-shell --abi=<对应的版本api>
abi:应用程序二进制接口  通过node版本号找到abi的版本号

在控制台上打印
process.versions.electron  看到electron版本
process.versions.node      看到node版本
还有其他情况的可以看看这个链接：https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json   查到相应的api如下图所示
```
![版本号查找](https://images.gitee.com/uploads/images/2020/1118/184835_236cd3de_1720749.png "version.png")
- electron-rebuild编译
```
可以根据版本编译，不需要手动查找abi和target(建议使用这个方式)
npm install electron-rebuild --save-dev

npx electron-rebuild
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1600396580379-d30070ac-231e-41e4-ba93-5cbbfe826a1f.png#align=left&display=inline&height=56&margin=%5Bobject%20Object%5D&name=image.png&originHeight=56&originWidth=524&size=4717&status=done&style=none&width=524)出现这个页面就是 `编译成功` 。
此时在命令行里打印 `yarn start` ,出来electron页面后，在其控制台上打印 `require('robotjs')` ,仍然会报错，此时在主进程文件中react-electron/app/main/index.js文件中
```
//...

app.allowRendererProcessReuse=false;//为了防止原生模块在渲染进程中被覆盖
app.on(...)
//...
```
相关的资料查询：[https://www.electronjs.org/docs/api/app](https://www.electronjs.org/docs/api/app)  (最后一条)
此时再重复这些步骤会出现如下页面，说明robotjs编译成功。

![robotjs编译成功](https://images.gitee.com/uploads/images/2020/1118/185314_5ab597bd_1720749.png "robotjs成功.png")

相关的信息进行讲解
```
监听键盘+鼠标事件
   window.onkeydown
   window.onmouseup

响应键盘事件
   modifier(修饰键)处理:shift、ctrl、alt...
   按键转换(vkey库:https://github.com/chrisdickinson/vkey  可以进行了解)
   
响应点击事件
   鼠标位置缩放(比例)
     x=x*videoWidth/screenWidth
     y=y*videoHeight/screenHeight
   
```
#### 代码环节
```
npm install vkey --save
vkey库:https://github.com/chrisdickinson/vkey 

```
在主进程文件中react-electron/app/main/index.js文件中
```javascript
const {app}=require('electron');
// const {create:createMainWindow}=require('./windows/main')//创建一个主窗口
const handleIPC=require('./ipc')//处理主进程的事务放在同一个文件
const {create:createControlWindow}=require('./windows/control')//控制窗口渲染页面
  const robot=require('./robot')

app.allowRendererProcessReuse=false;
app.on('ready',()=>{
    handleIPC()
    // createMainWindow()//主窗口出现APP.js的页面
    createControlWindow()
      robot()    
})
```
新建react-electron/app/main/robot.js文件
```javascript
// robotjs只能在主进程中运行，所以robotjs代码在主进程通过ipc的方法，让渲染进程调用主进程去做软件控制(键盘和鼠标)

const {ipcMain}=require('electron');
const robot=require('robotjs')
const vkey=require('vkey')

function handleMouse(data){
    //传过来的数据：data:{clientX,clientY,screen:{width,height},video:{width,height}}
    let {clientX,clientY,screen,video} =data
    let x=clientX*screen.width/video.width;
    let y=clientY*screen.height/video.height;
    robot.moveMouse(x,y)
    robot.mouseClick()
    console.log("mouse",data)
}


function handleKey(data){
    //传过来的数据：data:{keyCode,meta,alt,ctrl,shift}
    const modifiers=[];//修饰键
    if(data.meta) modifiers.push('meta')
    if(data.shift) modifiers.push('shift')
    if(data.alt) modifiers.push('alt')
    if(data.ctrl) modifiers.push('ctrl')
    let key=vkey[data.keyCode].toLowerCase()//拿到对应的键值
    if(key[0] !== '<'){//排除<shift>特殊字符
        robot.keyTap(key,modifiers)
    }
   console.log('key',data)
}

module.exports=function(){
    ipcMain.on('robot',(e,type,data)=>{//*******通信**主进程
      //判断事件类型
        if(type === 'mouse'){//鼠标类型
            handleMouse(data)
        }else if(type === 'key'){//键盘类型
            handleKey(data)
        }
    })
}
```
在被控制端方面需要增加键盘和鼠标相关的逻辑，所以在react-electron/app/renderer/pages/control/controled.js文件中添加逻辑
```javascript
const {ipcRenderer} = require('electron');
const EventEmitter=require('events');
const peer=new EventEmitter();

//.....
getScreenStream()

window.onkeydown=function(e){
  var data={
    keyCode:e.keyCode,
    shift:e.shiftKey,
    meta:e.metaKey,
    control:e.controlKey,
    alt:e.altKey
  }
  peer.emit('robot','key',data)//返回一个键盘类型的事件的结果
}
  
  window.onmouseup=function(e){
  var data={
    clientX:e.clientX,
    clientY:e.clientY,
    video:{
      width:video.getBoundingClientRect().width,
      height:video.getBoundingClientRect().height
      
    }
  } 
  peer.emit('robot','mouse',data)////返回一个鼠标类型的事件的结果
  }
  
  peer.on('robot',(type,data)=>{
    if(type === 'mouse'){
      data.screen={
        width:window.screen.width,
        height:window.screen.height
      }
    }
    setTimeout(() => {
      ipcRenderer.send('robot',type,data)//********通信**渲染进程
    }, 2000);
})
  
```
在被控制端electron窗口里鼠标点击，按入键盘

成功的结果如视频所示：[electron_3.mp4](https://img.zhufengpeixun.com/electron_3.mp4)

### SDP

- SDP(Session Description Protocol)是一种会话描述协议，用来描述多媒体会话，主要应用于协商双方通讯过程，传递基本信息。
- SDP的格式包含多行，每行为`<type>=<value>`

           <type>：字符，代表特定的属性，如：v代表版本
           <value>:结构化文本，格式与属性类型有关，如UTF8编码。
[RTCPeerConnection](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection)相关的资料：[https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection)
### 代码环节：
这时候需要把主窗口打开，所以在主进程react-electron/app/mian/index.js文件
```javascript
const {app}=require('electron');
const {create:createMainWindow}=require('./windows/main')//创建一个主窗口
const handleIPC=require('./ipc')//处理主进程的事务放在同一个文件
const robot=require('./robot')

app.allowRendererProcessReuse=false;
app.on('ready',()=>{
    handleIPC()
    createMainWindow()//主窗口出现APP.js的页面
    robot()    
})
```
控制端部分需要增加远程SDP,react-electron/app/renderer/pages/controler.js文件
```javascript
const { desktopCapturer,ipcRenderer} = require('electron');//获取桌面流的信息
const EventEmitter=require('events');
const peer=new EventEmitter();
const video = document.getElementById('screen-video');
function play(stream){
  video.srcObject=stream;
  video.onloadedmetadata=()=>video.play()
}
// function getScreenStream(){//获取屏幕的信息
		这个相关的代码在被控制端里
//}
// getScreenStream()

window.onkeydown=function(e){
//...
}
  
  window.onmouseup=function(e){
//...
  }
  

//先注释掉这些代码
//   peer.on('robot',(type,data)=>{
//     if(type === 'mouse'){
//       data.screen={
//         width:window.screen.width,
//         height:window.screen.height
//       }
//     }
//     setTimeout(() => {
//       ipcRenderer.send('robot',type,data)
//     }, 2000);
// })



//创建一个远程连接
const pc=new window.RTCPeerConnection({})
async function createOffer(){//创造一个远程端点
  const offer=await pc.createOffer({//只需要视频
    offerToReceiveAudio:false,
    offerToReceiveVideo:true,
  })
  await pc.setLocalDescription(offer);
  console.log('pc offer',JSON.stringify(offer))
  return pc.localDescription
}
createOffer();
async function setRemote(answer){//设置远程SDP
  await pc.setRemoteDescription(answer)
}
window.setRemote=setRemote;//为了在控制台的能看看到效果
pc.onaddstream=function(e){//监听媒体流的增加
  console.log('add-stream',e)
  peer.emit('add-stream',e.stream)
}
  
```
被控制端部分：react-electron/app/renderer/src/main/src/App.js文件
```javascript
import './controll';//被控制端的主要逻辑
//...
```
新建react-electron/app/renderer/src/main/src/controll.js文件
```javascript
//被控制端方面进行的回应，媒体流的监听
const {desktopCapturer}=window.require('electron')

function getScreenStream(){
    return new Promise((resolve,reject)=>{
        desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
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
                resolve(stream)
                }catch(reject){
                    console.error(reject)
                }
            }
          })
    })
 }


const pc=new window.RTCPeerConnection({});
async function createAnswer(offer){//回应函数
  let screenStream=await getScreenStream()//获取媒体流
  pc.addStream(screenStream);//添加媒体流
  await pc.setRemoteDescription(offer);
  await pc.setLocalDescription(await pc.createAnswer())
  console.log("answer",JSON.stringify(pc.localDescription))
  return pc.localDescription
} 
window.createAnswer=createAnswer//方便在控制台上操作
```
操作如视频所示即为成功：[electron_4.mp4](https://img.zhufengpeixun.com/electron_4.mp4)
### 获取视频流
#### WebRTC  NAT穿透：ICE
ICE(Interactive Connenctivity Establishment) 交互式连接创建

- 优先STUN(Session Traversal Utilities for Nat) NAT会话穿越应用程序
- 备选TURN(Traversal Using Relay  NAT) 中继NAT实现穿透
1. Full Cone  NAT   完全锥形NAT
1. Restricted Cone NAT   限制锥形NAT
1. Port Restricted  Cone  NAT  端口限制锥形NAT
1. Symmetric NAT  对称NAT
#### 代码环节
react-electron/app/renderer/pages/control/controled.js文件
```javascript
const { desktopCapturer,ipcRenderer} = require('electron');//获取桌面流的信息
const EventEmitter=require('events');
const peer=new EventEmitter();
const video = document.getElementById('screen-video');
function play(stream){
  video.srcObject=stream;
  video.onloadedmetadata=()=>video.play()
}

peer.on('add-stream',(stream)=>{
  console.log('4444')
  play(stream);
})


//...


//   peer.on('robot',(type,data)=>{
//     if(type === 'mouse'){
//       data.screen={
//         width:window.screen.width,
//         height:window.screen.height
//       }
//     }
//     setTimeout(() => {
//       ipcRenderer.send('robot',type,data)
//     }, 2000);
// })

const pc=new window.RTCPeerConnection({})

//....

pc.onicecandidate=function(e){//触发此事件函数
  console.log('candidate',JSON.stringify(e.candidate))
}
let candidates=[];
async function addIceCandidate(candidate){//接收信号
  if(candidate){//可能结果为null
    candidates.push(candidate);
  }
  if(pc.remoteDescription && pc.remoteDescription.type){
    //pc.remoteDescription描述了和远程对端之间的会话(包括配置和媒体信息) ，如果还没有被设置过的话，它会是 null.
    for(var i=0;i<candidates.length;i++){
    await pc.addIceCandidate(new RTCIceCandidate(candidates[i]))
    }
    candidates=[];//清空数据
  }
}
window.addIceCandidate=addIceCandidate;//方便在控制台上操作

```
被控制端：react-electron/app/renderer/src/main/src/controll.js文件
```javascript
//...
pc.onicecandidate=function(e){//触发此事件函数
  console.log('candidate',JSON.stringify(e.candidate))
}
let candidates=[];//缓存的效果
async function addIceCandidate(candidate){
  if(candidate){//可能结果为null
    candidates.push(candidate);
  }
  if(pc.remoteDescription && pc.remoteDescription.type){
    for(var i=0;i<candidates.length;i++){
    await pc.addIceCandidate(new RTCIceCandidate(candidates[i]))
    }
    candidates=[];//清空数据
  }
}
window.addIceCandidate=addIceCandidate;
```
先重复第一部分控制台，建立两者之间的通信。
成功效果如视频所示：[electron_6.mp4](https://img.zhufengpeixun.com/electron_6.mp4)

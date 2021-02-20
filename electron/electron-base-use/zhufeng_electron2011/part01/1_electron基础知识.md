# electron基础知识

## 简介
- electron是由Github开发开源框架
- 允许开发者使用web技术构建跨平台桌面应用
- chromium和node本身就是广受欢迎的应用程序平台，他们被独立用于创建雄心勃勃的应用程序，electron将这两个平台结合在一起，允许您使用JavaScript构建一个全新的应用程序类。
- electron不仅是构建功能类似原生的web应用程序的绝佳选择桌面应用技术，也是围绕node应用程序构建GUI(图形用户界面)的绝佳选择。

electron大体架构图片
![electron大体架构图片](https://images.gitee.com/uploads/images/2020/1114/181324_c40ad732_1720749.jpeg "qian.jpg")

#### 如何整合事件循环
Node和Chromiums整合的难点：Node.js事件是基于libuv，但Chromiums是基于message bump
解决办法:（扩展知识可自行百度，不涉及到本次训练营）

- Chromiums集成到Node.js:用libuv实现message bump (nw）
- Node集成到Chromium  (electron)
#### Chromium架构
Chromium是谷歌的Chrome web浏览器的开源版本，它也需要创建创建窗口，右键菜单，管理浏览器Tab页面，扩展程序等等。
[相关资料](https://blog.csdn.net/zxc024000/article/details/80157332)

- Chromium是多进程架构，包括Browser和多个Render
- 进程间需要IPC通信
- web关注所占比例比较小
#### node
作为一个使用JavaScript用于开发开源、运行时跨平台的服务器的应用程序，使用了谷歌的开源V8引擎来解决JS用于访问文件系统、创建服务器和从外部模块加载代码的接口等问题。
### 开发桌面端的原因

- 提供更便捷的入口，让自己的产品占据自己的桌面
- 离线可用,手机飞行模式也可以用到
- 调用系统能力,通知用户功能，快捷键操作桌面系统
- 安全需求，金融和支付方面的要求
- ......
### electron的准备

- 安装node  （我的版本：12.14.0）
- npm install electron --save-dev
- npm install --arch=ia32 --platform=win32 electron  打出来的包32位和64位都可以用，只需要维护一套代码
- 验证是否安装成功
- npx electron -v  (npm版本大于5.2，可以直接使用npx命令，npx是为了让项目内部安装的模块调用更加方便而产生的新命令)
- ./node_modules/.bin/electron -v (npm版本低于5.2而执行的命令)
### electron如何工作？

- 主进程
```
管理应用      app
创建窗口      BrowserWindow
可交互的通知  Notification
IPC通信       ipcMain
```

- 渲染进程
```
页面交互     HTML/CSS/JS
IPC通信      ipcRenderer
```
#### electron渲染模块
```javascript
const {app, BrowserWindow} = require('electron')//主进程引入app，BrowserWindow模块

const {ipcRenderer}=require('electron')//渲染进程引入ipcRenderer

ipcRenderer.invoke(channel,...arrs).then(result=>{handleResult});//渲染进程跟主进程发送请求  
```
```
electron主进程模块讲解：

app  用于控制应用生命周期
BrowserWindow  用于创建和控制窗口
	const win=new BrowserWindow({width,height,...})  创建窗口并设置宽高
  win.loadURL(url)   win.loadFile(path)  加载显示页面
  
 Notification  用于状态栏通知
 	const notification=new Notification({title,body,actions[{text,type}]})
  notification.show()
 
 ipcMain.handle(channel,handler) 处理渲染进程的channel请求，在handler中return返回结果
```
## 开发的角度不同
### 主进程和渲染进程
#### 主进程

- electron运行pcakage.json的main脚本的进程被称为主进程
- 每一个应用只有一个主进程
- 管原生GUI，典型的窗口(BrowserWindow、Tray、Dock、Menu）
- 创建渲染进程
- 控制应用生命周期(app)
#### 渲染进程

- 展示web页面的进程称为渲染进程，无法访问操作系统的原生资源
- 通过node.js、electron提供的API可以跟系统底层打交道
- 一个Electron应用可以有多个渲染进程
#### 两者之间的关系
```
app                   管理应用的生命周期，可以设置app本身的属性，比如退出
BrowserWindow         管理窗口及其大小等
ipcMain与ipcRenderer进行ipc通信
Menu                  创建原生应用菜单和上下文菜单
Tray                  添加图标和上下文菜单到系统通知区
Menultem              添加菜单项到应用程序菜单和上下文菜单中
dialog                显示用于打开和保存文件、警告等的本机系统对话框
Notification          允许做一个可交互的通知
webContents           加载具体的页面
autoUpdater           使应用程序能够自动更新
globalShortcut        设置全局的快捷键
```
```
clipboard             用来访问和读写我们的剪贴板
crashReporter         监控主进程和渲染进程是否有崩溃
shell                 提供与桌面集成相关的功能
nativelmage使用png或jpg文件创建托盘、dock和应用程序图标
```
```
ipcRenderer与ipcMain进行ipc通信，发布消息到主进程也可以接收主进程回复的消息
remote主要可以调用主进程的模块使用
desktopCapture可以访问那些用于从桌面流捕获音频和视频的媒体源信息
```
其余的模块可以在官网上找：[https://www.electronjs.org/](https://www.electronjs.org/)
### 进程间通信
#### electron进程间通信的结果

- 通知事件     在页面(渲染进程)中创建一个原生菜单，但是只有主进程才能够创建原生菜单，需要ipc通信
- 数据传输     在某个页面(渲染进程)里获取内存信息，需要ipc传输
- 共享数据     各个进程都会用到的信息，比如用户情况需要ipc进行数据共享
#### ipc模块通信

- electron提供了ipc通信模块，主进程的ipcMain和渲染进程的ipcRenderer
- ipcMain、ipcRenderer都是EventEmitter对象，和js写法非常相似
#### 进程间通信：渲染进程 --> 主进程

- callback写法
```
ipcRenderer.send(channle,...args)  发送一个ipc事件  ...args是handler的参数
ipcMain.on(channel,handler)        在ipcMain中响应这个事件，handler是函数
```

- Promise写法(electron版本大于7.0，处理请求+响应模式)
```
ipcRenderer.invoke(channel,...args)
ipcMain.handle(channel,handler)
渲染进程想去主进程里处理一个事件并且能够拿到响应结果
```
#### 进程间通信：主进程  -->  渲染进程
```
ipcRenderer.on(channel,handler)
webContents.send(channel)  
通过webContents.send去发送事件给渲染进程
```
#### 进程间通信：渲染进程间的通信

- 通知事件
```
通过主进程作为中转站进行事件转发(electron5之前)
ipcRenderer.sendTo(electron5之后)
```

- 数据共享
```
web技术(localStorage,sessionStorage,indexedDB)
使用remote方法，将我们的数据挂在一个全局的过程中
```
#### 须知事项
```
少用remote模块:每次remote会触发底层的同步ipc事件，影响性能。如果remote处理不恰当会导致进程卡死

不要用sync模式：ipcRenderer.sync()方法不推荐使用，会导致卡死现象

在请求和响应的通信模式下，需要自定义超时限制：需要Response一个异常的超时事件让业务处理进行交互

```
### 原生能力
> electron应用原生能力来源于electron内置的Native API以及强大的nodejs

#### 使用electron api创建原生GUI

-  BrowserWindow 应用窗口
- Tray  托盘小logo
- app  设置dock.badge未读数
- Menu 菜单
- dialog 原生弹框
- TouchBar  苹果触控栏
- ......
#### 使用electron api获得底层能力

- clipboard 剪贴板
- globalShortcut  全局快捷键
- desktopCapture  捕获桌面信息
- shell 打开本地文件、url
- ......
#### 使用nodejs获取底层能力

- electron同时在主进程和渲染进程中对nodejs暴露了所有的接口
- fs进行文件读写和crypto进行加密
- 通过npm安装即可引入社区上所有的nodejs库
#### 使用nodejs调用原生模块

- node.js  add-on    利用nodejs插件机制去继承c++
- node-ffi (Foreign Function Interface)   去集成一些动态库
#### 调用OS能力

- WinRT([https://github.com/NodeRT/NodeRT](https://github.com/NodeRT/NodeRT))  调用蓝牙、USB、预览文件之类的事情
- Applescript([https://github.com/TooTallNate/node-applescript](https://github.com/TooTallNate/node-applescript))  苹果原生系统应用的调用
- shell (node.js child_process)
## 尽情想象
#### 无兼容问题

- 不用担心在Safari、IE上的表现差异了
- 大胆使用Chrome浏览器支持的api
- babel中设置targets为electron对应的Chrome版本
#### ES6/7/8/9/10高级语法

- async await /Promise
- String/Array/Object等高级用法
- BigInt
#### 无跨域问题

- 使用nodejs发送请求
- 使用electron net发送请求
- 发送请求会少一个options请求，不会被浏览器同域名6个请求给限制住
#### 更多。。

- 操作本地文件
- 更好用的本地DB   Lowdb、Leveldb等SQLite等等的本地存储
- 多线程、多进程并行  通过nodejs的worker和child_process将任务拆分多线程多进程运行




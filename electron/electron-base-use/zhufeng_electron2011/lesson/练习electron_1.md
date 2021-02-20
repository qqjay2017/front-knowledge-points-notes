# （一）初识
## Electron是什么?

- Electron就是使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序.
- Electron是由github开发的开源框架
- 它允许开发者使用web技术开发跨平台的桌面应用
- `Electron = Chromium + Node.js + Native API`
   - Chromium：提供了强大的ui能力，可以不考虑浏览器兼容情况,利用强大的web生态来开发界面。
   - Node.js：让 Electron有了底层才做能力，比如读写能力，并且可以使用大量的开源包来完成项目的开发。
   - Native API：让Electron有了跨平台和桌面端的原生能力，比如有同意的原生界面、窗口、托盘。
## 创建一个ele项目
新建ele文件夹， `npm init -y` 初始化项目
```javascript
//package.json文件

{
  "name": "ele",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",//主进程文件入口
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```
安装electron: `npm install electron --save-dev` 
如果安装的时候遇到什么问题(大部分报错或太慢)可以看看npm是否切换了淘宝镜像:npm config set registry [https://registry.npm.taobao.org](https://registry.npm.taobao.org) 

也可以配置一下electron镜像:npm config set ELECTRON_MIRROR [http://npm.taobao.org/mirrors/electron/](http://npm.taobao.org/mirrors/electron/)

测试 `electron` 是否安装成功：命令面板输入 `npx electron`   出现electron的窗口

查看 `electron` 的版本号：命令面板输入 `npx electron -v`

此时的版本号为： `v10.1.2` 

`根目录` 下创建 `main.js` 文件(electron主进程)
```javascript
const { app, BrowserWindow } = require('electron');
let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({    // 创建和控制浏览器窗口
        width: 600,                     // 窗口宽度
        height: 600,                    // 窗口高度
        webPreferences: {               // 网页功能设置
            nodeIntegration: true,      // 是否在node工作器中启用工作集成默认false
            enableRemoteModule: true,   // 是否启用remote模块默认false
        }
    });
    mainWindow.loadFile('index.html');  // 加载页面
    mainWindow.on('close', () => {      // 监听窗口关闭
        mainWindow = null               //销毁mainWindow
    })

})
```
新建index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>hello,sunny!</h1>
</body>
</html>
```
相应的package.json需要进行修改，如下：
```json
{
  "name": "ele",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",        //主进程文件入口
  "scripts": {
    "start": "electron ."    //执行脚本
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^10.1.2"
  }
}

```
在命令行中输入 `npm run start` ，就会出现如下图片：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601129405169-2c99a99c-3696-48be-b2a2-d53936262fcc.png#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&name=image.png&originHeight=700&originWidth=755&size=292995&status=done&style=none&width=755)
就是成功啦，这样就是开始electron之旅了！
## 小小总结---electron运行流程

- 读取package.json文件中的入口文件，这里就是我们的main.js
- main.js中我们引入electron 创建了渲染进程
- index.html就是应用页面的布局和样式
- 使用IPC在主进程执行任务并获取信息
# （二）fs
### electron的主进程和渲染进程
`package.json`中定义的入口文件就是主进程,那一般一个程序只有一个主进程,而我们可以利用一个主进程,打开多个子窗口.
由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中,也就是我们说的渲染进程.
换句话说是主进程控制渲染进程,一个主进程可以控制多个渲染进程.
简单理解为: 把main.js看成主进程,html部分看成渲染进程
了解主进程和渲染进程后,我们来作一个读取小姐姐案例.现在项目根目录下建立一个  `food.txt`  文件
```
美式咖啡
焦糖拿铁
水果萃冰
橙柚果汁
```
修改index.html的内容
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <Button id="btn">喜爱排行榜</Button><br/>
    <div  id="food"></div>
    <script src="./render/index.js"></script>
</body>
</html>
```
新建一个render/index.js文件，默认是渲染进程的逻辑操作
```javascript
const fs = require('fs'); 
const btn = this.document.querySelector('#btn')
const food = this.document.querySelector('#food')
window.onload = function(){
    btn.onclick = function(){
        fs.readFile('food.txt',(_err,data)=>{
            food.innerHTML = data
        })
    }
} 
```
在控制台输入 `npm run start` ,就可以页面，点击之后就会出现文字了！
# (三)Remote
Electron有主进程和渲染进程,也就是Electron的API方法和模块也是分为可以在主进程和渲染进程中使用。想在渲染进程中使用主进程中的模块方法时，可以使用`Remote`解决在渲染和主进程间的通讯。
index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <Button id="btn">打开新窗口</Button><br/>
    <script src="./render/index.js"></script>
</body>
</html>
```
render/index.js文件
```javascript
const btn = this.document.querySelector('#btn')
const BrowserWindow =require('electron').remote.BrowserWindow//remote

window.onload = function(){
   btn.onclick = ()=>{
        newWin = new BrowserWindow({
            width:500,
            height:500,
        })
        newWin.loadFile('red.html')//后面新建好
        newWin.on('close',()=>{win=null})
    }
}
```
根目录下新建red.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Red</title>
    <style>
        *{margin: 0;padding: 0;}
        #red{
            height: 300px;
            width: 300px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div id="red"></div>
</body>
</html>
```
在控制台上运行 `npm run start` ，出现如下页面：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601174329247-fdf061ac-b0a3-4e77-a8c5-cfd83f145db9.png#align=left&display=inline&height=706&margin=%5Bobject%20Object%5D&name=image.png&originHeight=706&originWidth=725&size=198848&status=done&style=none&width=725)


### 小小提示
这是`Electron`版本更新后修改的，默认不启用remote模块需要手动打开
需要在主进程(main.js文件)中添加上:在`webPreferences` 里写`enableRemoteModule: true` 
# （四）Menu
新建一个menu.js文件
```javascript
const { Menu } = require('electron')

var template = [//模板
    {
        label:'四季',
        submenu:[
            {label:"春天"},
            {label:"夏天"},
            {label:"秋天"},
            {label:'冬天'}
        ]

    },
    {
        label:'两天',
        submenu:[
            {label:'白天'},
            {label:'黑天'}
        ]
    }
]

var menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)
```
`Menu`属于是 `主线程下` 的模块，所以只能在主线程中使用。所以在主线程中引用下，main.js文件
```javascript
const { app, BrowserWindow } = require('electron');
let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({    // 创建和控制浏览器窗口
        width: 600,                     // 窗口宽度
        height: 600,                    // 窗口高度
        webPreferences: {               // 网页功能设置
            nodeIntegration: true,      // 是否在node工作器中启用工作集成默认false
            // enableRemoteModule: true,   // 是否启用remote模块默认false
        }
    });
    require('./menu');//引进menu
    mainWindow.loadFile('index.html');  // 加载页面
    mainWindow.on('close', () => {      // 监听窗口关闭
        mainWindow = null               //销毁mainWindow
    })

})
```
index.html文件
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>Menu</h3>
</body>
</html>
```
在控制台上运行 `npm run start` ，出现如下页面：
![de_2.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601177285171-863e4bd1-c125-44ca-b773-38fad165d723.png#align=left&display=inline&height=669&margin=%5Bobject%20Object%5D&name=de_2.png&originHeight=669&originWidth=702&size=146049&status=done&style=none&width=702)
### 菜单打开新窗口
menu.js文件
```javascript
const { Menu , BrowserWindow } = require('electron')

var template = [
    {
        label:'四季',
        submenu:[
            {
                label:"春天",
                click:()=>{
                    win = new BrowserWindow({
                        width:500,
                        height:500,
                        webPreferences:{ nodeIntegration:true}
                    })
                    win.loadFile('red.html')
                    win.on('closed',()=>{win = null})
                }
            },
            {label:"夏天"},
            {label:"秋天"},
            {label:'冬天'}
        ]

    },
    {
        label:'两天',
        submenu:[
            {label:'白天'},
            {label:'黑天'}
        ]
    }
]

var menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)
```
在控制台上运行 `npm run start` ，出现如下页面：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601179076809-f342f8c8-1233-432f-88d2-d205cdc15ab4.png#align=left&display=inline&height=612&margin=%5Bobject%20Object%5D&name=image.png&originHeight=612&originWidth=662&size=170000&status=done&style=none&width=662)
![de_3.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601179087413-35b369a2-21cd-4f4b-92e7-6148efb4882a.png#align=left&display=inline&height=709&margin=%5Bobject%20Object%5D&name=de_3.png&originHeight=709&originWidth=744&size=127156&status=done&style=none&width=744)
这样就算是完成啦！
### 菜单快捷键
绑定快捷键的属性是`accelerator`属性
menu.js文件
```javascript
const { Menu , BrowserWindow } = require('electron')

var template = [
    {
        label:'四季',
        submenu:[
            {
                label:"春天",
                accelerator:`ctrl+s`,//快捷键是:ctrl+s
                click:()=>{
                    win = new BrowserWindow({
                        width:500,
                        height:500,
                        webPreferences:{ nodeIntegration:true}
                    })
                    win.loadFile('red.html')
                    win.on('closed',()=>{win = null})
                }
            },
            {label:"夏天"},
            {label:"秋天"},
            {label:'冬天'}
        ]

    },
    {
        label:'两天',
        submenu:[
            {label:'白天'},
            {label:'黑天'}
        ]
    }
]

var menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)
```
在控制台上运行 `npm run start`
窗口页面出来后可以使用快捷键 `ctrl+s` 就可以新建一个页面啦~
### 右键菜单
右键是在渲染进程进行点击的，因此写在渲染进程中，且要用到`remote`模块
render/index.js文件
```javascript
const { remote } = require('electron');
const rightTemplate = [
    {label:'粘贴'},
    {label:'复制'},
]
const menu = remote.Menu.buildFromTemplate(rightTemplate);

window.addEventListener('contextmenu',(e)=>{
    // 阻止当前窗口默认事件
    e.preventDefault();
    //把菜单模板添加到右键菜单
    menu.popup({window:remote.getCurrentWindow()})
},false)
```
index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Menu</h2>
    <script src="./render/index.js"></script>
</body>
</html>
```
在控制台上运行 `npm run start` ，出现如下页面：
![de_5.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601192404902-04e14cf5-8b17-4448-9129-76d1bdd197d1.png#align=left&display=inline&height=612&margin=%5Bobject%20Object%5D&name=de_5.png&originHeight=612&originWidth=602&size=88256&status=done&style=none&width=602)
### 程序打开调试模式
![de_6.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601192930017-a59018e0-6308-4d20-a321-9bef8713e456.png#align=left&display=inline&height=601&margin=%5Bobject%20Object%5D&name=de_6.png&originHeight=601&originWidth=643&size=213010&status=done&style=none&width=643)
![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601193132163-158c8cde-b5c5-4fd4-9c69-673207c9d0cc.png#align=left&display=inline&height=695&margin=%5Bobject%20Object%5D&name=image.png&originHeight=695&originWidth=667&size=224554&status=done&style=none&width=667)
另一种控制台打开的方法:在 `主线程` 上输入mainWindow.webContents.openDevTools()
附上主线程 `main.js` 文件
```javascript
const { app, BrowserWindow } = require('electron');
let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({    // 创建和控制浏览器窗口
        width: 600,                     // 窗口宽度
        height: 600,                    // 窗口高度
        webPreferences: {               // 网页功能设置
            nodeIntegration: true,      // 是否在node工作器中启用工作集成默认false
            enableRemoteModule: true,   // 是否启用remote模块默认false
        }
    });
    require('./menu');
    mainWindow.webContents.openDevTools() //打开控制台
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';//消除控制台上报警文字
    mainWindow.loadFile('index.html');  // 加载页面
    mainWindow.on('close', () => {      // 监听窗口关闭
        mainWindow = null               //销毁mainWindow
    })

})
```
运行 `npm run start` 出现的页面：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601193747857-65e9cd31-e366-4c18-bdb2-19a308a3cefe.png#align=left&display=inline&height=681&margin=%5Bobject%20Object%5D&name=image.png&originHeight=681&originWidth=687&size=213931&status=done&style=none&width=687)

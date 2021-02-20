# (五)打开浏览器
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
    <h2>
        <a href="https://www.electronjs.org/">electron官网</a>
    </h2>
</body>
</html>
```
控制台输入 `npm run start` 出现窗口之后点击electron官网，发现是直接在窗口直接打开的，而不是在浏览器打开的。而我们要做的是在浏览器打开

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
    <h2>
        <a id="aHref" href="https://www.electronjs.org/">electron官网</a>
    </h2>
    <script src="./render/index.js"></script>
</body>
</html>
```
render/index.js文件
```javascript
var { shell } = require('electron')

var aHref = document.querySelector('#aHref') 

aHref.onclick = function(e){
    // 阻止默认事件 因为默认是在应用中打开
    e.preventDefault()
    // 获取网址
    var href = this.getAttribute('href')
    // 浏览器中打开
    shell.openExternal(href)
}
```
控制台上输入 `npm run start` ,出现窗口后点击 `electron官网` ，就会在浏览器打开这个electron官网。

接下来学习如何嵌入网页，继续学习啦~
# (六)嵌入网页和子窗口
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
    <h2>嵌入页面</h2>
</body>
</html>
```
`BrowserView`是主进程中的类，所以只能在主进程中使用，需要打开mian.js文件。
```javascript
const { app, BrowserWindow , BrowserView } = require('electron');
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
    // mainWindow.webContents.openDevTools()
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    mainWindow.loadFile('index.html');  // 加载页面

    //新增代码,定义实例
    const viewWindow = new BrowserView();
    //主窗口设置viewWindw
    mainWindow.setBrowserView(viewWindow); 
    viewWindow.setBounds({x:0,y:150,width: 600,height:600});
    //url地址
    viewWindow.webContents.loadURL('https://www.baidu.com')
    mainWindow.on('close', () => {      // 监听窗口关闭
        mainWindow = null               //销毁mainWindow
    })

})
```
在控制台输入 `npm run start` ,出现如下的页面：

![de_9.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601198104894-3ddc9b25-0787-4fbf-a20a-d8d6c2384667.png#align=left&display=inline&height=591&margin=%5Bobject%20Object%5D&name=de_9.png&originHeight=591&originWidth=586&size=36434&status=done&style=none&width=586)

### 打开子窗口
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
    <h2>嵌入页面</h2>
    <button id="btn">打开子窗口</button>
    <script src="./render/index.js"></script>
</body>
</html>
```
render/index.js文件
```javascript
var btn = document.querySelector('#btn')
btn.onclick = function(e){
    window.open('https://www.electronjs.org/')
}
```
把相关的BrowserView给注释掉，运行 `npm run start` ,会出现如下窗口：

![de_10.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601199740731-485ae8fc-0d29-4003-b00b-ac6843afe478.png#align=left&display=inline&height=644&margin=%5Bobject%20Object%5D&name=de_10.png&originHeight=644&originWidth=827&size=114096&status=done&style=none&width=827)
# (七)父子窗口通信
`window.opener.postMessage(message,targetOrigin)`
,是将消息发送给指定来源的父窗口，如果未指定来源则发送给`*`，即所有窗口。

- message : 传递的消息，是字符串类型的值
- targetOrigin : 指定发送的窗口

需要在子窗口的页面中设置一些内容进行消息的传递。

新建son.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>son 页面</h3> <br/>
    <button id="btn">传递message</button>
</body>
<script>
    const btn = document.getElementById('btn');
    btn.onclick = ()=>{
        window.opener.postMessage('son message')
    } 
</script>
</html>
```
相应的父页面也会改变,index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 父子窗口交流 -->
    <button id="btn">打开子窗口 </button>
    <div id="message"></div>
</body>
<script>
    const btn = document.getElementById('btn');
    btn.onclick = ()=>{
        window.open('son.html')
    }
    const message = document.getElementById('message')
    window.addEventListener('message',msg => {
        message.innerHTML = msg.data
    })
</script>
</html>
```
在控制台上运行 `npm run start` ，出现的效果如图所示：

![de_11.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601214101293-1a105156-43f5-4d94-919d-c9322a9a30c1.png#align=left&display=inline&height=642&margin=%5Bobject%20Object%5D&name=de_11.png&originHeight=642&originWidth=1006&size=186278&status=done&style=none&width=1006)

父窗口就这样愉快的接收到子窗口传过来的消息啦！
# （八）选择文件对话框
对话框一般会有选择文件对话框，保存文件对话框和确认对话框。
### 选择对话框
打开文件选择对话框可以使用`dialog.showOpenDialog()`方法来打开，它有两个参数，一个是设置基本属性，另一个是回调函数，如果是异步可以使用`then`来实现

- title ： String (可选)，对话框的标题
- defaultPath ： String (可选),默认打开的路径
- buttonLabel ： String (可选), 确认按钮的自定义标签，当为空时，将使用默认标签
- filters ： 文件选择过滤器，定义后可以对文件扩展名进行筛选
- properties：打开文件的属性，比如打开文件还是打开文件夹，甚至是隐藏文件

index.html文件  注意的是 `dialog.showOpenDialog()` 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">打开文件</button>
</body>
<script>
    const btn=document.getElementById('btn');
    const {dialog}=require('electron').remote;
    btn.onclick=function(){
        dialog.showOpenDialog({
            title:'electron'
        })
    }
</script>
</html>
```
`npm run start` ,运行出来的结果图片如图所示：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601215323625-87e5ea5e-3b1d-4e8a-bc15-a68c6799ecde.png#align=left&display=inline&height=577&margin=%5Bobject%20Object%5D&name=image.png&originHeight=577&originWidth=972&size=336594&status=done&style=none&width=972)

另：index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">打开文件</button>
</body>
<script>
    const btn=document.getElementById('btn');
    const {dialog}=require('electron').remote;
    btn.onclick=function(){
        dialog.showOpenDialog({
            title:'electron',
            defaultPath:'sunny.jpg'
        })
    }
</script>
</html>
```
运行 `npm run strat` ,出现的效果如图所示：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601345274443-99f08ba4-16f4-4988-b380-8a95b26afcee.png#align=left&display=inline&height=582&margin=%5Bobject%20Object%5D&name=image.png&originHeight=582&originWidth=989&size=353435&status=done&style=none&width=989)

另：index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">打开文件</button>
</body>
<script>
    const btn=document.getElementById('btn');
    const {dialog}=require('electron').remote;
    btn.onclick=function(){
        dialog.showOpenDialog({
            title:'electron',
            defaultPath:'选择的默认路径',
            // 文件选择过滤
            filters:[
                {
                    name:'jpg',
                    extensions:['jpg']
                }
            ],
            buttonLabel:'确认与否',
            // 对话框使用的功能，允许选择文件、允许多选
            properties:['openFile', 'multiSelections']
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
</script>
</html>
```
运行 `npm run start` ,出现的图片如下图：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601347330574-8f079593-8312-48f6-aa86-0d3d3e2b9c35.png#align=left&display=inline&height=590&margin=%5Bobject%20Object%5D&name=image.png&originHeight=590&originWidth=972&size=376668&status=done&style=none&width=972)

选择几个文件，点击 `确认与否` 

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601347685668-ab3d1856-ded9-426e-8118-0c888d9ba93d.png#align=left&display=inline&height=588&margin=%5Bobject%20Object%5D&name=image.png&originHeight=588&originWidth=960&size=40644&status=done&style=none&width=960)

### 保存对话框
index.html文件 注意的是： `dialog.showSaveDialog()` 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">保存对话框</button>
</body>
<script>
    const btn=document.getElementById('btn');
    const fs=require('fs')
    const {dialog}=require('electron').remote;
    btn.onclick=function(){
        dialog.showSaveDialog({
            title:'electron'
        }).then(res=>{
            console.log(res)
            fs.writeFileSync(res.filePath,'hello')
        }).catch(err=>{
            console.log(err)
        })
    }
</script>
</html>

```
运行 `npm run start` ,出现的图片如下图：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601350384547-d8d71afb-7cf1-4c0a-a6fd-0d5b1ba2a41c.png#align=left&display=inline&height=622&margin=%5Bobject%20Object%5D&name=image.png&originHeight=622&originWidth=964&size=299223&status=done&style=none&width=964)

在相应的文件上找：(我的是D:\imgs)会出现：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601350500244-0a66b841-ca18-4e7d-8ac4-60d72249785e.png#align=left&display=inline&height=207&margin=%5Bobject%20Object%5D&name=image.png&originHeight=207&originWidth=897&size=61722&status=done&style=none&width=897)

### 消息对话框
index.html文件 注意的是：  `dialog.showMessageBox()`  `showMessageBox()` 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">消息对话框</button>
</body>
<script>
    const btn=document.getElementById('btn');
    const {dialog}=require('electron').remote;
    btn.onclick = () => {
        dialog.showMessageBox({
            type: "error",
            title: "错误",
            message: "这是错误警告",
            buttons: ["确定", "忽视","退出"],
        }).then(res => {
            console.log(res)
            });
    };
</script>
</html>
```
运行 `npm run start` ,出现的图片如下图：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601351484514-c4e74146-b5c3-4e3e-955e-c4258b575139.png#align=left&display=inline&height=628&margin=%5Bobject%20Object%5D&name=image.png&originHeight=628&originWidth=615&size=93019&status=done&style=none&width=615)

打开electron页面的控制台

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601352315344-f721083d-a9a9-4f2e-8189-fbba3e57e77a.png#align=left&display=inline&height=363&margin=%5Bobject%20Object%5D&name=image.png&originHeight=363&originWidth=585&size=29890&status=done&style=none&width=585)

# （九）断网提醒
通过`window.addEventListener`进行监听`onlin和offline`判断网络是否正常。
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
    <h2>断网提醒</h2>
</body>
<script>
  //需要自己手动连接或断开网络
    window.addEventListener('online',()=>{
        alert('网络正常，放心使用')
    })
    window.addEventListener('offline',()=>{
        alert('网络异常，请检查网络是否连接')
    })
</script>
</html>

```
运行 `npm run start` 后,手动断网，出现的图片如下图：

![de_20.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601352962083-21c2f136-89ba-48db-b276-79fc4c95a1e8.png#align=left&display=inline&height=592&margin=%5Bobject%20Object%5D&name=de_20.png&originHeight=592&originWidth=588&size=20548&status=done&style=none&width=588)

点击确定后，手动连接网络后，出现如下图片：

![de_21.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601353003222-37a03713-8160-4ce6-8131-0ed787e8f072.png#align=left&display=inline&height=595&margin=%5Bobject%20Object%5D&name=de_21.png&originHeight=595&originWidth=587&size=22741&status=done&style=none&width=587)

# （十）底部消息通知
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
    <button id="btn">通知消息</button>
</body>
<script>
    const btn = document.getElementById('btn');
    const option = {
        title: '新消息提醒',
        body: '你有新的消息需要阅读'
    }
    btn.onclick = ()=>{
        new window.Notification(option.title,option)
    } 
</script>
</html>
```
运行 `npm run start` ,出现页面如图所示：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601353752368-7c48281f-1786-4624-815a-3cadda2b8169.png#align=left&display=inline&height=590&margin=%5Bobject%20Object%5D&name=image.png&originHeight=590&originWidth=983&size=135277&status=done&style=none&width=983)

# （十一）快捷键
全局快捷加的注册是`globalShortcut`,`globalShortcut`是主线程的模块，因此要写在`main.js`文件中。
main.js文件
```javascript
const { app, BrowserWindow , globalShortcut} = require('electron');
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
    // mainWindow.webContents.openDevTools()
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    //快捷键ctrl+y打开网址
    globalShortcut.register('ctrl+y',()=>{
        mainWindow.loadURL('https://www.baidu.com')
    })
    //快捷键ctrl+z可以打开页面
    globalShortcut.register('ctrl+z',()=>{
        mainWindow.loadFile('./index.html')
    })
    mainWindow.loadFile('index.html');  // 加载页面
    mainWindow.on('close', () => {      // 监听窗口关闭
        mainWindow = null               //销毁mainWindow
    })
})
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
    <h2>全局注册快捷键</h2>
</body>
</html>
```
`npm run start` 运行后，可以使用 `ctrl+y` , `ctrl+z` 快捷键操作electron页面，成功如图所示：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601354651307-ac376a12-ea17-42cd-921b-3103be51c140.png#align=left&display=inline&height=591&margin=%5Bobject%20Object%5D&name=image.png&originHeight=591&originWidth=584&size=30654&status=done&style=none&width=584)

要是你不清楚全局快捷键是否注册过，可以通过`globalShortcut.isRegistered()`判断全局快捷键是否注册过。

另：main.js文件  
```javascript
const { app, BrowserWindow , globalShortcut} = require('electron');
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
    // mainWindow.webContents.openDevTools()
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    //这一次用快捷键ctrl+y打开网址y
    globalShortcut.register('ctrl+y',()=>{
        //当快捷键已经被其他应用程序注册时, 此调用将返回 false。
        let isRegister = globalShortcut.isRegistered('ctrl+y');
        if(isRegister){
            mainWindow.loadURL('https://www.baidu.com')
        }else{
            console.log('error')
        }
      })
    //快捷键ctrl+z可以打开页面
    globalShortcut.register('ctrl+z',()=>{
        mainWindow.loadFile('./index.html')
    })
    mainWindow.loadFile('index.html');  // 加载页面
    mainWindow.on('close', () => {      // 监听窗口关闭
        mainWindow = null               //销毁mainWindow
    })
})
```
运行 `npm run start` ,可以打开多个软件进行测试。全局快捷键冲突的时候可以报错error。

因为是全局注册快捷键，所以页面需要注销全局快捷键。

main.js文件
```javascript
const { app, BrowserWindow , globalShortcut} = require('electron');
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
    // mainWindow.webContents.openDevTools()
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
     //快捷键ctrl+y可以打开页面
    globalShortcut.register('ctrl+y',()=>{
        //当快捷键已经被其他应用程序注册时, 此调用将返回 false。
        let isRegister = globalShortcut.isRegistered('ctrl+y');
        if(isRegister){
            mainWindow.loadURL('https://www.baidu.com')
        }else{
            console.log('error')
        }
      })
    //快捷键ctrl+z可以打开页面
    globalShortcut.register('ctrl+z',()=>{
        mainWindow.loadFile('./index.html')
    })
    mainWindow.loadFile('index.html');  // 加载页面
    mainWindow.on('close', () => {      // 监听窗口关闭
        globalShortcut.unregister('ctrl+y');//注销快捷键ctrl+y
        globalShortcut.unregister('ctrl+z');//注销快捷键ctrl+z
        mainWindow = null               //销毁mainWindow
    })
})
```
#  (十二)剪贴板
剪贴板通过 `clipboard`模块实现，在系统剪贴板上执行复制和粘贴操作。

main.js文件，恢复原样。
```javascript
const { app, BrowserWindow , globalShortcut} = require('electron');
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
    // mainWindow.webContents.openDevTools()
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    mainWindow.loadFile('index.html');  // 加载页面
    mainWindow.on('close', () => {      // 监听窗口关闭
        mainWindow = null               //销毁mainWindow
    })
})
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
    <h3>剪贴板的操作</h3><br/>
    <div>
        复制信息: <span id="message">你好,sunny!</span
        ><button id="btn">点击复制</button>
    </div>
    <h3 id="txt"></h3>
</body>
<script>
    const btn = document.getElementById('btn');
    const txt=document.getElementById('txt')
    const message = document.getElementById('message');
    const { clipboard } = require('electron');
    btn.onclick = ()=>{
        //文字复制粘贴
        clipboard.writeText(message.innerHTML,'mes');
        alert('成功复制!')
        txt.innerText=clipboard.readText('mes')
        //html添加
        // clipboard.writeHTML('<h1>阳光正暖</h1>')
        // txt.innerHTML=clipboard.readHTML()
    } 
</script>
</html>

```
运行 `npm run start` ,页面结果如图所示：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1601364383223-60e786de-e6a0-4e95-917a-533fd01aec47.png#align=left&display=inline&height=587&margin=%5Bobject%20Object%5D&name=image.png&originHeight=587&originWidth=586&size=27125&status=done&style=none&width=586)

# 小小总结
小小demo就这样暂时结束了，有时间的话可以看着文档自己动手玩玩呀~

接下来就是项目啦~用这些知识点不是很多，所以还是需要继续学习!

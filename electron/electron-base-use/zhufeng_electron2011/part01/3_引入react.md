## 搭建命令
新建react-electron文件夹，在当前文件夹下cmd：
```
npm init -y

npm i electron --save
```
electron被引入过来了，就可以继续下一步啦！

基本的目录结构
```
整个文件夹
react-electron
    │  package.json
    │  
    └─app
        ├─main  主进程  
        └─renderer  渲染进程
            ├─pages
            │  └─control
            │          index.html
            │          
            └─src 创建main文件夹关于react页面

```

- 在react-electron\app\renderer\src里创建名为main的文件夹
```
react-electron/app/renderer/src文件夹

npx create-react-app main   

```
yarn start启动后不会出现浏览器的跳转，所以新建.env文件
```
BROWSER="none"
```
```
react-electron文件夹
npx electron -D
npm install electron-is-dev   判断环境是生产环境还是线上环境  
```
react-electron/app/main文件夹里新建index.js作为主进程文件
```javascript
const {app,BrowserWindow}=require('electron');
const isDev=require('electron-is-dev');
const path=require('path')
let win;//创建一个窗口
app.on('ready',()=>{
    win=new BrowserWindow({
        width:600,
        height:600,
        webPreferences:{
            nodeIntegration:true//允许使用node相关的
        }
    })
    if(isDev){
        win.loadURL('http://localhost:3000')//加载网址页面
    }else{
        //后面会调节好
        win.loadFile(path.resolve(__dirname,'../renderer/pages/mian/index.html'))//加载文件页面
    }
})
```
react-electron/app/renderer/pages/main/index.html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
</head>
<body>
    <h3>main页面</h3>
</body>
</html>
```


### 启动
react-electron文件package.json文件
```json
{
  //...
  "main": "app/main/index.js",//控制主进程文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:main": "electron .",//开启electron命令
    "start:render": "cd app/renderer/src/main && npm start",//开启react命令
  },
//...
}

```
打开两个控制台，一端输入 `yarn satrt:render` ,另一端输入 `yarn start:main` 就会出现electron窗口里的react页面，即为成功。
### 提示
```javascript
//renderer/src/main/src/App.js文件中

import {ipcRenderer} from 'electron';
```
会出现如图情况：![fs报错.png](https://cdn.nlark.com/yuque/0/2020/png/466273/1600158478491-8dc3bc89-f700-43e3-8a13-e4cef4198eca.png#align=left&display=inline&height=535&margin=%5Bobject%20Object%5D&name=fs%E6%8A%A5%E9%94%99.png&originHeight=535&originWidth=569&size=50420&status=done&style=none&width=569)`
`原因:` import解析不了electron模块， `解决办法` 有两种：

- 通过 `const {ipcRenderer}=window.require('electron')` 方式来解决，webpack不会解析electron依赖
- 修改webpack的target，篡改 `electron-renderer` 。因为cra脚手架的本质不需要大家进行编译而专注于开发这件事情，所以需要去做cra内部篡改。
```
首先需要安装两个模块：customize-cra react-app-rewired 
安装这两个模块的目的是为了在不退出cra eject的情况下对内部进行修改。
react-electron/app/renderer/src/main里的控制台上：
         yarn add customize-cra react-app-rewired --save-dev
新建一个config-overrides.js文件
```
config-overrides.js文件
```javascript
const {override}=require('customize-cra');
function addRenderer(config){
    config.target='electron-renderer';
    return config;
}

module.exports=override(addRenderer);
```
app/renderer/src/main/package.json
```json
  "scripts": {
    "start": "react-app-rewired start",//修改
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
在react-electron文件中启动 `yarn start `出现electron窗口的react页面，说明修改成功。 
`建议` 在大型项目中用webpack进行重新配置更好一些
### 适配命令
让electron窗口出现react页面，需要开启两个控制台，需要敲两遍命令， `yarn start:main` 命令需要 `yarn start:render` 的开启成功后才可以开启出现react页面。现在需要两个库 `concurrently  wait-on` 就可以敲一遍就可以达到相同的效果。
```
wait-on库:主要用来等待资源,如sockts、http、文件等，准备完毕才可以触发后面的命令
https://www.npmjs.com/package/wait-on可以查看相关的信息

concurrently库：主要用来并行两个命令的执行
https://www.npmjs.com/package/concurrently可以查看相关信息
```
react-electron文件package.json文件
```json
{
  //...
  "main": "app/main/index.js",//控制主进程文件
  "scripts": {
    //...
    "start": "concurrently \"npm run start:render\" \" wait-on http://localhost:3000 && npm run start:main\" "//只需要一遍就可以呈现相同的效果
  },
//...
}
```
启动 `yarn start` ,就可以看见electron窗口的react页面

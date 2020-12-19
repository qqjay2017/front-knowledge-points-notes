# 基本使用

## 安装


`$ yarn add webpack webpack-cli -D`

webpack是核心包,webpack-cli是命令行工具

## 配置文件

默认文件名 webpack.config.js

指定启动的配置文件
`webpack --config ./webpack.config.js`

指定模式

`$ webpack --mode=production`

#### 五大概念

- mode   默认值: 'production'
- entry  默认值: './src/index.js'
- output 默认值: './dist/main.js' 
- loader  识别js和json以外的文件, test用正则指定文件后缀,use指定loader
- Plugins 插件


#### 开发热更新

`yarn add webpack-dev-server -D`


packages.json
```json
{
  "name": "webpack5",
  "version": "1.0.0",
  "scripts": {
    "serve": "webpack serve",
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.11.0",
    "webpack-cli": "^4.2.0",
    "webpack-dev-server": "^3.11.0"
  }
}
```

配置文件

```
devServer:{
    contentBase	用于配置提供额外静态文件内容的目录,
    open:true
}
```

## HtmlWebpackPlugin

`$ yarn add html-webpack-plugin -D`

## 支持css

- css-loader用来解析css文件,翻译处理@import和url()
- style-loader可以把CSS插入DOM中

`$ yarn add style-loader css-loader -D`

loader 是从后面往前面执行

```js
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  }
```

## 支持less
`$ yarn add less less-loader -D`

``` js
{ test: /\.less$/, use: ["style-loader", "css-loader","less-loader"] }
```

## 支持sass

`$ yarn add sass sass-loader -D`


## 支持图片

- file-loader 解决CSS等文件中的引入图片路径问题,
 - 1.拷贝图片2.图片模块变成js模块
 - require文件的话,会把引入的文件拷贝到dist(打包开发目录)下面,然后返回文件的相对路径,配置1.name:[hash:10].[ext] 配置文件名,2.esModule:false ,默认true,返回es6模块
- url-loader 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader进行引用,是对
-  url-loader 内部依赖file-loader,是对file-loader的增强,file-loader可以不手动安装
`$ yarn add  url-loader -D`

```js
import time from './timg.jpg'
const img = new Image()
img.src=time
```

配置
```js
{
    test: /\.(jpg|png|bmp|gif|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 1024,  // 如果文件小于limit,就转成base64,否则就和file-loader一样
        },
      }
    ]
}
```

## js的兼容性

- babel-loader  :使用Babel和webpack转译JavaScript文件
- @babel/core    :Babel编译的核心包
- babel-preset-env
- @babel/@babel/preset-react  : React插件的Babel预设
- @babel/plugin-proposal-decorators  : 把类和对象装饰器编译成ES5
- @babel/plugin-proposal-class-properties  :转换静态类属性以及使用属性初始值化语法声明的属性


`$ npm i babel-loader @babel/core @babel/preset-env @babel/preset-react  -D`
`$ npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D`

#### @babel/preset-env 作用

- babel-loader  是一个函数,调用babel-core转换语法.babel-loader本身提供一个过程管理功能
- babel-core
- babel-preset-env  预设,具体管理语法转换语法的实现



```
1.es6语法转成es6语法树   babelCore
2.preset-env将es6语法树转成es5语法树
3.es5语法树重新生成es5代码    babelCore
```


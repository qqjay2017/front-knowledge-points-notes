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

- file-loader 解决CSS等文件中的引入图片路径问题
- url-loader 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader进行拷贝
-  url-loader 内部依赖file-loader,所以两个都要装,但是file-loader不用显式配置
`$ yarn add file-loader url-loader -D`

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
          limit: 1024,
        },
      }
    ]
}
```
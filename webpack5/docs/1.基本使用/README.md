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
- babel-preset-env  预设,具体管理语法转换语法的实现,有的语法不会转,比如Promise

#### polyfill

腻子,提供一系列的方法,代价是文件会变得很大,可以弄按需加载

`require('@babel/polyfill)`

```
1.es6语法转成es6语法树   babelCore
2.preset-env将es6语法树转成es5语法树
3.es5语法树重新生成es5代码    babelCore

```

#### 配置polyfill按需加载

还是不完美,可以用polyfill-service,根据浏览器请求头信息中的UserAgent实现自动加载浏览器所需的polyfill

```js
 {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env",{
                  useBuiltIns:'usage',  // 按需加载polyfill,不会全部polyfill都加载进去
                  corejs:{version:3},   // corejs版本,要安装corejs
                  targets:{
                    chrome:'60',
                    firefox:'60',
                    ie:'9',
                    safari:'10',
                    edge:'17'
                  }
                }],  // 可以转换js语法,
                "@babel/preset-react" // 可以转换jsx语法
              ],
              plugins:[
                // 插件是预设的集合,很多插件打包一起就是预设了
                ["@babel/plugin-proposal-decorators",{legacy:true}]
              ]
            }
          }
        ]
      }
 ```

useBuiltIns
- false 引入全部的polyfill
- entry 根据配置的浏览器兼容,需要在入口文件手动添加 import '@babel/polyfill'
- usage 根据配置的浏览器和代码中使用的APi来进行polyfill,实现按需加载

## polyfill-service

`https://polyfill.io/v3/polyfill.js`

## 几个path之间的关系

 - output.path
   - 打包输出的文件夹
 - output.publicPath
   - 静态资源的公共前缀,默认'/'
 - devServer.publicPath(一般不写)
   - 打包生成的静态文件所在的目录,没有设置的话默认就是output.publicPath(dist目录的虚拟mulu)
 - devServer.contentBase
   - 用于配置提供额外静态文件内容的目录

###### legacy
 
 babel选项,阶段不同的语法


## ESlint代码校验

1. 安装依赖
`$ yarn  add  eslint eslint-loader babel-eslint -D`
2. 添加loader
```js
 {
            test: /\.jsx?$/,
            loader: 'eslint-loader',
            enforce: 'pre', // 强制指定顺序,pre之前(转换前校验)   pre normal  inline  post
            options: {
                fix: true
            },
            include: resolve(__dirname, 'src'), // 包含,只检查xx目录下文件,白名单
            exclude: /node_modules/, // 排除
        },
```
3. airbnb
`$ yarn add eslint-config-airbnb  eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y -D`

4. eslint配置文件
> .eslintrc.js
```js
module.exports = {
    // root: true, // 根配置文件
    parser: "babel-eslint", // 解析器,把源代码转成抽象语法树
    extends: "airbnb", // 继承airbnb
    // 指定解析器选项
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2015,
    },
    // 指定脚本的运行环境
    env: {
        browser: true,
    },
    // 启用的规则及其各自的错误级别
    rules: {
        indent: ["error", 4], // 缩进风格
        quotes: "off", // 引号类型

        "no-console": "error", // 禁止使用console
    },
};
```
5. 配置自动修复
> .vscode\settings.json
```json
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
  }
```

## sourcemap

为了解决开发代码和实际运行代码不一致时帮助我们debug到原始开发代码的技术

```
source-map	原始代码 最好的sourcemap质量有完整的结果，但是会很慢
eval-source-map	原始代码 同样道理，但是最高的质量和最低的性能
cheap-module-eval-source-map	原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
cheap-eval-source-map	转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl
eval	生成代码 每个模块都被eval执行，并且存在@sourceURL,带eval的构建模式能cache SourceMap
cheap-source-map	转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用
cheap-module-source-map	原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射
```

 - 看似配置项很多， 其实只是五个关键字eval、source-map、cheap、module和inline的任意组合
 - 关键字可以任意组合，但是有顺序要求

```
eval	使用eval包裹模块代码
source-map	产生.map文件
cheap	不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap
module	包含loader的sourcemap（比如jsx to js ，babel的sourcemap）,否则无法定义源文件
inline	将.map作为DataURI嵌入，不单独生成.map文件
```

#### sourcemap最佳实践

- 测试环境:eval-source-map  速度快和调试友好的折中方案
- 生产环境:hidden-source-map  取消内联

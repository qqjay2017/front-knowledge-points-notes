### 第 1 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？



<br/>


### 第 2 题： 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的


<br/>


### 第 3 题：webpack 打包 vue 速度太慢怎么办？

> https://webpack.docschina.org/guides/build-performance/

- 确保下webpack，npm, node 及主要库版本要新
- loader范围缩小到src项目文件！一些不必要的loader能关就关了吧
- 可以把eslint的范围缩小到src,且只检查*.js 和 *.vue
- Webpack-Happypack,从单进程变成多进程，加速代码构建速度
- 删除不需要的一些代码，利用SplitChunksPlugin 进行分块


<br/>



### 第 4 题： webpack 中 loader 和 plugin 的区别是什么（平安）


### 第 5 题：babel 怎么把字符串解析成 AST，是怎么进行词法/语法分析的？

### webpack的优化有哪些？
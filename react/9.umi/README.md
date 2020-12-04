# umi

 - UmiJS 是一个类 Next.JS 的 react 开发框架。
 - 他基于一个约定，即 pages 目录下的文件即路由，而文件则导出 react 组件
 - 然后打通从源码到产物的每个阶段，并配以完善的插件体系，让我们能把 umi 的产物部署到各种场景里。

 > https://umijs.org/zh-CN/docs/getting-started#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87

## 开发依赖

#### 使用yarn

`$ npm i yarn tyarn -g`
`$  yarn global add umi`

## request配置

> https://github.com/umijs/umi-request

## env环境变量

- .env文件定义自定义变量

`UMI_APP_`开头,源码: 
> https://github.com/umijs/umi/blob/master/packages/bundler-webpack/src/getConfig/resolveDefine.ts

 - 多环境打包UMI_ENV

 > https://blog.csdn.net/weixin_34409741/article/details/88678953
 > https://umijs.org/zh-CN/docs/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%A4%9A%E4%BB%BD%E9%85%8D%E7%BD%AE

1.安装 cross-env
`$yarn add   cross-env -g`

2.config文件定义变量

config.ts

```ts
export default {
    layout: {
        // 支持任何不需要 dom 的
        // https://procomponents.ant.design/components/layout#prolayout
        name: 'Ant Design11111111',
        locale: false,
        layout: 'side',
      },
    routes,
    define: {
      a:1,
      b:2
    }
}
```

config.local.ts

```ts
export default {
  define: {
    c:'local'
  }
   
}
```

3.执行cross-env指定启动参数

```
"start": "cross-env UMI_ENV=local umi dev",
"build": "cross-env UMI_ENV=cloud umi build",
```
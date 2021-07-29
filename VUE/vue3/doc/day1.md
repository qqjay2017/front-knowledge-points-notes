# vue3

## vue3与vue2的区别

- 源码采用 `monorepo` 的方式进行管理,代码拆分到 `package` 目录中
- vue3采用 `ts`进行开发 ,vue2 是用 `flow`
- vue3的性能优化: 支持 tree-shaking,不适用就不会被打包
- vue2后期引入rfc,每个版本改动可控

## 内部代码优化

- vue3劫持数据是用 `proxy`,vue2数据劫持是用的是`defineProperty`,`defineProperty`有性能问题和缺陷
- vue3对模板编译进行了优化, 编译时生成了block tree,可以对子节点的动态节点进行收集,可以减少比较,并且采用 `patchFlag` 标记动态节点
- vue3采用了 `compositionAPI` 进行组织功能,vue2是用 `optionsAPI` ,优化逻辑复用(解决mixin带来的来源不清晰,命名冲突)
- 增加了 `Fragment` , `Teleport` , `Suspense` 组件



## monirepo架构

根项目不会被发布,所以要标记 `private":true`
同时要告诉yarn你的包在哪个目录下面: `packages` 字段

```
 "private":true,
  "workspaces":[
    "packages/*"
  ],

```

- 安装到根目录

```
yarn install xxx -W 
```


## vue3中的包



```
  vue   
       @vue/compiler-core 
       平台无关的编译器核心
                           @vue/compiler-dom   @vue/compiler-ssr   @vue/compiler-sfc

                                compiler 包主要是将模板编译成render函数,core是无平台核心包,其他是针对特定平台

        @vue/runtime-core
        与平台无关的运行时核心 (可以创建针对特定平台的运行时 - 自定义渲染器)
                             @vue/runtime-dom 
                              针对浏览器的运行时。包括DOM API，属性，事件处理等

        @vue/reactivity
        响应式

        @vue/shared
        公共/工具
```

## 安装依赖

```
npm i rollup -g
```


```
npx tsc --init
```

@rollup/plugin-node-resolve: 解析第三方模块

```
npm install typescript rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa -D
```

## 文档地址

> http://www.zhufengpeixun.com/advance/vue3/2.vue3-reactivity.html#%E5%9B%9B-effect%E5%AE%9E%E7%8E%B0
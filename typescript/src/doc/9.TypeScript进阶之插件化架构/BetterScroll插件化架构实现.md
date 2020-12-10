对于插件化的核⼼系统设计来说，它涉及三个关键点：插件管理、插件连接和插件通信。下⾯我们将围
绕这三个关键点来逐步分析 BetterScroll 2.0 是如何实现插件化架构。

## 插件管理

BetterScroll 2.0 的插件需要是⼀个类，并且具有以下特性：

- 静态的 pluginName 属性；
- 实现 PluginAPI 接⼝（当且仅当需要把插件⽅法代理⾄ bs）；
    - finishPullUp(): void：结束上拉加载⾏为；
    - openPullUp(config?: PullUpLoadOptions): void：动态开启上拉功能；
    - closePullUp(): void：关闭上拉加载功能；
    - autoPullUpLoad(): void：⾃动执⾏上拉加载。
- constructor 的第⼀个参数就是 BetterScroll 实例 bs ，你可以通过 bs 的 事件 或者 钩⼦ 来注⼊⾃⼰
  的逻辑
  
## 2 插件连接

。核⼼系统提供插件注册表（可以是配置⽂件，也可以是代码，还可以是数据库），插件
注册表含有每个插件模块的信息，包括它的名字、位置、加载时机（启动就加载，或是按需加载）等

`$ npm install @better-scroll/pull-up --save`

成功安装完 pullup 插件之后，你需要通过 BScroll.use ⽅法来注册插件：

```ts
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
```

然后，实例化 BetterScroll 时需要传⼊ PullUp 插件的配置项。

```ts
new BScroll('.bs-wrapper', {
 pullUpLoad: true
})
```

use的源码：

```ts
export class BScrollConstructor<O = {}> extends EventEmitter {
 static plugins: PluginItem[] = []
 static pluginsMap: PluginsMap = {}
 static use(ctor: PluginCtor) {
 const name = ctor.pluginName
 const installed = BScrollConstructor.plugins.some(
 (plugin) => ctor === plugin.ctor
 )
 // 省略部分代码
 if (installed) return BScrollConstructor
 BScrollConstructor.pluginsMap[name] = true
 BScrollConstructor.plugins.push({
 name,
 applyOrder: ctor.applyOrder,
 ctor,
 })
 return BScrollConstructor
 }
}
```

PluginCtor接口声明

```ts
interface PluginCtor {
 pluginName: string
 applyOrder?: ApplyOrder
 new (scroll: BScroll): any
}
```

当我们调⽤ BScroll.use(Pullup) ⽅法时，会先获取当前插件的名称，然后判断当前插件是否已经安
装过了。如果已经安装则直接返回 BScrollConstructor 对象，否则会对插件进⾏注册。即把当前插件的
信息分别保存到 pluginsMap（{}） 和 plugins（[]） 对象中：

另外调⽤ use 静态⽅法后，会返回 BScrollConstructor 对象，这是为了⽀持链式调⽤：

```ts
BScroll.use(MouseWheel)
 .use(ObserveDom)
 .use(PullDownRefresh)
 .use(PullUpLoad)
```

初始化函数:核心代码:const bs = new BScrollConstructor(el, options)
```ts
// packages/core/src/BScroll.ts
export const BScroll = (createBScroll as unknown) as BScrollFactory
export function createBScroll<O = {}>(
 el: ElementParam,
 options?: Options & O
): BScrollConstructor & UnionToIntersection<ExtractAPI<O>> {
 const bs = new BScrollConstructor(el, options)
 return (bs as unknown) as BScrollConstructor &
 UnionToIntersection<ExtractAPI<O>>
}
```
 BScrollConstructor 构造函数：

```ts
// packages/core/src/BScroll.ts
export class BScrollConstructor<O = {}> extends EventEmitter {
 constructor(el: ElementParam, options?: Options & O) {
     super();
     const wrapper = getElement(el)
     // 省略部分代码
     this.plugins = {}
     this.hooks = new EventEmitter([
         //...
         ])
     // ⽽在 init ⽅法内部会进⼀步调⽤ applyPlugins ⽅法来应⽤已注册的插件：
     this.init(wrapper)
 }

     private init(wrapper: MountedBScrollHTMLElement) {
         this.wrapper = wrapper
         // 省略部分代码
         this.applyPlugins()
     }
}
```

applyPlugins方法
```ts
// packages/core/src/BScroll.ts
export class BScrollConstructor<O = {}> extends EventEmitter {
 private applyPlugins() {
     const options = this.options;
     BScrollConstructor.plugins
     // 会根据插件设置的顺序进⾏排序
     .sort((a, b) => {
         const applyOrderMap = {
         [ApplyOrder.Pre]: -1,
         [ApplyOrder.Post]: 1,
         }
         const aOrder = a.applyOrder ? applyOrderMap[a.applyOrder] : 0
         const bOrder = b.applyOrder ? applyOrderMap[b.applyOrder] : 0
             return aOrder - bOrder
     })
     .forEach((item: PluginItem) => {
         const ctor = item.ctor
         // 当启⽤指定插件的时候且插件构造函数的类型是函数的话，再创建对应的插件
         if (options[item.name] && typeof ctor === 'function') {
             // 使⽤ bs 实例作为参数调⽤插件的构造函数来创建插件
             this.plugins[item.name] = new ctor(this)
         }
     })
 }
}
```

## 插件通信

此核⼼系统需要提供插件通信机制。:发布订阅模式

BScrollConstructor 类，该类继承了 EventEmitter

利⽤ bs 实例进⾏消息通信

```
private checkPullUp(pos: { x: number; y: number }) {
     const { threshold } = this.options
     if (...) {
         this.pulling = true
         // 省略部分代码 触发⼀次 pullingUp 事件：
         this.scroll.trigger(PULL_UP_HOOKS_NAME) // 'pullingUp'
     }
}
```

插件内部监听事件
`this.handleHooks()`

handleHooks具体实现
```ts
private handleHooks() {
     this.hooksFn = []
     // 省略部分代码
     this.registerHooks(
         this.scroll.hooks,
         this.scroll.hooks.eventTypes.contentChanged,
         () => {
         this.finishPullUp()
         }
     )
}
```

registerHooks方法注册钩子


```ts
private registerHooks(hooks: EventEmitter, name: string, handler: Function) {
     hooks.on(name, handler, this)
     this.hooksFn.push([hooks, name, handler])
}
```

this.scroll.hooks : EventEmitter

```ts
// packages/core/src/BScroll.ts
export class BScrollConstructor<O = {}> extends EventEmitter {
     constructor(el: ElementParam, options?: Options & O) {
     // 省略部分代码
     this.hooks = new EventEmitter([
     'refresh',
     'enable',
     'disable',
     'destroy',
     'beforeInitialScrollTo',
     'contentChanged',
     ])
 }
```


## 工程方面

在⼯程化⽅⾯，BetterScroll 使⽤了业内⼀些常⻅的解决⽅案：
 - lerna：Lerna 是⼀个管理⼯具，⽤于管理包含多个软件包（package）的 JavaScript 项⽬。
 - prettier：Prettier 中⽂的意思是漂亮的、美丽的，是⼀个流⾏的代码格式化的⼯具。
 - tslint：TSLint 是可扩展的静态分析⼯具，⽤于检查 TypeScript 代码的可读性，可维护性和功能性
错误。
 - commitizen & cz-conventional-changelog：⽤于帮助我们⽣成符合规范的 commit message。
 - husky：husky 能够防⽌不规范代码被 commit、push、merge 等等。
 - jest：Jest 是由 Facebook 维护的 JavaScript 测试框架。
 - coveralls：⽤于获取 Coveralls.io 的覆盖率报告，并在 README ⽂件中添加⼀个不错的覆盖率按
钮。
 - vuepress：Vue 驱动的静态⽹站⽣成器，它⽤于⽣成 BetterScroll 2.0 的⽂档。

























